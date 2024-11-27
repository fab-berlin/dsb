'use client';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';
import { useEffect, useState } from 'react';
import type { Timetable } from '@/types/types';
import TimetableView from '@/components/TimetableView';
import { useAuthentication } from '@/app/store/useAuthentication';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [timetableData, setTimetableData] = useState<Timetable | null>(null);
  const { authToken } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push('/login');
    }
  }, [authToken, router]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      const response = await fetch('/api/timetable', { signal });
      const data = (await response.json()) as Timetable;
      setTimetableData(data);
    };

    fetchData().catch((err) => console.error(err));

    return () => controller.abort();
  }, []);

  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        {authToken && (
          <ViewArea>
            <h1 className={'mb-8 pt-4 text-2xl font-bold'}>Stundenplan</h1>
            <TimetableView timetable={timetableData?.timetable ?? []} />
          </ViewArea>
        )}
      </Theme>
    </main>
  );
}
