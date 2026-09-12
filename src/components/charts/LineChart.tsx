'use client';

import React, { useCallback } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { DataPoint } from '../../lib/types';
import { scaleX, scaleY } from '../../lib/canvasUtils';

interface LineChartProps {
  width?: number;
  height?: number;
  color?: string;
}

export function LineChart({ width = 800, height = 400, color = '#3b82f6' }: LineChartProps) {
  
  const drawLine = useCallback((
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    w: number,
    h: number
  ) => {
    if (data.length < 2) return;

    // Get time window
    const minTime = data[0].timestamp;
    const maxTime = data[data.length - 1].timestamp;

    // Fixed value range for this demo (0 to 100)
    const minVal = 0;
    const maxVal = 100;

    // Level of Detail (LOD): Never draw more points than 2x the pixel width
    const step = Math.max(1, Math.floor(data.length / (w * 2)));

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    let first = true;
    for (let i = 0; i < data.length; i += step) {
      const pt = data[i];
      const x = scaleX(pt.timestamp, minTime, maxTime, w);
      const y = scaleY(pt.value, minVal, maxVal, h);

      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  }, [color]);

  const canvasRef = useChartRenderer(drawLine, width, height);

  return (
    <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-900 shadow-xl">
      <div className="absolute top-4 left-4 text-slate-300 font-semibold text-sm z-10">Real-time Line Chart</div>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
