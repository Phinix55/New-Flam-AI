'use client';

import React, { useCallback, useRef, useEffect } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { DataPoint } from '../../lib/types';
import { scaleX, scaleY } from '../../lib/canvasUtils';

export function Heatmap({ width = 800, height = 400 }) {
  // Pre-render a glowing brush ONCE to an offscreen canvas to massively improve FPS
  const brushCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const brushCanvas = document.createElement('canvas');
    brushCanvas.width = 30;
    brushCanvas.height = 30;
    const bCtx = brushCanvas.getContext('2d');
    if (bCtx) {
      const radgrad = bCtx.createRadialGradient(15, 15, 0, 15, 15, 15);
      radgrad.addColorStop(0, 'rgba(245, 158, 11, 0.2)'); // amber-500
      radgrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      bCtx.fillStyle = radgrad;
      bCtx.fillRect(0, 0, 30, 30);
    }
    brushCanvasRef.current = brushCanvas;
  }, []);

  const drawHeatmap = useCallback((
    ctx: CanvasRenderingContext2D,
    data: DataPoint[],
    w: number,
    h: number
  ) => {
    if (data.length === 0 || !brushCanvasRef.current) return;

    const minTime = data[0].timestamp;
    const maxTime = data[data.length - 1].timestamp;
    const minVal = 0;
    const maxVal = 100;

    ctx.globalCompositeOperation = 'screen';
    
    // Draw the pre-rendered brush image instead of creating a gradient per point
    const brush = brushCanvasRef.current;
    
    // Level of Detail (LOD): Downsample density to preserve framerates
    const step = Math.max(1, Math.floor(data.length / (w * 1.5)));

    for (let i = 0; i < data.length; i += step) {
      const pt = data[i];
      const x = scaleX(pt.timestamp, minTime, maxTime, w);
      const y = scaleY(pt.value, minVal, maxVal, h);
      ctx.drawImage(brush, x - 15, y - 15);
    }
    
    ctx.globalCompositeOperation = 'source-over'; // reset
  }, []);

  const canvasRef = useChartRenderer(drawHeatmap, width, height);

  return (
    <div className="relative border border-slate-700 rounded-lg overflow-hidden bg-slate-900 shadow-xl">
      <div className="absolute top-4 left-4 text-slate-300 font-semibold text-sm z-10">Density Heatmap</div>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
