'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, PAYMENT_CARDS } from '@/lib/constants';
import { PHOTO_SLOT_LABELS } from '@/types';
import type { ModelId, OrderType, PaymentCard, PhotoSlot } from '@/types';

const PHOTO_SLOTS: PhotoSlot[] = ['leftMachine', 'rightMachine', 'diffuser1', 'diffuser2'];

interface OrderSummaryProps {
  selectedModel: ModelId;
  orderType: OrderType;
  paymentMethod: PaymentCard;
  photoPreviews: Record<string, string>;
  isNewInstallation: boolean;
}

export default function OrderSummary({
  selectedModel,
  orderType,
  paymentMethod,
  photoPreviews,
  isNewInstallation,
}: OrderSummaryProps) {
  const product = PRODUCTS[selectedModel];
  const card = PAYMENT_CARDS[paymentMethod];

  return (
    <div className="flex flex-col gap-5">
      {/* 선택 제품 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500">선택 제품</h3>
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700">
            수정
          </Link>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white flex-shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
          </div>
        </div>
      </section>

      {/* 주문 방식 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500">주문 방식</h3>
          <Link href="/order" className="text-sm text-gray-500 hover:text-gray-700">
            수정
          </Link>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-base font-semibold text-gray-900">
            {orderType === 'rental' ? '렌탈' : '구매'}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">
            {orderType === 'rental' ? '부담 없이 시작하기' : '한 번에 구매하기'}
          </p>
        </div>
      </section>

      {/* 설치 환경 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500">설치 환경</h3>
          <Link href="/order/photos" className="text-sm text-gray-500 hover:text-gray-700">
            수정
          </Link>
        </div>
        {isNewInstallation ? (
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-base font-semibold text-gray-900">신규 설치</p>
            <p className="text-sm text-gray-500 mt-0.5">기존 환기 기계 없음</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {PHOTO_SLOTS.map((slot) => {
              const preview = photoPreviews[slot];
              const { label } = PHOTO_SLOT_LABELS[slot];
              return (
                <div key={slot} className="flex flex-col gap-1">
                  <div
                    className={[
                      'relative aspect-square rounded-xl overflow-hidden border',
                      preview ? 'border-primary-300' : 'border-gray-200 bg-gray-50',
                    ].join(' ')}
                  >
                    {preview ? (
                      <Image src={preview} alt={label} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-300 text-xs">없음</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 text-center leading-tight truncate">{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 결제 카드 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500">결제 카드</h3>
          <Link href="/order/payment" className="text-sm text-gray-500 hover:text-gray-700">
            수정
          </Link>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
          <div
            className="w-12 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: card.color }}
          >
            <span className="text-[10px] font-bold text-white">
              {card.name.replace('카드', '')}
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">{card.name}</p>
            <p className="text-xs text-gray-500">{card.discount}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
