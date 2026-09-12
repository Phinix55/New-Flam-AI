import { useEffect, useRef } from 'react';
import { DataPoint } from '../lib/types';
import { setupCanvas, clearCanvas, drawGrid } from '../lib/canvasUtils';
import { useData } from '@/components/providers/DataProvider';

type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number
) => void;

export function useChartRenderer(
  drawFn: DrawFunction,
  width: number = 800,
  height: number = 400
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rAFRef = useRef<number | null>(null);
  const { subscribe } = useData();
  const latestDataRef = useRef<DataPoint[]>([]);

  useEffect(() => {
    // Subscribe to the high-frequency data stream
    // This totally bypasses React's render cycle
    const unsubscribe = subscribe((data: DataPoint[]) => {
      latestDataRef.current = data;
    });
    return () => unsubscribe();
  }, [subscribe]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = setupCanvas(canvas, width, height);
    if (!ctx) return;

    let lastDrawnTimestamp = -1;

    const renderLoop = () => {
      const currentData = latestDataRef.current;
      
      if (currentData.length > 0) {
        const latestTimestamp = currentData[currentData.length - 1].timestamp;
        
        // Dirty Checking: Check if the latest timestamp has changed instead of length,
        // because the length stays fixed at 50,000 (sliding window limit).
        if (latestTimestamp !== lastDrawnTimestamp) {
          clearCanvas(ctx, width, height);
          drawGrid(ctx, width, height);
          
          drawFn(ctx, currentData, width, height);
          lastDrawnTimestamp = latestTimestamp;
        }
      }

      // Schedule next frame
      rAFRef.current = requestAnimationFrame(renderLoop);
    };

    // Start loop
    rAFRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [drawFn, width, height]);

  return canvasRef;
}
