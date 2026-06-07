'use client';
import BunchedCans from '@/public/bunched-cans.png';
import Image from 'next/image';
import { useEffect } from 'react';
import { Container } from '../Container';
import { TextSplitter } from '../TextSplitter';

export default function Hero() {
  useEffect(() => {
    console.log(document.body.clientWidth);
  }, []);
  return (
    <Container className="hero">
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl leading-[.8] font-black text-orange-500 uppercase md:text-[9rem] 3xl:text-[13rem]">
              <TextSplitter
                text="Live Gutsy"
                className="hero-header-word"
                wordDisplayStyle="block"
              />
            </h1>
            <h2 className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 3xl:text-6xl">
              Soda Perfected
            </h2>
            <p className="hero-body text-xl font-normal text-sky-950 3xl:text-2xl">
              3-5g sugar, 9g fiber, 5 delicious flavors{' '}
            </p>
            <button className="hero-button cursor mt-12 rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-orange-700 3xl:text-2xl">
              Shop now
            </button>
          </div>
        </div>

        <div className="text-side relative z-80 grid h-screen items-center gap-4 md:grid-cols-2">
          <Image className="w-full md:hidden" src={BunchedCans} alt="Bunched Cans" />
          <div>
            <h2 className="text-side-heading text-6xl font-black text-balance text-sky-950 uppercase lg:text-8xl">
              <TextSplitter text="try all five flavours" />
            </h2>
            <p className="text-side-body mt-4 max-w-xl text-xl font-normal text-balance text-sky-950">
              Our soda is made with real fruit juice and a touch of cane sugar. We never use
              artificial sweeteners or high fructose corn syrup. Try all five flavors and find your
              favorite!
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
