'use client';

import React, { useCallback } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { DataPoint } from '../../lib/types';
import { scaleX, scaleY } from '../../lib/canvasUtils';

export function ScatterPlot({ width = 800, height = 400 }) {
  const drawScatter = useCallback((
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    w: number,
    h: number
  ) => {
    if (data.length === 0) return;

    const minTime = data[0].timestamp;
    const maxTime = data[data.length - 1].timestamp;
    const minVal = 0;
    const maxVal = 100;

    // Use lighter colors with opacity for scatter to show density
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)'; // red-500 with opacity

    // Level of Detail (LOD): Downsample when there are too many points
    const step = Math.max(1, Math.floor(data.length / (w * 1.5)));

    for (let i = 0; i < data.length; i += step) {
      const pt = data[i];
      const x = scaleX(pt.timestamp, minTime, maxTime, w);
      const y = scaleY(pt.value, minVal, maxVal, h);

      // fillRect is significantly faster than arc() in Canvas2D
      ctx.fillRect(x - 1, y - 1, 2, 2);
    }
  }, []);

  const canvasRef = useChartRenderer(drawScatter, width, height);

  return (
    <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-900 shadow-xl">
      <div className="absolute top-4 left-4 text-slate-300 font-semibold text-sm z-10">Scatter Plot Density</div>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
