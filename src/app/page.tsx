'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CATEGORY_LIST } from '@/lib/constants';

export default function LandingPage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, margin: '-60px' });

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* 히어로 섹션 */}
      <section className="flex-1 flex flex-col justify-center px-5 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-semibold text-primary-500 mb-3 tracking-wide uppercase">
            나비엔 환기청정 렌탈/구매
          </p>
          <h1 className="text-[36px] font-bold leading-tight text-gray-900 whitespace-pre-line">
            {"깨끗한 공기,\n합리적인 가격으로"}
          </h1>
          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            나비엔 환기청정기로 우리 집 공기를<br />
            건강하고 쾌적하게 만들어보세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="mt-8"
        >
          <Link href="/products">
            <Button fullWidth>
              상담 시작하기
            </Button>
          </Link>
        </motion.div>

        {/* 신뢰 지표 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 flex items-center gap-4"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500">전문 설치</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500">AS 보장</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500">합리적 가격</span>
          </div>
        </motion.div>
      </section>

      {/* 카테고리 프리뷰 섹션 */}
      <section className="px-5 pb-10" ref={cardsRef}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide"
        >
          제품 라인업
        </motion.p>
        <div className="space-y-3">
          {CATEGORY_LIST.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <Link href={`/products/${category.id}`}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden active:scale-[0.98] transition-transform">
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400 flex-shrink-0 ml-3">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
