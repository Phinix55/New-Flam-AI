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
import { GuideModal } from '../../components/ui/GuideModal';

export default function DashboardPage() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col relative">
      
      {/* Header Area */}
      <header className="sticky top-0 z-50 bg-[#F8F9FA] px-6 lg:px-10 pt-6 lg:pt-10 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-end space-y-4 sm:space-y-0">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Performance-Critical Dashboard
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Rendering 50,000+ points at 60 FPS using Canvas & Workers
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <PerformanceMonitor />
          </div>
          <GuideModal />
        </div>
      </header>

      {/* Main 2-Column Layout */}
      <div className="px-6 lg:px-10 py-8 grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8">
        
        {/* LEFT COLUMN: All Charts (Native page scroll) */}
        <div className="flex flex-col space-y-12 pb-20">
          
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

        {/* RIGHT COLUMN: Sticky Data Table */}
        <div className="sticky top-[140px] h-[calc(100vh-180px)]">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
    </DataProvider>
  );
}
