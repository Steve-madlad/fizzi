'use client';

import { OrbitControls, View } from '@react-three/drei';
import { Container } from '../Container';
import Scene from './Dive/Scene';

const title = "Dive into better health"
// Fizzi - Soda for Gutsy people

export default function Dive() {
  return (
    <Container className="skydive h-screen">
      <h2 className="sr-only">Fizzi - Soda for Gutsy people</h2>

      <View className='size-screen'>
        <Scene sentence={title} flavor='blackCherry'/>
        {/* <OrbitControls/> */}
      </View>
    </Container>
  );
}
