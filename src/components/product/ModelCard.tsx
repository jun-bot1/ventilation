'use client';

import { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { cn, formatPrice, formatMonthlyPrice } from '@/lib/utils';
import { STAGGER_DELAY } from '@/lib/animations';
import type { Product } from '@/types';

interface ModelCardProps {
  product: Product;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
  horizontal?: boolean;
}

function ModelCard({ product, selected = false, onClick, index = 0, horizontal = false }: ModelCardProps) {
  const subtitleContent = product.subtitle.includes('·') ? (
    <>
      {product.subtitle.split('·')[0]}·{' '}
      <span className="font-semibold text-red-500">{product.subtitle.split('·')[1].trim()}</span>
    </>
  ) : product.subtitle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * STAGGER_DELAY, duration: 0.3 }}
      className="flex-1 min-h-0"
    >
      <Card selected={selected} onClick={onClick} className={cn(
        "h-full overflow-hidden p-0",
        horizontal ? "flex flex-row" : "flex flex-col"
      )}>
        {/* 이미지 */}
        <div className={cn(
          "relative bg-gray-50",
          horizontal ? "w-[35%] shrink-0" : "flex-1 min-h-0"
        )}>
          <Image src={product.image} alt={product.name} fill className="object-contain p-[clamp(4px,0.8dvh,12px)]" sizes="(min-height: 680px) 100vw, 35vw" />
        </div>
        {/* 텍스트 */}
        <div className={cn(
          "flex items-center gap-2",
          horizontal ? "flex-1 px-3 py-[clamp(4px,0.8dvh,10px)]" : "shrink-0 px-4 py-[clamp(6px,1dvh,12px)]"
        )}>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-semibold leading-snug truncate',
              horizontal ? 'text-[clamp(11px,1.3dvh,14px)]' : 'text-[clamp(13px,1.8dvh,16px)]',
              selected ? 'text-primary-600' : 'text-gray-900'
            )}>
              {product.name}
            </h3>
            <p className={cn(
              "mt-0.5 text-gray-500",
              horizontal ? "text-[clamp(10px,1.2dvh,12px)]" : "text-[clamp(11px,1.4dvh,13px)]"
            )}>
              {subtitleContent}
            </p>
            <div className={cn(
              "flex gap-3",
              horizontal ? "mt-1 flex-col gap-0.5" : "mt-1.5 gap-4"
            )}>
              <p className={cn(
                "text-gray-500",
                horizontal ? "text-[clamp(11px,1.3dvh,13px)]" : "text-[clamp(12px,1.6dvh,15px)]"
              )}>
                렌탈: <span className="font-semibold text-gray-900">{formatMonthlyPrice(product.rentalPrice.selfManaged)}~</span>
              </p>
              <p className={cn(
                "text-gray-500",
                horizontal ? "text-[clamp(11px,1.3dvh,13px)]" : "text-[clamp(12px,1.6dvh,15px)]"
              )}>
                구매: <span className="font-semibold text-gray-900">{formatPrice(product.purchasePrice)}</span>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default memo(ModelCard);
