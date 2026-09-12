'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/components/providers/DataProvider';
import { useVirtualization } from '@/hooks/useVirtualization';
import { DataPoint } from '@/lib/types';
import { FilterPanel } from '@/components/dashboard/controls/FilterPanel';
import { TimeRangeSelector } from '@/components/dashboard/controls/TimeRangeSelector';

const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 1200;

const TableRow = React.memo(({ item, offsetTop, itemHeight }: { item: DataPoint; offsetTop: number; itemHeight: number }) => {
  // Use pre-formatted time from the Web Worker to prevent Garbage Collection stutters
  const formattedTime = item.formattedTime || new Date(item.timestamp).toISOString();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        transform: `translateY(${offsetTop}px)`,
        height: itemHeight,
        width: '100%',
      }}
      // Completely removed CSS hover transitions. 
      // Animating thousands of rows passing under a stationary mouse cursor 
      // causes Style Recalculation thrashing on the GPU thread.
      className="grid grid-cols-3 px-6 items-center text-sm border-b border-slate-50 text-slate-600 bg-white"
    >
      <div className="font-mono text-xs text-slate-400">
        {formattedTime}
      </div>
      <div className="font-medium text-slate-900">{item.category}</div>
      <div className="text-right font-bold text-slate-900">
        {item.value.toFixed(2)}
      </div>
    </div>
  );
});

TableRow.displayName = 'TableRow';

// Isolated Virtual Body to prevent scroll state from re-rendering the entire Table + Filters
function VirtualTableBody({ dataLength, dataRef }: { dataLength: number; dataRef: React.MutableRefObject<DataPoint[]> }) {
  const { containerRef, totalHeight, virtualItems } = useVirtualization(
    dataLength,
    { itemHeight: ITEM_HEIGHT, containerHeight: CONTAINER_HEIGHT }
  );

  return (
    <div
      ref={containerRef}
      // Relying on native passive listener inside useVirtualization instead of React synthetic events
      className="relative flex-1 overflow-y-auto will-change-transform"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {virtualItems.map(({ index, offsetTop }) => {
          // Use dataLength instead of dataRef.current.length to ensure array access is stable
          // relative to what useVirtualization calculated, preventing shifting bugs.
          const item = dataRef.current[dataLength - 1 - index];
          if (!item) return null;

          return (
            <TableRow 
              // Using absolute index ensures React mathematically recycles nodes as the array shifts, completely avoiding duplicate key warnings
              key={index} 
              item={item} 
              offsetTop={offsetTop} 
              itemHeight={ITEM_HEIGHT} 
            />
          );
        })}
      </div>
    </div>
  );
}

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
      <VirtualTableBody dataLength={dataLength} dataRef={dataRef} />
    </div>
  );
}
