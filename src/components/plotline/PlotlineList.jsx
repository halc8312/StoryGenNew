import React from 'react';
import { usePlotline } from '../../contexts/PlotlineContext';
import './PlotlineList.css';

const PlotlineList = () => {
  const { plotlines, updatePlotlineStatus, removePlotline } = usePlotline();

  const getStatusColor = (status) => {
    switch (status) {
      case 'unused':
        return 'status-unused';
      case 'in-progress':
        return 'status-in-progress';
      case 'used':
        return 'status-used';
      default:
        return '';
    }
  };

  const handleStatusChange = (id, status) => {
    updatePlotlineStatus(id, status);
  };

  return (
    <div className="plotline-list">
      {plotlines.map((plotline) => (
        <div key={plotline.id} className="plotline-item">
          <div className="plotline-header">
            <h4>{plotline.title}</h4>
            <div className="plotline-actions">
              <select
                value={plotline.status}
                onChange={(e) => handleStatusChange(plotline.id, e.target.value)}
                className={getStatusColor(plotline.status)}
              >
                <option value="unused">未使用</option>
                <option value="in-progress">進行中</option>
                <option value="used">使用済み</option>
              </select>
              <button
                className="remove-button"
                onClick={() => removePlotline(plotline.id)}
              >
                削除
              </button>
            </div>
          </div>
          
          <div className="plotline-content">
            <p className="plotline-description">{plotline.description}</p>
            <div className="plotline-meta">
              <span className={`importance importance-${plotline.importance}`}>
                重要度: {plotline.importance}
              </span>
              <span className="plotline-type">種類: {plotline.type}</span>
              {plotline.targetChapter && (
                <span className="target-chapter">
                  目標回収: {plotline.targetChapter}
                </span>
              )}
            </div>
            {plotline.hints && (
              <div className="plotline-hints">
                <h5>伏線の仕込み方:</h5>
                <p>{plotline.hints}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlotlineList;