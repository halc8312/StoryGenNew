import React, { useState } from 'react';
import axios from 'axios';
import { useCharacter } from '../../contexts/CharacterContext';
import CharacterForm from './CharacterForm';
import ErrorMessage from '../common/ErrorMessage';
import LoadingButton from '../common/LoadingButton';

const CharacterGenerator = ({ apiKey }) => {
  const { addCharacter } = useCharacter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    personality: '',
    background: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateCharacter = async () => {
    if (!apiKey) {
      setError('APIキーが設定されていません。');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "あなたは創造的なキャラクター設定の専門家です。与えられた情報を基に、詳細なキャラクター設定を生成してください。"
            },
            {
              role: "user",
              content: `名前: ${formData.name}
年齢: ${formData.age}
性別: ${formData.gender}
職業: ${formData.occupation}
性格: ${formData.personality}
背景: ${formData.background}

この情報を基に、詳細なキャラクター設定を生成してください。キャラクターの特徴、動機、目標、人間関係、特殊能力（もしあれば）などを含めてください。`
            }
          ],
          max_tokens: 1500,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const generatedCharacter = {
        ...formData,
        details: response.data.choices[0].message.content.trim()
      };

      addCharacter(generatedCharacter);
      setFormData({
        name: '',
        age: '',
        gender: '',
        occupation: '',
        personality: '',
        background: ''
      });
    } catch (error) {
      console.error('キャラクター生成中にエラーが発生しました:', error);
      setError(
        error.response?.data?.error?.message || 
        'キャラクターの生成中にエラーが発生しました。もう一度お試しください。'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="character-generator">
      <h2>キャラクター生成</h2>
      <CharacterForm 
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <LoadingButton 
        onClick={generateCharacter}
        isLoading={isLoading}
        text="キャラクターを生成"
        loadingText="キャラクター生成中..."
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export default CharacterGenerator;