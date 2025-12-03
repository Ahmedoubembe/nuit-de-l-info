'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ' ',
  className = '',
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className={className}>
      {inView && (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
        />
      )}
      {!inView && `${prefix}0${suffix}`}
    </span>
  );
}
