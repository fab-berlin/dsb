'use client';

import { useCallback, useEffect, useState } from 'react';
import { useClassReplacementStore } from '@/store/useClassReplacement';
import { Theme, Spinner } from '@radix-ui/themes';

import TileGroup from '@/components/TileGroup';
import ViewArea from '@/components/ViewArea';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/store/useAuthentication';
import VersionBadge from '@/components/VersionBadge';
import LoginGroup from '@/components/LoginGroup/indext';

export default function Home() {
  const router = useRouter();
  const [manualUpdate, setManualUpdate] = useState(false);
  const { parseAndSetData } = useClassReplacementStore();

  const { authToken, resetAuthToken } = useAuthentication();

  const resetLogin = () => {
    resetAuthToken();
    router.push('/login');
    return false;
  };

  const loadData = useCallback(
    async (signal?: AbortSignal) => {
      if (!authToken) return;
      setManualUpdate(true);
      try {
        const response = await fetch('/api', {
          signal,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authToken }),
        });
        const data = await response.json();

        if (!response.ok || data.error) {
          resetLogin();
          return;
        }
        await parseAndSetData(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error(err);
      } finally {
        if (!signal?.aborted) setManualUpdate(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authToken]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);
    return () => controller.abort();
  }, [loadData]);

  const handleUpdate = () => loadData();

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
