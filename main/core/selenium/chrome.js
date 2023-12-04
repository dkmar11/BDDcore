const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const logger = require('../utils/logger');
const configuration_manager = require("../utils/configuration_manager");
/**
 * 
 * @param {Object} configurations - object with configurations
 * @returns - browser driver
 */
const Chrome = async (configurations) => {
  let options = new chrome.Options();
  if (configurations.headless) options.headless();
  options.windowSize({ height: configurations.window.height, width: configurations.window.width });
  options.excludeSwitches("enable-automation");
  let driver = await new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  driver.manage().setTimeouts({ implicit: configuration_manager.setUp.implicit_wait});
  logger.info("Chrome browser started");
  logger.info("Headless Mode:", configurations.headless);
  return driver;
};

module.exports = Chrome;