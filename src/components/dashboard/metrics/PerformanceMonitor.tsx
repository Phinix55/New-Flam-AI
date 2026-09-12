'use client';

import React from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { useData } from '@/components/providers/DataProvider';

export function PerformanceMonitor() {
  const { fps, memory } = usePerformanceMonitor();
  const { dataRef } = useData();

  return (
    <div className="flex items-center space-x-6">
      
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">FPS</span>
        <span className={`text-2xl font-bold tracking-tight ${fps >= 55 ? 'text-emerald-400' : fps >= 30 ? 'text-amber-400' : 'text-rose-400'}`}>
          {fps}
        </span>
      </div>
      
      <div className="w-px h-8 bg-slate-100" />
      
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Memory</span>
        <span className="text-2xl font-bold tracking-tight text-indigo-400">
          {memory > 0 ? `${memory}` : '0'}<span className="text-sm text-indigo-300 ml-1">MB</span>
        </span>
      </div>

      <div className="w-px h-8 bg-slate-100" />

      <div className="flex flex-col text-right">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Data Points</span>
        <span className="text-2xl font-bold tracking-tight text-cyan-400">
          {dataRef.current.length.toLocaleString()}
        </span>
      </div>
      
    </div>
  );
}
