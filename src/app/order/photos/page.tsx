'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useConsultationStore } from '@/stores/consultation-store';
import OrderPageLayout from '@/components/order/OrderPageLayout';
import PhotoUploadGrid from '@/components/order/PhotoUploadGrid';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import type { InstallationType, PhotoSlot } from '@/types';

const INSTALLATION_OPTIONS: { id: InstallationType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'renovation',
    label: '구축교체',
    desc: '기존 기계 교체 설치',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M21 12a9 9 0 11-6.22-8.56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'new-building',
    label: '신규설치',
    desc: '새 건물 · 기존 기계 없음',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function PhotosPage() {
  const router = useRouter();
  const {
    canProceedFromPhotos,
    getPhotoCount,
    setStep,
    orderType,
    installationType,
    setInstallationType,
  } = useConsultationStore();
  const { photoPreviews, handleFileSelect, handleRemove } = usePhotoUpload();

  const isNewInstall = installationType === 'new-building';

  const handleNext = () => {
    if (!canProceedFromPhotos()) return;
    if (orderType === 'purchase') {
      setStep(4);
      router.push('/order/info');
    } else {
      setStep(3);
      router.push('/order/payment');
    }
  };

  useEffect(() => {
    if (!orderType) {
      router.replace('/order');
    }
  }, [orderType, router]);

  if (!orderType) {
    return null;
  }

  return (
    <OrderPageLayout
      title="사진 업로드"
      step={2}
      onNext={handleNext}
      ctaLabel={isNewInstall ? '다음' : `다음 (${getPhotoCount()}/4)`}
      ctaDisabled={!canProceedFromPhotos()}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          설치 유형을 선택해 주세요
        </h2>
        <p className="text-sm text-gray-500">
          설치 환경에 맞는 유형을 선택하면 더 정확한 상담이 가능합니다.
        </p>
      </div>

      {/* 신규설치 / 구축교체 선택 버튼 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {INSTALLATION_OPTIONS.map((option) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setInstallationType(option.id)}
            className={[
              'flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200',
              installationType === option.id
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300',
            ].join(' ')}
          >
            <div className={installationType === option.id ? 'text-primary-500' : 'text-gray-400'}>
              {option.icon}
            </div>
            <span className={[
              'text-base font-bold',
              installationType === option.id ? 'text-primary-600' : 'text-gray-900',
            ].join(' ')}>
              {option.label}
            </span>
            <span className="text-xs text-gray-500">{option.desc}</span>
          </motion.button>
        ))}
      </div>

      {/* 신규설치 안내 */}
      {isNewInstall && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 bg-gray-50 rounded-2xl text-center"
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-primary-50 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="#3182F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="#3182F6" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900">신규 설치로 진행합니다</p>
          <p className="text-xs text-gray-500 mt-1">사진 업로드 없이 다음 단계로 이동할 수 있어요</p>
          <p className="text-xs text-red-500 font-semibold mt-2">
            ※ 덕트 시공은 별도입니다. 현장확인 필요 ※
          </p>
        </motion.div>
      )}

      {/* 구축교체: 사진 업로드 그리드 */}
      {!isNewInstall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-semibold text-gray-900 mb-3">
            설치 환경 사진을 올려주세요
          </p>
          <p className="text-xs text-gray-500 mb-4">
            기존 환기 기계 사진이 필요해요. <span className="font-semibold text-gray-700">필수 항목</span>을 먼저 업로드해 주세요.
          </p>

          <PhotoUploadGrid
            photoPreviews={photoPreviews}
            onFileSelect={(slot: PhotoSlot, file: File) => handleFileSelect(slot, file)}
            onRemove={(slot: PhotoSlot) => handleRemove(slot)}
          />

          <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-700">촬영 팁</span><br />
              기계 전체가 나오도록 밝은 곳에서 촬영해 주시면 더 정확한 상담이 가능합니다.
            </p>
          </div>
        </motion.div>
      )}
    </OrderPageLayout>
  );
}
