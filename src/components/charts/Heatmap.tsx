'use client';

import React, { useCallback } from 'react';
import { useChartRenderer } from '../../hooks/useChartRenderer';
import { DataPoint } from '../../lib/types';
import { scaleX, scaleY } from '../../lib/canvasUtils';

export function Heatmap({ width = 800, height = 400 }) {
  const drawHeatmap = useCallback((
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

    const cellSize = 12; // 10px box + 2px gap
    const boxSize = 10;
    const cols = Math.floor(w / cellSize);
    const rows = Math.floor(h / cellSize);

    // Flat array for buckets to keep memory allocation zero during frames (if reused, but recreating here is fast enough for 60fps at small sizes)
    const buckets = new Int32Array(cols * rows);
    let maxHits = 0;

    // Fill buckets
    for (let i = 0; i < data.length; i++) {
      const pt = data[i];
      // Apply transform before mapping to grid
      const xPos = (scaleX(pt.timestamp, minTime, maxTime, w) * transform.scale) + transform.panX;
      const yPos = scaleY(pt.value, minVal, maxVal, h);
      
      const col = Math.floor(xPos / cellSize);
      const row = Math.floor(yPos / cellSize);

      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        const idx = row * cols + col;
        buckets[idx]++;
        if (buckets[idx] > maxHits) {
           maxHits = buckets[idx];
        }
      }
    }

    const xOffset = (w - (cols * cellSize)) / 2;
    const yOffset = (h - (rows * cellSize)) / 2;

    // Draw GitHub style boxes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const hits = buckets[row * cols + col];
        
        // GitHub Light Mode Colors
        let color = '#ebedf0'; // Empty
        if (hits > 0) {
          const ratio = hits / maxHits;
          if (ratio < 0.25) color = '#9be9a8';
          else if (ratio < 0.5) color = '#40c463';
          else if (ratio < 0.75) color = '#30a14e';
          else color = '#216e39';
        }
        
        ctx.fillStyle = color;
        // +1 to center the gap padding
        ctx.fillRect(xOffset + col * cellSize + 1, yOffset + row * cellSize + 1, boxSize, boxSize);
      }
    }
  }, []);

  const canvasRef = useChartRenderer(drawHeatmap, width, height);

  return (
    <div className="relative border border-slate-100 rounded-2xl overflow-hidden bg-white h-full shadow-sm">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
