const webdriver = require("selenium-webdriver");
const logger = require('../utils/logger');
/**
 * 
 * @param {Object} configurations - object with configurations
 * @returns - browser driver
 */
const Remote = async (configuration) => {
  const username = configuration.username;
  const key = configuration.key;
  const host = configuration.host
  const gridUrl = 'https://' + username + ':' + key + '@' + host;
  const driver = await new webdriver.Builder()
    .usingServer(gridUrl)
    .withCapabilities(configuration.capabilities)
    .build();
  logger.info(`Remote server started with host: ${host}`);
  return driver;
};

module.exports = Remote;