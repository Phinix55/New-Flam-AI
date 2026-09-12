'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '../providers/DataProvider';
import { useVirtualization } from '../../hooks/useVirtualization';
import { DataPoint } from '../../lib/types';

export function DataTable() {
  const { dataRef } = useData();
  const [dataLength, setDataLength] = useState(0);

  // Throttle table updates to not kill React while Canvas renders at 60fps
  useEffect(() => {
    const interval = setInterval(() => {
      // Just update the length to trigger a re-render. 
      // Do not copy or reverse the 50k array, it causes massive GC pauses!
      setDataLength(dataRef.current.length);
    }, 500);
    return () => clearInterval(interval);
  }, [dataRef]);

  const ITEM_HEIGHT = 40;
  const CONTAINER_HEIGHT = 400;

  const { containerRef, onScroll, totalHeight, virtualItems } = useVirtualization(
    dataLength,
    { itemHeight: ITEM_HEIGHT, containerHeight: CONTAINER_HEIGHT }
  );

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex flex-col shadow-xl mt-6">
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-slate-200 font-semibold text-sm">Real-Time Data Feed</h3>
        <span className="text-xs text-slate-400">Updates every 500ms</span>
      </div>
      
      {/* Table Header */}
      <div className="grid grid-cols-3 px-4 py-2 bg-slate-800/50 border-b border-slate-700 text-xs font-semibold tracking-wider text-slate-400 uppercase">
        <div>Timestamp</div>
        <div>Category</div>
        <div className="text-right">Value</div>
      </div>

      {/* Virtualized Body */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{ height: CONTAINER_HEIGHT, overflowY: 'auto' }}
        className="relative"
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {virtualItems.map(({ index, offsetTop }) => {
            // Read directly from the ref in reverse order (newest top)
            const item = dataRef.current[dataRef.current.length - 1 - index];
            if (!item) return null;

            return (
              <div
                key={`${item.timestamp}-${index}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${offsetTop}px)`,
                  height: ITEM_HEIGHT,
                  width: '100%',
                }}
                className="grid grid-cols-3 px-4 items-center text-sm border-b border-slate-800/50 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <div className="font-mono text-xs text-slate-400">
                  {new Date(item.timestamp).toISOString().split('T')[1].replace('Z', '')}
                </div>
                <div>{item.category}</div>
                <div className="text-right font-mono text-emerald-400">
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
