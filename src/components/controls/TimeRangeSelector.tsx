'use client';

import React, { useState } from 'react';

const RANGES = ['1min', '5min', '1hour', 'All'];

export function TimeRangeSelector() {
  const [activeRange, setActiveRange] = useState('1min');

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm flex items-center space-x-2">
      <div className="text-slate-200 font-medium text-sm mr-2">Range:</div>
      {RANGES.map((range) => (
        <button
          key={range}
          onClick={() => setActiveRange(range)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            activeRange === range
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
