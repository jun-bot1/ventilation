'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
}

export default function Header({ title, onBack, showBack = true, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'h-14 bg-white flex items-center px-4 border-b border-gray-100',
        'relative',
        className
      )}
    >
      {showBack && (
        <button
          onClick={onBack}
          className="absolute left-4 flex items-center justify-center w-8 h-8 -ml-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}
      <h1 className="w-full text-center text-[17px] font-semibold text-gray-900 leading-tight">
        {title}
      </h1>
    </header>
  );
}
