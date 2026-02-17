'use client';

import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/store/useAuthentication';
import { useEffect } from 'react';
import { Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';
import VersionBadge from '@/components/VersionBadge';

export default function Page() {
  const router = useRouter();
  const { authToken, setAuthToken } = useAuthentication();

  useEffect(() => {
    if (!authToken) {
      router.push('/login');
    }
  }, [authToken, router]);

  useEffect(() => {
    if (!authToken) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        router.push('/');
      }
    }
  }, [authToken, router, setAuthToken]);

  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <div className="relative flex flex-row items-baseline justify-between">
            <h1 className={'mb-8 pt-4 text-2xl font-bold'}>Aushänge</h1>
            <VersionBadge />
          </div>
        </ViewArea>
      </Theme>
    </main>
  );
}
