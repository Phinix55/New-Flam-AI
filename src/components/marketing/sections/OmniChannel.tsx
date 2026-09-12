'use client';

import { useState } from 'react';
import Image from 'next/image';

const cards = [
  {
    category: 'WEB EMBED',
    title: 'Seamless Native Integration',
    description: 'Embed your Flams directly into your website or app with a simple code snippet.',
    image: '/assets/5th-fold-1-web-embed.webp',
    glowColor: 'rgba(227, 213, 200, 0.4)',
  },
  {
    category: 'LINK',
    title: 'Access via Sharable Links',
    description: 'Distribute your Flam through a link that launches across digital ads, social media, SMS, emails.',
    image: '/assets/5th-fold-2-link.webp',
    glowColor: 'rgba(183, 122, 60, 0.5)',
  },
  {
    category: 'CODES',
    title: 'Launch with Flam Codes',
    description: 'Add Flam code to your physical distribution channels like outdoor ads, CTV, Retail store, events',
    image: '/assets/5th-fold-3-flam-codes.webp',
    glowColor: 'rgba(143, 92, 70, 0.6)',
  },
];

export default function OmniChannel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="w-full bg-[#111111] py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[40px] md:text-60 font-medium mb-3 md:mb-4 tracking-tight text-[#f4ecd8] leading-[1.1] md:leading-tight">
            Omni-channel distribution
          </h2>
          <p className="text-[14px] md:text-16 text-white/50">
            Integrate and distribute over any channel
          </p>
        </div>

        {/* Cards Flex Container */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full min-h-[620px]" onMouseLeave={() => setHoveredIndex(null)}>
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isDimmed = isAnyHovered && !isHovered;
            
            return (
              <div 
                key={index}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-[#2a2a2a] lg:h-[620px] transition-all duration-500 ease-in-out cursor-pointer"
                style={{ 
                  flex: isHovered ? '2 1 0%' : '1 1 0%', 
                  opacity: isDimmed ? 0.4 : 1 
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={isHovered ? handleMouseMove : undefined}
              >
                {/* Dot Grid Background */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0px) 0% 0% / 14px 14px rgb(15, 15, 15)'
                  }}
                />
                
                {/* Mouse-following Glow Background */}
                <div 
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${card.glowColor}, transparent 65%)`
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex h-full flex-col overflow-hidden">
                  
                  {/* Text Container */}
                  <div className="relative w-full shrink-0 overflow-hidden px-6 pt-6 lg:h-2/5 lg:px-12 lg:pt-12">
                    <span className="text-[12px] md:text-12 text-white/40 uppercase tracking-widest font-medium mb-3 md:mb-4 block whitespace-nowrap">
                      {card.category}
                    </span>
                    <h3 className={`text-[20px] md:text-30 font-medium text-white leading-[1.2] mb-3 md:mb-4 transition-all duration-300 ${isDimmed ? 'truncate' : ''}`}>
                      {card.title}
                    </h3>
                    <p className={`text-[14px] md:text-14 text-white/50 leading-relaxed mb-4 max-w-sm transition-all duration-300 ${isDimmed ? 'line-clamp-2' : ''}`}>
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Image Container */}
                  <div className="mt-4 h-[280px] overflow-hidden rounded-[20px] px-6 pb-6 lg:mt-6 lg:h-3/5 lg:flex-1 lg:rounded-[24px] lg:px-12 lg:pb-12 relative w-full">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-700 ease-in-out">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className={`object-cover object-top transition-transform duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
