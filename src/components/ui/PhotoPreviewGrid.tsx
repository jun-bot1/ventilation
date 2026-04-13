'use client';
import Image from 'next/image';
import { PHOTO_SLOTS, PHOTO_SLOT_LABELS } from '@/lib/constants';
import type { InstallationType } from '@/types';

interface PhotoPreviewGridProps {
  photoPreviews: Record<string, string>;
  installationType: InstallationType;
}

export default function PhotoPreviewGrid({ photoPreviews, installationType }: PhotoPreviewGridProps) {
  if (installationType === 'new-building') {
    return (
      <div className="bg-gray-50 rounded-2xl p-4">
        <p className="text-base font-semibold text-gray-900">신규 설치</p>
        <p className="text-sm text-gray-500 mt-0.5">기존 환기 기계 없음</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {PHOTO_SLOTS.map((slot) => {
        const preview = photoPreviews[slot];
        const { label, required } = PHOTO_SLOT_LABELS[slot];
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
                  <span className="text-gray-300 text-xs">
                    {required ? '!' : '–'}
                  </span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-500 text-center leading-tight truncate">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
