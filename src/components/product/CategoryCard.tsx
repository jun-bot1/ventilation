'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { STAGGER_DELAY } from '@/lib/animations';
import type { CategoryInfo } from '@/types';

interface CategoryCardProps {
  category: CategoryInfo;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

function CategoryCard({ category, selected = false, onClick, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * STAGGER_DELAY, duration: 0.3 }}
      className="flex-1 min-h-0"
    >
      <Card selected={selected} onClick={onClick} className="overflow-hidden p-0 h-full flex flex-row tall:flex-col">
        <div className="relative w-[35%] tall:w-full shrink-0 tall:shrink tall:flex-1 tall:min-h-0 bg-gray-50 tall:rounded-t-2xl overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-contain p-[clamp(6px,1dvh,24px)]"
            sizes="(min-height: 680px) 100vw, 35vw"
          />
        </div>
        <div className="flex-1 tall:flex-none px-3 tall:px-5 py-[clamp(6px,1dvh,16px)] flex flex-col justify-center">
          <h2 className={cn(
            'text-[clamp(14px,2dvh,20px)] font-semibold leading-snug',
            selected ? 'text-primary-600' : 'text-gray-900'
          )}>
            {category.name}
          </h2>
          <p className="mt-0.5 text-[clamp(11px,1.4dvh,14px)] text-gray-600">{category.description}</p>
          <p className="mt-1 text-[clamp(10px,1.2dvh,12px)] text-gray-400">{category.models.length}개 모델</p>
        </div>
      </Card>
    </motion.div>
  );
}

export default memo(CategoryCard);
