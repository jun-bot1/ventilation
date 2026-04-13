'use client';

import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const shell = document.getElementById('app-shell');
    if (shell) {
      shell.style.maxWidth = 'none';
      shell.style.boxShadow = 'none';
    }
    return () => {
      if (shell) {
        shell.style.maxWidth = '';
        shell.style.boxShadow = '';
      }
    };
  }, []);

  return <>{children}</>;
}
