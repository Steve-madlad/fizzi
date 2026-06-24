'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import BunchedCans from '@/public/bunched-cans.png';
import { useAppStore } from '@/store/appStore';
import { useGSAP } from '@gsap/react';
import { View } from '@react-three/drei';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Image from 'next/image';
import { Container } from '../../Container';
import { TextSplitter } from '../../TextSplitter';
import { Bubbles } from '../../three/Bubbles';
import Scene from './Scene';

export default function Hero() {
  const isReady = useAppStore((state) => state.isReady);
  const isDesktop = useMediaQuery('(min-width: 768px)', true);

  useGSAP(() => {
    if (!isReady && isDesktop) return;

    const introTl = gsap.timeline();

    introTl
      .set('.hero', {
        opacity: 1,
      })
      .from('.hero-header-word', {
        scale: 3,
        opacity: 0,
        ease: 'power3.in',
        delay: 0.3,
        stagger: 0.5,
      })
      .from(
        '.hero-subheading',
        {
          opacity: 0,
          y: 30,
        },
        '+=.3',
      )
      .from('.hero-body', {
        opacity: 0,
        y: 10,
      })
      .from('.hero-button', {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions!;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: isMobile ? 'top top' : '10% top',
            end: isMobile ? 'bottom bottom-=250' : 'bottom bottom',
            scrub: 1.5,
          },
        });

        const textBodySplit = SplitText.create('.text-side-body', {
          type: 'words, lines',
          linesClass: 'paragraph-line',
        });

        scrollTl
          .fromTo(
            'body',
            { backgroundColor: '#FDE047' },
            {
              backgroundColor: '#D9F99D',
              overflow: 'auto',
            },
            1,
          )
          .from('.text-side-heading .split-char', {
            scale: 1.3,
            y: 40,
            rotate: -25,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(3)',
            duration: 0.5,
          })
          .from(textBodySplit.words, {
            yPercent: 150,
            opacity: 0,
            rotate: 3,
            ease: 'power1.out',
            stagger: 0.01,
          });
      },
    );
  }, [isReady, isDesktop]);

  return (
    <Container className="hero opacity-0">
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 mt-[-100vh] hidden h-dvh w-screen md:block">
          <Scene />
          <Bubbles count={100} speed={2} bubbleSize={0.12} opacity={0.5} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-[90dvh] place-items-center sm:h-dvh">
          <div className="grid auto-rows-min place-items-center pt-[10dvh] text-center sm:pt-0">
            <h1 className="hero-header 3xl:text-[13rem] text-7xl leading-[.8] font-black text-orange-500 uppercase md:text-[9rem]">
              <TextSplitter
                text="Live Gutsy"
                className="hero-header-word"
                wordDisplayStyle="block"
              />
            </h1>
            <h2 className="hero-subheading 3xl:text-6xl mt-12 text-3xl font-semibold text-sky-950 md:text-5xl">
              Soda Perfected
            </h2>
            <p className="hero-body 3xl:text-2xl text-lg font-normal text-sky-950 md:text-xl">
              3-5g sugar, 9g fiber, 5 delicious flavors
            </p>
            <button className="hero-button cursor 3xl:text-2xl mt-12 rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-orange-700">
              Shop now
            </button>
          </div>
        </div>

        <div className="text-side relative z-80 grid h-screen place-items-center items-center gap-4 md:grid-cols-2">
          <Image
            className="can-image w-10/12 sm:w-8/12 md:hidden"
            priority
            src={BunchedCans}
            alt="Bunched Cans"
          />
          <div className="px-4 md:px-0">
            <h2 className="text-side-heading text-center text-5xl font-black text-balance text-sky-950 uppercase md:text-start md:text-6xl lg:text-8xl">
              <TextSplitter text="try all five flavours" />
            </h2>
            <p className="text-side-body mt-4 max-w-xl overflow-hidden text-center text-xl font-normal text-balance text-sky-950 md:text-start">
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
