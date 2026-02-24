'use client';

import { useParams, useRouter, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ModelDetail from '@/components/product/ModelDetail';
import PriceTable from '@/components/product/PriceTable';
import Button from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/constants';
import { useConsultationStore } from '@/stores/consultation-store';
import type { ModelId } from '@/types';

export default function ModelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const setModel = useConsultationStore((s) => s.setModel);

  const modelId = params.modelId as string;
  const product = PRODUCTS[modelId as ModelId];

  if (!product) {
    notFound();
  }

  const handleConsult = () => {
    setModel(product.id);
    router.push('/order');
  };

  // 뒤로 가기 경로 결정
  const backHref = `/products/${product.category}`;

  return (
    <div className="min-h-dvh bg-white pb-32">
      {/* 헤더 */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <Link href={backHref}>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15l-5-5 5-5" stroke="#191F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </Link>
        <span className="text-sm text-gray-500 font-medium">{product.id}</span>
      </div>

      {/* 모델 상세 */}
      <div className="mt-2">
        <ModelDetail product={product} />
      </div>

      {/* 가격 테이블 */}
      <PriceTable product={product} />

      {/* 하단 CTA - fixed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-5 pb-6 pt-3 bg-white border-t border-gray-100 shadow-[0_-1px_3px_rgba(0,0,0,0.06)]"
      >
        <Button fullWidth onClick={handleConsult}>
          이 제품으로 상담하기
        </Button>
      </motion.div>
    </div>
  );
}
