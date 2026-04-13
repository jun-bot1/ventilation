'use client';

import { useRouter } from 'next/navigation';
import { Header, BottomCTA, ProgressBar } from '@/components/layout';
import { STEP_LABELS } from '@/lib/constants';

interface OrderPageLayoutProps {
  title: string;
  step: number;
  children: React.ReactNode;
  ctaLabel?: string;
  ctaDisabled?: boolean;
  onNext: () => void;
  showBackButton?: boolean;
}

export default function OrderPageLayout({
  title,
  step,
  children,
  ctaLabel = '다음',
  ctaDisabled = false,
  onNext,
  showBackButton = true,
}: OrderPageLayoutProps) {
  const router = useRouter();

  return (
    <>
      <Header
        title={title}
        onBack={showBackButton ? () => router.back() : undefined}
        showBack={showBackButton}
      />
      <ProgressBar step={step} totalSteps={STEP_LABELS.length} />

      <main className="flex-1 px-5 pt-6">{children}</main>

      <BottomCTA label={ctaLabel} onClick={onNext} disabled={ctaDisabled} />
    </>
  );
}
