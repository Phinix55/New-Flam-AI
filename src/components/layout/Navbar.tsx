'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileModelsOpen, setIsMobileModelsOpen] = useState(true); // Open by default as per screenshot

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 100);
      
      // Always show at the very top (hero section)
      if (currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } 
      // Show when scrolling up
      else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav className={`fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 w-full md:w-[90%] max-w-[1400px] flex items-center justify-between pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0' : 'translate-y-0 md:-translate-y-32'}`}>
        
        {/* Mobile Navbar View */}
        <div className={`mx-auto md:hidden pointer-events-auto flex items-center justify-between h-[56px] transition-all duration-300 ${isScrolled ? 'w-[calc(100%-2rem)] bg-black/90 backdrop-blur-md rounded-full border border-white/10 px-4' : 'w-full bg-transparent border-transparent px-8'}`}>
          <Link href="/" className="flex items-center ml-2">
            <Image 
              src="/assets/34cec14e-ac8f-452e-b364-ebd4541f534a.svg" 
              alt="Flam Logo" 
              width={76} 
              height={23} 
              className="object-contain brightness-0 invert"
            />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-2 flex flex-col gap-2 items-end">
            <div className="w-6 h-[1.5px] bg-white rounded-full"></div>
            <div className="w-4 h-[1.5px] bg-white rounded-full"></div>
          </button>
        </div>

        {/* Desktop Navbar View - Left Container */}
        <div className="hidden pointer-events-auto md:flex items-center justify-between gap-12 bg-[#00000029] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl rounded-full px-6 h-[64px] w-full max-w-[492px]">
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/34cec14e-ac8f-452e-b364-ebd4541f534a.svg" 
              alt="Flam Logo" 
              width={92} 
              height={28} 
              className="object-contain brightness-0 invert"
            />
          </Link>
          
          <div className="flex items-center gap-8 pr-4">
            <div 
              className="relative cursor-pointer flex items-center gap-2 text-[16px] text-white/80 hover:text-white transition-colors"
              onMouseEnter={() => setIsModelsOpen(true)}
              onMouseLeave={() => setIsModelsOpen(false)}
            >
              Models <ChevronDown className="w-4 h-4 opacity-50" />
              
              {/* Dropdown for Models */}
              {isModelsOpen && (
                <div className="absolute top-full left-0 mt-6 bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 min-w-[200px] flex flex-col gap-1 shadow-2xl">
                  <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-300 to-orange-300" />
                    <span className="text-[14px] text-white">Fable 2</span>
                  </Link>
                  <div className="h-px bg-white/10 mx-4" />
                  <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-300 to-teal-300" />
                    <span className="text-[14px] text-white">Falcon 1</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-colors">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300" />
                    <span className="text-[14px] text-white">Fantom 1</span>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="relative cursor-pointer flex items-center gap-2 text-[16px] text-white/80 hover:text-white transition-colors">
              Solutions <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>
        </div>

        {/* Desktop Navbar View - Right Container */}
        <div className="hidden pointer-events-auto md:flex items-center gap-6 bg-[#00000029] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl rounded-full pl-6 pr-2 h-[64px]">
          <Link href="#" className="text-[12px] uppercase tracking-widest text-white/70 hover:text-white transition-colors font-medium">
            CONTACT US
          </Link>
          <Link href="#" className="bg-white text-black px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-white/90 transition-colors">
            Get Demo
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#050505] pointer-events-auto flex flex-col pt-8 px-6 pb-12 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Image 
                src="/assets/34cec14e-ac8f-452e-b364-ebd4541f534a.svg" 
                alt="Flam Logo" 
                width={76} 
                height={23} 
                className="object-contain brightness-0 invert"
              />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="flex flex-col gap-6 text-[16px] text-white">
            <div className="flex flex-col">
              <div 
                className="flex items-center gap-2 pb-6 cursor-pointer"
                onClick={() => setIsMobileModelsOpen(!isMobileModelsOpen)}
              >
                Models {isMobileModelsOpen ? <ChevronUp className="w-4 h-4 opacity-50" /> : <ChevronDown className="w-4 h-4 opacity-50" />}
              </div>
              
              {isMobileModelsOpen && (
                <div className="flex flex-col border border-white/10 rounded-2xl p-4 bg-white/5 mb-6">
                  <Link href="#" className="flex items-center gap-4 py-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-300 to-orange-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]" />
                    <span>Fable 2</span>
                  </Link>
                  <div className="h-px bg-white/10 mx-2 my-1" />
                  <Link href="#" className="flex items-center gap-4 py-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-300 to-teal-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]" />
                    <span>Falcon 1</span>
                  </Link>
                  <div className="h-px bg-white/10 mx-2 my-1" />
                  <Link href="#" className="flex items-center gap-4 py-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]" />
                    <span>Fantom 1</span>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 pb-6 border-b border-white/10 cursor-pointer">
              Solutions <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
            
            <div className="pb-6 border-b border-white/10 cursor-pointer">
              Contact Us
            </div>
          </div>
          
          {/* Bottom Button */}
          <div className="mt-8">
             <button className="w-full bg-white text-black py-3.5 rounded-full text-[16px] font-medium" onClick={() => setIsMobileMenuOpen(false)}>
               Get Demo
             </button>
          </div>
        </div>
      )}
    </>
  );
}
