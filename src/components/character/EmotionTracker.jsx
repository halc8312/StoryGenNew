import React from 'react';
import classNames from 'classnames';
import './EmotionTracker.css';

const emotions = [
  { id: 'happy', label: '喜び', color: '#FFD93D' },
  { id: 'sad', label: '悲しみ', color: '#6C757D' },
  { id: 'angry', label: '怒り', color: '#DC3545' },
  { id: 'fear', label: '恐れ', color: '#6610F2' },
  { id: 'surprise', label: '驚き', color: '#FFC107' },
  { id: 'disgust', label: '嫌悪', color: '#198754' },
  { id: 'trust', label: '信頼', color: '#0DCAF0' },
  { id: 'anticipation', label: '期待', color: '#FD7E14' },
];

const EmotionTracker = ({ character, onEmotionChange }) => {
  const handleEmotionClick = (emotionId) => {
    const currentIntensity = character.emotions?.[emotionId] || 0;
    const newIntensity = (currentIntensity + 1) % 4; // 0-3の範囲で循環
    onEmotionChange(emotionId, newIntensity);
  };

  return (
    <div className="emotion-tracker">
      <h5>感情状態</h5>
      <div className="emotion-grid">
        {emotions.map(({ id, label, color }) => (
          <div
            key={id}
            className="emotion-item"
            onClick={() => handleEmotionClick(id)}
          >
            <div 
              className={classNames('emotion-indicator', {
                'intensity-0': !character.emotions?.[id],
                'intensity-1': character.emotions?.[id] === 1,
                'intensity-2': character.emotions?.[id] === 2,
                'intensity-3': character.emotions?.[id] === 3,
              })}
              style={{ '--emotion-color': color }}
            />
            <span className="emotion-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionTracker;