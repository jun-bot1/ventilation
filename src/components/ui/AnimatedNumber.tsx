'use client';

import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  formatter?: (value: number) => string;
}

export default function AnimatedNumber({
  value,
  className,
  formatter = (v) => new Intl.NumberFormat('ko-KR').format(Math.round(v)),
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 800,
    bounce: 0,
  });
  const displayValue = useTransform(springValue, formatter);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      motionValue.set(value);
      isFirstRender.current = false;
    } else {
      motionValue.set(value);
    }
  }, [value, motionValue]);

  return <motion.span className={className}>{displayValue}</motion.span>;
}
