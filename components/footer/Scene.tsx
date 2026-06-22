import { Environment } from "@react-three/drei";
import FloatingCan from "../three/Floating";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SodaCanProps } from "../three/SodaCan";
import { Group } from "three";

export interface FooterCanLayout {
  flavor: SodaCanProps['flavor'];
  x: number;
  y: number;
  scale?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
};

const RESTING_SCALE = 0.8;

function FooterCansScene({
  cansLayout,
  triggerRef,
}: {
  cansLayout: FooterCanLayout[];
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const can1 = useRef<Group>(null);
  const can2 = useRef<Group>(null);
  const can3 = useRef<Group>(null);
  const can4 = useRef<Group>(null);
  const cans = [can1, can2, can3, can4];

  useGSAP(() => {
    const activeCans = cans.slice(0, cansLayout.length);

    if (!triggerRef.current || activeCans.some((ref) => !ref.current)) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 640px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1.5,
        },
      });

      activeCans.forEach((ref, index) => {
        const { x, y } = cansLayout[index];

        tl.fromTo(
          ref.current!.position,
          { x, y: y - 1.5, z: 3 },
          { x, y, z: 0, duration: 1, ease: 'power2.out' },
          0,
        )
          .fromTo(
            ref.current!.rotation,
            { y: 0, x: -1 },
            { y: Math.PI * 6, x: 0, duration: 1, ease: 'power2.out' },
            0,
          )
          .fromTo(
            ref.current!.scale,
            { x: 1.15, y: 1.15, z: 1.15 },
            {
              x: RESTING_SCALE,
              y: RESTING_SCALE,
              z: RESTING_SCALE,
              duration: 1,
              ease: 'power2.out',
            },
            0,
          );
      });
    });

    return () => mm.revert();
  }, [cansLayout, triggerRef]);

  return (
    <>
      {cansLayout.map((can, index) => (
        <group key={can.flavor} ref={cans[index]} position={[can.x, can.y, 0]}>
          <FloatingCan
            flavor={can.flavor}
            scale={can.scale}
            floatIntensity={can.floatIntensity}
            rotationIntensity={can.rotationIntensity}
          />
        </group>
      ))}
      <ambientLight intensity={1.5} color="#9DDEFA" />
      <directionalLight position={[2, 4, 3]} intensity={1.5} />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.2} />
    </>
  );
}

function MobileCanScene() {
  const canRef = useRef<Group>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 639px)', () => {
      const mobileScale = 0.7;

      if (!canRef.current) return;

      gsap.set(canRef.current.scale, {
        x: mobileScale,
        y: mobileScale,
        z: mobileScale,
      });
      gsap.set(canRef.current.position, {
        y: 0.5,
      });
    });

    return () => mm.revert();
  }, [canRef]);

  return (
    <group>
      <FloatingCan ref={canRef} />
      <ambientLight intensity={1.5} color="#9DDEFA" />
      <directionalLight position={[2, 4, 3]} intensity={1.5} />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.2} />
    </group>
  );
}

export {
  MobileCanScene,
  FooterCansScene
}