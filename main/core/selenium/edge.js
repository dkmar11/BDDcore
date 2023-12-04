const webdriver = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
const logger = require('../utils/logger');

/**
 * @param {Object} configurations - object with configurations
 * @returns - browser driver
 */
const Edge = async (configurations) => {
  let options = new edge.Options();
  if (configurations.headless) options.headless();
  options.windowSize({ height: configurations.window.height, width: configurations.window.width });
  options.excludeSwitches("enable-automation");
  let driver = await new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
  logger.info("Edge browser started");
  logger.info("Headless Mode:", configurations.headless);
  return driver;
};

module.exports = Edge;