'use client';

import Link from 'next/link';

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
  editHref?: string;
}

export default function ReviewSection({ title, children, editHref }: ReviewSectionProps) {
  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
        {editHref && (
          <Link href={editHref} className="text-xs text-primary-500 font-medium">수정</Link>
        )}
      </div>
      {children}
    </div>
  );
}
