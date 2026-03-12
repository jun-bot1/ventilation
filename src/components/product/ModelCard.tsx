'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { cn, formatPrice, formatMonthlyPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ModelCardProps {
  product: Product;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export default function ModelCard({ product, selected = false, onClick, index = 0 }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
    >
      <Card selected={selected} onClick={onClick}>
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
          </div>
          {/* 텍스트 영역 */}
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'text-base font-semibold leading-snug',
              selected ? 'text-primary-600' : 'text-gray-900'
            )}>
              {product.name}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">{product.subtitle}</p>
            <div className="mt-2 space-y-0.5">
              <p className="text-xs text-gray-500">
                렌탈: <span className="font-medium text-gray-700">{formatMonthlyPrice(product.rentalPrice.selfManaged)}~</span>
              </p>
              <p className="text-xs text-gray-500">
                구매: <span className="font-medium text-gray-700">{formatPrice(product.purchasePrice)}</span>
              </p>
            </div>
          </div>
          {/* 화살표 */}
          <div className="flex-shrink-0 flex items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
