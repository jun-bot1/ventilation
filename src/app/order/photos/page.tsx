'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useConsultationStore } from '@/stores/consultation-store';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import PhotoUploadGrid from '@/components/order/PhotoUploadGrid';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import { STEP_LABELS } from '@/types';
import type { PhotoSlot } from '@/types';

export default function PhotosPage() {
  const router = useRouter();
  const {
    canProceedFromPhotos,
    getPhotoCount,
    setStep,
    orderType,
    isNewInstallation,
    setNewInstallation,
  } = useConsultationStore();
  const { photoPreviews, handleFileSelect, handleRemove } = usePhotoUpload();

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!canProceedFromPhotos()) return;
    setStep(3);
    router.push('/order/payment');
  };

  if (!orderType) {
    router.replace('/order');
    return null;
  }

  return (
    <>
      <Header title="사진 업로드" onBack={handleBack} />
      <ProgressBar step={2} totalSteps={STEP_LABELS.length} />

      <main className="flex-1 px-5 pt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            설치 환경 사진을 올려주세요
          </h2>
          <p className="text-sm text-gray-500">
            기존 환기 기계 사진이 필요해요.{' '}
            <span className="font-semibold text-gray-700">필수 항목</span>을 먼저 업로드해 주세요.
          </p>
        </div>

        {/* 신규 설치 체크박스 */}
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={[
            'flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer mb-6 transition-all duration-200',
            isNewInstallation
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 bg-white hover:border-gray-300',
          ].join(' ')}
        >
          <div className="relative flex-shrink-0">
            <input
              type="checkbox"
              checked={isNewInstallation}
              onChange={(e) => setNewInstallation(e.target.checked)}
              className="sr-only"
            />
            <div
              className={[
                'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
                isNewInstallation
                  ? 'bg-primary-500 border-primary-500'
                  : 'bg-white border-gray-300',
              ].join(' ')}
            >
              {isNewInstallation && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <div>
            <p className={[
              'text-base font-semibold',
              isNewInstallation ? 'text-primary-600' : 'text-gray-900',
            ].join(' ')}>
              신규 설치
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              기존 환기 기계가 없는 신규 설치입니다
            </p>
          </div>
        </motion.label>

        {/* 사진 업로드 그리드 */}
        {!isNewInstallation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
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

        {isNewInstallation && (
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
          </motion.div>
        )}
      </main>

      <BottomCTA
        label={isNewInstallation ? '다음' : `다음 (${getPhotoCount()}/4)`}
        onClick={handleNext}
        disabled={!canProceedFromPhotos()}
      />
    </>
  );
}
