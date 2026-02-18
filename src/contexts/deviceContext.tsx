'use client';

import { createContext, useContext, type ReactNode } from 'react';

interface DeviceContextType {
  hasHomeButton: boolean;
  isIOS: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

function detectDevice(): DeviceContextType {
  if (typeof window === 'undefined') {
    return { hasHomeButton: false, isIOS: false };
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
  let hasHomeButton = false;

  if (isIOS) {
    const computedStyle = window.getComputedStyle(document.documentElement);
    const safeAreaInsetBottom = Number.parseInt(
      computedStyle.getPropertyValue('--safe-area-inset-bottom') ||
        computedStyle.getPropertyValue('env(safe-area-inset-bottom)') ||
        '0'
    );
    hasHomeButton = safeAreaInsetBottom < 20;
  }

  return { hasHomeButton, isIOS };
}

const deviceInfo = detectDevice();

export function DeviceProvider({ children }: { children: ReactNode }) {
  return <DeviceContext.Provider value={deviceInfo}>{children}</DeviceContext.Provider>;
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
}
