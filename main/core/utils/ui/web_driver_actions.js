const { Key } = require('selenium-webdriver');
const driver_manager = require('../../selenium/driver_manager');
const logger = require('../../utils/logger');
const WebDriverWaitings = require('./web_driver_waitings');

/**
 * Class to do actions on selenium web driver
 */
class WebDriverActions {
  /**
   * Getter for active driver to perform actions
   */
  static get driver() {
    return driver_manager.driver;
  }
  /**
   * static and asynchronous method to get a page on browser
   * @param {String} url  - URL to be navigated
   */
  static async navigateTo(url) {
    logger.debug(`Navigated to ${url}`);
    await this.driver.get(url);
  }
  /**
   * static and asynchronous method to click on element
   * note: this method waits for element to be located and enable
   * @param {By} element - selector to be clicked
   */
  static async clickOnElement(element) {
    await WebDriverWaitings.elementIsLocated(element)
    await this.driver.findElement(element).click();
  }

  /**
   * The function clicks on a specified element located on a web page.
   * @param element - The "element" parameter is the locator of the element that you want to click on.
   * It can be a CSS selector, XPath expression, or any other valid locator supported by the Selenium
   * WebDriver.
   */
  static async clickOnElementLocated(element) {
    await WebDriverWaitings.elementIsLocatedOnly(element)
    await this.driver.findElement(element).click();
  }
  /**
   * static and asynchronous method to send keys on element
   * note: this method waits for element to be located and enable
   * @param {By} element - selector to send keys
   * @param {String} value - value to be entered
   */
  static async sendKeys(element, value) {
    await WebDriverWaitings.elementIsLocated(element)
    await this.driver.findElement(element).clear();
    await this.driver.findElement(element).sendKeys(value);
  }

  /**
   * The function sends the Enter key to a specified element.
   * @param element - The "element" parameter is the locator of the element on the web page where you
   * want to send the Enter key. It can be a CSS selector, XPath, or any other supported locator
   * strategy.
   */
  static async sendEnterKey(element) {
    await WebDriverWaitings.elementIsLocated(element);
    await this.driver.findElement(element).sendKeys(Key.RETURN);
  }
  /**
   * static and asynchronous method to send the "Enter" key to the active element
   */
  static async sendEnterKeyToActiveElement() {
    logger.debug(`Sending ENTER key to active element`);
    await WebDriverActions.driver.switchTo().activeElement().sendKeys(Key.ENTER);
  }
  /**
   * The function clears the input of a specified element.
   * @param element - The "element" parameter is the locator of the input field that you want to clear.
   * It can be a CSS selector, XPath, or any other valid locator strategy supported by the Selenium
   * WebDriver.
   */
  static async clearInput(element) {
    await WebDriverWaitings.elementIsLocated(element);
    await this.driver.findElement(element).sendKeys(Key.CONTROL, "a");
    await this.driver.findElement(element).sendKeys(Key.DELETE);
  }

  /**
 * The function `elementHoverMove` moves the mouse cursor to hover over a specified element.
 * @param element - The `element` parameter is the element on which you want to perform the hover move
 * action. It should be a valid locator for finding the element on the page.
 */
  static async elementHoverMove(element){
    const actions = this.driver.actions({ bridge: true });
    await actions.move({ origin: await this.driver.findElement(element)}).perform();
  }
  /**
   * static and asynchronous method to send the "escape" key to the active element
   */
  static async sendEscapeKey() {
    logger.debug(`Sending ESC key to active element`);
    await this.driver.switchTo().activeElement().sendKeys(Key.ESCAPE);
  }
  /**
   * static and asynchronous method to take a screenshot of the current page
   */
  static async takeScreenshot() {
    try {
      const screenshot = await this.driver.takeScreenshot();
      logger.debug(`Screenshot taken`);
      return screenshot;
    } catch (error) {
      logger.error('Error while taking screenshot:', error);
    }
  }
  /**
   * The closeWindow function is used to quit the driver and close the current window.
   */
  static async closeWindow(){
    this.driver.quit();
  }
  /**
   * The function `rightClick`do a right-click hover over a specified element.
   * @param element The `element` parameter is the element on which you want to perform the right-click
   * action. It should be a valid locator for finding the element on the page.
   */
  static async rightClick(element){
    const actions = this.driver.actions({ bridge: true });
    await actions.contextClick(element).perform();
  }
}

module.exports = WebDriverActions;