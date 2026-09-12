'use client';

import React, { useCallback } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { DataPoint } from '../../lib/types';
import { scaleX, scaleY } from '../../lib/canvasUtils';

export function BarChart({ width = 800, height = 400 }) {
  const drawBar = useCallback((
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    w: number,
    h: number
  ) => {
    if (data.length === 0) return;

    // For bar chart, we might want to sample the data if there's too much
    // Or just draw thin bars. Let's draw the last 200 points.
    const displayData = data.slice(-200);
    if (displayData.length === 0) return;

    const minTime = displayData[0].timestamp;
    const maxTime = displayData[displayData.length - 1].timestamp;
    const minVal = 0;
    const maxVal = 100;

    const barWidth = Math.max(1, (w / displayData.length) - 1);
    
    ctx.fillStyle = '#10b981'; // emerald-500

    for (let i = 0; i < displayData.length; i++) {
      const pt = displayData[i];
      const x = scaleX(pt.timestamp, minTime, maxTime, w);
      const y = scaleY(pt.value, minVal, maxVal, h);
      const barHeight = h - y;

      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    }
  }, []);

  const canvasRef = useChartRenderer(drawBar, width, height);

  return (
    <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-900 shadow-xl">
      <div className="absolute top-4 left-4 text-slate-300 font-semibold text-sm z-10">Recent Activity (Bar)</div>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
