'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useConsultationStore } from '@/stores/consultation-store';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import Badge from '@/components/ui/Badge';
import ReviewSection from '@/components/order/ReviewSection';
import { PRODUCTS, PAYMENT_CARDS, CARD_DISCOUNT_TIERS, PHOTO_SLOTS, PHOTO_SLOT_LABELS, STEP_LABELS } from '@/lib/constants';
import { useProductPrice } from '@/hooks/useProductPrice';
import { formatPrice, formatMonthlyPrice } from '@/lib/utils';

function getCardDiscount(cardId: string | null): number {
  if (!cardId || cardId === 'none') return 0;
  const tiers = CARD_DISCOUNT_TIERS[cardId];
  if (!tiers || tiers.length === 0) return 0;
  // 첫 번째 등급(최소 실적) 할인 적용
  return parseInt(tiers[0].total.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function ReviewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedModel, orderType, photos, photoPreviews, paymentMethod, installationType,
    customerName, customerPhone, customerAddress, customerAddressDetail,
  } = useConsultationStore();
  const isNewInstallation = installationType === 'new-building';
  const priceResult = useProductPrice(selectedModel);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSubmit = async () => {
    if (isSubmitting || !selectedModel || !orderType) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('selectedCategory', PRODUCTS[selectedModel].category);
      formData.append('selectedModel', selectedModel);
      formData.append('orderType', orderType);
      formData.append('paymentMethod', paymentMethod ?? 'none');
      formData.append('installationType', installationType);
      formData.append('customerName', customerName);
      formData.append('customerPhone', customerPhone);
      formData.append('customerAddress', customerAddress);
      formData.append('customerAddressDetail', customerAddressDetail);
      formData.append('submittedAt', new Date().toISOString());

      // 옵션 정보
      if (priceResult) {
        formData.append('selectedPyeong', priceResult.pyeongId);
        formData.append('selectedController', priceResult.controllerId);
        formData.append('selectedMonitor', priceResult.monitorId);
        formData.append('rentalPrice', String(priceResult.rentalPrice));
        formData.append('purchasePrice', String(priceResult.purchasePrice));
        formData.append('pyeongLabel', priceResult.pyeongLabel);
        formData.append('controllerLabel', priceResult.controllerLabel);
        formData.append('monitorLabel', priceResult.monitorLabel);
      }

      if (!isNewInstallation) {
        for (const [slot, file] of Object.entries(photos)) {
          if (file) formData.append(slot, file);
        }
      }

      const res = await fetch('/api/consultation', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('상담 신청에 실패했습니다.');
      router.push('/order/complete');
    } catch {
      setIsSubmitting(false);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    if (!selectedModel || !orderType) {
      router.replace('/');
    } else if (orderType === 'rental' && !paymentMethod) {
      router.replace('/order/payment');
    }
  }, [hydrated, selectedModel, orderType, paymentMethod, router]);

  if (!selectedModel || !orderType) return null;
  if (orderType === 'rental' && !paymentMethod) return null;

  const product = PRODUCTS[selectedModel];
  const card = paymentMethod ? PAYMENT_CARDS[paymentMethod] : null;

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Header title="신청 확인" onBack={() => router.back()} />
      <ProgressBar step={6} totalSteps={STEP_LABELS.length} />

      <main className="flex-1 px-5 pt-6 pb-32">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">신청 내용을 확인해 주세요</h2>
          <p className="text-sm text-gray-500">아래 내용으로 상담을 신청합니다.</p>
        </div>

        <ReviewSection title="선택 제품">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
              {priceResult && orderType === 'rental' && (() => {
                const discount = getCardDiscount(paymentMethod);
                const original = priceResult.rentalPrice;
                const discounted = original - discount;
                return discount > 0 ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      {formatMonthlyPrice(original)}
                    </span>
                    <span className="text-sm font-bold text-primary-600">
                      {formatMonthlyPrice(discounted)}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-primary-600 mt-1">
                    {formatMonthlyPrice(original)}
                  </p>
                );
              })()}
              {priceResult && orderType === 'purchase' && (
                <p className="text-sm font-bold text-primary-600 mt-1">
                  {formatPrice(priceResult.purchasePrice)}
                </p>
              )}
            </div>
          </div>
        </ReviewSection>

        <ReviewSection title="주문 방식">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900">
              {orderType === 'rental' ? '렌탈' : '구매'}
            </span>
            {orderType === 'rental' && <Badge variant="popular">인기</Badge>}
          </div>
        </ReviewSection>

        {orderType === 'rental' && card && (
          <ReviewSection title="결제 카드">
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
          </ReviewSection>
        )}

        <ReviewSection title="설치 환경">
          {isNewInstallation ? (
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-base font-semibold text-gray-900">신규 설치</p>
              <p className="text-sm text-gray-500 mt-0.5">기존 환기 기계 없음</p>
            </div>
          ) : (
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
                        <Image src={preview} alt={label} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-gray-300 text-lg">{required ? '!' : '–'}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500 text-center leading-tight">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </ReviewSection>

        <ReviewSection title="고객 정보">
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">성함</span>
              <span className="text-sm font-medium text-gray-900">{customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">전화번호</span>
              <span className="text-sm font-medium text-gray-900">{customerPhone}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-500 flex-shrink-0">설치 주소</span>
              <span className="text-sm font-medium text-gray-900 text-right ml-4">
                {customerAddress}<br />
                {customerAddressDetail}
              </span>
            </div>
          </div>
        </ReviewSection>

        <div className="mt-6 p-4 bg-primary-50 rounded-2xl border border-primary-100">
          <p className="text-xs text-primary-700 leading-relaxed">
            <span className="font-semibold">상담 신청 후 안내</span>
            <br />
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
