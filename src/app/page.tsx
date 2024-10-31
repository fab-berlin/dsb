'use client';

import { useEffect, useState } from 'react';
import { useClassReplacementStore } from '@/app/store/useClassReplacement';
import '@radix-ui/themes/styles.css';
import { Theme, Spinner } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import TileGroup from '@/components/TileGroup';
import ViewArea from '@/components/ViewArea';
import { useRouter } from 'next/navigation';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [manualUpdate, setManualUpdate] = useState(false);
  const { parseAndSetData } = useClassReplacementStore();

  useEffect(() => {
    setManualUpdate(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      const response = await fetch('/api', { signal });
      const data = await response.json();
      await parseAndSetData(data);
      await setManualUpdate(false);
    };

    fetchData().catch((err) => console.error(err));

    return () => controller.abort();
  }, [parseAndSetData]);

  const handleUpdate = async () => {
    setManualUpdate(true);
    const response = await fetch('/api');
    const data = await response.json();
    await parseAndSetData(data);
    await setManualUpdate(false);
  };

  return (
    <main className={'p-4'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <h1
            className={'mb-8 text-2xl font-bold'}
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
