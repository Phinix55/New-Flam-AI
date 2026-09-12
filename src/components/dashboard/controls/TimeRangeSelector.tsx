'use client';

import React, { useState } from 'react';
import { useData } from '@/components/providers/DataProvider';

const RANGES = ['1min', '5min', '1hour', 'All'];

export function TimeRangeSelector() {
  const [activeRange, setActiveRange] = useState('All');
  const { setTimeRange } = useData();

  const handleRangeClick = (range: string) => {
    setActiveRange(range);
    setTimeRange(range);
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="text-slate-500 font-medium text-sm">Aggregation:</div>
      <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
        {RANGES.map((range) => (
          <button
            key={range}
            onClick={() => handleRangeClick(range)}
            className={`px-2 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeRange === range
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'bg-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {range === 'All' ? 'None' : range}
          </button>
        ))}
      </div>
    </div>
  );
}
