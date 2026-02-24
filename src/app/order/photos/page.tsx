'use client';

import { useRouter } from 'next/navigation';
import { useConsultationStore } from '@/stores/consultation-store';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import PhotoUploadGrid from '@/components/order/PhotoUploadGrid';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import { STEP_LABELS } from '@/types';
import type { PhotoSlot } from '@/types';

export default function PhotosPage() {
  const router = useRouter();
  const { canProceedFromPhotos, getPhotoCount, setStep, orderType } = useConsultationStore();
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            설치 환경 사진을 올려주세요
          </h2>
          <p className="text-sm text-gray-500">
            최소 2장의 사진이 필요해요.{' '}
            <span className="font-semibold text-gray-700">필수 항목</span>을 먼저 업로드해 주세요.
          </p>
        </div>

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
      </main>

      <BottomCTA
        label={`다음 (${getPhotoCount()}/4)`}
        onClick={handleNext}
        disabled={!canProceedFromPhotos()}
      />
    </>
  );
}
