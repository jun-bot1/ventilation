'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  className?: string;
}

export default function ProgressBar({ step, totalSteps, className }: ProgressBarProps) {
  const progress = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className={cn('h-[3px] bg-gray-100 w-full', className)}>
      <div
        className="h-full bg-primary-500 transition-[width] duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
