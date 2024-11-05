import React, { useState } from 'react';
import './App.css';
import { CharacterProvider } from './contexts/CharacterContext';
import { StoryHistoryProvider } from './contexts/StoryHistoryContext';
import { PlotlineProvider } from './contexts/PlotlineContext';
import AppContent from './components/AppContent';

function App() {
  return (
    <CharacterProvider>
      <StoryHistoryProvider>
        <PlotlineProvider>
          <AppContent />
        </PlotlineProvider>
      </StoryHistoryProvider>
    </CharacterProvider>
  );
}

export default App;