'use client';

import React, { useState } from 'react';

export function GuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors border border-indigo-500"
      >
        Walkthrough
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-extrabold text-slate-900">Dashboard Walkthrough</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-lg px-3 py-1 transition-colors border border-slate-200 shadow-sm font-bold"
              >
                Close
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-600">
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-md flex items-center justify-center mr-2 text-xs">1</span>
                  High-Performance Architecture
                </h3>
                <p>
                  This dashboard streams <strong>50,000 live data points</strong>. To guarantee a flawless <strong>60 FPS</strong>, we completely bypassed traditional React rendering. 
                  All massive number-crunching is offloaded to a background <strong>Web Worker</strong>, and the UI is painted natively on HTML5 Canvases using specialized rendering loops.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <span className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-md flex items-center justify-center mr-2 text-xs">2</span>
                  Zero-Latency Interactions
                </h3>
                <p>
                  <strong>Zoom:</strong> Hold <kbd className="bg-slate-100 border border-slate-200 rounded px-1 font-mono text-xs text-slate-900">Ctrl</kbd> or <kbd className="bg-slate-100 border border-slate-200 rounded px-1 font-mono text-xs text-slate-900">Cmd</kbd> and use your mouse wheel over any chart to zoom instantly.
                </p>
                <p>
                  <strong>Pan:</strong> Click and drag on any chart to move left and right.
                </p>
                <p>
                  These interactions use direct DOM listeners that completely bypass the React lifecycle, ensuring zero frame drops even during intense movement.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <span className="bg-rose-100 text-rose-600 w-6 h-6 rounded-md flex items-center justify-center mr-2 text-xs">3</span>
                  True Data Aggregation
                </h3>
                <p>
                  Use the <strong>Aggregation</strong> buttons on the right. When you click <em>1min</em>, the Web Worker instantly crunches the 50,000 raw points into perfectly grouped 1-minute blocks.
                </p>
                <p>
                  Because our total memory window is about 8.3 minutes, selecting <em>5min</em> will mathematically compress the entire dashboard into just 1 or 2 chunky data blocks!
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
