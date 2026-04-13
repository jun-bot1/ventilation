'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ModelCard from '@/components/product/ModelCard';
import BackButton from '@/components/ui/BackButton';
import { PRODUCTS, CATEGORIES } from '@/lib/constants';

export default function DehumidifierPage() {
  const router = useRouter();

  const models = CATEGORIES['dehumidifier'].models.map((id) => PRODUCTS[id]);

  return (
    <div className="h-dvh bg-white flex flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="shrink-0 px-5 pt-[2dvh] pb-1 flex items-center gap-2">
        <BackButton href="/products" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 px-5 pb-[2dvh]"
      >
        <h1 className="text-[clamp(20px,3.5dvh,28px)] font-bold text-gray-900 leading-tight">
          제습환기청정기
        </h1>
        <p className="mt-[0.5dvh] text-[clamp(12px,1.6dvh,14px)] text-gray-500">습도 조절과 환기를 한번에</p>
      </motion.div>

      {/* 모델 목록 */}
      <div className="flex-1 min-h-0 px-5 pb-[2dvh] flex flex-col gap-[clamp(6px,1dvh,12px)]">
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
