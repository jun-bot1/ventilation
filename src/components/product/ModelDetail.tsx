'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/types';

interface ModelDetailProps {
  product: Product;
}

export default function ModelDetail({ product }: ModelDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 큰 이미지 플레이스홀더 */}
      <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center mx-5">
        <span className="text-gray-400 text-lg font-semibold">{product.id}</span>
      </div>

      {/* 모델 정보 */}
      <div className="px-5 mt-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
        <p className="mt-1 text-base text-gray-500">{product.subtitle}</p>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* 스펙 테이블 */}
      {product.specs.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">제품 사양</h2>
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            {product.specs.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex px-5 py-3.5 ${index < product.specs.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <span className="w-32 text-sm text-gray-500 flex-shrink-0">{spec.label}</span>
                <span className="text-sm font-medium text-gray-800">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
