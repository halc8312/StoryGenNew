import React, { useState } from 'react';
import { templates } from '../constants/storyOptions';

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  const [customTheme, setCustomTheme] = useState('');
  const [customSetting, setCustomSetting] = useState('');
  const [showCustomTemplate, setShowCustomTemplate] = useState(false);

  const handleTemplateChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomTemplate(true);
      onTemplateSelect({ theme: customTheme, setting: customSetting });
    } else {
      setShowCustomTemplate(false);
      const template = templates.find(t => t.id === value);
      if (template) {
        onTemplateSelect(template);
      }
    }
  };

  const handleCustomThemeChange = (e) => {
    const value = e.target.value;
    setCustomTheme(value);
    onTemplateSelect({ theme: value, setting: customSetting });
  };

  const handleCustomSettingChange = (e) => {
    const value = e.target.value;
    setCustomSetting(value);
    onTemplateSelect({ theme: customTheme, setting: value });
  };

  return (
    <div className="form-group">
      <label htmlFor="template">テンプレート：</label>
      <select
        id="template"
        value={showCustomTemplate ? 'custom' : (selectedTemplate?.id || '')}
        onChange={handleTemplateChange}
        className="template-select"
      >
        <option value="">テンプレートを選択</option>
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.theme} - {template.setting}
          </option>
        ))}
        <option value="custom">カスタム</option>
      </select>

      {showCustomTemplate && (
        <div className="custom-template-inputs">
          <input
            type="text"
            value={customTheme}
            onChange={handleCustomThemeChange}
            placeholder="テーマを入力"
            className="custom-input"
          />
          <input
            type="text"
            value={customSetting}
            onChange={handleCustomSettingChange}
            placeholder="設定を入力"
            className="custom-input"
          />
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;