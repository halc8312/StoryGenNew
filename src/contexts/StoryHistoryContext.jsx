import React, { createContext, useContext, useState } from 'react';

const StoryHistoryContext = createContext();

export const StoryHistoryProvider = ({ children }) => {
  const [storyHistory, setStoryHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentStory, setCurrentStory] = useState('');

  const addToHistory = (story) => {
    const newHistory = [...storyHistory.slice(0, currentIndex + 1), story];
    setStoryHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setCurrentStory(story);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const previousStory = storyHistory[currentIndex - 1];
      setCurrentStory(previousStory);
      return previousStory;
    }
    return null;
  };

  const redo = () => {
    if (currentIndex < storyHistory.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextStory = storyHistory[currentIndex + 1];
      setCurrentStory(nextStory);
      return nextStory;
    }
    return null;
  };

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < storyHistory.length - 1;

  return (
    <StoryHistoryContext.Provider value={{
      addToHistory,
      undo,
      redo,
      canUndo,
      canRedo,
      currentStory,
      setCurrentStory
    }}>
      {children}
    </StoryHistoryContext.Provider>
  );
};

export const useStoryHistory = () => useContext(StoryHistoryContext);