import { useEffect, useState } from 'react';

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

// iPadOS reports itself as a Mac, so also check for touch support.
const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/**
 * Tracks whether the app can be installed.
 * - Android / desktop Chrome & Edge fire `beforeinstallprompt`; we keep the event so the
 *   app's own "Install" button can show the browser's install dialog later.
 * - iOS Safari has no install API, so callers show "Add to Home Screen" instructions instead.
 * Must be used in a component that is mounted from page load (App), because the
 * browser fires `beforeinstallprompt` only once.
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  /** Shows the browser's install dialog. Resolves to 'accepted', 'dismissed' or null. */
  const promptInstall = async () => {
    if (!deferredPrompt) return null;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return outcome;
  };

  return {
    canPrompt: !installed && deferredPrompt !== null,
    showIOSInstructions: !installed && isIOS(),
    promptInstall,
  };
}
