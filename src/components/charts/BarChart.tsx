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
    h: number,
    transform: { scale: number; panX: number }
  ) => {
    // For bar chart, we might want to sample the data if there's too much
    // Or just draw thin bars. Let's draw the last 200 points.
    const recentData = data.slice(-200);
    if (recentData.length === 0) return;

    const minTime = recentData[0].timestamp;
    const maxTime = recentData[recentData.length - 1].timestamp;
    const minVal = 0;
    const maxVal = 100;

    // Pastel teal for bars
    ctx.fillStyle = '#2dd4bf'; // teal-400
    
    // Scale the bar width based on zoom, but keep a max limit
    const baseWidth = Math.max(2, (w / recentData.length) - 1.5);
    const barWidth = Math.min(100, baseWidth * transform.scale); 

    for (let i = 0; i < recentData.length; i++) {
      const pt = recentData[i];
      const x = (scaleX(pt.timestamp, minTime, maxTime, w) * transform.scale) + transform.panX;
      
      // Skip offscreen bars
      if (x + barWidth < 0 || x - barWidth / 2 > w) continue;

      const y = scaleY(pt.value, minVal, maxVal, h);

      // Draw bar from y to bottom
      ctx.fillRect(x - barWidth / 2, y, barWidth, h - y);
    }
  }, []);

  const canvasRef = useChartRenderer(drawBar, width, height);

  return (
    <div className="relative border border-slate-100 rounded-2xl overflow-hidden bg-white h-full shadow-sm">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
