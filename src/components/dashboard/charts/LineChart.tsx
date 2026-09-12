'use client';

import React, { useCallback } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { DataPoint } from '@/lib/types';
import { scaleX, scaleY } from '@/lib/canvasUtils';

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
    h: number,
    transform: { scale: number; panX: number }
  ) => {
    if (data.length === 0) return;

    // Get time window
    const minTime = data[0].timestamp;
    const maxTime = data[data.length - 1].timestamp;

    // Fixed value range for this demo (0 to 100)
    const minVal = 0;
    const maxVal = 100;

    // Level of Detail (LOD): Never draw more points than 2x the pixel width
    const step = Math.max(1, Math.floor(data.length / (w * 2)));

    // Create vibrant pastel gradient
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, '#f472b6'); // pink-400
    gradient.addColorStop(0.5, '#c084fc'); // purple-400
    gradient.addColorStop(1, '#60a5fa'); // blue-400

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    let first = true;
    for (let i = 0; i < data.length; i += step) {
      const pt = data[i];
      const x = (scaleX(pt.timestamp, minTime, maxTime, w) * transform.scale) + transform.panX;

      if (x < -10 || x > w + 10) continue; // Skip offscreen points

      const y = scaleY(pt.value, minVal, maxVal, h);

      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  }, []);

  const canvasRef = useChartRenderer(drawLine, width, height);

  return (
    <div className="relative border border-slate-100 rounded-2xl overflow-hidden bg-white h-full shadow-sm">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
