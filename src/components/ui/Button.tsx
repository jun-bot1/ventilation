'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center h-14 px-6 rounded-2xl font-semibold text-base transition-all duration-150 select-none',
          'active:scale-[0.97]',
          fullWidth && 'w-full',
          variant === 'primary' && [
            'bg-primary-500 text-white',
            'hover:bg-primary-600',
            disabled && 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200',
          ],
          variant === 'secondary' && [
            'bg-gray-100 text-gray-900',
            'hover:bg-gray-200',
            disabled && 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200',
          ],
          variant === 'ghost' && [
            'bg-transparent text-primary-500',
            'hover:bg-primary-50',
            disabled && 'text-gray-400 cursor-not-allowed hover:bg-transparent',
          ],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
