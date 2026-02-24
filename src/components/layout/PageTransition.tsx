'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string | number;
  className?: string;
}

export default function PageTransition({ children, pageKey, className }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
