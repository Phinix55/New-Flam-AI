import React from 'react';
import { DataProvider } from '../../components/providers/DataProvider';
import { LineChart } from '../../components/charts/LineChart';
import { BarChart } from '../../components/charts/BarChart';
import { ScatterPlot } from '../../components/charts/ScatterPlot';
import { Heatmap } from '../../components/charts/Heatmap';
import { FilterPanel } from '../../components/controls/FilterPanel';
import { TimeRangeSelector } from '../../components/controls/TimeRangeSelector';
import { DataTable } from '../../components/ui/DataTable';
import { PerformanceMonitor } from '../../components/ui/PerformanceMonitor';

export default function DashboardPage() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-10 flex flex-col space-y-8 font-sans">
      
      {/* Header Area */}
      <header className="flex flex-col space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Performance-Critical Dashboard
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Rendering 50,000+ points at 60 FPS using Canvas & Workers
        </p>
      </header>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8 items-start">
        
        {/* LEFT COLUMN: All Charts (Stacked Vertically) */}
        <div className="flex flex-col space-y-12">
          
          {/* Chart 1: Line */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Sales Velocity</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Real-time Movement</p>
            </div>
            <div className="h-[300px] flex flex-col"><LineChart /></div>
          </div>

          {/* Chart 2: Bar */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Revenue Trend</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Recent Activity</p>
            </div>
            <div className="h-[300px] flex flex-col"><BarChart /></div>
          </div>

          {/* Chart 3: Scatter */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">User Engagement</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Scatter Density</p>
            </div>
            <div className="h-[300px] flex flex-col"><ScatterPlot /></div>
          </div>

          {/* Chart 4: Heatmap */}
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">System Capacity</h2>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Density Heatmap</p>
            </div>
            <div className="h-[300px] flex flex-col"><Heatmap /></div>
          </div>

        </div>

        {/* RIGHT COLUMN: Controls & Data Table */}
        <div className="flex flex-col space-y-6 sticky top-10">
          
          {/* Top Control Center Card */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col space-y-6">
            <PerformanceMonitor />
            <div className="h-px w-full bg-slate-100" />
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <FilterPanel />
              <TimeRangeSelector />
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <DataTable />
          </div>

        </div>
      </div>
    </div>
    </DataProvider>
  );
}
