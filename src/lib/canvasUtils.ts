import { DataPoint } from './types';

// Scale X (timestamp) to Canvas Width
export const scaleX = (
  timestamp: number,
  minTime: number,
  maxTime: number,
  width: number
) => {
  const range = maxTime - minTime;
  if (range === 0) return 0;
  return ((timestamp - minTime) / range) * width;
};

// Scale Y (value) to Canvas Height (inverted because canvas Y is 0 at top)
export const scaleY = (
  value: number,
  minVal: number,
  maxVal: number,
  height: number
) => {
  const range = maxVal - minVal;
  if (range === 0) return height / 2;
  return height - ((value - minVal) / range) * height;
};

// Setup high-DPI canvas
export const setupCanvas = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency if solid bg

  if (!ctx) return null;

  // Scale the internal canvas resolution to match DPR
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  // Scale the CSS size to match layout
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Normalize drawing coordinates to use CSS pixels
  ctx.scale(dpr, dpr);

  return ctx;
};

// Clear the canvas efficiently
export const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.fillStyle = '#ffffff'; // Match clean light theme
  ctx.fillRect(0, 0, width, height);
};

// Draw Grid Lines (simulated SVG-like axes)
export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.strokeStyle = '#f8fafc'; // slate-50
  ctx.lineWidth = 1;
  ctx.beginPath();

  // Horizontal grid lines
  for (let y = 0; y <= height; y += height / 5) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  // Vertical grid lines
  for (let x = 0; x <= width; x += width / 5) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  ctx.stroke();
};
