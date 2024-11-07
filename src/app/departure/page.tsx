import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import ViewArea from '@/components/ViewArea';
import DepartureView from '@/components/DepartureView';

export default function Departure() {
  return (
    <main className={'h-screen overflow-hidden'}>
      <Theme
        appearance="dark"
        hasBackground={false}
      >
        <ViewArea>
          <h1 className={'mb-8 pt-4 text-2xl font-bold'}>Abfahrten</h1>
          <DepartureView />
        </ViewArea>
      </Theme>
    </main>
  );
}
