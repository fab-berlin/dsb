'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.history.pushState(null, '', url);
    };

    window.addEventListener('popstate', () => {
      router.refresh();
    });

    return () => {
      window.removeEventListener('popstate', () => {
        router.refresh();
      });
    };
  }, [router]);

  return <>{children}</>;
}
