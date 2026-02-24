'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { CategoryInfo } from '@/types';

interface CategoryCardProps {
  category: CategoryInfo;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export default function CategoryCard({ category, selected = false, onClick, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <Card selected={selected} onClick={onClick} className="overflow-hidden p-0">
        {/* 이미지 플레이스홀더 */}
        <div className="aspect-[4/3] bg-gray-100 rounded-t-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm font-medium">{category.name}</span>
        </div>
        <div className="p-5">
          <h2 className={cn(
            'text-xl font-semibold leading-snug',
            selected ? 'text-primary-600' : 'text-gray-900'
          )}>
            {category.name}
          </h2>
          <p className="mt-1 text-sm text-gray-600">{category.description}</p>
          <p className="mt-2 text-xs text-gray-400">{category.models.length}개 모델</p>
        </div>
      </Card>
    </motion.div>
  );
}
