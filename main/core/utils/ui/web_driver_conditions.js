const { until } = require('selenium-webdriver')
const logger = require('../logger');
const driver_manager = require('../../selenium/driver_manager');
const configuration_manager = require('../configuration_manager');
/**
 * Class for getting a condition on browser
 */
class WebDriverConditions {
  /**
   * Getter for active driver to perform actions
   */
  static get driver() {
    return driver_manager.driver
  }
  /**
   * static and asynchronous method for getting is a element is visible
   * note:
   * 1.-this method use until.elementIsVisible
   * 2.-timeout is set in configuration file (configuration.js)
   * @param {By} element - element should be disappeared
   * @returns {boolean} - true if element is visible, false otherwise
   */
  static async elementIsVisible(element) {
    const timeout = configuration_manager.setUp.conditions_timeout;
    logger.info(`Waiting ${timeout}ms for element ${element} to be visible`);
    try {
      await this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), timeout);
      return true;
    } catch {
      return false;
    }
  }  
}

module.exports = WebDriverConditions;
