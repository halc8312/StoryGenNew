import React from 'react';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import LoadingButton from '../common/LoadingButton';

const StoryContinuationControls = ({ 
  onGenerateContinuation, 
  isLoading,
  onSave,
  onUndo,
  onRedo
}) => {
  const { canUndo, canRedo } = useStoryHistory();

  return (
    <div className="story-continuation-controls">
      <div className="button-group">
        <LoadingButton
          onClick={onGenerateContinuation}
          isLoading={isLoading}
          text="続きを生成"
          loadingText="生成中..."
        />
        <button 
          onClick={onSave} 
          className="save-button"
          disabled={isLoading}
        >
          物語を保存
        </button>
      </div>
      
      <div className="history-controls">
        <button
          onClick={onUndo}
          disabled={!canUndo || isLoading}
          className="history-button"
        >
          前の展開に戻る
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || isLoading}
          className="history-button"
        >
          次の展開に進む
        </button>
      </div>
    </div>
  );
};

export default StoryContinuationControls;