import { DataPoint } from '../lib/types';

// Sliding window max size
const MAX_DATA_POINTS = 50000;
let data: DataPoint[] = [];
let intervalId: NodeJS.Timeout | null = null;

const categories = ['Series A', 'Series B', 'Series C', 'Series D'];

function generateBatch(size: number): DataPoint[] {
  const now = Date.now();
  const batch: DataPoint[] = [];
  for (let i = 0; i < size; i++) {
    batch.push({
      timestamp: now - (size - i) * 10, // slightly spread out timestamps
      value: Math.sin(now / 1000 + i) * 50 + 50 + (Math.random() * 10 - 5), // sine wave with noise
      category: categories[i % categories.length],
    });
  }
  return batch;
}

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'START') {
    if (intervalId) return;
    
    // Generate initial load
    data = generateBatch(10000); // 10k initial
    self.postMessage({ type: 'DATA_INIT', payload: data });

    // Generate real-time updates every 100ms
    intervalId = setInterval(() => {
      const newPoints = generateBatch(100);
      data = [...data, ...newPoints];
      
      // Enforce sliding window to prevent memory leaks
      if (data.length > MAX_DATA_POINTS) {
        data = data.slice(data.length - MAX_DATA_POINTS);
      }
      
      self.postMessage({ type: 'DATA_UPDATE', payload: newPoints });
    }, 100);
  }

  if (type === 'STOP') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  if (type === 'GET_ALL') {
    self.postMessage({ type: 'DATA_FULL', payload: data });
  }
};
