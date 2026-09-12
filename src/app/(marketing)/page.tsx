import Navbar from '@/components/marketing/layout/Navbar';
import Footer from '@/components/marketing/layout/Footer';
import Hero from '@/components/marketing/sections/Hero';
import Integrate from '@/components/marketing/sections/Integrate';
import OmniChannel from '@/components/marketing/sections/OmniChannel';
import Fable from '@/components/marketing/sections/Fable';
import Results from '@/components/marketing/sections/Results';
import Quote from '@/components/marketing/sections/Quote';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <Navbar />
      <Hero />
      <Integrate />
      <OmniChannel />
      <Fable />
      <Results />
      <Quote />
      <Footer />
    </main>
  );
}
