import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Integrate from "@/components/sections/Integrate";
import OmniChannel from "@/components/sections/OmniChannel";
import Fable from "@/components/sections/Fable";
import Results from "@/components/sections/Results";
import Quote from "@/components/sections/Quote";

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
