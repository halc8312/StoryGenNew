import React, { useState } from 'react';
import { checkStoryConsistency, modifyStoryPart } from '../../utils/apiHelpers';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import LoadingButton from '../common/LoadingButton';
import ErrorMessage from '../common/ErrorMessage';
import './ConsistencyChecker.css';

const ConsistencyChecker = ({ story, characters, plotlines, apiKey }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [issues, setIssues] = useState(null);
  const [error, setError] = useState('');
  const { addToHistory, setCurrentStory } = useStoryHistory();

  const handleCheck = async () => {
    if (!apiKey || !story) {
      setError('APIキーまたは物語が設定されていません');
      return;
    }

    setIsChecking(true);
    setError('');

    try {
      const result = await checkStoryConsistency(apiKey, story, characters, plotlines);
      setIssues(result.issues);
    } catch (err) {
      setError('一貫性チェック中にエラーが発生しました');
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleFix = async (issue) => {
    if (!apiKey) {
      setError('APIキーが設定されていません');
      return;
    }

    if (!window.confirm('提案された修正を適用しますか？\n\n修正内容:\n' + issue.suggestion)) {
      return;
    }

    setIsFixing(true);
    setError('');

    try {
      const modifiedStory = await modifyStoryPart({
        apiKey,
        story,
        selectedText: issue.location,
        editType: 'consistency',
        customInstruction: issue.suggestion
      });
      
      // 修正後のストーリーを更新
      setCurrentStory(modifiedStory);
      addToHistory(modifiedStory);

      // 修正後に再度一貫性チェックを実行
      const result = await checkStoryConsistency(apiKey, modifiedStory, characters, plotlines);
      setIssues(result.issues);

      // 成功メッセージを表示
      alert('修正が適用されました');
    } catch (err) {
      setError('修正の適用中にエラーが発生しました: ' + err.message);
      console.error(err);
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="consistency-checker">
      <div className="checker-header">
        <h3>一貫性チェック</h3>
        <LoadingButton
          onClick={handleCheck}
          isLoading={isChecking}
          text="チェックを実行"
          loadingText="チェック中..."
        />
      </div>

      {error && <ErrorMessage error={error} />}

      {issues && issues.length > 0 ? (
        <div className="issues-list">
          {issues.map((issue, index) => (
            <div 
              key={index} 
              className={`issue-item severity-${issue.severity}`}
            >
              <div className="issue-header">
                <span className="issue-type">{issue.type}</span>
                <span className="issue-severity">{issue.severity}</span>
              </div>
              <p className="issue-description">{issue.description}</p>
              <p className="issue-suggestion">提案: {issue.suggestion}</p>
              <p className="issue-location">場所: {issue.location}</p>
              <button
                className="fix-button"
                onClick={() => handleFix(issue)}
                disabled={isFixing}
              >
                {isFixing ? '修正適用中...' : 'この提案を適用'}
              </button>
            </div>
          ))}
        </div>
      ) : issues && issues.length === 0 ? (
        <p className="no-issues">
          一貫性の問題は見つかりませんでした
        </p>
      ) : (
        <p className="no-issues">
          「チェックを実行」ボタンをクリックして物語の一貫性をチェックしてください
        </p>
      )}
    </div>
  );
};

export default ConsistencyChecker;