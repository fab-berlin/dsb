'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface DeviceContextType {
  hasHomeButton: boolean;
  isIOS: boolean;
  isLoading: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [hasHomeButton, setHasHomeButton] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Only run on iOS devices
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // Get the computed style to check safe area inset
      const computedStyle = window.getComputedStyle(document.documentElement);
      const safeAreaInsetBottom = Number.parseInt(
        computedStyle.getPropertyValue('--safe-area-inset-bottom') ||
          computedStyle.getPropertyValue('env(safe-area-inset-bottom)') ||
          '0'
      );

      // Devices without home button typically have a larger bottom inset (≥ 20px)
      // due to the home indicator (swipe bar)
      setHasHomeButton(safeAreaInsetBottom < 20);
    }

    setIsLoading(false);
  }, []);

  return (
    <DeviceContext.Provider value={{ hasHomeButton, isIOS, isLoading }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}
