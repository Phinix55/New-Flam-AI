import Image from 'next/image';

export default function Fable() {
  return (
    <section className="w-full bg-[#111111] pt-8 pb-12 md:pt-12 md:pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <h2 className="text-[24px] md:text-60 font-medium text-[#f4ecd8] text-center mb-8 md:mb-16 max-w-4xl leading-[1.2] md:leading-[1.1] tracking-tight">
          Fable 2 to generate product animations & stories from text
        </h2>
        
        {/* Main Image Area */}
        <div className="relative w-full mx-auto flex justify-center">
          
          {/* Desktop Image */}
          <Image
            src="/assets/4th-fold-hq.webp"
            alt="Fable 2 Generation Flow Desktop"
            width={1232}
            height={733}
            className="hidden md:block w-full h-auto max-w-[1232px] rounded-2xl object-contain"
            priority
          />
          
          {/* Mobile Image */}
          <Image
            src="/assets/fable-section-image.webp"
            alt="Fable 2 Generation Flow Mobile"
            width={398}
            height={1308}
            className="block md:hidden w-full h-auto rounded-[24px] object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
