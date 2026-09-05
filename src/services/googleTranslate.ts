import { LanguageCode } from '../types';

// In-memory translation cache
const memoryCache = new Map<string, string>();

const STORAGE_CACHE_KEY = 'tv_gtranslate_cache';
const STORAGE_KEY_CONFIG = 'tv_google_translate_api_key';

// Load initial persistent cache from localStorage
try {
  const stored = localStorage.getItem(STORAGE_CACHE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    Object.entries(parsed).forEach(([k, v]) => memoryCache.set(k, v as string));
  }
} catch {
  // Ignore storage access issues
}

const persistCache = () => {
  try {
    const obj: Record<string, string> = {};
    memoryCache.forEach((v, k) => {
      // Keep cache size bounded to last 500 entries
      if (Object.keys(obj).length < 500) {
        obj[k] = v;
      }
    });
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(obj));
  } catch {
    // Ignore storage quota
  }
};

/**
 * Get active Google Cloud Translate API Key
 * Checks in order:
 * 1. User configured key in localStorage
 * 2. Vite environment variable VITE_GOOGLE_TRANSLATE_API_KEY
 */
export const getGoogleTranslateKey = (): string => {
  try {
    const customKey = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (customKey && customKey.trim()) {
      return customKey.trim();
    }
  } catch {
    // ignore
  }

  // Check Vite environment variable
  const envKey = (import.meta as any).env?.VITE_GOOGLE_TRANSLATE_API_KEY || '';
  return envKey.trim();
};

/**
 * Set custom Google Cloud Translate API Key
 */
export const setCustomGoogleTranslateKey = (key: string): void => {
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
 * Check if Google Cloud Translation is configured and ready
 */
export const isGoogleTranslateConfigured = (): boolean => {
  const key = getGoogleTranslateKey();
  return Boolean(key && key.length > 5 && !key.includes('MY_KEY'));
};

/**
 * Translate single text using Google Cloud Translation API (v2)
 */
export const translateText = async (
  text: string,
  targetLang: LanguageCode | string,
  sourceLang: string = 'en'
): Promise<string> => {
  if (!text || !text.trim() || targetLang === sourceLang) {
    return text;
  }

  const cacheKey = `${sourceLang}_${targetLang}:${text.trim()}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  const apiKey = getGoogleTranslateKey();
  if (!apiKey) {
    // Return original text if no key is provided yet
    return text;
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        source: sourceLang,
        format: 'text',
      }),
    });

    if (!response.ok) {
      console.warn('Google Cloud Translation error status:', response.status);
      return text;
    }

    const data = await response.json();
    const translatedText = data?.data?.translations?.[0]?.translatedText;

    if (translatedText) {
      memoryCache.set(cacheKey, translatedText);
      persistCache();
      return translatedText;
    }
    return text;
  } catch (err) {
    console.warn('Google Cloud Translation network error:', err);
    return text;
  }
};

/**
 * Translate multiple strings in batch
 */
export const translateBatch = async (
  texts: string[],
  targetLang: LanguageCode | string,
  sourceLang: string = 'en'
): Promise<string[]> => {
  if (!texts.length || targetLang === sourceLang) {
    return texts;
  }

  const results: string[] = new Array(texts.length);
  const toFetchIndices: number[] = [];
  const toFetchTexts: string[] = [];

  texts.forEach((txt, idx) => {
    const cacheKey = `${sourceLang}_${targetLang}:${txt.trim()}`;
    if (memoryCache.has(cacheKey)) {
      results[idx] = memoryCache.get(cacheKey)!;
    } else {
      toFetchIndices.push(idx);
      toFetchTexts.push(txt);
    }
  });

  if (toFetchTexts.length === 0) {
    return results;
  }

  const apiKey = getGoogleTranslateKey();
  if (!apiKey) {
    toFetchIndices.forEach((idx, i) => {
      results[idx] = toFetchTexts[i];
    });
    return results;
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: toFetchTexts,
        target: targetLang,
        source: sourceLang,
        format: 'text',
      }),
    });

    if (!response.ok) {
      toFetchIndices.forEach((idx, i) => {
        results[idx] = toFetchTexts[i];
      });
      return results;
    }

    const data = await response.json();
    const translations = data?.data?.translations || [];

    toFetchIndices.forEach((idx, i) => {
      const translated = translations[i]?.translatedText || toFetchTexts[i];
      results[idx] = translated;
      const cacheKey = `${sourceLang}_${targetLang}:${toFetchTexts[i].trim()}`;
      memoryCache.set(cacheKey, translated);
    });

    persistCache();
    return results;
  } catch {
    toFetchIndices.forEach((idx, i) => {
      results[idx] = toFetchTexts[i];
    });
    return results;
  }
};
