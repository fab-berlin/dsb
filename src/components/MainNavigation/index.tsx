'use client';

import { BackpackIcon, CookieIcon, TableIcon, ReaderIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthentication } from '@/store/useAuthentication';
// import { useDevice } from '@/contexts/deviceContext';
import classNames from 'classnames';

const MainNavigation = () => {
  const { authToken } = useAuthentication();
  // const { hasHomeButton } = useDevice();

  return (
    <>
      {authToken && (
        <nav
          className={classNames(
            'fixed bottom-0 left-0 flex w-full flex-row justify-evenly gap-x-4 border-t border-gray-300 bg-black pt-2',
            /*hasHomeButton ? 'h-16 items-center justify-center' : */ 'items-top h-24'
          )}
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
            label={'Aushänge'}
            route={'/document'}
          >
            <ReaderIcon
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
          <MainNavigationItem
            label={'Mittagessen'}
            route={'/food'}
          >
            <CookieIcon
              width="30"
              height="30"
            />
          </MainNavigationItem>
        </nav>
      )}
    </>
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
    <div className="w-1/3">
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
