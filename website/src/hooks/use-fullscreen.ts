'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseFullscreenOptions {
  onToggle?: (isFullscreen: boolean) => void;
}

export function useFullscreen(
  ref: RefObject<HTMLElement | null>,
  options?: UseFullscreenOptions
) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!ref.current) return;

    // Detect iPhone/iOS specifically
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      // Simulated fullscreen for iOS
      const newState = !isFullscreen;
      setIsFullscreen(newState);
      if (options?.onToggle) options.onToggle(newState);
      return;
    }

    // Native Fullscreen API for supported devices
    if (!document.fullscreenElement) {
      ref.current.requestFullscreen().catch(() => {
        // Fallback to simulated
        setIsFullscreen(true);
        if (options?.onToggle) options.onToggle(true);
      });
    } else {
      document.exitFullscreen();
    }
  }, [ref, isFullscreen, options]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (options?.onToggle) options.onToggle(active);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [options]);

  return { isFullscreen, toggleFullscreen, setIsFullscreen };
}
