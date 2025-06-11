'use client';

import { Theme } from '@radix-ui/themes';
import ViewArea from '@/components/ViewArea';
import Settings from '@/components/Settings';

export default function Page() {
  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <h1 className={'mb-8 pt-4 text-2xl font-bold'}>Einstellungen</h1>
          <Settings />
        </ViewArea>
      </Theme>
    </main>
  );
}
