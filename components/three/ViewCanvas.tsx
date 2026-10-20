'use client';
import { Loader, useProgress, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';

function UnlockPageAfterLoad() {
  const active = useProgress((state) => state.active);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (active) {
      hasLoaded.current = true;
      return;
    }

    if (hasLoaded.current) {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [active]);

  return null;
}

type Props = {};
export default function ViewCanvas({}: Props) {
  return (
    <>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 30,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <UnlockPageAfterLoad />
      <Loader />
    </>
  );
}
