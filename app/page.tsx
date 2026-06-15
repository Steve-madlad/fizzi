'use client';

import AlternatingInfo from '@/components/sections/alternating/AlternatingInfo';
import Carousel from '@/components/sections/carousel/CarouselSection';
import Dive from '@/components/sections/dive/DiveSection';
import Hero from '@/components/sections/hero/HeroSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)
export default function Home() {
  return (
    <div>
      <Hero />
      <Dive /> 
      <Carousel />
      <AlternatingInfo/>
    </div>
  );
}
