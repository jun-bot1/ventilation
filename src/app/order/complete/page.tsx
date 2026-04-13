'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useConsultationStore } from '@/stores/consultation-store';
import { PRODUCTS, PAYMENT_CARDS } from '@/lib/constants';
import { BottomCTA } from '@/components/layout';

export default function CompletePage() {
  const router = useRouter();

  const {
    selectedModel,
    orderType,
    paymentMethod,
    reset,
  } = useConsultationStore();

  function handleGoHome() {
    reset();
    router.push('/');
  }

  const product = selectedModel ? PRODUCTS[selectedModel] : null;
  const card = paymentMethod ? PAYMENT_CARDS[paymentMethod] : null;

  return (
    <div className="flex flex-col min-h-dvh pb-32">
      {/* 성공 애니메이션 영역 */}
      <div className="flex flex-col items-center pt-16 pb-8 px-5">
        <div className="relative mb-6">
          {/* 배경 원 */}
          <motion.div
            className="w-24 h-24 rounded-full bg-primary-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* 체크마크 */}
          <svg
            className="absolute inset-0 w-24 h-24"
            viewBox="0 0 96 96"
            fill="none"
          >
            <motion.path
              d="M28 48 L42 62 L68 36"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </svg>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            상담 신청이 완료됐어요
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            영업일 기준 1~2일 내에<br />담당자가 연락드릴 예정이에요
          </p>
        </motion.div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-8 mx-5" />

      {/* 신청 내역 요약 */}
      <motion.div
        className="px-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-base font-semibold text-gray-900 mb-4">신청 내역</h2>

        <div className="space-y-3">
          {product && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">제품</span>
              <span className="text-sm font-medium text-gray-900">{product.name}</span>
            </div>
          )}
          {orderType && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">주문 방식</span>
              <span className="text-sm font-medium text-gray-900">
                {orderType === 'rental' ? '렌탈' : '구매'}
              </span>
            </div>
          )}
          {orderType === 'rental' && card && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">결제 카드</span>
              <span className="text-sm font-medium text-gray-900">{card.name}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-8 mx-5" />

      {/* 카드 발급 안내 (렌탈만) */}
      {orderType === 'rental' && card && card.id !== 'none' && (
        <motion.div
          className="px-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-base font-semibold text-gray-900 mb-1">제휴카드 발급 안내</h2>
          <p className="text-sm text-gray-500 mb-4">
            {card.name}로 결제 시 제휴 할인 혜택을 받을 수 있어요
          </p>

          <a
            href={card.issuanceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-gray-200 rounded-2xl p-4 active:scale-[0.98] transition-transform"
          >
            {/* 브랜드 컬러 바 */}
            <div
              className="w-1 self-stretch rounded-full"
              style={{ backgroundColor: card.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{card.name} 발급하기</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.discount}</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      )}

      <BottomCTA
        label="홈으로 돌아가기"
        onClick={handleGoHome}
      />
    </div>
  );
}
