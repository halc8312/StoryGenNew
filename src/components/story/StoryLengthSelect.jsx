import React, { useState } from 'react';
import { lengths } from '../../constants/storyOptions';

const StoryLengthSelect = ({ selectedLength, setSelectedLength }) => {
  const [customLength, setCustomLength] = useState('');
  const [showCustomLength, setShowCustomLength] = useState(false);

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

  const handleCustomLengthChange = (e) => {
    const value = e.target.value;
    setCustomLength(value);
    setSelectedLength(value);
  };

  return (
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
  );
};

export default StoryLengthSelect;