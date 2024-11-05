import React, { useState } from 'react';
import { structures } from '../../constants/storyOptions';

const StoryStructureSelect = ({ selectedStructure, setSelectedStructure }) => {
  const [customStructure, setCustomStructure] = useState('');
  const [showCustomStructure, setShowCustomStructure] = useState(false);

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

  const handleCustomStructureChange = (e) => {
    const value = e.target.value;
    setCustomStructure(value);
    setSelectedStructure(value);
  };

  return (
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
  );
};

export default StoryStructureSelect;