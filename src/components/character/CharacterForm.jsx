import React from 'react';
import { personalityTraits } from '../../constants/characterOptions';

const CharacterForm = ({ formData, handleInputChange }) => {
  return (
    <>
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
    </>
  );
};

export default CharacterForm;