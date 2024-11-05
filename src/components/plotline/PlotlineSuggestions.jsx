import React, { useState, useEffect } from 'react';
import { generatePlotlinesWithAPI } from '../../utils/plotlineHelpers';
import LoadingButton from '../common/LoadingButton';
import ErrorMessage from '../common/ErrorMessage';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import { useCharacter } from '../../contexts/CharacterContext';

const PlotlineSuggestions = ({ onClose, onAddPlotline }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentStory } = useStoryHistory();
  const { characters } = useCharacter();

  const fetchSuggestions = async () => {
    // APIキーはAppContent.jsxから渡されているはずなので、
    // StoryEditorSidebarを経由して取得する必要があります
    const apiKey = localStorage.getItem('apiKey');

    if (!apiKey || !currentStory) {
      setError('APIキーまたは物語が設定されていません');
      console.log('API Key:', apiKey);
      console.log('Current Story:', currentStory);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const plotlines = await generatePlotlinesWithAPI(apiKey, currentStory, characters);
      setSuggestions(plotlines);
    } catch (err) {
      setError('伏線の提案生成中にエラーが発生しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlotline = (plotline) => {
    onAddPlotline(plotline);
    setSuggestions(prev => prev.filter(p => p.title !== plotline.title));
  };

  return (
    <div className="plotline-suggestions">
      <div className="suggestions-header">
        <h3>伏線の提案</h3>
        <LoadingButton
          onClick={fetchSuggestions}
          isLoading={isLoading}
          text="新しい提案を取得"
          loadingText="提案を生成中..."
        />
      </div>

      {error && <ErrorMessage error={error} />}

      <div className="suggestions-list">
        {suggestions.map((plotline, index) => (
          <div key={`${plotline.title}-${index}`} className="suggestion-item">
            <div className="suggestion-content">
              <h4>{plotline.title}</h4>
              <p>{plotline.description}</p>
              <div className="suggestion-details">
                <span>種類: {plotline.type}</span>
                <span>重要度: {plotline.importance}</span>
                <span>目標回収: {plotline.targetChapter}</span>
              </div>
              <div className="suggestion-hints">
                <p><strong>ヒント:</strong> {plotline.hints}</p>
              </div>
            </div>
            <button
              onClick={() => handleAddPlotline(plotline)}
              className="add-plotline-button"
            >
              この伏線を追加
            </button>
          </div>
        ))}
      </div>

      {suggestions.length === 0 && !isLoading && (
        <p className="no-suggestions">
          提案を取得するには「新しい提案を取得」ボタンをクリックしてください
        </p>
      )}
    </div>
  );
};

export default PlotlineSuggestions;