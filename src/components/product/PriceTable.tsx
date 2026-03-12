'use client';

import { motion } from 'framer-motion';
import { formatPrice, formatMonthlyPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface PriceTableProps {
  product: Product;
}

export default function PriceTable({ product }: PriceTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="px-5 mt-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-3">가격 안내</h2>
      <div className="space-y-3">
        {/* 렌탈 가격 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
              렌탈 ({product.rentalPrice.period}개월)
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">자가관리</p>
              <p className="text-xl font-bold text-primary-500">{formatMonthlyPrice(product.rentalPrice.selfManaged)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">방문관리</p>
              <p className="text-xl font-bold text-primary-500">{formatMonthlyPrice(product.rentalPrice.visitManaged)}</p>
            </div>
          </div>
        </div>

        {/* 구매 가격 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-1.5">
                구매
              </span>
              <p className="text-sm text-gray-500">한 번에 내 것으로</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">{formatPrice(product.purchasePrice)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
