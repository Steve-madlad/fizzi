'use client';

import { Float } from '@react-three/drei';
import { forwardRef, ReactNode } from 'react';
import { Group } from 'three';
import { SodaCan, SodaCanProps } from './SodaCan';

type FloatingCanProps = {
  flavor?: SodaCanProps['flavor'];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  ({
    flavor = 'blackCherry',
    floatSpeed = 3,
    rotationIntensity = 1,
    floatIntensity = 1,
    floatRange = [-0.1, 0.1],
    children,
    ...props
  }, ref) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatRange}
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  },
);
FloatingCan.displayName = 'FloatingCan';

export default FloatingCan;
