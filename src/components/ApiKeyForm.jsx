import React from 'react';

const ApiKeyForm = ({ apiKey, setApiKey, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="api-key-form">
      <div className="form-group">
        <label htmlFor="apiKey">OpenAI APIキーを入力してください：</label>
        <input
          type="password"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
          required
          pattern="sk-.*"
          title="APIキーは'sk-'で始まる必要があります"
        />
        <p className="api-key-hint">
          APIキーは OpenAI のダッシュボードから取得できます。
          APIキーは'sk-'で始まります。
        </p>
      </div>
      <button type="submit">APIキーを設定</button>
    </form>
  );
};

export default ApiKeyForm;