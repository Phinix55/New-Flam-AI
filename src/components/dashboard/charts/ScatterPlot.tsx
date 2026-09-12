'use client';

import React, { useCallback } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { DataPoint } from '@/lib/types';
import { scaleX, scaleY } from '@/lib/canvasUtils';

export function ScatterPlot({ width = 800, height = 400 }) {
  const drawScatter = useCallback((
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    w: number,
    h: number,
    transform: { scale: number; panX: number }
  ) => {
    if (data.length === 0) return;

    const minTime = data[0].timestamp;
    const maxTime = data[data.length - 1].timestamp;
    const minVal = 0;
    const maxVal = 100;
    // Use vibrant pastel orange/yellow with higher opacity for better visibility
    ctx.fillStyle = 'rgba(250, 204, 21, 0.85)'; // yellow-400 with high opacity

    // Level of Detail (LOD): Downsample when there are too many points
    const step = Math.max(1, Math.floor(data.length / (w * 1.5 * transform.scale)));

    for (let i = 0; i < data.length; i += step) {
      const pt = data[i];
      const x = (scaleX(pt.timestamp, minTime, maxTime, w) * transform.scale) + transform.panX;
      
      if (x < -10 || x > w + 10) continue; // Skip offscreen points

      const y = scaleY(pt.value, minVal, maxVal, h);

      // fillRect is significantly faster than arc() in Canvas2D. Increased size to 4x4.
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  }, []);

  const canvasRef = useChartRenderer(drawScatter, width, height);

  return (
    <div className="relative border border-slate-100 rounded-2xl overflow-hidden bg-white h-full shadow-sm">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
