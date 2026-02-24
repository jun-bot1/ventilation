'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConsultationStore } from '@/stores/consultation-store';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import Badge from '@/components/ui/Badge';
import { STEP_LABELS, PHOTO_SLOT_LABELS } from '@/types';
import { PRODUCTS, PAYMENT_CARDS } from '@/lib/constants';
import type { PhotoSlot } from '@/types';

const PHOTO_SLOTS: PhotoSlot[] = ['leftMachine', 'rightMachine', 'diffuser1', 'diffuser2'];

export default function ReviewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedModel,
    orderType,
    photos,
    photoPreviews,
    paymentMethod,
  } = useConsultationStore();

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedCategory: PRODUCTS[selectedModel!].category,
          selectedModel,
          orderType,
          paymentMethod,
          photoCount: Object.values(photos).filter(Boolean).length,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error('상담 신청에 실패했습니다.');

      router.push('/order/complete');
    } catch {
      setIsSubmitting(false);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  if (!selectedModel || !orderType || !paymentMethod) {
    router.replace('/');
    return null;
  }

  const product = PRODUCTS[selectedModel];
  const card = PAYMENT_CARDS[paymentMethod];
  const uploadedPhotos = PHOTO_SLOTS.filter((slot) => photos[slot] || photoPreviews[slot]);

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header title="신청 확인" onBack={handleBack} />
      <ProgressBar step={5} totalSteps={STEP_LABELS.length} />

      <main className="flex-1 px-5 pt-6 pb-32">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            신청 내용을 확인해 주세요
          </h2>
          <p className="text-sm text-gray-500">
            아래 내용으로 상담을 신청합니다.
          </p>
        </div>

        {/* 제품 정보 */}
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">선택 제품</h3>
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
            </div>
          </div>
        </section>

        {/* 주문 방식 */}
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">주문 방식</h3>
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900">
              {orderType === 'rental' ? '렌탈' : '구매'}
            </span>
            {orderType === 'rental' && <Badge variant="popular">인기</Badge>}
          </div>
        </section>

        {/* 결제 카드 */}
        <section className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">결제 카드</h3>
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
            <div
              className="w-12 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: card.color }}
            >
              <span className="text-[10px] font-bold" style={{ color: card.textColor }}>
                {card.name.replace('카드', '')}
              </span>
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{card.name}</p>
              <p className="text-xs text-gray-500">{card.discount}</p>
            </div>
          </div>
        </section>

        {/* 업로드된 사진 */}
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            업로드 사진 ({uploadedPhotos.length}장)
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {PHOTO_SLOTS.map((slot) => {
              const preview = photoPreviews[slot];
              const hasPhoto = !!photos[slot] || !!preview;
              const { label, required } = PHOTO_SLOT_LABELS[slot];

              return (
                <div key={slot} className="flex flex-col gap-1">
                  <div
                    className={[
                      'relative aspect-square rounded-xl overflow-hidden border',
                      hasPhoto ? 'border-primary-300' : 'border-gray-200 bg-gray-50',
                    ].join(' ')}
                  >
                    {hasPhoto && preview ? (
                      <Image
                        src={preview}
                        alt={label}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-300 text-lg">
                          {required ? '!' : '–'}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 text-center leading-tight">{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
          <p className="text-xs text-primary-700 leading-relaxed">
            <span className="font-semibold">상담 신청 후 안내</span><br />
            영업일 기준 1~2일 내에 담당자가 연락을 드립니다.
          </p>
        </div>
      </main>

      <BottomCTA
        label={isSubmitting ? '신청 중...' : '상담 신청하기'}
        onClick={handleSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
}
