import React from 'react';
import { styles, themesForContinuation, perspectives, characterActions } from '../constants/storyOptions';

const StoryOptions = ({
  selectedStyle,
  setSelectedStyle,
  selectedTheme,
  setSelectedTheme,
  selectedPerspective,
  setSelectedPerspective,
  selectedCharacterAction,
  setSelectedCharacterAction
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="style">続きのスタイル：</label>
        <select id="style" value={selectedStyle} onChange={(e) => setSelectedStyle(e.target.value)}>
          {styles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="continuationTheme">続きのテーマ：</label>
        <select id="continuationTheme" value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
          {themesForContinuation.map((theme) => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="perspective">続きの視点：</label>
        <select id="perspective" value={selectedPerspective} onChange={(e) => setSelectedPerspective(e.target.value)}>
          {perspectives.map((perspective) => (
            <option key={perspective} value={perspective}>{perspective}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="characterAction">キャラクターの行動：</label>
        <select id="characterAction" value={selectedCharacterAction} onChange={(e) => setSelectedCharacterAction(e.target.value)}>
          {characterActions.map((action) => (
            <option key={action} value={action}>{action}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default StoryOptions;