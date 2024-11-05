import React, { useState } from 'react';
import { usePlotline } from '../../contexts/PlotlineContext';
import { useCharacter } from '../../contexts/CharacterContext';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import PlotlineForm from './PlotlineForm';
import PlotlineList from './PlotlineList';
import PlotlineSuggestions from './PlotlineSuggestions';
import PlotlineAnalysis from './PlotlineAnalysis';
import './PlotlineManager.css';

const PlotlineManager = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { plotlines, addPlotline } = usePlotline();
  const { characters } = useCharacter();
  const { currentStory } = useStoryHistory();

  return (
    <div className="plotline-manager">
      <div className="plotline-header">
        <h3>伏線管理</h3>
        <div className="plotline-actions">
          <button 
            className="suggest-plotlines-button"
            onClick={() => setShowSuggestions(true)}
            disabled={!currentStory}
          >
            AIで伏線を提案
          </button>
          <button 
            className="analyze-plotlines-button"
            onClick={() => setShowAnalysis(true)}
            disabled={!currentStory || plotlines.length === 0}
          >
            伏線を分析
          </button>
          <button 
            className="add-plotline-button"
            onClick={() => setIsFormVisible(true)}
          >
            新しい伏線を追加
          </button>
        </div>
      </div>

      {showSuggestions && (
        <PlotlineSuggestions
          onClose={() => setShowSuggestions(false)}
          onAddPlotline={addPlotline}
        />
      )}

      {showAnalysis && (
        <PlotlineAnalysis
          onClose={() => setShowAnalysis(false)}
        />
      )}

      {isFormVisible && (
        <PlotlineForm onClose={() => setIsFormVisible(false)} />
      )}

      <PlotlineList />
    </div>
  );
};

export default PlotlineManager;