'use client';

import FloatingCan from '@/components/three/Floating';
import { SodaCanProps } from '@/components/three/SodaCan';
import { WavyCircles } from '@/components/WavyCircles';
import { useGSAP } from '@gsap/react';
import { Center, Environment, View } from '@react-three/drei';
import gsap from 'gsap';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Group } from 'three';

const spinsOnChange = 8;
const FLAVORS: {
  flavor: SodaCanProps['flavor'];
  color: string;
  name: string;
}[] = [
  { flavor: 'blackCherry', color: '#710523', name: 'Black Cherry' },
  { flavor: 'grape', color: '#572981', name: 'Grape Goodness' },
  { flavor: 'lemonLime', color: '#164405', name: 'Lemon Lime' },
  {
    flavor: 'strawberryLemonade',
    color: '#690B3D',
    name: 'Strawberry Lemonade',
  },
  { flavor: 'watermelon', color: '#4B7002', name: 'Watermelon Crush' },
];

type Props = {};

export default function CarouselSection({}: Props) {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState<number>(0);
  console.log({ currentFlavorIndex });
  const sodaCanRef = useRef<Group>(null);

  useGSAP(() => {
    gsap.set('.wavy-circles-outer, .wavy-circles-inner', {
      backgroundColor: FLAVORS[currentFlavorIndex].color,
      fill: FLAVORS[currentFlavorIndex].color,
    });
  });

  const changeFlavor = (index: number) => {
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();
    if (sodaCanRef.current) {
      tl.to(
        sodaCanRef.current?.rotation,
        {
          y:
            index > currentFlavorIndex
              ? `+=${Math.PI * 2 * spinsOnChange}`
              : `-=${Math.PI * 2 * spinsOnChange}`,
          ease: 'power2.inOut',
          duration: 1,
        },
        0,
      )
        .to(
          '.background, .wavy-circles-outer, .wavy-circles-inner',
          {
            backgroundColor: FLAVORS[nextIndex].color,
            fill: FLAVORS[nextIndex].color,
            ease: 'power2.inOut',
          },
          0.3,
        )
        .to(
          '.text-wrapper',
          {
            duration: 0.2,
            y: -10,
            opacity: 0,
          },
          0,
        )
        .to(
          '.text-wrapper',
          {
            y: 0,
            opacity: 1,
          },
          0.6,
        )
        .to(
          {},
          {
            onStart: () => {
              setCurrentFlavorIndex(nextIndex);
            },
          },
          0.5,
        );
    }
    setTimeout(() => {}, 300);
  };

  return (
    <section className="carousel relative grid h-[110vh] grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background abs-fill pointer-events-none bg-[#710523] opacity-50"></div>
      <WavyCircles className="absolute top-1/2 left-1/2 h-[110vmin] -translate-1/2 text-[#710523]" />
      <h2 className="relative text-center text-5xl font-bold">Choose your flavor</h2>
      <div className="grid grid-cols-[auto_auto_auto] items-center">
        <button
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          className="cursor flex-center group relative z-20 size-12 rounded-full duration-200 hover:scale-125 focus-visible:scale-125"
        >
          <WavyCircles
            className="abs-fill group-focus-visible:animate-spin hover:animate-spin"
            notAnimated={true}
          />
          <MoveLeft />
        </button>
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <group ref={sodaCanRef}>
              <FloatingCan
                flavor={FLAVORS[currentFlavorIndex].flavor}
                floatIntensity={0.3}
                rotationIntensity={1}
              />
            </group>
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        <button
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          className="cursor flex-center group relative z-20 size-12 rounded-full duration-200 hover:scale-125 focus-visible:scale-125"
        >
          <WavyCircles
            className="abs-fill group-focus-visible:animate-spin hover:animate-spin"
            fill="#710523"
            notAnimated={true}
          />
          <MoveRight />
        </button>
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <p>12 cans - $69.99</p>
        </div>
      </div>
    </section>
  );
}
