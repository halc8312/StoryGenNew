import React, { createContext, useContext, useState } from 'react';

const PlotlineContext = createContext();

export const PlotlineProvider = ({ children }) => {
  const [plotlines, setPlotlines] = useState([]);

  const addPlotline = (plotline) => {
    setPlotlines([...plotlines, { ...plotline, id: Date.now() }]);
  };

  const removePlotline = (id) => {
    setPlotlines(plotlines.filter(p => p.id !== id));
  };

  const updatePlotline = (id, updates) => {
    setPlotlines(plotlines.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  return (
    <PlotlineContext.Provider value={{
      plotlines,
      addPlotline,
      removePlotline,
      updatePlotline
    }}>
      {children}
    </PlotlineContext.Provider>
  );
};

export const usePlotline = () => {
  const context = useContext(PlotlineContext);
  if (!context) {
    throw new Error('usePlotline must be used within a PlotlineProvider');
  }
  return context;
};