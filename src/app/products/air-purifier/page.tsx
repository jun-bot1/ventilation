'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ModelCard from '@/components/product/ModelCard';
import { PRODUCTS } from '@/lib/constants';

export default function AirPurifierPage() {
  const router = useRouter();

  const models = [
    PRODUCTS['TAA931'],
    PRODUCTS['TAA530'],
    PRODUCTS['TAE330'],
    PRODUCTS['TAE530'],
  ];

  return (
    <div className="min-h-dvh bg-white pb-10">
      {/* 헤더 */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <Link href="/products">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15l-5-5 5-5" stroke="#191F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-5 pb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          매직플러스 환기청정기
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">깨끗한 공기를 우리 집으로</p>
      </motion.div>

      {/* 모델 목록 (stagger) */}
      <div className="px-5 space-y-3">
        {models.map((product, index) => (
          <ModelCard
            key={product.id}
            product={product}
            index={index}
            onClick={() => router.push(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
