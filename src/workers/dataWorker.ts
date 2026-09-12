import { DataPoint } from '../lib/types';

// Sliding window max size
const MAX_DATA_POINTS = 50000;
let data: DataPoint[] = [];
let intervalId: NodeJS.Timeout | null = null;

const categories = ['Series A', 'Series B', 'Series C', 'Series D'];

function formatTimestamp(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
}

function generateBatch(size: number): DataPoint[] {
  const now = Date.now();
  const batch: DataPoint[] = [];
  for (let i = 0; i < size; i++) {
    const timestamp = now - (size - i) * 10;
    batch.push({
      timestamp, // slightly spread out timestamps
      formattedTime: formatTimestamp(timestamp),
      value: Math.sin(now / 1000 + i) * 50 + 50 + (Math.random() * 10 - 5), // sine wave with noise
      category: categories[i % categories.length],
    });
  }
  return batch;
}

let currentFilter = '';
let currentTimeRange = 'All'; // Acts as aggregation mode now

function getAggregationInterval() {
  switch (currentTimeRange) {
    case '1min': return 60 * 1000;
    case '5min': return 5 * 60 * 1000;
    case '1hour': return 60 * 60 * 1000;
    default: return 0; // 'All' = None
  }
}

function aggregateData(points: DataPoint[], intervalMs: number) {
  if (intervalMs === 0 || points.length === 0) return points;

  const result: DataPoint[] = [];
  let currentBucketTime = Math.floor(points[0].timestamp / intervalMs) * intervalMs;
  let categorySums: Record<string, { sum: number, count: number }> = {};
  
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const bucketTime = Math.floor(pt.timestamp / intervalMs) * intervalMs;
    
    if (bucketTime !== currentBucketTime) {
      for (const cat in categorySums) {
        result.push({
          timestamp: currentBucketTime,
          formattedTime: formatTimestamp(currentBucketTime),
          value: categorySums[cat].sum / categorySums[cat].count,
          category: cat
        });
      }
      currentBucketTime = bucketTime;
      categorySums = {};
    }
    
    if (!categorySums[pt.category]) {
      categorySums[pt.category] = { sum: pt.value, count: 1 };
    } else {
      categorySums[pt.category].sum += pt.value;
      categorySums[pt.category].count += 1;
    }
  }
  
  for (const cat in categorySums) {
    result.push({
      timestamp: currentBucketTime,
      formattedTime: formatTimestamp(currentBucketTime),
      value: categorySums[cat].sum / categorySums[cat].count,
      category: cat
    });
  }

  return result;
}

function getFilteredAndAggregatedData() {
  const filteredData = currentFilter 
    ? data.filter(pt => pt.category.toLowerCase().includes(currentFilter))
    : data;
  return aggregateData(filteredData, getAggregationInterval());
}

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'SET_FILTER') {
    currentFilter = (payload as string).toLowerCase();
    self.postMessage({ type: 'DATA_RESET', payload: getFilteredAndAggregatedData() });
  }

  if (type === 'SET_TIME_RANGE') {
    currentTimeRange = payload as string;
    self.postMessage({ type: 'DATA_RESET', payload: getFilteredAndAggregatedData() });
  }

  if (type === 'START') {
    if (intervalId) return;
    
    data = generateBatch(10000);
    self.postMessage({ type: 'DATA_INIT', payload: getFilteredAndAggregatedData() });

    intervalId = setInterval(() => {
      const newPoints = generateBatch(100);
      data = [...data, ...newPoints];
      
      if (data.length > MAX_DATA_POINTS) {
        data = data.slice(data.length - MAX_DATA_POINTS);
      }
      
      const intervalMs = getAggregationInterval();
      
      if (intervalMs > 0) {
        // If aggregating, we must send a full reset payload because the current bucket is mutating
        self.postMessage({ type: 'DATA_RESET', payload: getFilteredAndAggregatedData() });
      } else {
        // If not aggregating, just send the filtered delta update for extreme performance
        const filteredPoints = currentFilter
          ? newPoints.filter(pt => pt.category.toLowerCase().includes(currentFilter))
          : newPoints;
          
        if (filteredPoints.length > 0) {
          self.postMessage({ type: 'DATA_UPDATE', payload: filteredPoints });
        }
      }
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
