'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Quote() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="relative z-20 flex w-full items-center justify-center px-4 py-24 min-h-screen bg-[#0a0a0a] overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Base Dot Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0px) 0% 0% / 24px 24px'
        }}
      />
      
      {/* Top and Bottom Fade Overlays */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* Highlight Dot Grid (Lights up near cursor) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovering ? 1 : 0,
          background: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0px) 0% 0% / 24px 24px',
          WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Interactive Hologram Follower */}
      <div 
        className="hidden md:block pointer-events-none absolute inset-0 z-30 overflow-hidden"
      >
        <div 
          className="absolute w-[400px] h-[400px] -ml-[200px] -mt-[200px] flex items-center justify-center transition-opacity duration-500 ease-out"
          style={{
            opacity: isHovering ? 1 : 0,
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            // Fast transition for smooth following
            transitionProperty: 'opacity',
          }}
        >
          {/* Outer Ring 2 */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03]" />
          
          {/* Outer Ring 1 */}
          <div className="absolute w-[210px] h-[210px] rounded-full border border-white/[0.08]" />
          
          {/* Pulsing Interval Glow */}
          <div 
            className="absolute w-[110px] h-[110px] rounded-full bg-transparent shadow-[0_0_60px_20px_rgba(255,255,255,0.3)] animate-pulse" 
            style={{ animationDuration: '3s' }} 
          />
          
          {/* Inner Glow Circle with Thick Stroke */}
          <div className="absolute w-[110px] h-[110px] rounded-full border-[2px] border-white/60 bg-[#0a0a0a]/90 backdrop-blur-xl flex items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.2)]">
             <Image 
                src="/assets/34cec14e-ac8f-452e-b364-ebd4541f534a.svg" 
                alt="Flam" 
                width={56} 
                height={56} 
                className="opacity-80 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
             />
          </div>
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <h2 
          className="text-[36px] md:text-[80px] font-medium leading-[1.25] tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-r from-[#faefbd] via-[#bde8d1] to-[#caeaeb] pointer-events-none"
        >
          Powering the next<br />wave of content
        </h2>
      </div>
    </section>
  );
}
