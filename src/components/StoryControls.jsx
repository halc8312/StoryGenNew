import React, { useState } from 'react';
import { genres, lengths, structures } from '../constants/storyOptions';

const StoryControls = ({ 
  selectedGenre, 
  setSelectedGenre, 
  selectedLength, 
  setSelectedLength,
  selectedStructure,
  setSelectedStructure 
}) => {
  const [customGenre, setCustomGenre] = useState('');
  const [customLength, setCustomLength] = useState('');
  const [customStructure, setCustomStructure] = useState('');
  const [showCustomGenre, setShowCustomGenre] = useState(false);
  const [showCustomLength, setShowCustomLength] = useState(false);
  const [showCustomStructure, setShowCustomStructure] = useState(false);

  const handleGenreChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomGenre(true);
      setSelectedGenre(customGenre);
    } else {
      setShowCustomGenre(false);
      setSelectedGenre(value);
    }
  };

  const handleLengthChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomLength(true);
      setSelectedLength(customLength);
    } else {
      setShowCustomLength(false);
      setSelectedLength(value);
    }
  };

  const handleStructureChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomStructure(true);
      setSelectedStructure(customStructure);
    } else {
      setShowCustomStructure(false);
      setSelectedStructure(value);
    }
  };

  const handleCustomGenreChange = (e) => {
    const value = e.target.value;
    setCustomGenre(value);
    setSelectedGenre(value);
  };

  const handleCustomLengthChange = (e) => {
    const value = e.target.value;
    setCustomLength(value);
    setSelectedLength(value);
  };

  const handleCustomStructureChange = (e) => {
    const value = e.target.value;
    setCustomStructure(value);
    setSelectedStructure(value);
  };

  return (
    <div className="story-controls">
      <div className="form-group">
        <label htmlFor="genre">ジャンル：</label>
        <select 
          id="genre" 
          value={showCustomGenre ? 'custom' : selectedGenre}
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomGenre && (
          <input
            type="text"
            value={customGenre}
            onChange={handleCustomGenreChange}
            placeholder="ジャンルを入力"
            className="custom-input"
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="length">長さ：</label>
        <select 
          id="length" 
          value={showCustomLength ? 'custom' : selectedLength}
          onChange={handleLengthChange}
        >
          {lengths.map((length) => (
            <option key={length} value={length}>{length}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomLength && (
          <input
            type="text"
            value={customLength}
            onChange={handleCustomLengthChange}
            placeholder="長さを入力（例：2000文字）"
            className="custom-input"
          />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="structure">物語の構造：</label>
        <select 
          id="structure" 
          value={showCustomStructure ? 'custom' : selectedStructure}
          onChange={handleStructureChange}
        >
          {structures.map((structure) => (
            <option key={structure} value={structure}>{structure}</option>
          ))}
          <option value="custom">カスタム</option>
        </select>
        {showCustomStructure && (
          <input
            type="text"
            value={customStructure}
            onChange={handleCustomStructureChange}
            placeholder="物語の構造を入力"
            className="custom-input"
          />
        )}
      </div>
    </div>
  );
};

export default StoryControls;