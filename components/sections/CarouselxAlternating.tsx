import { useRef } from 'react';
import AlternatingInfo from './alternating/AlternatingInfo';
import CarouselSection from './carousel/CarouselSection';

export default function CarouselxAlternating() {
  const endWaveRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <CarouselSection endWaveRef={endWaveRef}/>
      <AlternatingInfo ref={endWaveRef}/>
    </>
  );
}
