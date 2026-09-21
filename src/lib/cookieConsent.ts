export type CookieConsentStatus = "accepted" | "declined";

export const COOKIE_CONSENT_KEY = "cookie_consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-change";

export interface CookieConsentEventDetail {
  consent: CookieConsentStatus;
}

export function getCookieConsent(): CookieConsentStatus | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "declined") {
      return value;
    }
    return null;
  } catch (_e) {
    return null;
  }
}

export function setCookieConsent(status: CookieConsentStatus): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage?.setItem(COOKIE_CONSENT_KEY, status);
  } catch (_e) {
    // Gracefully handle storage quota or privacy mode errors
  }

  try {
    const event = new CustomEvent<CookieConsentEventDetail>(
      COOKIE_CONSENT_EVENT,
      {
        detail: { consent: status },
      },
    );
    window.dispatchEvent(event);
  } catch (_e) {
    // CustomEvent fallback
  }
}

export function hasConsented(): boolean {
  return getCookieConsent() === "accepted";
}

export function subscribeCookieConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
}

export function getCookieConsentSnapshot(): CookieConsentStatus | null {
  return getCookieConsent();
}

export function getServerCookieConsentSnapshot(): CookieConsentStatus | null {
  return null;
}
