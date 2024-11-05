import React from 'react';
import StoryOptions from './StoryOptions';

const StoryDisplay = ({ 
  story, 
  isLoading, 
  onSave, 
  onGenerateContinuation,
  storyOptionsProps
}) => {
  return story ? (
    <div className="story">
      <h2>生成された物語：</h2>
      <p>{story}</p>
      <button onClick={onSave}>物語を保存</button>
      <h3>続きのオプションを選択してください：</h3>
      <StoryOptions {...storyOptionsProps} />
      <button onClick={onGenerateContinuation} disabled={isLoading}>
        {isLoading ? '生成中...' : '続きを生成'}
      </button>
    </div>
  ) : null;
};

export default StoryDisplay;