'use client';

import { useState, useEffect, useRef } from 'react';

export function usePerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState(0);
  
  const framesRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rAFRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      framesRef.current += 1;
      const now = performance.now();
      
      // Calculate FPS every second
      if (now - lastTimeRef.current >= 1000) {
        setFps(Math.round((framesRef.current * 1000) / (now - lastTimeRef.current)));
        framesRef.current = 0;
        lastTimeRef.current = now;

        // Try to get memory if available (Chrome specific)
        if ((performance as any).memory) {
          const usedJSHeapSize = (performance as any).memory.usedJSHeapSize;
          setMemory(Math.round(usedJSHeapSize / 1024 / 1024)); // MB
        }
      }

      rAFRef.current = requestAnimationFrame(loop);
    };

    rAFRef.current = requestAnimationFrame(loop);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return { fps, memory };
}
