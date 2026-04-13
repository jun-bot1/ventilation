'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PAYMENT_CARDS, CARD_DISCOUNT_TIERS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { PaymentCard } from '@/types';

const CARD_IMAGES: Record<string, string> = {
  lotte: '/lottecard (2).png',
  hana: '/hanacard (2).png',
};

interface PaymentCardSelectorProps {
  selected: PaymentCard | null;
  onSelect: (card: PaymentCard) => void;
}

export default function PaymentCardSelector({ selected, onSelect }: PaymentCardSelectorProps) {
  const cardEntries = Object.values(PAYMENT_CARDS);
  const affiliateCards = cardEntries.filter((c) => c.id !== 'none');
  const noneCard = cardEntries.find((c) => c.id === 'none')!;

  return (
    <div className="flex flex-col gap-4">
      {/* 제휴카드 옵션들 */}
      {affiliateCards.map((card) => {
        const isSelected = selected === card.id;
        const discountTiers = CARD_DISCOUNT_TIERS[card.id];

        return (
          <div key={card.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => onSelect(card.id as PaymentCard)}
              className={cn(
                'w-full rounded-2xl p-5 border-2 transition-all duration-200 text-left',
                'flex items-center gap-4',
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              {/* 카드 이미지 */}
              <div className="relative w-16 h-10 flex-shrink-0">
                {CARD_IMAGES[card.id] ? (
                  <Image
                    src={CARD_IMAGES[card.id]}
                    alt={card.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: card.color }}
                  >
                    <span className="text-xs font-bold text-white">
                      {card.name.replace('카드', '')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900">{card.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{card.discount}</p>
              </div>

              {/* 체크마크 */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  isSelected ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>

            {/* 할인 상세 테이블 */}
            <AnimatePresence>
              {isSelected && discountTiers && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mx-2 mt-2 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-100 text-gray-600">
                          <th className="py-2.5 px-3 text-left font-semibold">전월 실적</th>
                          <th className="py-2.5 px-3 text-center font-semibold">할인</th>
                          <th className="py-2.5 px-3 text-center font-semibold">프로모션</th>
                          <th className="py-2.5 px-3 text-right font-semibold">최종할인</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discountTiers.map((tier, i) => (
                          <tr
                            key={i}
                            className={cn(
                              'border-t border-gray-100',
                              i === discountTiers.length - 1 && 'bg-primary-50/50'
                            )}
                          >
                            <td className="py-2.5 px-3 text-gray-700 font-medium">{tier.minSpend}</td>
                            <td className="py-2.5 px-3 text-center text-gray-600">{tier.discount}</td>
                            <td className="py-2.5 px-3 text-center text-gray-600">{tier.promotion}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-primary-600">{tier.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* 제휴카드 사용안함 */}
      <button
        type="button"
        onClick={() => onSelect('none')}
        className={cn(
          'w-full rounded-2xl p-4 border-2 transition-all duration-200 text-left',
          'flex items-center gap-4',
          selected === 'none'
            ? 'border-gray-400 bg-gray-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        )}
      >
        <div className="w-16 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-base font-semibold text-gray-700">{noneCard.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">{noneCard.discount}</p>
        </div>
        <div
          className={cn(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
            selected === 'none' ? 'border-gray-500 bg-gray-500' : 'border-gray-300'
          )}
        >
          {selected === 'none' && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
