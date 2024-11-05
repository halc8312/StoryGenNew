import React, { useState } from 'react';
import { useStoryHistory } from '../../contexts/StoryHistoryContext';
import { useCharacter } from '../../contexts/CharacterContext';
import { usePlotline } from '../../contexts/PlotlineContext';
import StoryDisplay from './StoryDisplay';
import StoryControls from './StoryControls';
import TemplateSelector from './TemplateSelector';
import { generateStoryWithAPI, generateContinuationWithAPI } from '../../utils/apiHelpers';
import ErrorMessage from '../common/ErrorMessage';
import LoadingButton from '../common/LoadingButton';
import './StoryGenerator.css';

const StoryGenerator = ({ apiKey }) => {
  const { addToHistory, setCurrentStory, currentStory } = useStoryHistory();
  const { selectedCharacters } = useCharacter();
  const { plotlines } = usePlotline();
  
  // Story generation options
  const [selectedGenre, setSelectedGenre] = useState('ファンタジー');
  const [selectedLength, setSelectedLength] = useState('短編（5000字以内）');
  const [selectedStructure, setSelectedStructure] = useState('起承転結');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Story continuation options
  const [selectedStyle, setSelectedStyle] = useState('アクション重視');
  const [selectedTheme, setSelectedTheme] = useState('サプライズ展開');
  const [selectedPerspective, setSelectedPerspective] = useState('第三人称視点');
  const [selectedCharacterAction, setSelectedCharacterAction] = useState('新しい冒険に出る');
  const [considerPlotlines, setConsiderPlotlines] = useState(false);
  const [selectedPlotlines, setSelectedPlotlines] = useState([]);

  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 現在のストーリーが変更されたら、表示も更新
  React.useEffect(() => {
    if (currentStory !== story) {
      setStory(currentStory);
    }
  }, [currentStory]);

  const generateStory = async () => {
    if (!apiKey) {
      setError('APIキーが設定されていません');
      return;
    }

    if (selectedCharacters.length === 0) {
      setError('少なくとも1人のキャラクターを選択してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const characterInfo = selectedCharacters.map(char => ({
        name: char.name,
        description: char.details,
        personality: char.personality,
        background: char.background,
        emotions: char.emotions,
        stats: char.stats
      }));

      const prompt = `
        ジャンル: ${selectedGenre}
        長さ: ${selectedLength}
        構造: ${selectedStructure}
        テンプレート: ${selectedTemplate ? `${selectedTemplate.theme} - ${selectedTemplate.setting}` : 'なし'}

        キャラクター情報:
        ${characterInfo.map(char => `
          名前: ${char.name}
          性格: ${char.personality}
          背景: ${char.background}
          詳細: ${char.description}
          
          現在の状態:
          - 体力: ${char.stats.health}%
          - 精神力: ${char.stats.mental}%
          - 疲労度: ${char.stats.fatigue}%
          
          感情状態:
          ${Object.entries(char.emotions || {}).map(([emotion, intensity]) => {
            const emotionLabels = {
              happy: '喜び',
              sad: '悲しみ',
              angry: '怒り',
              fear: '恐れ',
              surprise: '驚き',
              disgust: '嫌悪',
              trust: '信頼',
              anticipation: '期待'
            };
            const intensityLabels = ['なし', '弱い', '中程度', '強い'];
            return `${emotionLabels[emotion]}: ${intensityLabels[intensity]}`;
          }).join('\n          ')}
        `).join('\n\n')}

        以上の設定とキャラクターを使用して、各キャラクターの現在の感情状態や体力・精神状態を考慮した魅力的な物語を作成してください。
      `;

      const generatedStory = await generateStoryWithAPI(apiKey, prompt);
      setStory(generatedStory);
      setCurrentStory(generatedStory);
      addToHistory(generatedStory);
    } catch (error) {
      console.error('物語の生成中にエラーが発生しました:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContinuation = async () => {
    if (!apiKey || !story) {
      setError('APIキーまたは物語が設定されていません。');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const characterInfo = selectedCharacters.map(char => ({
        name: char.name,
        emotions: char.emotions,
        stats: char.stats
      }));

      const selectedPlotlinesInfo = considerPlotlines 
        ? plotlines
          .filter(p => selectedPlotlines.includes(p.id))
          .map(p => `- ${p.title}: ${p.description} (${p.hints})`)
          .join('\n')
        : '';

      const continuationPrompt = `
        スタイル: ${selectedStyle}
        テーマ: ${selectedTheme}
        視点: ${selectedPerspective}
        キャラクターの行動: ${selectedCharacterAction}

        キャラクター情報:
        ${characterInfo.map(char => `
          ${char.name}の現在の状態:
          - 体力: ${char.stats.health}%
          - 精神力: ${char.stats.mental}%
          - 疲労度: ${char.stats.fatigue}%
          
          感情状態:
          ${Object.entries(char.emotions || {}).map(([emotion, intensity]) => {
            const emotionLabels = {
              happy: '喜び',
              sad: '悲しみ',
              angry: '怒り',
              fear: '恐れ',
              surprise: '驚き',
              disgust: '嫌悪',
              trust: '信頼',
              anticipation: '期待'
            };
            const intensityLabels = ['なし', '弱い', '中程度', '強い'];
            return `${emotionLabels[emotion]}: ${intensityLabels[intensity]}`;
          }).join('\n          ')}
        `).join('\n')}

        ${considerPlotlines ? `\n選択された伏線:\n${selectedPlotlinesInfo}` : ''}
        ${considerPlotlines ? '\n※上記の伏線を自然な形で物語に組み込んでください。' : ''}

        各キャラクターの現在の感情状態や体力・精神状態を考慮して、自然な展開を心がけてください。
      `;

      const continuation = await generateContinuationWithAPI(apiKey, story, continuationPrompt);
      const newStory = `${story}\n\n${continuation}`;
      setStory(newStory);
      setCurrentStory(newStory);
      addToHistory(newStory);
    } catch (error) {
      console.error('続きの生成中にエラーが発生しました:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveStory = () => {
    const blob = new Blob([story], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'story.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="story-generator">
      <div className="story-controls">
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
          setSelectedTemplate={setSelectedTemplate}
        />

        <LoadingButton
          onClick={generateStory}
          isLoading={isLoading}
          text="物語を生成"
          loadingText="生成中..."
        />
      </div>

      {error && <ErrorMessage error={error} />}

      {story && (
        <StoryDisplay
          story={story}
          isLoading={isLoading}
          onSave={saveStory}
          onGenerateContinuation={generateContinuation}
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
          setStory={setStory}
        />
      )}
    </div>
  );
};

export default StoryGenerator;