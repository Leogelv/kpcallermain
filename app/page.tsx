'use client';

import HeroSection from './components/sections/HeroSection';
import AdvantagesSection from './components/sections/AdvantagesSection';
import BusinessSection from './components/sections/BusinessSection';
import InnovationSection from './components/sections/InnovationSection';
import PricingSection from './components/sections/PricingSection';
import StatsSection from './components/sections/StatsSection';
import GradientBlobs from './components/GradientBlobs';

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Анимированные градиентные блобы */}
      <GradientBlobs />
      
      <HeroSection />
      <AdvantagesSection />
      <BusinessSection />
      <InnovationSection />
      <PricingSection />
      <StatsSection />
    </main>
  );
}
