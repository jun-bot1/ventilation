'use client';

import { PAYMENT_CARDS } from '@/lib/constants';
import type { PaymentCard } from '@/types';

interface PaymentCardSelectorProps {
  selected: PaymentCard | null;
  onSelect: (card: PaymentCard) => void;
}

export default function PaymentCardSelector({ selected, onSelect }: PaymentCardSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      {Object.values(PAYMENT_CARDS).map((card) => {
        const isSelected = selected === card.id;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id as PaymentCard)}
            className={[
              'w-full rounded-2xl p-5 border-2 transition-all duration-200 text-left',
              'flex items-center gap-4',
              isSelected
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-gray-300',
            ].join(' ')}
          >
            {/* 카드 브랜드 시각화 */}
            <div
              className="w-16 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ backgroundColor: card.color }}
            >
              <span className="text-xs font-bold text-white">
                {card.name.replace('카드', '')}
              </span>
            </div>

            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">{card.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{card.discount}</p>
            </div>

            {/* 체크마크 */}
            <div
              className={[
                'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                isSelected ? 'border-primary-500 bg-primary-500' : 'border-gray-300',
              ].join(' ')}
            >
              {isSelected && (
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
