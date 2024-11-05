import React, { useState, useEffect } from 'react';
import ApiKeyForm from './ApiKeyForm';
import CharacterGenerator from './character/CharacterGenerator';
import StoryEditorSidebar from './sidebar/StoryEditorSidebar';

const AppContent = () => {
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyEntered, setIsApiKeyEntered] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeyEntered(true);
    }
  }, []);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim().startsWith('sk-')) {
      localStorage.setItem('apiKey', apiKey);
      setIsApiKeyEntered(true);
    } else {
      alert('有効なAPIキーを入力してください。APIキーは"sk-"で始まる必要があります。');
    }
  };

  if (!isApiKeyEntered) {
    return (
      <div className="App">
        <h1>AI物語ジェネレーター</h1>
        <ApiKeyForm 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          onSubmit={handleApiKeySubmit} 
        />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>AI物語ジェネレーター</h1>
      <CharacterGenerator apiKey={apiKey} />
      <StoryEditorSidebar apiKey={apiKey} />
    </div>
  );
};

export default AppContent;