'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [offset, setOffset] = useState(0);
  
  // Fast interval for the static noise animation
  useEffect(() => {
    const int = setInterval(() => setOffset(Math.floor(Math.random() * 100)), 40);
    return () => clearInterval(int);
  }, []);

  const fullText = "Explore Flam for your Business";
  const words = fullText.split(" ");
  const [revealedCount, setRevealedCount] = useState(0);

  // Word-by-word reveal logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const revealNext = (current: number) => {
      if (current >= words.length) {
        timeout = setTimeout(() => {
          setRevealedCount(0);
          revealNext(0);
        }, 3000); // Wait 3s before restarting the cycle
      } else {
        timeout = setTimeout(() => {
          setRevealedCount(current + 1);
          revealNext(current + 1);
        }, 800); // Reveal one word every 800ms
      }
    };

    revealNext(0);

    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <footer className="relative w-full bg-[#0a0a0a] pt-24 md:pt-40 flex flex-col items-center pb-0">
      <div className="relative w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1600px] mx-auto rounded-t-[40px] overflow-hidden flex flex-col items-center bg-[#0f0f0f]">
        
        {/* Background Image Wrapper */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/footer-image.webp" 
            alt="Footer Background" 
            fill 
            className="object-cover object-center opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-transparent to-[#0a0a0a]/80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center px-4 md:px-8 pb-16 lg:pb-32 mt-20 lg:mt-32">
          <h2 className="text-[48px] md:text-[130px] font-medium text-white mb-8 tracking-tight leading-none text-center">
            Get in touch
          </h2>

          {/* Input Form with refined glass stroke and animated placeholder */}
          <div className="relative flex items-center bg-[#2a2a2a]/40 border border-white/20 backdrop-blur-xl rounded-full p-1.5 max-w-[560px] w-full shadow-[0_0_30px_rgba(255,255,255,0.05)_inset,0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden">
            <div className="relative w-full flex items-center h-full">
              <input 
                type="text" 
                placeholder="Explore Flam for your Enterprise"
                className="bg-transparent border-none outline-none text-white px-4 md:px-6 w-full text-[10px] md:text-[15px] z-10 peer h-full relative placeholder:text-white/40 md:placeholder:text-transparent"
              />
              {/* Custom Animated Grain Placeholder (Word by Word Reveal) - Desktop Only */}
              <div className="hidden absolute left-6 text-[15px] text-white/40 pointer-events-none peer-focus:hidden md:flex items-center h-full">
                {revealedCount > 0 && (
                  <span className="whitespace-pre">
                    {words.slice(0, revealedCount).join(" ") + " "}
                  </span>
                )}
                {revealedCount < words.length && (
                  <span className="relative inline-flex items-center h-[18px]">
                    <span className="opacity-0 whitespace-pre">
                      {words.slice(revealedCount).join(" ")}
                    </span>
                    <div 
                      className="absolute inset-0 bg-white opacity-90 rounded-[2px]"
                      style={{
                        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        WebkitMaskPosition: `${offset}px ${offset}px`,
                      }}
                    />
                  </span>
                )}
              </div>
            </div>
            <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-[15px] md:text-[18px] font-medium transition-colors whitespace-nowrap shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 relative">
              Get Demo
            </button>
          </div>
        </div>

          {/* Footer Links Container (Bottom block touching edge) */}
          <div className="relative z-10 w-[calc(100%-2rem)] md:w-full max-w-7xl mx-auto">
            <div className="w-full bg-black/80 md:bg-[#111111]/80 backdrop-blur-lg md:backdrop-blur-2xl border-t border-x border-white/10 rounded-t-[32px] px-6 py-8 md:py-12 lg:px-12 lg:py-16 flex flex-col md:flex-row justify-between gap-8 md:gap-16">
              {/* Left Column */}
              <div className="max-w-sm">
                <h3 className="text-[32px] md:text-[50px] font-medium text-white mb-2 leading-[1.1] tracking-tight">
                  <span className="text-[#e2e4a8]">AI-Native</span><br />
                  Content Format
                </h3>
                <p className="text-[14px] md:text-[16px] text-white/60 mt-4 leading-relaxed">
                  Taking internet beyond videos with life-like immersive visuals and fluid interactions
                </p>
              </div>
  
              {/* Links Columns */}
              <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-12 lg:gap-20">
                <div className="flex flex-col gap-4">
                  <h4 className="text-[11px] md:text-[12px] uppercase tracking-wider text-white/40 font-medium mb-2">Solutions</h4>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Engage</Link>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Connect</Link>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Convert</Link>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h4 className="text-[11px] md:text-[12px] uppercase tracking-wider text-white/40 font-medium mb-2">Models</h4>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Fable 2</Link>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Fantom 1</Link>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Falcon 1</Link>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h4 className="text-[11px] md:text-[12px] uppercase tracking-wider text-white/40 font-medium mb-2">Resources</h4>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Terms of Use</Link>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h4 className="text-[11px] md:text-[12px] uppercase tracking-wider text-white/40 font-medium mb-2">Company</h4>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Careers</Link>
                  <Link href="#" className="text-[15px] md:text-[16px] text-white/80 hover:text-white transition-colors">Contact Us</Link>
                </div>
              </div>
          </div>
          
          {/* Social Icons & Copyright - Inside the dark block at the bottom */}
          <div className="w-full bg-black/80 md:bg-[#111111]/80 backdrop-blur-lg md:backdrop-blur-2xl border-x border-white/10 px-6 lg:px-12 pb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-6">
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </Link>
            </div>
            <div className="text-[12px] text-white/40">
              © 2026 Flam | All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
