'use client';

import { useEffect } from 'react';
import { useClassReplacementStore } from '@/app/store/useClassReplacement';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';
import TileGroup from '@/components/TileGroup';

export type ReplacementItem = {
  date: ReplacementItemDate;
  classData: ReplacementClassData[];
};
type ReplacementItemDate = {
  date: string;
  day: 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag';
  sorting: string;
};
export type ReplacementClassData = {
  cancellation: string;
  hour: string;
  message: string;
  name: string;
  newLesson: string;
  newRoom: string;
  oldLesson: string;
  oldRoom: string;
};

export default function Home() {
  const { parseAndSetData } = useClassReplacementStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      const response = await fetch('/api', { signal });
      const data = await response.json();
      await parseAndSetData(data);
    };

    fetchData().catch((err) => console.error(err));

    return () => controller.abort();
  }, [parseAndSetData]);

  return (
    <main className={'p-8'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <h1 className={'mb-8 text-2xl font-bold'}>DSB - Digitales Schwarzes Brett</h1>
        <TileGroup />
      </Theme>
    </main>
  );
}
