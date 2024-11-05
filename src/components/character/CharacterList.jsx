import React from 'react';
import { useCharacter } from '../../contexts/CharacterContext';
import CharacterStatus from './CharacterStatus';
import './CharacterList.css';

const CharacterList = () => {
  const { characters, updateCharacterEmotion, selectedCharacters, setSelectedCharacters } = useCharacter();

  const handleCharacterSelect = (character) => {
    setSelectedCharacters(prev => {
      if (prev.find(c => c.id === character.id)) {
        return prev.filter(c => c.id !== character.id);
      }
      return [...prev, character];
    });
  };

  return (
    <div className="character-list-container">
      <div className="character-list-header">
        <h3>登場キャラクター</h3>
        <div className="selected-count">
          選択中: {selectedCharacters.length}人
        </div>
      </div>
      <div className="character-list">
        {characters.map((character) => (
          <CharacterStatus 
            key={character.id}
            character={character}
            onEmotionChange={updateCharacterEmotion}
            onSelect={handleCharacterSelect}
            isSelected={selectedCharacters.some(c => c.id === character.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;