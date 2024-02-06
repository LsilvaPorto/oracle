const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    env: {...process.env },
    defaultCommandTimeout: 10000,
    baseUrl: "https://apex.oracle.com/pls/apex/r/lspto/qa-application/",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
