'use client';

import React, { useTransition, useState } from 'react';
import { useData } from '../providers/DataProvider';

export function FilterPanel() {
  const [isPending, startTransition] = useTransition();
  const [filterText, setFilterText] = useState('');
  const { setFilter } = useData();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    // We use transition so typing doesn't block the UI while filter is applied
    startTransition(() => {
      setFilterText(text);
      setFilter(text);
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="text-slate-500 font-medium text-sm">Filters:</div>
      <input
        type="text"
        placeholder="Filter by category..."
        onChange={handleFilterChange}
        className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder-slate-400 w-48"
      />
      {isPending && <span className="text-xs text-indigo-400 font-medium">Updating...</span>}
    </div>
  );
}
