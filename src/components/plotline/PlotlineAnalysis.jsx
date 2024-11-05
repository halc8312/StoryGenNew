import React, { useState, useEffect } from 'react';
import { analyzePlotlineOpportunities } from '../../utils/plotlineHelpers';
import { usePlotline } from '../../contexts/PlotlineContext';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import LoadingButton from '../common/LoadingButton';
import ErrorMessage from '../common/ErrorMessage';

const PlotlineAnalysis = ({ onClose }) => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { plotlines } = usePlotline();
  const { currentStory } = useStoryHistory();

  const performAnalysis = async () => {
    const apiKey = localStorage.getItem('apiKey');
    
    if (!apiKey || !currentStory) {
      setError('APIキーまたは物語が設定されていません');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await analyzePlotlineOpportunities(apiKey, currentStory, plotlines);
      setAnalysis(result);
    } catch (err) {
      setError('伏線の分析中にエラーが発生しました');
      console.error('伏線分析エラー:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="plotline-analysis">
      <div className="analysis-header">
        <h3>伏線分析</h3>
        <LoadingButton
          onClick={performAnalysis}
          isLoading={isLoading}
          text="分析を実行"
          loadingText="分析中..."
        />
        <button className="close-button" onClick={onClose}>
          閉じる
        </button>
      </div>

      {error && <ErrorMessage error={error} />}

      {analysis && (
        <div className="analysis-content">
          {analysis.sections.map((section, index) => (
            <div key={index} className="analysis-section">
              <p>{section}</p>
            </div>
          ))}
        </div>
      )}

      {!analysis && !isLoading && !error && (
        <p className="no-analysis">
          「分析を実行」ボタンをクリックして伏線の分析を開始してください
        </p>
      )}
    </div>
  );
};

export default PlotlineAnalysis;