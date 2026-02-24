'use client';

import { useConsultationStore } from '@/stores/consultation-store';
import type { PhotoSlot } from '@/types';

export function usePhotoUpload() {
  const { setPhoto, setPhotoPreview, photos, photoPreviews } = useConsultationStore();

  const handleFileSelect = (slot: PhotoSlot, file: File) => {
    setPhoto(slot, file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPhotoPreview(slot, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (slot: PhotoSlot) => {
    setPhoto(slot, null);
    setPhotoPreview(slot, '');
  };

  return {
    photos,
    photoPreviews,
    handleFileSelect,
    handleRemove,
  };
}
