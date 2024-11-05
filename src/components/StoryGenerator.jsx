import React from 'react';
import StoryControls from './StoryControls';
import TemplateSelector from './TemplateSelector';
import StoryDisplay from './StoryDisplay';
import { generateStoryWithAPI, generateContinuationWithAPI } from '../utils/apiHelpers';

const StoryGenerator = ({
  apiKey,
  selectedCharacters,
  selectedGenre,
  setSelectedGenre,
  selectedLength,
  setSelectedLength,
  selectedStructure,
  setSelectedStructure,
  selectedStyle,
  setSelectedStyle,
  selectedTheme,
  setSelectedTheme,
  selectedPerspective,
  setSelectedPerspective,
  selectedCharacterAction,
  setSelectedCharacterAction,
  selectedTemplate,
  setSelectedTemplate,
  story,
  setStory,
  isLoading,
  setIsLoading,
  error,
  setError
}) => {
  const generateStory = async () => {
    if (!apiKey) {
      alert('APIキーが設定されていません。');
      return;
    }

    if (!selectedTemplate) {
      alert('テンプレートを選択してください。');
      return;
    }

    setIsLoading(true);
    setStory('');
    setError('');

    try {
      const newStory = await generateStoryWithAPI({
        apiKey,
        selectedGenre,
        selectedLength,
        selectedStructure,
        selectedTemplate,
        selectedCharacters
      });
      setStory(newStory);
    } catch (error) {
      console.error('物語の生成中にエラーが発生しました:', error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  const generateContinuation = async () => {
    if (!apiKey) {
      alert('APIキーが設定されていません。');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const continuation = await generateContinuationWithAPI({
        apiKey,
        story,
        selectedStyle,
        selectedTheme,
        selectedPerspective,
        selectedStructure,
        selectedCharacters,
        selectedCharacterAction
      });
      setStory((prevStory) => prevStory + '\n\n' + continuation);
    } catch (error) {
      console.error('物語の続き生成中にエラーが発生しました:', error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  const saveStory = () => {
    const blob = new Blob([story], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'story.txt';
    link.click();
  };

  return (
    <div className="story-generator">
      <StoryControls
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLength={selectedLength}
        setSelectedLength={setSelectedLength}
        selectedStructure={selectedStructure}
        setSelectedStructure={setSelectedStructure}
      />

      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onTemplateSelect={setSelectedTemplate}
      />

      <button onClick={generateStory} disabled={isLoading}>
        {isLoading ? '生成中...' : '物語を生成'}
      </button>

      <StoryDisplay
        story={story}
        isLoading={isLoading}
        onSave={saveStory}
        onGenerateContinuation={generateContinuation}
        storyOptionsProps={{
          selectedStyle,
          setSelectedStyle,
          selectedTheme,
          setSelectedTheme,
          selectedPerspective,
          setSelectedPerspective,
          selectedCharacterAction,
          setSelectedCharacterAction
        }}
      />

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default StoryGenerator;