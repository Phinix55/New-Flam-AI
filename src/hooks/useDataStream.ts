import { useEffect, useRef } from 'react';
import { DataPoint } from '../lib/types';

type Listener = (data: DataPoint[]) => void;

export function useDataStream() {
  // Store the full dataset outside of React's render cycle
  const dataRef = useRef<DataPoint[]>([]);
  const listenersRef = useRef<Set<Listener>>(new Set());
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL('../workers/dataWorker.ts', import.meta.url), {
      type: 'module',
    });

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { type, payload } = e.data;

      if (type === 'DATA_INIT' || type === 'DATA_RESET') {
        dataRef.current = payload;
        notifyListeners();
      }

      if (type === 'DATA_UPDATE') {
        // Append new points and maintain sliding window locally (e.g. max 50k points)
        const newPoints = payload as DataPoint[];
        const updatedData = [...dataRef.current, ...newPoints];
        if (updatedData.length > 50000) {
          dataRef.current = updatedData.slice(updatedData.length - 50000);
        } else {
          dataRef.current = updatedData;
        }
        notifyListeners();
      }
    };

    // Start generating data
    workerRef.current.postMessage({ type: 'START' });

    return () => {
      workerRef.current?.postMessage({ type: 'STOP' });
      workerRef.current?.terminate();
    };
  }, []);

  const notifyListeners = () => {
    listenersRef.current.forEach((listener) => listener(dataRef.current));
  };

  const subscribe = (listener: Listener) => {
    listenersRef.current.add(listener);
    // Send immediate initial data
    listener(dataRef.current);
    return () => {
      listenersRef.current.delete(listener);
    };
  };

  // Utility to clear or reset data
  const resetData = () => {
    dataRef.current = [];
    notifyListeners();
  };

  const setFilter = (text: string) => {
    workerRef.current?.postMessage({ type: 'SET_FILTER', payload: text });
  };

  return {
    subscribe,
    dataRef,
    resetData,
    setFilter,
  };
}
