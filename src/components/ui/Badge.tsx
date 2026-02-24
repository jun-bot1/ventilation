'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

type BadgeVariant = 'popular' | 'discount' | 'required' | 'info' | 'success' | 'warning';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  popular: 'bg-primary-50 text-primary-500',
  discount: 'bg-red-50 text-red-500',
  required: 'bg-orange-50 text-orange-500',
  info: 'bg-gray-100 text-gray-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-yellow-50 text-yellow-600',
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
