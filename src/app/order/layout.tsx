import type { ReactNode } from 'react';

export default function OrderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-white pb-24">
      {children}
    </div>
  );
}
