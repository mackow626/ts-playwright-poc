import { defineConfig, devices } from '@playwright/test';
import path from 'path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

   outputDir: './test-results', // katalog na screenshoty, trace, nagrania
   snapshotDir: path.join(__dirname, 'tests/__snapshots__'), // wymuszona ścieżka snapshotów
   use: {
     browserName: 'chromium',
     viewport: { width: 1280, height: 900 },
     deviceScaleFactor: 1,
     fullPage: true,
   },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',


    viewport: { width: 1280, height: 900 },

  },

  /* Configure projects for major browsers */
  projects: [

      {
        name: 'chromium',
        use: { browserName: 'chromium' },
      },


  ],

});
