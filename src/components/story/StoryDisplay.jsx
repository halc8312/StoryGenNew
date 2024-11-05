import React, { useState } from 'react';
import StoryContinuationOptions from './StoryContinuationOptions';
import LoadingButton from '../common/LoadingButton';
import { usePlotline } from '../../contexts/PlotlineContext';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';

const StoryDisplay = ({ 
  story, 
  isLoading, 
  onSave, 
  onGenerateContinuation,
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
  setStory
}) => {
  const { plotlines } = usePlotline();
  const { addToHistory } = useStoryHistory();
  const [selectedText, setSelectedText] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText) {
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(range.startContainer.parentElement);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      
      setSelectedText(selectedText);
      setSelectionStart(preSelectionRange.toString().length);
      setSelectionEnd(preSelectionRange.toString().length + selectedText.length);
    } else {
      setSelectedText('');
      setSelectionStart(0);
      setSelectionEnd(0);
    }
  };

  const handleDeleteSelection = () => {
    if (selectedText && window.confirm('選択したテキストを削除してもよろしいですか？')) {
      const newStory = story.substring(0, selectionStart) + story.substring(selectionEnd);
      setStory(newStory);
      addToHistory(newStory);
      setSelectedText('');
    }
  };

  return story ? (
    <div className="story">
      <h2>生成された物語（テキスト選択すると削除できます）：</h2>
      <div 
        className="story-content" 
        onMouseUp={handleTextSelection}
      >
        <p>{story}</p>
      </div>

      {selectedText && (
        <div className="selection-controls">
          <p>選択されたテキスト:</p>
          <blockquote className="selected-text">{selectedText}</blockquote>
          <button 
            onClick={handleDeleteSelection}
            className="delete-selection-button"
          >
            選択部分を削除
          </button>
        </div>
      )}

      <div className="story-actions">
        <button 
          onClick={onSave} 
          className="save-button"
          disabled={isLoading}
        >
          物語を保存
        </button>
      </div>

      <h3>続きのオプションを選択してください：</h3>
      <StoryContinuationOptions
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        selectedPerspective={selectedPerspective}
        setSelectedPerspective={setSelectedPerspective}
        selectedCharacterAction={selectedCharacterAction}
        setSelectedCharacterAction={setSelectedCharacterAction}
        considerPlotlines={considerPlotlines}
        setConsiderPlotlines={setConsiderPlotlines}
        selectedPlotlines={selectedPlotlines}
        setSelectedPlotlines={setSelectedPlotlines}
        plotlines={plotlines}
      />

      <LoadingButton
        onClick={onGenerateContinuation}
        isLoading={isLoading}
        text="続きを生成"
        loadingText="生成中..."
        className="generate-continuation-button"
      />
    </div>
  ) : null;
};

export default StoryDisplay;