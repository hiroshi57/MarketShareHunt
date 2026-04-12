const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'game.db');
const db = new Database(DB_PATH);

// テーブル初期化
db.exec(`
  CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    host_id TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    room_id TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    socket_id TEXT,
    joined_at INTEGER NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
  );

  CREATE TABLE IF NOT EXISTS game_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);

// ルーム操作
const roomOps = {
  create(id, name, hostId, state) {
    db.prepare(`INSERT INTO rooms (id, name, host_id, state, created_at) VALUES (?, ?, ?, ?, ?)`)
      .run(id, name, hostId, JSON.stringify(state), Date.now());
  },
  get(id) {
    const row = db.prepare('SELECT * FROM rooms WHERE id = ?').get(id);
    if (!row) return null;
    return { ...row, state: JSON.parse(row.state) };
  },
  updateState(id, state) {
    db.prepare('UPDATE rooms SET state = ? WHERE id = ?')
      .run(JSON.stringify(state), id);
  },
  list() {
    return db.prepare('SELECT id, name, host_id, created_at FROM rooms').all();
  },
};

// プレイヤー操作
const playerOps = {
  add(id, roomId, name, company, socketId) {
    db.prepare(`INSERT OR REPLACE INTO players (id, room_id, name, company, socket_id, joined_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(id, roomId, name, company, socketId, Date.now());
  },
  updateSocket(id, socketId) {
    db.prepare('UPDATE players SET socket_id = ? WHERE id = ?').run(socketId, id);
  },
  getByRoom(roomId) {
    return db.prepare('SELECT * FROM players WHERE room_id = ?').all(roomId);
  },
  get(id) {
    return db.prepare('SELECT * FROM players WHERE id = ?').get(id);
  },
};

// イベントログ
const eventOps = {
  log(roomId, eventType, payload) {
    db.prepare(`INSERT INTO game_events (room_id, event_type, payload, created_at) VALUES (?, ?, ?, ?)`)
      .run(roomId, eventType, JSON.stringify(payload), Date.now());
  },
};

module.exports = { roomOps, playerOps, eventOps };
