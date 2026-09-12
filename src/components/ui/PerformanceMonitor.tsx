'use client';

import React from 'react';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import { useData } from '../providers/DataProvider';

export function PerformanceMonitor() {
  const { fps, memory } = usePerformanceMonitor();
  const { dataRef } = useData();

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-2xl flex flex-col space-y-2 z-50">
      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Metrics</div>
      
      <div className="flex justify-between items-center space-x-6">
        <span className="text-slate-300 text-sm">FPS</span>
        <span className={`font-mono font-bold ${fps >= 55 ? 'text-green-500' : fps >= 30 ? 'text-yellow-500' : 'text-red-500'}`}>
          {fps}
        </span>
      </div>
      
      <div className="flex justify-between items-center space-x-6">
        <span className="text-slate-300 text-sm">Memory</span>
        <span className="font-mono text-blue-400 font-bold">
          {memory > 0 ? `${memory} MB` : 'N/A'}
        </span>
      </div>

      <div className="flex justify-between items-center space-x-6">
        <span className="text-slate-300 text-sm">Points</span>
        <span className="font-mono text-purple-400 font-bold">
          {dataRef.current.length.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
