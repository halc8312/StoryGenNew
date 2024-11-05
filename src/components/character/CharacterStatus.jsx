import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import EmotionTracker from './EmotionTracker';
import './CharacterStatus.css';

const CharacterStatus = ({ character, onEmotionChange, onSelect, isSelected }) => {
  return (
    <div className={`character-status ${isSelected ? 'selected' : ''}`}>
      <div className="character-header">
        <h4>{character.name}</h4>
        <div className="character-actions">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="details-button">詳細</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="character-dialog-overlay" />
              <Dialog.Content className="character-dialog-content">
                <Dialog.Title className="character-dialog-title">
                  {character.name}の詳細情報
                </Dialog.Title>
                <div className="character-dialog-body">
                  <div className="info-group">
                    <h5>基本情報</h5>
                    <div className="info-row">
                      <label>年齢:</label>
                      <span>{character.age}歳</span>
                    </div>
                    <div className="info-row">
                      <label>性別:</label>
                      <span>{character.gender}</span>
                    </div>
                    <div className="info-row">
                      <label>職業:</label>
                      <span>{character.occupation}</span>
                    </div>
                    <div className="info-row">
                      <label>性格:</label>
                      <span>{character.personality}</span>
                    </div>
                  </div>
                  <div className="info-group">
                    <h5>詳細設定</h5>
                    <p className="character-details-text">{character.details}</p>
                  </div>
                  <div className="info-group">
                    <h5>背景</h5>
                    <p className="character-background-text">{character.background}</p>
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button className="dialog-close-button">閉じる</button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <button 
            className={`select-button ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(character)}
          >
            {isSelected ? '選択解除' : '選択'}
          </button>
        </div>
      </div>
      
      <div className="character-info">
        <div className="info-row">
          <label>職業:</label>
          <span>{character.occupation}</span>
        </div>
        <div className="info-row">
          <label>性格:</label>
          <span>{character.personality}</span>
        </div>
      </div>

      <div className="character-stats">
        <div className="stat-group">
          <h5>現在の状態</h5>
          <div className="stat-bars">
            <div className="stat-bar">
              <label>体力</label>
              <div className="bar-container">
                <div 
                  className="bar-fill health" 
                  style={{ width: `${character.stats?.health ?? 100}%` }}
                />
              </div>
            </div>
            <div className="stat-bar">
              <label>精神力</label>
              <div className="bar-container">
                <div 
                  className="bar-fill mental" 
                  style={{ width: `${character.stats?.mental ?? 100}%` }}
                />
              </div>
            </div>
            <div className="stat-bar">
              <label>疲労度</label>
              <div className="bar-container">
                <div 
                  className="bar-fill fatigue" 
                  style={{ width: `${character.stats?.fatigue ?? 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmotionTracker 
        character={character}
        onEmotionChange={(emotionId, intensity) => 
          onEmotionChange(character.id, emotionId, intensity)
        }
      />
    </div>
  );
};

export default CharacterStatus;