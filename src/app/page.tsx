'use client';

import { useEffect, useState } from 'react';
import { useClassReplacementStore } from '@/store/useClassReplacement';
import { Theme, Spinner } from '@radix-ui/themes';

import TileGroup from '@/components/TileGroup';
import ViewArea from '@/components/ViewArea';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/store/useAuthentication';
import VersionBadge from '@/components/VersionBadge';
import LoginGroup from '@/components/LoginGroup/indext';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [manualUpdate, setManualUpdate] = useState(false);
  const { parseAndSetData } = useClassReplacementStore();

  const { authToken, setAuthToken, resetAuthToken } = useAuthentication();

  const resetLogin = () => {
    resetAuthToken();
    sessionStorage.removeItem('authToken');
    router.push('/login');
    return false;
  };

  useEffect(() => {
    if (!authToken) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        router.push('/');
      }
    }
  }, [authToken, router, setAuthToken]);

  // useEffect(() => {
  //   if (!authToken) {
  //     router.push('/login');
  //   }
  // }, [authToken, router]);

  useEffect(() => {
    if (authToken) {
      setManualUpdate(true);
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchData = async () => {
        const response = await fetch('/api', {
          signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken }),
        });
        const data = await response.json();

        if (data.error) {
          resetLogin();
        }

        await parseAndSetData(data);
        await setManualUpdate(false);
      };

      fetchData().catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
          // This is normal during cleanup, so we don't need to set an error state
        }
      });

      return () => controller.abort();
    }
  }, [authToken, parseAndSetData]);

  const handleUpdate = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setManualUpdate(true);
    const response = await fetch('/api', {
      signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authToken }),
    });
    const data = await response.json();
    await parseAndSetData(data);
    await setManualUpdate(false);
  };

  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <div className="relative flex flex-row items-baseline justify-between">
            <h1
              className={'mb-8 pt-4 text-2xl font-bold'}
              onClick={handleUpdate}
            >
              DSB <span className={'text-xs'}>Digitales Schwarzes Brett</span>
            </h1>
            <VersionBadge />
          </div>
          {!authToken && <LoginGroup />}
          {!manualUpdate && <TileGroup />}
          {manualUpdate && (
            <div
              className={'fixed top-0 left-0 flex h-screen w-screen items-center justify-center'}
            >
              <Spinner size={'3'} />
            </div>
          )}
        </ViewArea>
      </Theme>
    </main>
  );
}
