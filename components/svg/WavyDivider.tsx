import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface WaveDividerProps {
  className?: string;
  fill?: string;
  animate?: boolean;
  direction?: 'forwards' | 'backwards';
}

const WAVE_PATH =
  'M0,0 L0,75 C60,75 140,130 220,90 C280,60 320,140 400,120 C500,95 520,40 620,70 C720,100 760,160 860,130 C940,105 980,50 1080,80 C1180,115 1240,150 1320,110 C1380,90 1380,75 1440,75 L1440,160 L0,160 Z';

export const WaveDivider = forwardRef<SVGPathElement, WaveDividerProps>(
  ({ fill = '#b88291', className, animate = true, direction = 'forwards' }, ref) => {
    const animationStyle = animate
      ? { animation: direction === 'forwards' ? 'var(--convey-fw)' : 'var(--convey-bk)' }
      : undefined;

    return (
      <div className={cn('relative h-15 md:h-32 w-full overflow-hidden', className)}>
        <svg
          className="absolute top-0 left-0 h-full w-[200%]"
          viewBox="0 0 2880 160"
          preserveAspectRatio="none"
          style={animationStyle}
        >

          <path ref={ref} fill={fill} d={WAVE_PATH} />
          <path fill={fill} d={WAVE_PATH} transform="translate(1440, 0)" />
        </svg>
      </div>
    );
  },
);

WaveDivider.displayName = 'WaveDivider';
