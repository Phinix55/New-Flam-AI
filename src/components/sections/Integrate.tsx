'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: 'digital',
    title: 'Digital ads & social media',
    description: 'Transform regular digital ads & social content into immersive brand moments, without changing your media stack',
    image: '/assets/2nd-fold-1.webp',
  },
  {
    id: 'ooh',
    title: 'Out of home ads',
    description: 'Bring static billboards to life with interactive augmented reality experiences that captivate passersby.',
    image: '/assets/2nd-fold-2.webp',
  },
  {
    id: 'ctv',
    title: 'CTV',
    description: 'Engage viewers on the biggest screen in the house with interactive connected TV advertisements.',
    image: '/assets/2nd-fold-3.webp',
  },
  {
    id: 'retail',
    title: 'Retail',
    description: 'Enhance the in-store experience with scannable packaging and displays that reveal digital content.',
    image: '/assets/2nd-fold-4.webp',
  }
];

export default function Integrate() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Auto-advance tabs every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((currentId) => {
        const currentIndex = tabs.findIndex(t => t.id === currentId);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#111111] py-16 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-[#141414]/50 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-[24px] lg:rounded-[32px] p-6 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-24">
        
        {/* Mobile Heading (Visible only on mobile/tablet) */}
        <h2 className="lg:hidden text-[24px] font-medium bg-gradient-to-br from-[#f4ecd8] to-[#f4ecd8]/70 bg-clip-text text-transparent leading-[1.2] tracking-tight">
          Integrate Flams on every customer touch point
        </h2>

        {/* Right Side: Image Display (Rendered second in DOM, but visually first on mobile via order) */}
        <div className="order-1 lg:order-2 flex-1 relative aspect-[1.16/1] lg:aspect-[4/5] rounded-[16px] lg:rounded-[24px] overflow-hidden bg-black/20 shrink-0">
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Left Side: Tabs */}
        <div className="order-2 lg:order-1 flex-1 flex flex-col justify-center mt-2 lg:mt-0">
          {/* Desktop Heading (Visible only on large screens) */}
          <h2 className="hidden lg:block text-[32px] font-medium bg-gradient-to-br from-[#f4ecd8] to-[#f4ecd8]/70 bg-clip-text text-transparent leading-[1.2] mb-16 max-w-md tracking-tight">
            Integrate Flams on every customer touch point
          </h2>

          <div className="flex flex-col">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              
              return (
                <div 
                  key={tab.id}
                  className="group border-t border-white/10 cursor-pointer overflow-hidden transition-all duration-300"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {/* Progress Line */}
                  <div className="w-full h-[2px] relative -mt-[1px]">
                    <motion.div 
                      className="absolute top-0 left-0 h-full origin-left bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ 
                        duration: isActive ? 5 : 0, 
                        ease: "linear" 
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div className="py-5 lg:py-6">
                    <h3 className={`text-[16px] lg:text-[20px] transition-all duration-300 ${isActive ? 'font-semibold text-white' : 'font-medium text-white/50 group-hover:text-white/70'}`}>
                      {tab.title}
                    </h3>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <p className="text-[14px] lg:text-[16px] text-white/60 mt-3 lg:mt-4 leading-relaxed max-w-sm font-normal">
                            {tab.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
