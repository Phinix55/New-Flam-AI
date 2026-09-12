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
      <div className="flex flex-col space-y-6 pb-20">
        
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <FilterPanel />
          <TimeRangeSelector />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 sm:h-80">
            <LineChart />
          </div>
          <div className="h-64 sm:h-80">
            <BarChart />
          </div>
          <div className="h-64 sm:h-80">
            <ScatterPlot />
          </div>
          <div className="h-64 sm:h-80">
            <Heatmap />
          </div>
        </div>

        <DataTable />
        <PerformanceMonitor />
      </div>
    </DataProvider>
  );
}
