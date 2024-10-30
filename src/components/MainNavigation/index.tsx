'use client';

import { BackpackIcon, TableIcon } from '@radix-ui/react-icons';
import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useNavigationStore } from '@/app/store/useNavigationStore';
import { usePathname } from 'next/navigation';

const MainNavigation = () => {
  const currentPath = usePathname();
  const { setCurrentRoute } = useNavigationStore();

  useEffect(() => {
    if (currentPath) {
      setCurrentRoute(currentPath);
    }
  }, [currentPath, setCurrentRoute]);

  return (
    <nav
      className={
        'fixed bottom-0 left-0 flex h-16 w-full flex-row items-center justify-center justify-evenly gap-x-4 border-t border-gray-300 bg-black'
      }
    >
      <MainNavigationItem
        label={'DSB'}
        route={'/'}
      >
        <BackpackIcon
          width="30"
          height="30"
        />
      </MainNavigationItem>
      <MainNavigationItem
        label={'Stundenplan'}
        route={'/timetable'}
      >
        <TableIcon
          width="30"
          height="30"
        />
      </MainNavigationItem>
    </nav>
  );
};

export default MainNavigation;

const MainNavigationItem = ({
  label,
  route,
  children,
}: {
  label: string;
  route: string;
  children: ReactNode;
}) => {
  const { currentRoute, setCurrentRoute } = useNavigationStore();
  const activeClass = currentRoute === route ? 'opacity-100' : 'opacity-40';

  return (
    <div className="">
      <Link
        href={route}
        className={`flex flex-col items-center justify-center gap-y-1 ${activeClass}`}
        onClick={() => setCurrentRoute(route)}
      >
        {children}
        <span className={'text-xs'}>{label}</span>
      </Link>
    </div>
  );
};
