import { useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

// 本番: 同一オリジン / 開発: localhost:3001
const SERVER_URL = process.env.REACT_APP_SERVER_URL || (
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'
);

/**
 * Socket.io クライアント Hook
 * @param {boolean} enabled - マルチプレイ時のみ true にする
 * @param {object} handlers - イベントハンドラ
 */
export function useSocket(enabled, { onGameState, onTurnAdvanced, onActionError, onError } = {}) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const socket = io(SERVER_URL, { autoConnect: false });
    socketRef.current = socket;

    if (onGameState)    socket.on('game_state',    onGameState);
    if (onTurnAdvanced) socket.on('turn_advanced', onTurnAdvanced);
    if (onActionError)  socket.on('action_error',  onActionError);
    if (onError)        socket.on('error',         onError);

    socket.connect();

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const joinRoom = useCallback((roomId, playerId) => {
    socketRef.current?.emit('join_room', { roomId, playerId });
  }, []);

  const hire = useCallback((employeeId) => {
    socketRef.current?.emit('hire', { employeeId });
  }, []);

  const contract = useCallback((projectId) => {
    socketRef.current?.emit('contract', { projectId });
  }, []);

  const nextTurn = useCallback(() => {
    socketRef.current?.emit('next_turn');
  }, []);

  return { joinRoom, hire, contract, nextTurn };
}
