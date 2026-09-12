import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-6">
      <header className="mb-6 pb-4 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Performance-Critical Dashboard</h1>
          <p className="text-slate-400 text-sm">Rendering 10,000+ points at 60 FPS using Canvas & Workers</p>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
