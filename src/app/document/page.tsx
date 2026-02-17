'use client';

import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/store/useAuthentication';
import { useEffect } from 'react';
import { Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';
import VersionBadge from '@/components/VersionBadge';
import LoginGroup from '@/components/LoginGroup/indext';
import DocumentsGroup from '@/components/DocumentsGroup';
import { useDocuments } from '@/store/useDocuments';

export default function Page() {
  const router = useRouter();
  const { authToken, setAuthToken } = useAuthentication();
  const { setData } = useDocuments();

  useEffect(() => {
    if (!authToken) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        router.push('/');
      }
    }
  }, [authToken, router, setAuthToken]);

  useEffect(() => {
    if (authToken) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchData = async () => {
        const response = await fetch('/api/documents', {
          signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken }),
        });
        const data = await response.json();

        console.log(data);

        await setData(data);
      };

      fetchData().catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
          // This is normal during cleanup, so we don't need to set an error state
        }
      });

      return () => controller.abort();
    }
  }, [authToken]);

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
          {!authToken && <LoginGroup />}
          {authToken && <DocumentsGroup />}
        </ViewArea>
      </Theme>
    </main>
  );
}
