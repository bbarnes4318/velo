'use client';

import { useEffect } from 'react';

/**
 * Lets tel: links hand off directly to the device's native calling UI.
 *
 * The product mockup previously cancelled its own tel: click so it could behave
 * like a static demo. This capture-phase bridge intentionally gets there first,
 * adds a subtle haptic cue where supported, and opens the phone application.
 */
export default function NativeCallBridge() {
  useEffect(() => {
    const handleNativeCall = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link) return;

      const phoneUrl = link.getAttribute('href');
      if (!phoneUrl) return;

      // Cancel React demo handlers while preserving a direct user-initiated handoff.
      event.preventDefault();
      event.stopPropagation();

      if ('vibrate' in navigator) {
        navigator.vibrate(35);
      }

      window.location.assign(phoneUrl);
    };

    document.addEventListener('click', handleNativeCall, true);

    return () => {
      document.removeEventListener('click', handleNativeCall, true);
    };
  }, []);

  return null;
}
