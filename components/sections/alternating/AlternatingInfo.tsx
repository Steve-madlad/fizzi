'use client';

import { Container } from '@/components/Container';
import { WaveDivider } from '@/components/svg/WavyDivider';
import { View } from '@react-three/drei';
import { forwardRef } from 'react';
import Scene from './Scene';

const textInfo = [
  {
    heading: 'Gut-Friendly Goodness',
    subHeading:
      'Our soda is packed with prebiotics and 1 billion probiotics, giving your gut the love it deserves. Say goodbye to bloating and hello to a happy, healthy digestive system with every sip.',
  },
  {
    heading: 'Light Calories, Big Flavor',
    subHeading:
      'Indulge in bold, refreshing taste without the guilt. At just 20 calories per can, you can enjoy all the flavor you crave with none of the compromise.',
  },
  {
    heading: 'Naturally Refreshing',
    subHeading:
      'Made with only the best natural ingredients, our soda is free from artificial sweeteners and flavors. It’s a crisp, clean taste that feels as good as it tastes, giving you a boost of real, natural refreshment.',
  },
];

function AlternatingInfo({}, waveRef: React.ForwardedRef<HTMLDivElement>) {
  return (
    <>
      <div ref={waveRef} className="bg-[#b88291]">
        <WaveDivider fill="#FFA6B5" />
      </div>
      <Container className="alternating-text-container relative bg-[#FFA6B5]">
        <div>
          <div className="relative grid py-60 md:py-0">
            <View className="alternating-can-view absolute top-0 left-0 h-screen w-full">
              <Scene />
            </View>
            {textInfo.map((info, index) => (
              <div
                key={info.heading}
                className="alternating-section grid h-screen place-items-center gap-x-12 text-sky-950 md:grid-cols-2"
              >
                <div className={index % 2 === 0 ? 'col-start-1' : 'md:col-start-2'}>
                  <h2 className="text-6xl font-bold text-balance">{info.heading}</h2>
                  <p className="mt-4 text-xl">{info.subHeading}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

AlternatingInfo.displayName = 'AlternatingInfo';
export default forwardRef(AlternatingInfo);
