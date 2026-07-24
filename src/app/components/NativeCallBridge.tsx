'use client';

import { useEffect } from 'react';

const LEGACY_DEMO_PHONE = 'tel:5550199';
const COMPLETE_DEMO_PHONE = 'tel:+12025550199';

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

      const rawPhoneUrl = link.getAttribute('href');
      if (!rawPhoneUrl) return;

      // Preserve future real lead numbers while completing the legacy demo value.
      const phoneUrl = rawPhoneUrl === LEGACY_DEMO_PHONE
        ? COMPLETE_DEMO_PHONE
        : rawPhoneUrl;

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
