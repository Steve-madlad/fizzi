'use client';

import { Container } from '@/components/Container';
import { View } from '@react-three/drei';
import Scene from './Scene';

const title = 'Dive into better health';

export default function Dive() {
  return (
    <Container className="skydive h-dvh">
      <h2 className="sr-only">Fizzi - Soda for Gutsy people</h2>

      <View className="h-dvh w-screen">
        <Scene sentence={title} flavor="blackCherry" />
      </View>
    </Container>
  );
}
