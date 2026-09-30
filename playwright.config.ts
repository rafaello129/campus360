import { defineConfig } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: {
    timeout: 7_000
  },
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : 2,
  reporter: [
    ["list"],
    ["html", { open: "never" }]
  ],
  use: {
    baseURL: "http://127.0.0.1:4173/campus360/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "desktop",
      use: {
        browserName: "chromium",
        viewport: { width: 1366, height: 768 }
      }
    },
    {
      name: "mobile",
      testMatch: /responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true
      }
    }
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173/campus360/",
    reuseExistingServer: !isCI,
    timeout: 120_000
  }
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]