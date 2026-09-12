import { useEffect, useRef } from 'react';
import { DataPoint } from '../lib/types';
import { setupCanvas, clearCanvas, drawGrid } from '../lib/canvasUtils';
import { useData } from '@/components/providers/DataProvider';

type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  transform: { scale: number; panX: number }
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
  
  // Non-React state for zero-latency interactions
  const transformRef = useRef({ scale: 1, panX: 0 });
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);

  useEffect(() => {
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

    // --- Interaction Event Listeners ---
    const handleWheel = (e: WheelEvent) => {
      // Allow normal page scrolling if the user is not holding Ctrl/Cmd
      if (!e.ctrlKey && !e.metaKey) return;
      
      e.preventDefault(); // Stop page zoom
      const zoomSensitivity = 0.001;
      const delta = -e.deltaY * zoomSensitivity;
      const newScale = Math.max(1, Math.min(transformRef.current.scale * (1 + delta), 20));
      
      // Keep mouse position anchored during zoom
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      
      // Calculate new pan to keep mouse stationary
      const scaleRatio = newScale / transformRef.current.scale;
      const newPanX = mouseX - (mouseX - transformRef.current.panX) * scaleRatio;

      transformRef.current.scale = newScale;
      transformRef.current.panX = Math.min(0, newPanX); // Don't pan right of start
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastMouseX.current;
      transformRef.current.panX = Math.min(0, transformRef.current.panX + deltaX);
      lastMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let lastDrawnTimestamp = -1;
    let lastDrawnTransform = { scale: 1, panX: 0 };

    const renderLoop = () => {
      const currentData = latestDataRef.current;
      const currentTransform = transformRef.current;
      
      if (currentData.length > 0) {
        const latestTimestamp = currentData[currentData.length - 1].timestamp;
        
        // Dirty Checking: Re-render if new data arrives OR if the user zoomed/panned
        if (
          latestTimestamp !== lastDrawnTimestamp ||
          currentTransform.scale !== lastDrawnTransform.scale ||
          currentTransform.panX !== lastDrawnTransform.panX
        ) {
          clearCanvas(ctx, width, height);
          drawGrid(ctx, width, height);
          
          drawFn(ctx, currentData, width, height, currentTransform);
          
          lastDrawnTimestamp = latestTimestamp;
          lastDrawnTransform = { ...currentTransform };
        }
      }

      rAFRef.current = requestAnimationFrame(renderLoop);
    };

    rAFRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [drawFn, width, height]);

  return canvasRef;
}
