import React from 'react';
import { useCharacter } from '../contexts/CharacterContext';

const CharacterList = ({ onCharacterSelect, selectedCharacters }) => {
  const { characters } = useCharacter();

  return (
    <div className="character-list">
      <h2>生成されたキャラクター</h2>
      {characters.map((character, index) => (
        <div 
          key={index} 
          className={`character-item ${selectedCharacters.includes(character) ? 'selected' : ''}`}
        >
          <h3>{character.name}</h3>
          <div className="character-details">
            <p><strong>年齢:</strong> {character.age}</p>
            <p><strong>性別:</strong> {character.gender}</p>
            <p><strong>職業:</strong> {character.occupation}</p>
            <p><strong>性格:</strong> {character.personality}</p>
            {character.background && (
              <p><strong>背景:</strong> {character.background}</p>
            )}
            <p><strong>詳細:</strong> {character.details}</p>
          </div>
          <button onClick={() => onCharacterSelect(character)}>
            {selectedCharacters.includes(character) ? 'キャラクターの選択を解除' : 'キャラクターを選択'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;