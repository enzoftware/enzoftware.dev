import { describe, test, expect, beforeEach } from "bun:test";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  setCookieConsent,
  hasConsented,
  subscribeCookieConsent,
  type CookieConsentEventDetail,
} from "../../src/lib/cookieConsent";

type Listener = (event: Event) => void;

interface CustomEventInitDict<T = unknown> {
  detail?: T;
}

class MockCustomEvent<T = unknown> {
  type: string;
  detail?: T | undefined;
  constructor(type: string, init?: CustomEventInitDict<T>) {
    this.type = type;
    if (init && "detail" in init) {
      this.detail = init.detail;
    }
  }
}

describe("cookieConsent logic", () => {
  let store: Record<string, string> = {};
  const listeners: Record<string, Listener[]> = {};

  beforeEach(() => {
    store = {};
    const mockStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      length: 0,
      key: () => null,
    };

    const mockWindow = {
      localStorage: mockStorage,
      dispatchEvent: (event: Event) => {
        const cbs = listeners[event.type] || [];
        cbs.forEach((cb) => cb(event));
        return true;
      },
      addEventListener: (type: string, cb: Listener) => {
        if (!listeners[type]) listeners[type] = [];
        listeners[type].push(cb);
      },
      removeEventListener: (type: string, cb: Listener) => {
        if (!listeners[type]) return;
        listeners[type] = listeners[type].filter((fn) => fn !== cb);
      },
    };

    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(globalThis, "window", {
      value: mockWindow,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(globalThis, "CustomEvent", {
      value: MockCustomEvent,
      writable: true,
      configurable: true,
    });
  });

  test("getCookieConsent returns null when no consent has been set", () => {
    expect(getCookieConsent()).toBeNull();
    expect(hasConsented()).toBe(false);
  });

  test("setCookieConsent('accepted') saves to localStorage and dispatches event", () => {
    let capturedDetail: CookieConsentEventDetail | null = null;
    const listener = (e: Event) => {
      capturedDetail = (e as unknown as { detail: CookieConsentEventDetail })
        .detail;
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, listener);

    setCookieConsent("accepted");

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("accepted");
    expect(getCookieConsent()).toBe("accepted");
    expect(hasConsented()).toBe(true);
    expect(capturedDetail as unknown).toEqual({ consent: "accepted" });

    window.removeEventListener(COOKIE_CONSENT_EVENT, listener);
  });

  test("setCookieConsent('declined') saves to localStorage and dispatches event", () => {
    let capturedDetail: CookieConsentEventDetail | null = null;
    const listener = (e: Event) => {
      capturedDetail = (e as unknown as { detail: CookieConsentEventDetail })
        .detail;
    };
    window.addEventListener(COOKIE_CONSENT_EVENT, listener);

    setCookieConsent("declined");

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe("declined");
    expect(getCookieConsent()).toBe("declined");
    expect(hasConsented()).toBe(false);
    expect(capturedDetail as unknown).toEqual({ consent: "declined" });

    window.removeEventListener(COOKIE_CONSENT_EVENT, listener);
  });

  test("subscribeCookieConsent subscribes and receives updates", () => {
    let callCount = 0;
    const unsubscribe = subscribeCookieConsent(() => {
      callCount++;
    });

    setCookieConsent("accepted");
    expect(callCount).toBe(1);

    unsubscribe();
    setCookieConsent("declined");
    expect(callCount).toBe(1);
  });

  test("getCookieConsent ignores unknown values and returns null", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "random_garbage");
    expect(getCookieConsent()).toBeNull();
    expect(hasConsented()).toBe(false);
  });
});
