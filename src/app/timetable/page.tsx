'use client';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';
import { useEffect, useState } from 'react';

type TimetableHour = {
  name: string;
  type: string;
  length: string;
  startType: 'A' | 'E';
  startTime: string;
  endTime: string;
};
type TimetableDayItem = {
  day: string;
  houres: TimetableHour[];
};
type Timetable = {
  timetable: TimetableDayItem[];
};

export default function Page() {
  const [timetableData, setTimetableData] = useState<Timetable | null>(null);

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
    <main className={'p-4'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>{timetableData?.timetable.map((el) => <p key={el.day}>{el.day}</p>)}</ViewArea>
      </Theme>
    </main>
  );
}
