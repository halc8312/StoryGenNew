import React, { createContext, useState, useContext } from 'react';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const addCharacter = (character) => {
    const newCharacter = {
      ...character,
      id: Date.now().toString(),
      stats: {
        health: 100,
        mental: 100,
        fatigue: 0
      },
      emotions: {}
    };
    setCharacters([...characters, newCharacter]);
  };

  const updateCharacterEmotion = (characterId, emotionId, intensity) => {
    setCharacters(prevCharacters => 
      prevCharacters.map(char => 
        char.id === characterId
          ? {
              ...char,
              emotions: {
                ...char.emotions,
                [emotionId]: intensity
              }
            }
          : char
      )
    );
  };

  return (
    <CharacterContext.Provider value={{ 
      characters, 
      selectedCharacters,
      setSelectedCharacters,
      addCharacter,
      updateCharacterEmotion
    }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);