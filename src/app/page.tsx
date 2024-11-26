'use client';

import { useEffect, useState } from 'react';
import { useClassReplacementStore } from '@/app/store/useClassReplacement';
import '@radix-ui/themes/styles.css';
import { Theme, Spinner } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import TileGroup from '@/components/TileGroup';
import ViewArea from '@/components/ViewArea';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/app/store/useAuthentication';

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

  useEffect(() => {
    if (!authToken) {
      router.push('/login');
    }
  }, [authToken, router]);

  useEffect(() => {
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
      console.log(data);

      if (data.error) {
        resetLogin();
      }

      await parseAndSetData(data);
      await setManualUpdate(false);
    };

    fetchData().catch((err) => console.error(err));

    return () => controller.abort();
  }, [authToken, parseAndSetData]);

  const handleUpdate = async () => {
    setManualUpdate(true);
    const response = await fetch('/api');
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
          <h1
            className={'mb-8 pt-4 text-2xl font-bold'}
            onClick={handleUpdate}
          >
            DSB <span className={'text-xs'}>Digitales Schwarzes Brett</span>
          </h1>
          {!manualUpdate && <TileGroup />}
          {manualUpdate && (
            <div
              className={'fixed left-0 top-0 flex h-screen w-screen items-center justify-center'}
            >
              <Spinner size={'3'} />
            </div>
          )}
        </ViewArea>
      </Theme>
    </main>
  );
}
