/**
 * Smartsupp Live Chat Service
 * Supports runtime key injection from:
 * 1. User configured key in localStorage ('tv_smartsupp_key')
 * 2. Vite environment variable VITE_SMARTSUPP_KEY
 * 3. Environment variable SMARTSUPP_KEY
 */

declare global {
  interface Window {
    _smartsupp?: any;
    smartsupp?: any;
  }
}

const STORAGE_KEY_CONFIG = 'tv_smartsupp_key';

/**
 * Get active Smartsupp Key
 */
export const getSmartsuppKey = (): string => {
  try {
    const customKey = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (customKey && customKey.trim()) {
      return customKey.trim();
    }
  } catch {
    // ignore
  }

  const envKey = 
    (import.meta as any).env?.VITE_SMARTSUPP_KEY || 
    (import.meta as any).env?.SMARTSUPP_KEY || 
    '';
  return envKey.trim();
};

/**
 * Set custom Smartsupp Key in local storage
 */
export const setCustomSmartsuppKey = (key: string): void => {
  try {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY_CONFIG, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_CONFIG);
    }
  } catch {
    // ignore
  }
};

/**
 * Check if Smartsupp is configured with a key
 */
export const isSmartsuppConfigured = (): boolean => {
  const key = getSmartsuppKey();
  return Boolean(key && key.length > 5 && !key.includes('MY_KEY'));
};

/**
 * Initialize official Smartsupp Live Chat widget
 */
export const initSmartsupp = (user?: { email?: string; fullName?: string }): boolean => {
  const key = getSmartsuppKey();
  if (!key || key.length < 5 || key.includes('MY_KEY')) {
    return false;
  }

  try {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = key;

    if (user?.email) {
      window._smartsupp.email = user.email;
    }
    if (user?.fullName) {
      window._smartsupp.name = user.fullName;
    }

    if (window.smartsupp) {
      // Already loaded
      if (user?.email) window.smartsupp('email', user.email);
      if (user?.fullName) window.smartsupp('name', user.fullName);
      return true;
    }

    // Check if script element already exists
    const existingScript = document.getElementById('smartsupp-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'smartsupp-script';
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.src = 'https://www.smartsuppchat.com/loader.js?';
      document.head.appendChild(script);
    }

    return true;
  } catch (err) {
    console.warn('Smartsupp initialization error:', err);
    return false;
  }
};

/**
 * Open Smartsupp chat box programmatically if available
 */
export const openSmartsuppChat = (): boolean => {
  try {
    if (window.smartsupp) {
      window.smartsupp('chat:open');
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
