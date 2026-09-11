import { AlignLeft, Users, TrendingUp, Globe, BadgeCheck, Store } from 'lucide-react';
import Image from 'next/image';

const results = [
  {
    icon: <AlignLeft className="w-5 h-5 text-white/70" />,
    title: 'Drive attention on content',
    description: 'Interactive content upscales attention and watch time for your business.',
  },
  {
    icon: <Users className="w-5 h-5 text-white/70" />,
    title: 'Build awareness',
    description: 'Stay on top of mind for potential customers.',
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-white/70" />,
    title: 'Increase your online sales',
    description: 'Drive purchases on website and marketplaces.',
  },
  {
    icon: <Globe className="w-5 h-5 text-white/70" />,
    title: 'Get more traffic on website',
    description: 'Get more visitors to land on the website.',
  },
  {
    icon: <BadgeCheck className="w-5 h-5 text-white/70" />,
    title: 'Generate qualified leads',
    description: 'Connect with qualified customers for your brands.',
  },
  {
    icon: <Store className="w-5 h-5 text-white/70" />,
    title: 'Increase store visits',
    description: 'Direct more visitors to physical shopfronts.',
  },
];

export default function Results() {
  return (
    <section className="relative w-full py-8 md:py-24 px-4 md:px-8 overflow-hidden bg-[#0a0a0a]">
      {/* Background Image Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/5th-fold-hq.webp"
          alt="Curtain Background"
          fill
          className="object-cover object-right md:object-center opacity-90"
          priority
        />
      </div>
      
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
        style={{
          background: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0px) 0% 0% / 24px 24px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-[24px] md:text-60 font-medium text-[#f4ecd8] text-center mb-8 md:mb-16 tracking-tight">
          Results that put your brands ahead
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
          {results.map((result, index) => (
            <div 
              key={index}
              className="relative flex flex-col justify-between gap-6 p-6 lg:gap-8 lg:p-8 bg-[#150f0c]/80 border border-white/5 backdrop-blur-md rounded-[24px] hover:bg-[#1a130f]/90 transition-colors h-full min-h-[220px] md:min-h-[260px]"
            >
              <div className="w-[58px] h-[58px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center p-4">
                {result.icon}
              </div>
              
              <div>
                <h3 className="text-[20px] md:text-24 font-medium text-white mb-2 leading-tight tracking-tight">
                  {result.title}
                </h3>
                <p className="text-[14px] md:text-14 text-white/50 leading-relaxed max-w-full md:max-w-[90%]">
                  {result.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
