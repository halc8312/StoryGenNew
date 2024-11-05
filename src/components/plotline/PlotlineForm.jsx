import React, { useState } from 'react';
import { usePlotline } from '../../contexts/PlotlineContext';
import './PlotlineForm.css';

const PlotlineForm = ({ onClose }) => {
  const { addPlotline } = usePlotline();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'event',
    importance: 'medium',
    targetChapter: '',
    hints: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlotline(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="plotline-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">タイトル:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">詳細:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">種類:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="event">イベント</option>
          <option value="object">アイテム</option>
          <option value="character">キャラクター関連</option>
          <option value="mystery">謎</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="importance">重要度:</label>
        <select
          id="importance"
          name="importance"
          value={formData.importance}
          onChange={handleChange}
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="targetChapter">目標回収チャプター:</label>
        <input
          type="text"
          id="targetChapter"
          name="targetChapter"
          value={formData.targetChapter}
          onChange={handleChange}
          placeholder="例: 第3章"
        />
      </div>

      <div className="form-group">
        <label htmlFor="hints">伏線の仕込み方:</label>
        <textarea
          id="hints"
          name="hints"
          value={formData.hints}
          onChange={handleChange}
          placeholder="どのように伏線を仕込むか、具体的に記述してください"
        />
      </div>

      <div className="form-actions">
        <button type="submit">追加</button>
        <button type="button" onClick={onClose}>キャンセル</button>
      </div>
    </form>
  );
};

export default PlotlineForm;