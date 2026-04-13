'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SelectOption } from '@/types';

interface OptionSelectorProps {
  title: string;
  options: SelectOption[];
  selected: string | null;
  onSelect: (id: string) => void;
  delay?: number;
  required?: boolean;
}

export default function OptionSelector({
  title,
  options,
  selected,
  onSelect,
  delay = 0.05,
  required = false,
}: OptionSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="px-5 mt-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {required && !selected && (
          <span className="text-xs text-red-500 font-medium">필수</span>
        )}
      </div>
      <div className="flex gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              'flex-1 py-3.5 rounded-2xl text-sm font-semibold border-2 transition-all',
              selected === option.id
                ? 'border-red-500 bg-red-50 text-red-600'
                : 'border-gray-200 bg-white text-gray-500'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
