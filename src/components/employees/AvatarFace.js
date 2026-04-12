import React from 'react';

// シード値から疑似乱数を生成
function seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// 名前からシード生成
function nameToSeed(name) {
  return name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

// 部署ごとのスキントーン
const DEPT_SKIN = {
  '経営企画部':   '#FDBCB4',
  '事業開発部':   '#F1C27D',
  'コンテンツ制作部': '#FFDBAC',
  'マーケティング部': '#E8BEAC',
  '人事部':       '#C68642',
  '経営管理部':   '#F4C2A0',
  'リサーチ部':   '#FDDBB4',
  'データ分析部': '#D4956A',
  '営業部':       '#ECC19C',
  'MA評価部':     '#FFD194',
};

// 髪色バリエーション
const HAIR_COLORS = ['#1A1A1A', '#3B2314', '#4A3728', '#6B4226', '#8B6F47', '#2C1810'];

// アクセサリー
const ACCESSORIES = [null, null, null, 'glasses', 'glasses']; // 40%の確率でメガネ

function AvatarFace({ name, department, size = 44 }) {
  const seed = nameToSeed(name);
  const rand = seededRand(seed);

  const skin = DEPT_SKIN[department] || '#FDBCB4';
  const hairColor = HAIR_COLORS[Math.floor(rand() * HAIR_COLORS.length)];
  const eyeSize = 2.2 + rand() * 0.6;
  const mouthCurve = rand() > 0.3 ? 'smile' : 'neutral'; // 70%がスマイル
  const hasAccessory = ACCESSORIES[Math.floor(rand() * ACCESSORIES.length)];
  const faceWidth = 26 + rand() * 4;
  const eyebrowAngle = rand() > 0.5 ? 1 : -1;
  const hairStyle = Math.floor(rand() * 4); // 0=short, 1=medium, 2=long, 3=wavy

  const cx = size / 2;
  const cy = size / 2;
  const faceH = faceWidth * 1.15;

  // 髪の形状
  const hairPaths = [
    // short
    `M ${cx - faceWidth/2 - 1} ${cy - 2} Q ${cx} ${cy - faceH/2 - 10} ${cx + faceWidth/2 + 1} ${cy - 2}`,
    // medium with part
    `M ${cx - faceWidth/2} ${cy - 4} Q ${cx - 2} ${cy - faceH/2 - 12} ${cx + faceWidth/2} ${cy - 4}`,
    // side swept
    `M ${cx - faceWidth/2 - 2} ${cy} Q ${cx - 4} ${cy - faceH/2 - 8} ${cx + faceWidth/2 + 2} ${cy - 3}`,
    // wavy
    `M ${cx - faceWidth/2} ${cy - 2} Q ${cx - 4} ${cy - faceH/2 - 6} ${cx} ${cy - faceH/2 - 14} Q ${cx + 4} ${cy - faceH/2 - 6} ${cx + faceWidth/2} ${cy - 2}`,
  ];

  const eyeY = cy - 2;
  const eyeSpacing = faceWidth * 0.28;
  const mouthY = cy + faceH * 0.22;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ borderRadius: '8px', display: 'block' }}>
      {/* 背景 */}
      <rect width={size} height={size} fill="#0D1117" rx="8" />

      {/* 髪（背面） */}
      <ellipse cx={cx} cy={cy - faceH/2 + 2} rx={faceWidth/2 + 3} ry={faceH * 0.45} fill={hairColor} />
      <path d={hairPaths[hairStyle]} fill={hairColor} strokeWidth="0" />

      {/* 顔 */}
      <ellipse cx={cx} cy={cy + 1} rx={faceWidth/2} ry={faceH/2} fill={skin} />

      {/* 眉毛 */}
      <line
        x1={cx - eyeSpacing - 3} y1={eyeY - eyeSize * 3 + eyebrowAngle}
        x2={cx - eyeSpacing + 3} y2={eyeY - eyeSize * 3 - eyebrowAngle}
        stroke={hairColor} strokeWidth="1.2" strokeLinecap="round"
      />
      <line
        x1={cx + eyeSpacing - 3} y1={eyeY - eyeSize * 3 - eyebrowAngle}
        x2={cx + eyeSpacing + 3} y2={eyeY - eyeSize * 3 + eyebrowAngle}
        stroke={hairColor} strokeWidth="1.2" strokeLinecap="round"
      />

      {/* 目 */}
      <circle cx={cx - eyeSpacing} cy={eyeY} r={eyeSize} fill="#1A1A2E" />
      <circle cx={cx + eyeSpacing} cy={eyeY} r={eyeSize} fill="#1A1A2E" />
      <circle cx={cx - eyeSpacing + 0.6} cy={eyeY - 0.6} r={0.7} fill="#fff" />
      <circle cx={cx + eyeSpacing + 0.6} cy={eyeY - 0.6} r={0.7} fill="#fff" />

      {/* 口 */}
      {mouthCurve === 'smile' ? (
        <path
          d={`M ${cx - 4} ${mouthY} Q ${cx} ${mouthY + 4} ${cx + 4} ${mouthY}`}
          stroke="#B07060" strokeWidth="1.2" fill="none" strokeLinecap="round"
        />
      ) : (
        <line x1={cx - 3} y1={mouthY + 1} x2={cx + 3} y2={mouthY + 1}
          stroke="#B07060" strokeWidth="1.2" strokeLinecap="round"
        />
      )}

      {/* 鼻 */}
      <path
        d={`M ${cx - 1.5} ${cy + 4} Q ${cx} ${cy + 7} ${cx + 1.5} ${cy + 4}`}
        stroke="#C08070" strokeWidth="1" fill="none" strokeLinecap="round"
      />

      {/* メガネ */}
      {hasAccessory === 'glasses' && (
        <g>
          <rect x={cx - eyeSpacing - eyeSize - 1} y={eyeY - eyeSize - 1}
            width={(eyeSize + 1) * 2} height={(eyeSize + 1) * 2}
            rx="2" fill="none" stroke="#4A90E2" strokeWidth="1"
          />
          <rect x={cx + eyeSpacing - eyeSize - 1} y={eyeY - eyeSize - 1}
            width={(eyeSize + 1) * 2} height={(eyeSize + 1) * 2}
            rx="2" fill="none" stroke="#4A90E2" strokeWidth="1"
          />
          <line x1={cx - eyeSpacing + eyeSize} y1={eyeY}
            x2={cx + eyeSpacing - eyeSize} y2={eyeY}
            stroke="#4A90E2" strokeWidth="0.8"
          />
        </g>
      )}

      {/* 髪（前面の一部） */}
      {hairStyle === 2 && (
        <path
          d={`M ${cx - faceWidth/2 - 2} ${cy - faceH/2 + 8} Q ${cx - faceWidth/2} ${cy - 4} ${cx - faceWidth/2 + 4} ${cy}`}
          fill={hairColor}
        />
      )}
    </svg>
  );
}

export default AvatarFace;
