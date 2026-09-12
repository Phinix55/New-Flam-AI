'use client';

import React, { useTransition, useState } from 'react';

export function FilterPanel() {
  const [isPending, startTransition] = useTransition();
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    // We use transition so typing doesn't block the UI while filter is applied
    startTransition(() => {
      setFilterText(text);
      // In a real implementation, this would trigger a filter across the DataProvider's worker
    });
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm flex items-center space-x-4">
      <div className="text-slate-200 font-medium text-sm">Filters:</div>
      <input
        type="text"
        placeholder="Filter by category..."
        onChange={handleFilterChange}
        className="bg-slate-900 border border-slate-600 rounded px-3 py-1 text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors"
      />
      {isPending && <span className="text-xs text-blue-400">Updating...</span>}
    </div>
  );
}
