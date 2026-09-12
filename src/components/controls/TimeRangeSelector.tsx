'use client';

import React, { useState } from 'react';

const RANGES = ['1min', '5min', '1hour', 'All'];

export function TimeRangeSelector() {
  const [activeRange, setActiveRange] = useState('1min');

  return (
    <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
      {RANGES.map((range) => (
        <button
          key={range}
          onClick={() => setActiveRange(range)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            activeRange === range
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
              : 'bg-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
