'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsultationStore } from '@/stores/consultation-store';
import OrderPageLayout from '@/components/order/OrderPageLayout';
import OrderTypeSelector from '@/components/order/OrderTypeSelector';
import { useProductPrice } from '@/hooks/useProductPrice';
import { formatPrice, formatMonthlyPrice } from '@/lib/utils';
import type { OrderType } from '@/types';

export default function OrderPage() {
  const router = useRouter();
  const { orderType, setOrderType, setStep, selectedModel } = useConsultationStore();

  const handleSelect = (type: OrderType) => {
    setOrderType(type);
  };

  const handleNext = () => {
    if (!orderType) return;
    setStep(2);
    router.push('/order/photos');
  };

  useEffect(() => {
    if (!selectedModel) {
      router.replace('/');
    }
  }, [selectedModel, router]);

  const result = useProductPrice(selectedModel);

  if (!selectedModel || !result) {
    return null;
  }

  const {
    product,
    rentalPrice,
    purchasePrice,
    hasPriceOptions,
    pyeongLabel,
    controllerLabel,
    monitorLabel,
  } = result;

  return (
    <OrderPageLayout
      title="주문 방식 선택"
      step={1}
      onNext={handleNext}
      ctaDisabled={!orderType}
    >
      {/* 선택한 제품 정보 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
        <p className="text-sm text-gray-500 mb-1">선택한 제품</p>
        <p className="text-base font-bold text-gray-900">{product.name}</p>
        {hasPriceOptions && (
          <p className="text-sm text-gray-500 mt-1">
            {pyeongLabel} · {controllerLabel}{monitorLabel}
          </p>
        )}
        <div className="mt-3 flex gap-4 border-t border-gray-200 pt-3 h-14 items-center">
          {/* 렌탈 가격 */}
          <div className="relative px-3 py-1.5">
            <p className="text-xs text-gray-400">렌탈</p>
            <p className={`font-semibold transition-all duration-300 ${orderType === 'rental' ? 'text-lg text-primary-600' : 'text-sm text-primary-400'}`}>
              {formatMonthlyPrice(rentalPrice)}
            </p>
            <AnimatePresence>
              {orderType === 'rental' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute inset-0 border-[2.5px] border-orange-400 rounded-lg pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
          {/* 구매 가격 */}
          <div className="relative px-3 py-1.5">
            <p className="text-xs text-gray-400">구매</p>
            <p className={`font-semibold transition-all duration-300 ${orderType === 'purchase' ? 'text-lg text-gray-900' : 'text-sm text-gray-500'}`}>
              {formatPrice(purchasePrice)}
            </p>
            <AnimatePresence>
              {orderType === 'purchase' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute inset-0 border-[2.5px] border-orange-400 rounded-lg pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">어떤 방식을 원하세요?</h2>
        <p className="text-sm text-gray-500">원하시는 주문 방식을 선택해 주세요.</p>
      </div>

      <OrderTypeSelector selected={orderType} onSelect={handleSelect} />
    </OrderPageLayout>
  );
}
