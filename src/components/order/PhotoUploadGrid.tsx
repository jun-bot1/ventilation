'use client';

import { PHOTO_SLOT_LABELS, PHOTO_SLOTS } from '@/lib/constants';
import type { PhotoSlot } from '@/types';
import PhotoUploadSlot from './PhotoUploadSlot';

interface PhotoUploadGridProps {
  photoPreviews: Record<string, string>;
  onFileSelect: (slot: PhotoSlot, file: File) => void;
  onRemove: (slot: PhotoSlot) => void;
}

export default function PhotoUploadGrid({ photoPreviews, onFileSelect, onRemove }: PhotoUploadGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PHOTO_SLOTS.map((slot) => {
        const { label, required } = PHOTO_SLOT_LABELS[slot];
        return (
          <PhotoUploadSlot
            key={slot}
            label={label}
            required={required}
            preview={photoPreviews[slot] || ''}
            onFileSelect={(file) => onFileSelect(slot, file)}
            onRemove={() => onRemove(slot)}
          />
        );
      })}
    </div>
  );
}
