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
    <div className="min-h-dvh bg-white pb-10">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-5 pt-14 pb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          어떤 제품을<br />찾고 계세요?
        </h1>
        <p className="mt-2 text-sm text-gray-500">원하시는 제품 유형을 선택해주세요</p>
      </motion.div>

      {/* 카테고리 카드 목록 */}
      <div className="px-5 space-y-4">
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
