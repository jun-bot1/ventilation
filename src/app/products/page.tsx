'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/product/CategoryCard';
import { CATEGORY_LIST } from '@/lib/constants';
import { useConsultationStore } from '@/stores/consultation-store';
import type { Category } from '@/types';

export default function ProductsPage() {
  const router = useRouter();
  const setCategory = useConsultationStore((s) => s.setCategory);

  const handleCategorySelect = (categoryId: Category) => {
    setCategory(categoryId);
    router.push(`/products/${categoryId}`);
  };

  return (
    <div className="h-dvh bg-white flex flex-col overflow-hidden">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 px-5 pt-[4dvh] pb-[2dvh]"
      >
        <h1 className="text-[clamp(20px,3.5dvh,28px)] font-bold text-gray-900 leading-tight">
          어떤 제품을<br />찾고 계세요?
        </h1>
        <p className="mt-[0.8dvh] text-[clamp(12px,1.6dvh,14px)] text-gray-500">원하시는 제품 유형을 선택해주세요</p>
      </motion.div>

      {/* 카테고리 카드 목록 */}
      <div className="flex-1 min-h-0 px-5 pb-[2dvh] flex flex-col gap-[clamp(8px,1.2dvh,16px)]">
        {CATEGORY_LIST.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onClick={() => handleCategorySelect(category.id as Category)}
          />
        ))}
      </div>
    </div>
  );
}
