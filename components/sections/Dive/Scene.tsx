'use client';

import FloatingCan from '@/components/three/Floating';
import { SodaCanProps } from '@/components/three/SodaCan';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useGSAP } from '@gsap/react';
import { Cloud, Clouds, Environment, Text } from '@react-three/drei';
import gsap from 'gsap';
import { useRef } from 'react';
import * as THREE from 'three';

type Props = {
  sentence: string;
  flavor: SodaCanProps['flavor'];
};

export default function Scene({ sentence, flavor }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const Angle = 75 * (Math.PI / 180);
  const getXPostion = (distance: number) => distance * Math.cos(Angle);
  const getYPostion = (distance: number) => distance * Math.sin(Angle);

  const getXYPositions = (distance: number) => ({
    x: getXPostion(distance),
    y: getYPostion(-1 * distance),
  });

  useGSAP(() => {
    if (
      !groupRef.current ||
      !canRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !cloudsRef.current ||
      !wordsRef.current
    )
      return;

    gsap.set(cloudsRef.current?.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPositions(-4) });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      {
        ...getXYPositions(7),
        z: 2,
      },
    );

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: 'none',
    });

    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPostion(DISTANCE * 2)}`,
      x: `+=${getXPostion(DISTANCE * -2)}`,
      ease: 'none',
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPostion(DISTANCE * 2)}`,
      x: `+=${getXPostion(DISTANCE * -2)}`,
      ease: 'none',
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.skydive',
        pin: true,
        start: 'top top',
        end: '+=2000',
        scrub: 1.5,
      },
    });

    scrollTl
      .to('body', {
        backgroundColor: '#C0F0F5',
        overwrite: 'auto',
        duration: 0.1,
      })
      .to(
        cloudsRef.current.position,
        {
          z: 0,
          duration: 0.3,
        },
        0,
      )
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0.25,
      )
      .to(canRef.current.position, {
        ...getXYPositions(-5),
        duration: 0.5,
        ease: 'back.in(1.7)',
      })
      .to(cloudsRef.current.position, {
        z: 7,
        duration: 0.5,
      });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          floatIntensity={3}
          floatSpeed={3}
          flavor={flavor}
          rotationIntensity={0.7}
          ref={canRef}
        >
          <pointLight intensity={30} color="#8C0413" decay={0.6}></pointLight>
        </FloatingCan>
      </group>

      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]}></Cloud>
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]}></Cloud>
      </Clouds>

      <group ref={wordsRef}>{sentence && <TextThree sentence={sentence} color="#D97315" />}</group>

      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}

function TextThree({ sentence, color = 'white' }: { sentence: string; color?: string }) {
  const words = sentence.toUpperCase().split(' ');

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery('min-width: 950px', true);
  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.4}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff/"
      fontWeight={900}
      anchorX="center"
      anchorY="middle"
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?"
    >
      {word}
    </Text>
  ));
}
