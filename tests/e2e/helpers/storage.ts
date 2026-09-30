import type { Page } from "@playwright/test";

export async function readStorage(page: Page, key: string, session = false) {
  return page.evaluate(
    ({ storageKey, useSession }) =>
      (useSession ? window.sessionStorage : window.localStorage).getItem(storageKey),
    { storageKey: key, useSession: session }
  );
}

export async function writeLocalStorage(page: Page, key: string, value: string) {
  await page.evaluate(
    ({ storageKey, storageValue }) => window.localStorage.setItem(storageKey, storageValue),
    { storageKey: key, storageValue: value }
  );
}

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]