import React, { useState } from 'react';
import { genres } from '../../constants/storyOptions';

const StoryGenreSelect = ({ selectedGenre, setSelectedGenre }) => {
  const [customGenre, setCustomGenre] = useState('');
  const [showCustomGenre, setShowCustomGenre] = useState(false);

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

  const handleCustomGenreChange = (e) => {
    const value = e.target.value;
    setCustomGenre(value);
    setSelectedGenre(value);
  };

  return (
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
  );
};

export default StoryGenreSelect;