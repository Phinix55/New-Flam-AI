'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-full bg-[#111111] overflow-hidden p-4 h-screen">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center rounded-[32px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/image.jpeg" 
            alt="Hero Background" 
            fill 
            priority
            className="object-cover object-[center_35%]"
          />
          {/* Gradient fade at bottom to blend smoothly into the dark gray background below */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto px-4 mt-8">
          <h1 className="text-[44px] md:text-[120px] font-medium text-[#f4ecd8] leading-[1.05] tracking-tight mb-6 drop-shadow-lg">
            AI for the internet<br />beyond videos
          </h1>
          
          <p className="text-[14px] md:text-[18px] text-white/70 max-w-2xl leading-relaxed mb-10 drop-shadow-md">
            Flam is AI-native content format with life-like immersive visuals and fluid interactions
          </p>
          
          <button className="bg-[#1f1d1b]/80 hover:bg-[#1f1d1b] border border-white/20 backdrop-blur-md text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full text-[18px] md:text-[14px] transition-all duration-300">
            Get Demo
          </button>
        </div>
      </div>
    </section>
  );
}
