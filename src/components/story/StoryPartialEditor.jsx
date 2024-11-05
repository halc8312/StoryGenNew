import React, { useState } from 'react';
import LoadingButton from '../common/LoadingButton';
import ErrorMessage from '../common/ErrorMessage';
import { modifyStoryPart } from '../../utils/apiHelpers';

const StoryPartialEditor = ({ story, apiKey, onUpdate }) => {
  const [selectedText, setSelectedText] = useState('');
  const [editType, setEditType] = useState('style');
  const [customInstruction, setCustomInstruction] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
    }
  };

  const handleEdit = async () => {
    if (!selectedText) {
      setError('編集するテキストを選択してください。');
      return;
    }

    setIsEditing(true);
    setError('');

    try {
      const modifiedStory = await modifyStoryPart({
        story,
        selectedText,
        editType,
        customInstruction,
        apiKey
      });
      onUpdate(modifiedStory);
      setSelectedText('');
      setCustomInstruction('');
    } catch (err) {
      setError('テキストの修正中にエラーが発生しました。');
      console.error(err);
    }
    setIsEditing(false);
  };

  return (
    <div className="story-partial-editor">
      <div className="editor-controls">
        <select
          value={editType}
          onChange={(e) => setEditType(e.target.value)}
          className="edit-type-select"
        >
          <option value="style">文体の調整</option>
          <option value="detail">詳細の追加</option>
          <option value="tone">トーンの変更</option>
          <option value="custom">カスタム修正</option>
        </select>

        {editType === 'custom' && (
          <textarea
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
            placeholder="修正の指示を入力してください"
            className="custom-instruction"
          />
        )}

        <LoadingButton
          onClick={handleEdit}
          isLoading={isEditing}
          text="選択部分を修正"
          loadingText="修正中..."
          disabled={!selectedText}
        />
      </div>

      <div 
        className="story-text-selection"
        onMouseUp={handleTextSelection}
      >
        <p>{story}</p>
      </div>

      {selectedText && (
        <div className="selected-text-info">
          <p>選択されたテキスト:</p>
          <blockquote>{selectedText}</blockquote>
        </div>
      )}

      <ErrorMessage error={error} />
    </div>
  );
};

export default StoryPartialEditor;