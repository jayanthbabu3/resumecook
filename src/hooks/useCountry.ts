/**
 * Country Detection Hook
 *
 * Detects user's country to determine which currency to use for pricing.
 * Uses multiple detection methods in order of reliability:
 * 1. Cloudflare headers (if behind Cloudflare)
 * 2. IP geolocation API
 * 3. Browser timezone/locale as fallback
 *
 * Returns 'IN' for India (INR pricing), other countries get 'US' equivalent (USD pricing)
 */

import { useState, useEffect, useCallback } from 'react';

export type Currency = 'INR' | 'USD';

export interface CountryInfo {
  countryCode: string;
  currency: Currency;
  isIndia: boolean;
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = 'user_country_info';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedCountryInfo {
  countryCode: string;
  timestamp: number;
}

/**
 * Get cached country info from localStorage
 */
const getCachedCountry = (): string | null => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return null;

    const data: CachedCountryInfo = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data.countryCode;
  } catch {
    return null;
  }
};

/**
 * Cache country info in localStorage
 */
const cacheCountry = (countryCode: string): void => {
  try {
    const data: CachedCountryInfo = {
      countryCode,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
};

/**
 * Detect country from timezone (fallback method)
 * Returns 'IN' for Indian timezones, 'US' otherwise
 */
const detectCountryFromTimezone = (): string => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Indian timezones
    if (timezone.includes('Kolkata') || timezone.includes('Calcutta') || timezone.includes('India')) {
      return 'IN';
    }
    return 'US'; // Default to US for international
  } catch {
    return 'US';
  }
};

/**
 * Detect country from browser locale (additional fallback)
 */
const detectCountryFromLocale = (): string => {
  try {
    const locale = navigator.language || (navigator as any).userLanguage || '';
    // Check for Indian locales
    if (locale.includes('IN') || locale.includes('hi') || locale.includes('ta') || locale.includes('te')) {
      return 'IN';
    }
    return 'US';
  } catch {
    return 'US';
  }
};

/**
 * Detect country using IP geolocation API
 * Uses ip-api.com (free, no API key required)
 */
const detectCountryFromIP = async (): Promise<string> => {
  try {
    // Use ip-api.com - free and reliable
    const response = await fetch('https://ip-api.com/json/?fields=countryCode', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('IP geolocation failed');
    }

    const data = await response.json();
    return data.countryCode || 'US';
  } catch (error) {
    console.warn('IP geolocation failed, using timezone fallback:', error);
    return detectCountryFromTimezone();
  }
};

/**
 * Get currency based on country code
 */
export const getCurrencyForCountry = (countryCode: string): Currency => {
  return countryCode === 'IN' ? 'INR' : 'USD';
};

/**
 * Hook to detect user's country and determine appropriate currency
 */
export const useCountry = (): CountryInfo => {
  // Initialize with a smart default based on timezone/locale/cache for instant display
  const [countryInfo, setCountryInfo] = useState<CountryInfo>(() => {
    // First, try to get from cache (instant)
    const cachedCountry = getCachedCountry();
    if (cachedCountry) {
      const isIndia = cachedCountry === 'IN';
      return {
        countryCode: cachedCountry,
        currency: getCurrencyForCountry(cachedCountry),
        isIndia,
        loading: false, // Cache hit means no loading needed
        error: null,
      };
    }

    // Second, use timezone as initial guess (instant, no network)
    const tzCountry = detectCountryFromTimezone();
    const localeCountry = detectCountryFromLocale();
    const initialCountry = tzCountry === 'IN' || localeCountry === 'IN' ? 'IN' : 'US';
    const isIndia = initialCountry === 'IN';

    return {
      countryCode: initialCountry,
      currency: getCurrencyForCountry(initialCountry),
      isIndia,
      loading: true, // Still loading to do proper IP-based detection
      error: null,
    };
  });

  const detectCountry = useCallback(async () => {
    // Check cache first - if cached, we already set state in initializer
    const cachedCountry = getCachedCountry();
    if (cachedCountry) {
      // Cache was already applied in initializer, just ensure loading is false
      setCountryInfo(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      // Try IP geolocation for more accurate detection
      const countryCode = await detectCountryFromIP();
      const isIndia = countryCode === 'IN';

      // Cache the result
      cacheCountry(countryCode);

      setCountryInfo({
        countryCode,
        currency: getCurrencyForCountry(countryCode),
        isIndia,
        loading: false,
        error: null,
      });
    } catch (error) {
      // IP detection failed, use the timezone/locale detection we already have
      // Just mark loading as complete and cache the current detection
      setCountryInfo(prev => {
        cacheCountry(prev.countryCode);
        return {
          ...prev,
          loading: false,
          error: 'Using fallback detection',
        };
      });
    }
  }, []);

  useEffect(() => {
    detectCountry();
  }, [detectCountry]);

  return countryInfo;
};

/**
 * Synchronous function to get cached country (for immediate use)
 * Returns cached value or defaults to USD
 */
export const getCachedCurrency = (): Currency => {
  const cachedCountry = getCachedCountry();
  if (cachedCountry) {
    return getCurrencyForCountry(cachedCountry);
  }
  // Quick timezone check as fallback
  return getCurrencyForCountry(detectCountryFromTimezone());
};

export default useCountry;
