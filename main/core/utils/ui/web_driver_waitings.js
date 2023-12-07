const { By, until } = require('selenium-webdriver')
const logger = require('../../utils/logger');
const driver_manager = require('../../selenium/driver_manager');
const configuration_manager = require('../configuration_manager');
/**
 * Class for waitings in selenium web driver
 */
class WebDriverWaitings {
  /**
   * Getter for active driver to perform actions
   */
  static get driver() {
    return driver_manager.driver
  }
  /**
   * static and asynchronous method for waiting for an element to be Located and Enabled
   * note:
   * 1.-this method use until.elementLocated, until.elementIsEnabled and visible to wait the element
   * 2.-timeout is set in configuration file (configuration.js)
   * @param {By} element - element to wait for
   */
  static async elementIsLocated(element) {
    const timeout = configuration_manager.setUp.timeout;
    logger.info(`Waiting for element ${element} to be located`);
    await this.driver.wait(until.elementLocated(element), timeout);
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), timeout);
    await this.driver.wait(until.elementIsEnabled(this.driver.findElement(element)), timeout);
  }
  /**
 * The function `idDataIsLocated` waits for an element to have a valid data-id attribute and returns
 * the value of the data-id attribute.
 * @param element - The `element` parameter is the locator for the element on the page that you want to
 * check for a valid `data-id` attribute. It can be a CSS selector, XPath expression, or any other
 * valid locator supported by the WebDriver library you are using.
 * @returns the value of the `dataId` variable.
 */
  static async idDataIsLocated(element) {
    const timeout = configuration_manager.setUp.timeout;
    logger.info(`Waiting for element ${element} to have a valid data-id`);
    let dataId;
    let isPending = true;
    while (isPending) {
      try {
        await this.driver.wait(async () => {
          const el = await this.driver.findElement(element);
          dataId = await el.getAttribute('data-id');
          isPending = dataId.startsWith('PENDING');
          return !isPending;
        }, timeout);
      } catch (err) {
        break;
      }
    }
    if (isPending) {
      logger.info(`Element data-id still has a PENDING value: ${dataId}`);
    } else {
      logger.info(`Element located with data-id: ${dataId}`);
    }
    return dataId;
  }

  /**
   * static and asynchronous method for waiting for an element to be not visible
   * note:
   * 1.-this method use until.elementIsNotVisible
   * 2.-timeout is set in configuration file (configuration.js)
   * @param {By} element - element should be disappeared
   */
  static async elementIsNotVisible(element) {
    const timeout = configuration_manager.setUp.timeout;
    await this.elementIsLocated(element);
    logger.info(`Waiting for element ${element} to be not visible`);
    await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(element)), timeout);
  }

  /**
 * static and asynchronous method for waiting until an element's property has a specific value.
 * @param {By} element - The element to wait for.
 * @param {string} propertyName - The name of the property to check.
 * @param {string} desiredValue - The expected value of the property.
 */
  static async waitForElementPropertyWithValue(element, propertyName, desiredValue) {
    const timeout = configuration_manager.setUp.timeout;
    logger.info(`Waiting for element property ${propertyName} to have value: ${desiredValue}`);
    await this.driver.wait(async () => {
      const actualValue = await (await this.driver.findElement(element)).getAttribute(propertyName);
      return actualValue === desiredValue;
    }, timeout);}

  /** static and asynchronous method for waiting for an space element to be Located and Enabled
   * note:
   * 1.-this method use until.elementLocated to wait the element
   * 2.-timeout is set in configuration file (configuration.js)
   * @param {By} selector - to wait for
   */
  static async spaceElementIsLocated(selector) {
    const timeout = configuration_manager.setUp.timeout;
    logger.info(`Waiting for element with selector ${selector} to be located`);
    const bySelector = By.xpath(selector); 
    await this.driver.wait(until.elementLocated(bySelector), timeout);
  }
  /** static and asynchronous method for waiting for an element to be stale
   * 1.-timeout is set in configuration file (configuration.js)
   * 2.-this method waits fot the element to be located
   * 3.-this method uses until.stalenessOf to wait
   * @param {By} selector - element to wait for
   */
  static async elementIsStale(selector) {
    const timeout = configuration_manager.setUp.timeout;
    try{
      await this.driver.wait(until.elementLocated(selector), configuration_manager.setUp.conditions_timeout);
      logger.info(`Waiting for element ${selector} to be stale`);
      await this.driver.wait(until.stalenessOf(await this.driver.findElement(selector)), timeout);
    }
    catch{
      logger.info('Element was not appear')
    }
  }
  
  /**
    The function waits until a specified element is visible on the page.
    * @param element - The `element` parameter is the locator for the element that you want to wait for it
    * to become visible. It can be a CSS selector, XPath expression, or any other valid locator supported
    * by the WebDriver framework you are using.
  */
  static async waitUntilElementIsVisible(element) {
    const timeout = configuration_manager.setUp.timeout;
    await this.elementIsLocated(element);
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), timeout);
    logger.info(`Waiting for element ${element} to be visible`);
  }

  /**
 * The function waits until a specified element is enabled on a web page.
 * @param element - The "element" parameter is the locator for the element that you want to wait for.
 * It can be a CSS selector, XPath expression, or any other valid locator supported by the WebDriver
 * framework.
 */
  static async waitUntilElementIsEnable(element) {
    const timeout = configuration_manager.setUp.timeout;
    await this.elementIsLocated(element);
    await this.driver.wait(until.elementIsEnabled(this.driver.findElement(element)), timeout);
    logger.info(`Waiting for element ${element} to be visible`);
  }

  /**
 * The function waits until a specified element is not visible on the page.
 * @param element - The `element` parameter is the locator for the element that you want to wait until
 * it is not visible on the page. It can be a CSS selector, XPath expression, or any other valid
 * locator supported by the WebDriver framework.
 */
  static async waitUntilElementIsNotVisible(element) {
    const timeout = configuration_manager.setUp.timeout;
    try {
      await this.driver.wait(async () => {
        try {
          const el = await this.driver.findElement(element);
          const isDisplayed = await el.isDisplayed();
          return !isDisplayed;
        } catch (err) {
          return true;
        }
      }, timeout);
    } catch (err) {
      logger.info(`Element is still visible after waiting: ${element}`);
    }
  }

  /**
 * The function checks if a given element is enabled on a web page using Selenium WebDriver in
 * JavaScript.
 * @param element - The "element" parameter is the locator for the web element that you want to check
 * if it is enabled or not. It can be a CSS selector, XPath expression, or any other supported locator
 * strategy.
 * @returns The method is returning a boolean value indicating whether the element is enabled or not.
 */
  static async isElementEnabled(element) {
    await WebDriverWaitings.elementIsLocatedOnly(element);
    const webElement = this.driver.findElement(element);
    return await webElement.isEnabled();
  }

  /**
 * The function waits for an element to be located and visible on the page.
 * @param element - The `element` parameter is the locator for the element you want to wait for. It can
 * be a CSS selector, XPath expression, or any other valid locator supported by the WebDriver
 * framework.
 */
  static async elementIsLocatedOnly(element) {
    const timeout = configuration_manager.setUp.timeout;
    logger.info(`Waiting for element ${element} to be located`);
    await this.driver.wait(until.elementLocated(element), timeout);
    await this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), timeout);
  }
}

module.exports = WebDriverWaitings;
