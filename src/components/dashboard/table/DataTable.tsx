'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { useVirtualization } from '@/hooks/useVirtualization';
import { DataPoint } from '@/lib/types';
import { FilterPanel } from '@/components/dashboard/controls/FilterPanel';
import { TimeRangeSelector } from '@/components/dashboard/controls/TimeRangeSelector';

export function DataTable() {
  const { dataRef } = useData();
  const [dataLength, setDataLength] = useState(0);

  // Throttle table updates to not kill React while Canvas renders at 60fps
  useEffect(() => {
    const interval = setInterval(() => {
      setDataLength(dataRef.current.length);
    }, 500);
    return () => clearInterval(interval);
  }, [dataRef]);

  const ITEM_HEIGHT = 40;
  // Use a very large container height since we will rely on CSS flex for the actual visible area
  const CONTAINER_HEIGHT = 1200; 

  const { containerRef, onScroll, totalHeight, virtualItems } = useVirtualization(
    dataLength,
    { itemHeight: ITEM_HEIGHT, containerHeight: CONTAINER_HEIGHT }
  );

  return (
    <div className="bg-white flex flex-col h-full w-full">
      
      {/* Controls Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col space-y-4 bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-900 font-bold text-lg">Real-Time Data Feed</h3>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">Live Sync</span>
        </div>
        
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center space-y-4 xl:space-y-0">
          <FilterPanel />
          <TimeRangeSelector />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 px-6 py-3 border-b border-slate-100 text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-50/50">
        <div>Timestamp</div>
        <div>Category</div>
        <div className="text-right">Value</div>
      </div>

      {/* Virtualized Body */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="relative flex-1 overflow-y-auto"
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {virtualItems.map(({ index, offsetTop }) => {
            const item = dataRef.current[dataRef.current.length - 1 - index];
            if (!item) return null;

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${offsetTop}px)`,
                  height: ITEM_HEIGHT,
                  width: '100%',
                }}
                className="grid grid-cols-3 px-6 items-center text-sm border-b border-slate-50 text-slate-600 hover:bg-slate-50 transition-colors bg-white"
              >
                <div className="font-mono text-xs text-slate-400">
                  {(() => {
                    const d = new Date(item.timestamp);
                    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
                  })()}
                </div>
                <div className="font-medium text-slate-900">{item.category}</div>
                <div className="text-right font-bold text-slate-900">
                  {item.value.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
