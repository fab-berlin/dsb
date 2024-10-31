'use client';

import { BackpackIcon, TableIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const MainNavigation = () => {
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
  const router = useRouter();
  const currentPath = usePathname();
  const activeClass = currentPath === route ? 'opacity-100' : 'opacity-40';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(route);
  };

  return (
    <div className="">
      <a
        href={route}
        className={`flex flex-col items-center justify-center gap-y-1 ${activeClass}`}
        onClick={handleClick}
      >
        {children}
        <span className={'text-xs'}>{label}</span>
      </a>
    </div>
  );
};
