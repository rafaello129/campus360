import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: [
      "tests/unit/**/*.test.ts",
      "tests/integration/**/*.test.tsx"
    ],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "src/data/applicantStorage.ts",
        "src/data/demoSession.ts",
        "src/data/presentationSession.ts",
        "src/data/presentationReadiness.ts"
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 70
      }
    }
  }
});