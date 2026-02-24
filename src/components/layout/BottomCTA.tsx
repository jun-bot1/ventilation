'use client';

import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface BottomCTAProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
}

export default function BottomCTA({
  label,
  onClick,
  disabled = false,
  className,
  secondaryLabel,
  onSecondaryClick,
}: BottomCTAProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.06)]',
        className
      )}
    >
      <div
        className="max-w-[480px] mx-auto px-5 py-3"
        style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
      >
        {secondaryLabel && (
          <Button
            variant="secondary"
            fullWidth
            onClick={onSecondaryClick}
            className="mb-2"
          >
            {secondaryLabel}
          </Button>
        )}
        <Button
          variant="primary"
          fullWidth
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
