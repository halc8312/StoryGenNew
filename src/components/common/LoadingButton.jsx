import React from 'react';

const LoadingButton = ({ onClick, isLoading, text, loadingText, className = '' }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={isLoading}
      className={`generate-button ${className}`}
    >
      {isLoading ? loadingText : text}
    </button>
  );
};

export default LoadingButton;