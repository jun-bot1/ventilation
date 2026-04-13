'use client';

import { useRef, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface PhotoUploadSlotProps {
  label: string;
  required: boolean;
  preview?: string;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export default function PhotoUploadSlot({
  label,
  required,
  preview,
  onFileSelect,
  onRemove,
}: PhotoUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        {required ? (
          <Badge variant="required">필수</Badge>
        ) : (
          <Badge variant="info">선택</Badge>
        )}
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-full rounded-2xl overflow-hidden',
          'border-2 border-dashed transition-all duration-200',
          'aspect-[4/3] cursor-pointer',
          preview
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        )}
      >
        {preview ? (
          <>
            <Image src={preview} alt={label} fill className="object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-900/60 flex items-center justify-center z-10"
              aria-label="사진 삭제"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Camera className="w-7 h-7 text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">탭하여 추가</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
