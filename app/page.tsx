'use client';

import BeltSection from '@/components/sections/belt/BeltSection';
import CarouselxAlternating from '@/components/sections/CarouselxAlternating';
import Dive from '@/components/sections/dive/DiveSection';
import Hero from '@/components/sections/hero/HeroSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

if (ScrollTrigger.isTouch === 1) {
  ScrollTrigger.normalizeScroll(true);
}
export default function Home() {
  return (
    <div>
      <Hero />
      <Dive />
      <CarouselxAlternating />
      <BeltSection />
    </div>
  );
}
