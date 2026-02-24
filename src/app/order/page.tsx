'use client';

import { useRouter } from 'next/navigation';
import { useConsultationStore } from '@/stores/consultation-store';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import OrderTypeSelector from '@/components/order/OrderTypeSelector';
import { STEP_LABELS } from '@/types';
import type { OrderType } from '@/types';

export default function OrderPage() {
  const router = useRouter();
  const { orderType, setOrderType, setStep, selectedModel } = useConsultationStore();

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (type: OrderType) => {
    setOrderType(type);
  };

  const handleNext = () => {
    if (!orderType) return;
    setStep(2);
    router.push('/order/photos');
  };

  if (!selectedModel) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <Header title="주문 방식 선택" onBack={handleBack} />
      <ProgressBar step={1} totalSteps={STEP_LABELS.length} />

      <main className="flex-1 px-5 pt-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">어떤 방식을 원하세요?</h2>
          <p className="text-sm text-gray-500">원하시는 주문 방식을 선택해 주세요.</p>
        </div>

        <OrderTypeSelector selected={orderType} onSelect={handleSelect} />
      </main>

      <BottomCTA
        label="다음"
        onClick={handleNext}
        disabled={!orderType}
      />
    </>
  );
}
