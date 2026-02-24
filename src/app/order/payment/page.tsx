'use client';

import { useRouter } from 'next/navigation';
import { useConsultationStore } from '@/stores/consultation-store';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import PaymentCardSelector from '@/components/order/PaymentCardSelector';
import { STEP_LABELS } from '@/types';
import type { PaymentCard } from '@/types';

export default function PaymentPage() {
  const router = useRouter();
  const { paymentMethod, setPaymentMethod, setStep, canProceedFromPhotos } = useConsultationStore();

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (card: PaymentCard) => {
    setPaymentMethod(card);
  };

  const handleNext = () => {
    if (!paymentMethod) return;
    setStep(4);
    router.push('/order/review');
  };

  if (!canProceedFromPhotos()) {
    router.replace('/order/photos');
    return null;
  }

  return (
    <>
      <Header title="결제 방식 선택" onBack={handleBack} />
      <ProgressBar step={3} totalSteps={STEP_LABELS.length} />

      <main className="flex-1 px-5 pt-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            결제 방식을 선택하세요
          </h2>
          <p className="text-sm text-gray-500">
            제휴카드 할인 혜택을 확인하세요.
          </p>
        </div>

        <PaymentCardSelector selected={paymentMethod} onSelect={handleSelect} />

        <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">안내</span><br />
            카드가 없어도 상담 신청이 가능합니다. 카드 발급 후 혜택을 적용받으실 수 있습니다.
          </p>
        </div>
      </main>

      <BottomCTA
        label="다음"
        onClick={handleNext}
        disabled={!paymentMethod}
      />
    </>
  );
}
