import React, { useState } from 'react';
import { 
  styles, 
  themesForContinuation, 
  perspectives, 
  characterActions 
} from '../../constants/storyOptions';

const StoryContinuationOptions = ({
  selectedStyle,
  setSelectedStyle,
  selectedTheme,
  setSelectedTheme,
  selectedPerspective,
  setSelectedPerspective,
  selectedCharacterAction,
  setSelectedCharacterAction,
  considerPlotlines,
  setConsiderPlotlines,
  selectedPlotlines,
  setSelectedPlotlines,
  plotlines
}) => {
  const [customStyle, setCustomStyle] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [customPerspective, setCustomPerspective] = useState('');
  const [customAction, setCustomAction] = useState('');
  const [showCustomStyle, setShowCustomStyle] = useState(false);
  const [showCustomTheme, setShowCustomTheme] = useState(false);
  const [showCustomPerspective, setShowCustomPerspective] = useState(false);
  const [showCustomAction, setShowCustomAction] = useState(false);

  const handleStyleChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomStyle(true);
      setSelectedStyle(customStyle);
    } else {
      setShowCustomStyle(false);
      setSelectedStyle(value);
    }
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomTheme(true);
      setSelectedTheme(customTheme);
    } else {
      setShowCustomTheme(false);
      setSelectedTheme(value);
    }
  };

  const handlePerspectiveChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomPerspective(true);
      setSelectedPerspective(customPerspective);
    } else {
      setShowCustomPerspective(false);
      setSelectedPerspective(value);
    }
  };

  const handleActionChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomAction(true);
      setSelectedCharacterAction(customAction);
    } else {
      setShowCustomAction(false);
      setSelectedCharacterAction(value);
    }
  };

  return (
    <div className="story-continuation-options">
      <div className="form-group">
        <label htmlFor="style">続きのスタイル：</label>
        <select
          id="style"
          value={showCustomStyle ? 'custom' : selectedStyle}
          onChange={handleStyleChange}
        >
          {styles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomStyle && (
          <input
            type="text"
            value={customStyle}
            onChange={(e) => {
              setCustomStyle(e.target.value);
              setSelectedStyle(e.target.value);
            }}
            placeholder="スタイルを入力"
            className="custom-input"
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="theme">続きのテーマ：</label>
        <select
          id="theme"
          value={showCustomTheme ? 'custom' : selectedTheme}
          onChange={handleThemeChange}
        >
          {themesForContinuation.map((theme) => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomTheme && (
          <input
            type="text"
            value={customTheme}
            onChange={(e) => {
              setCustomTheme(e.target.value);
              setSelectedTheme(e.target.value);
            }}
            placeholder="テーマを入力"
            className="custom-input"
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="perspective">続きの視点：</label>
        <select
          id="perspective"
          value={showCustomPerspective ? 'custom' : selectedPerspective}
          onChange={handlePerspectiveChange}
        >
          {perspectives.map((perspective) => (
            <option key={perspective} value={perspective}>{perspective}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomPerspective && (
          <input
            type="text"
            value={customPerspective}
            onChange={(e) => {
              setCustomPerspective(e.target.value);
              setSelectedPerspective(e.target.value);
            }}
            placeholder="視点を入力"
            className="custom-input"
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="characterAction">キャラクターの行動：</label>
        <select
          id="characterAction"
          value={showCustomAction ? 'custom' : selectedCharacterAction}
          onChange={handleActionChange}
        >
          {characterActions.map((action) => (
            <option key={action} value={action}>{action}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomAction && (
          <input
            type="text"
            value={customAction}
            onChange={(e) => {
              setCustomAction(e.target.value);
              setSelectedCharacterAction(e.target.value);
            }}
            placeholder="行動を入力"
            className="custom-input"
          />
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={considerPlotlines}
            onChange={(e) => setConsiderPlotlines(e.target.checked)}
          />
          伏線を考慮する
        </label>
      </div>

      {considerPlotlines && plotlines.length > 0 && (
        <div className="form-group">
          <label>使用する伏線を選択：</label>
          <div className="plotline-selection">
            {plotlines.map((plotline) => (
              <label key={plotline.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedPlotlines.includes(plotline.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlotlines([...selectedPlotlines, plotline.id]);
                    } else {
                      setSelectedPlotlines(selectedPlotlines.filter(id => id !== plotline.id));
                    }
                  }}
                />
                {plotline.title}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryContinuationOptions;