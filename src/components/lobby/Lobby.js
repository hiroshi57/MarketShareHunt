import React, { useState, useEffect, useCallback } from 'react';
import styles from './Lobby.module.css';

// 本番: 同一オリジン / 開発: localhost:3001
const SERVER = process.env.REACT_APP_SERVER_URL || (
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'
);

function Lobby({ onEnter }) {
  const [mode, setMode] = useState(null); // null | 'multi'
  const [tab, setTab] = useState('create');
  const [playerName, setPlayerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [roomListLoading, setRoomListLoading] = useState(false);

  const fetchRooms = useCallback(async () => {
    setRoomListLoading(true);
    try {
      const res = await fetch(`${SERVER}/api/rooms`);
      if (res.ok) {
        const data = await res.json();
        setRoomList(data.rooms || []);
      }
    } catch {
      setRoomList([]);
    } finally {
      setRoomListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'multi' && tab === 'join') {
      fetchRooms();
    }
  }, [mode, tab, fetchRooms]);

  const handleCreate = async () => {
    if (!playerName.trim() || !companyName.trim()) { setError('名前と会社名を入力してください'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${SERVER}/api/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: playerName.trim(), companyName: companyName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onEnter({ roomId: data.roomId, playerId: data.playerId, playerName, companyName, isHost: true });
    } catch (e) {
      setError('サーバー未起動。ソロモードをお試しください。');
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!playerName.trim() || !companyName.trim() || !roomCode.trim()) { setError('全項目を入力してください'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${SERVER}/api/rooms/${roomCode.toUpperCase()}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: playerName.trim(), companyName: companyName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onEnter({ roomId: data.roomId, playerId: data.playerId, playerName, companyName, isHost: false });
    } catch (e) {
      setError('サーバー未起動またはルームコードが間違っています。');
      setLoading(false);
    }
  };

  // マルチプレイヤー設定画面
  if (mode === 'multi') {
    return (
      <div className={styles.bg}>
        <div className={styles.panel}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>H</div>
            <div>
              <div className={styles.logoTitle}>Harness MarketShareHunt</div>
              <div className={styles.logoSub}>マルチプレイヤーモード</div>
            </div>
          </div>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${tab === 'create' ? styles.active : ''}`} onClick={() => setTab('create')}>
              新規ルーム作成
            </button>
            <button className={`${styles.tab} ${tab === 'join' ? styles.active : ''}`} onClick={() => setTab('join')}>
              ルームに参加
            </button>
          </div>

          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>あなたの名前</label>
              <input className={styles.input} value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="例: Hiroshi" maxLength={20} autoFocus />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>会社名</label>
              <input className={styles.input} value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="例: Alpha社" maxLength={20} />
            </div>
            {tab === 'join' && (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>ルームコード（ホストから受け取る）</label>
                  <input className={styles.input} value={roomCode} onChange={e => setRoomCode(e.target.value.toUpperCase())} placeholder="AB1C2D" maxLength={6} style={{ letterSpacing: '0.2em', fontFamily: 'Courier New, monospace', fontSize: 18 }} />
                </div>
                <div className={styles.roomListSection}>
                  <div className={styles.roomListHeader}>
                    <span className={styles.roomListTitle}>または参加中のルーム一覧</span>
                    <button className={styles.refreshBtn} onClick={fetchRooms} disabled={roomListLoading}>
                      {roomListLoading ? '...' : '↻'}
                    </button>
                  </div>
                  {roomList.length === 0 ? (
                    <div className={styles.roomListEmpty}>
                      {roomListLoading ? '読み込み中...' : '現在開いているルームはありません'}
                    </div>
                  ) : (
                    <div className={styles.roomListItems}>
                      {roomList.map(room => (
                        <button
                          key={room.roomId}
                          className={styles.roomItem}
                          onClick={() => setRoomCode(room.roomId)}
                        >
                          <span className={styles.roomItemCode}>{room.roomId}</span>
                          <span className={styles.roomItemInfo}>
                            {room.playerCount}人参加中 · ターン{room.currentTurn}
                          </span>
                          <span className={styles.roomItemSelect}>選択 →</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.btn} onClick={tab === 'create' ? handleCreate : handleJoin} disabled={loading}>
              {loading ? '接続中...' : tab === 'create' ? 'ルームを作成してゲーム開始' : 'ルームに参加してゲーム開始'}
            </button>
            <button className={styles.backBtn} onClick={() => { setMode(null); setError(''); }}>
              ← 戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  // トップ画面
  return (
    <div className={styles.bg}>
      <div className={styles.panel}>
        {/* ロゴ */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>H</div>
          <div>
            <div className={styles.logoTitle}>Harness</div>
            <div className={styles.logoSub}>MarketShareHunt</div>
          </div>
        </div>
        <div className={styles.tagline}>PLG + Enterprise 経営シミュレーター</div>
        <div className={styles.desc}>
          社員を採用し、案件を受注して市場シェアを拡大しよう。<br/>
          <span style={{ color: '#00B4D8' }}>PLG自動流入</span> と <span style={{ color: '#E3B341' }}>Enterprise大型案件</span> の両軸で成長を目指す。
        </div>

        {/* メインボタン群 */}
        <div className={styles.modeButtons}>
          <button className={styles.soloBtnMain} onClick={() => onEnter({ solo: true })}>
            <span className={styles.modeBtnIcon}>▶</span>
            <div>
              <div className={styles.modeBtnTitle}>ソロでプレイ</div>
              <div className={styles.modeBtnSub}>すぐに始める・サーバー不要</div>
            </div>
          </button>
          <button className={styles.multiBtnMain} onClick={() => setMode('multi')}>
            <span className={styles.modeBtnIcon}>⚡</span>
            <div>
              <div className={styles.modeBtnTitle}>マルチプレイヤー</div>
              <div className={styles.modeBtnSub}>複数人で競争（要サーバー起動）</div>
            </div>
          </button>
        </div>

        {/* ゲームの流れ */}
        <div className={styles.howto}>
          <div className={styles.howtoTitle}>ゲームの流れ</div>
          <div className={styles.howtoSteps}>
            <div className={styles.howtoStep}><span className={styles.stepNum}>1</span><span>社員を採用する（左パネル）</span></div>
            <div className={styles.howtoStep}><span className={styles.stepNum}>2</span><span>スキルが合う案件を受注する（左パネル）</span></div>
            <div className={styles.howtoStep}><span className={styles.stepNum}>3</span><span>「次の月へ」ボタンで収益を確定（画面下）</span></div>
            <div className={styles.howtoStep}><span className={styles.stepNum}>4</span><span>ARR・NRR・市場シェアを伸ばす（右パネル）</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
