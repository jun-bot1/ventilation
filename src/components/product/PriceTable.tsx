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
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full mb-1.5">
                렌탈
              </span>
              <p className="text-sm text-gray-500">매월 부담 없이</p>
            </div>
            <div className="text-right">
              {product.rentalPrice === null ? (
                <p className="text-base font-semibold text-gray-400">추후 안내</p>
              ) : (
                <p className="text-xl font-bold text-primary-500">{formatMonthlyPrice(product.rentalPrice)}</p>
              )}
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
              {product.purchasePrice === null ? (
                <p className="text-base font-semibold text-gray-400">추후 안내</p>
              ) : (
                <p className="text-xl font-bold text-gray-900">{formatPrice(product.purchasePrice)}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {(product.rentalPrice === null || product.purchasePrice === null) && (
        <p className="mt-3 text-xs text-gray-400 text-center">
          정확한 가격은 상담을 통해 안내드립니다
        </p>
      )}
    </motion.div>
  );
}
