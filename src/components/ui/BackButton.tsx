'use client';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <Link href={href}>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors -ml-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15l-5-5 5-5" stroke="#191F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </Link>
  );
}
