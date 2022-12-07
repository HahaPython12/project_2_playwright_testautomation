// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    // max time to wait when used expect
    timeout: 5000

  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // where should it run
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'on' // off, on, retain-on-failure

  },
};

module.exports = config;
