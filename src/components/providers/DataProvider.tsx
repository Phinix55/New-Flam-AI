'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useDataStream } from '../../hooks/useDataStream';

type DataContextType = ReturnType<typeof useDataStream>;

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const stream = useDataStream();

  return (
    <DataContext.Provider value={stream}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
