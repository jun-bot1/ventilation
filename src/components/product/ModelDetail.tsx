'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCT_DETAIL_IMAGES } from '@/lib/constants';
import type { Product } from '@/types';

interface ModelDetailProps {
  product: Product;
}

export default function ModelDetail({ product }: ModelDetailProps) {
  const [open, setOpen] = useState(false);
  const images = PRODUCT_DETAIL_IMAGES[product.id] ?? [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden mx-5">
          <Image src={product.image} alt={product.name} fill className="object-contain p-8" priority sizes="(max-width: 480px) 100vw, 480px" />
        </div>

        <div className="px-5 mt-6">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          <p className="mt-1 text-base text-gray-500">{product.subtitle}</p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {images.length > 0 && (
          <div className="px-5 mt-5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#6B7280" strokeWidth="1.2" />
                <path d="M9 5.5V9.5M9 12V12.01" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">제품 상세보기</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-0.5">
                <path d="M5.5 3L9.5 7L5.5 11" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

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

      {/* 제품 상세 이미지 모달 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            {/* 배경 클릭으로 닫기 */}
            <div className="absolute inset-0" onClick={() => setOpen(false)} />

            {/* 모달 본체 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[480px] h-full bg-white overflow-hidden flex flex-col shadow-xl"
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
                <h2 className="text-base font-semibold text-gray-900">제품 상세</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5L15 15M15 5L5 15" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* 이미지 목록 */}
              <div className="flex-1 overflow-y-auto">
                {images.map((src, i) => (
                  <div key={i} className="relative w-full">
                    <Image
                      src={src}
                      alt={`${product.name} 상세 ${i + 1}`}
                      width={480}
                      height={640}
                      className="w-full h-auto block"
                      priority={i < 2}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
