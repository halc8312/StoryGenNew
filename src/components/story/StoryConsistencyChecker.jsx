import React, { useState } from 'react';
import LoadingButton from '../common/LoadingButton';
import ErrorMessage from '../common/ErrorMessage';
import { checkStoryConsistency, applyConsistencyFix } from '../../utils/apiHelpers';

const StoryConsistencyChecker = ({ story, apiKey, characters, onStoryUpdate }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [consistencyReport, setConsistencyReport] = useState(null);
  const [error, setError] = useState('');
  const [isApplyingFix, setIsApplyingFix] = useState(false);

  const handleConsistencyCheck = async () => {
    if (!apiKey || !story) {
      setError('APIキーまたは物語が設定されていません');
      return;
    }

    setIsChecking(true);
    setError('');
    try {
      const report = await checkStoryConsistency(apiKey, story, characters);
      setConsistencyReport(report);
    } catch (err) {
      setError('一貫性チェック中にエラーが発生しました');
      console.error(err);
    }
    setIsChecking(false);
  };

  const handleApplyFix = async (issue) => {
    setIsApplyingFix(true);
    setError('');
    try {
      const updatedStory = await applyConsistencyFix(apiKey, story, issue);
      onStoryUpdate(updatedStory);
      // 修正後に一貫性レポートをクリア
      setConsistencyReport(null);
    } catch (err) {
      setError('修正の適用中にエラーが発生しました');
      console.error(err);
    }
    setIsApplyingFix(false);
  };

  return (
    <div className="story-consistency-checker">
      <LoadingButton
        onClick={handleConsistencyCheck}
        isLoading={isChecking}
        text="一貫性をチェック"
        loadingText="チェック中..."
      />
      
      {consistencyReport && (
        <div className="consistency-report">
          <h3>一貫性チェックレポート</h3>
          <p className="report-summary">{consistencyReport.summary}</p>
          
          {consistencyReport.issues.length > 0 ? (
            <div className="issues-list">
              {consistencyReport.issues.map((issue, index) => (
                <div key={index} className={`issue-item severity-${issue.severity}`}>
                  <div className="issue-header">
                    <span className="issue-type">{issue.type}</span>
                    <span className="issue-severity">{issue.severity}</span>
                  </div>
                  <p className="issue-description">{issue.description}</p>
                  <p className="issue-suggestion">{issue.suggestion}</p>
                  <p className="issue-location">{issue.location}</p>
                  <LoadingButton
                    onClick={() => handleApplyFix(issue)}
                    isLoading={isApplyingFix}
                    text="この修正を適用"
                    loadingText="修正を適用中..."
                    className="apply-fix-button"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-issues">一貫性の問題は見つかりませんでした。</p>
          )}
        </div>
      )}
      
      <ErrorMessage error={error} />
    </div>
  );
};

export default StoryConsistencyChecker;