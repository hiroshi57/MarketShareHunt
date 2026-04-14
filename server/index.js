const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const uuidv4 = () => require('crypto').randomUUID();
const path = require('path');

const { roomOps, playerOps, eventOps } = require('./db');
const { createInitialGameState, hireEmployee, contractProject, advanceTurn, generatePlgProject } = require('./gameLogic');

const app = express();
const server = http.createServer(app);

// 本番: 同一オリジンなのでCORS不要 / 開発: localhost:3000を許可
const corsOrigin = process.env.NODE_ENV === 'production'
  ? false
  : 'http://localhost:3000';

const io = new Server(server, {
  cors: corsOrigin ? { origin: corsOrigin, methods: ['GET', 'POST'] } : {},
});

if (corsOrigin) app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// 本番ビルド配信（build/ フォルダを静的ファイルとして提供）
app.use(express.static(path.join(__dirname, '../build')));

// ===== REST API =====

// ルーム一覧
app.get('/api/rooms', (req, res) => {
  const rows = roomOps.list();
  const rooms = rows.map(r => {
    const players = playerOps.getByRoom(r.id);
    const room = roomOps.get(r.id);
    return {
      roomId: r.id,
      name: r.name,
      playerCount: players.length,
      currentTurn: room?.state?.currentTurn || 1,
      createdAt: r.created_at,
    };
  });
  res.json({ rooms });
});

// ルーム作成
app.post('/api/rooms', (req, res) => {
  const { playerName, companyName } = req.body;
  if (!playerName || !companyName) return res.status(400).json({ error: 'playerName and companyName required' });

  const roomId = uuidv4().slice(0, 6).toUpperCase();
  const playerId = uuidv4();

  const initialState = createInitialGameState([{ id: playerId, name: playerName, company: companyName }]);
  roomOps.create(roomId, `${companyName}のルーム`, playerId, initialState);
  playerOps.add(playerId, roomId, playerName, companyName, null);

  eventOps.log(roomId, 'room_created', { playerId, playerName, companyName });

  res.json({ roomId, playerId });
});

// ルーム参加
app.post('/api/rooms/:roomId/join', (req, res) => {
  const { roomId } = req.params;
  const { playerName, companyName } = req.body;
  if (!playerName || !companyName) return res.status(400).json({ error: 'playerName and companyName required' });

  const room = roomOps.get(roomId);
  if (!room) return res.status(404).json({ error: 'Room not found' });

  const playerId = uuidv4();
  playerOps.add(playerId, roomId, playerName, companyName, null);

  // ゲーム状態にプレイヤー追加
  const state = room.state;
  state.playerCash[playerId] = 30000000;
  state.playerFinancials[playerId] = { revenue: 0, cost: 0, profit: 0 };
  roomOps.updateState(roomId, state);

  eventOps.log(roomId, 'player_joined', { playerId, playerName, companyName });

  res.json({ roomId, playerId });
});

// ===== Socket.io =====

io.on('connection', (socket) => {
  console.log(`[socket] connected: ${socket.id}`);

  // ルーム参加
  socket.on('join_room', ({ roomId, playerId }) => {
    const room = roomOps.get(roomId);
    const player = playerOps.get(playerId);
    if (!room || !player) {
      socket.emit('error', { message: 'ルームまたはプレイヤーが見つかりません' });
      return;
    }

    playerOps.updateSocket(playerId, socket.id);
    socket.join(roomId);
    socket.data = { roomId, playerId };

    const players = playerOps.getByRoom(roomId);
    io.to(roomId).emit('game_state', {
      state: room.state,
      players,
      playerId,
    });

    console.log(`[socket] ${player.name} joined room ${roomId}`);
  });

  // 採用
  socket.on('hire', ({ employeeId }) => {
    const { roomId, playerId } = socket.data || {};
    if (!roomId || !playerId) return;

    const room = roomOps.get(roomId);
    const player = playerOps.get(playerId);
    if (!room || !player) return;

    const result = hireEmployee(room.state, employeeId, playerId, player.company);
    if (!result.success) {
      socket.emit('action_error', { message: result.reason });
      return;
    }

    // コスト消費
    const emp = result.employee;
    // 採用は毎ターンのコストとして反映（即時キャッシュ消費なし）

    roomOps.updateState(roomId, room.state);
    eventOps.log(roomId, 'hire', { playerId, employeeId, employeeName: emp.name });

    io.to(roomId).emit('game_state', {
      state: room.state,
      players: playerOps.getByRoom(roomId),
      playerId,
    });
  });

  // 受注
  socket.on('contract', ({ projectId }) => {
    const { roomId, playerId } = socket.data || {};
    if (!roomId || !playerId) return;

    const room = roomOps.get(roomId);
    const player = playerOps.get(playerId);
    if (!room || !player) return;

    const result = contractProject(room.state, projectId, playerId, player.company, room.state.currentTurn);
    if (!result.success) {
      socket.emit('action_error', { message: result.reason });
      return;
    }

    roomOps.updateState(roomId, room.state);
    eventOps.log(roomId, 'contract', { playerId, projectId, projectName: result.project.name });

    io.to(roomId).emit('game_state', {
      state: room.state,
      players: playerOps.getByRoom(roomId),
      playerId,
    });
  });

  // ターン進行（ホストのみ）
  socket.on('next_turn', () => {
    const { roomId, playerId } = socket.data || {};
    if (!roomId || !playerId) return;

    const room = roomOps.get(roomId);
    if (!room) return;

    // ホストチェック
    if (room.host_id !== playerId) {
      socket.emit('action_error', { message: 'ホストのみターンを進めることができます' });
      return;
    }

    const players = playerOps.getByRoom(roomId);
    const newState = advanceTurn(room.state, players.map(p => ({ id: p.id, name: p.name, company: p.company })));

    roomOps.updateState(roomId, newState);
    eventOps.log(roomId, 'next_turn', { turn: newState.currentTurn });

    io.to(roomId).emit('turn_advanced', {
      state: newState,
      players,
    });
  });

  // 切断
  socket.on('disconnect', () => {
    console.log(`[socket] disconnected: ${socket.id}`);
  });
});

// SPA フォールバック（/api/* 以外はすべて index.html を返す）
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`\n🎮 MarketShareHunt Server`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   Socket.io: ready`);
  console.log(`   DB: server/game.db\n`);
});
