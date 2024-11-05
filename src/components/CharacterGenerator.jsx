import React, { useState } from 'react';
import axios from 'axios';
import { useCharacter } from '../contexts/CharacterContext';

const personalityTraits = [
  '勇敢', '臆病', '賢明', '無知', '親切', '冷酷', '楽観的', '悲観的',
  '誠実', '不誠実', '忠実', '裏切り者', '冒険好き', '慎重', '創造的', '保守的'
];

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
      <div className="form-group">
        <label htmlFor="name">名前:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="キャラクターの名前"
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">年齢:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="年齢"
          min="0"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gender">性別:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">性別を選択</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="occupation">職業:</label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          placeholder="職業"
        />
      </div>

      <div className="form-group">
        <label htmlFor="personality">性格:</label>
        <select
          id="personality"
          name="personality"
          value={formData.personality}
          onChange={handleInputChange}
        >
          <option value="">性格を選択</option>
          {personalityTraits.map(trait => (
            <option key={trait} value={trait}>{trait}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="background">背景:</label>
        <textarea
          id="background"
          name="background"
          value={formData.background}
          onChange={handleInputChange}
          placeholder="キャラクターの背景"
          rows="4"
        />
      </div>

      <button 
        onClick={generateCharacter} 
        disabled={isLoading}
        className="generate-button"
      >
        {isLoading ? 'キャラクター生成中...' : 'キャラクターを生成'}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CharacterGenerator;