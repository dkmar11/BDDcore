const driver_manager = require("../../selenium/driver_manager");
const logger = require("../logger");
const WebDriverWaitings = require("./web_driver_waitings");

/**
 * Class to get elements from selenium web driver
 */
class WebDriverGettings {
  /**
   * Getter for active driver to perform actions
   */
  static get driver() {
    return driver_manager.driver;
  }
  /**
   * static and asynchronous method to get a text on a element
   * @param {By} element - selector to get a text
   * @returns {string} - text of the element
   */
  static async getText(element) {
    await WebDriverWaitings.elementIsLocated(element)
    const text = await this.driver.findElement(element).getText();
    logger.info(`text of the ${element} is: \n${text}`)
    return text;
  }
  /**
   * static and asynchronous method to get a value attribute of a element
   * @param {By} element - selector to get a attribute
   * @param {String} Attribute - name of the attribute
   * @returns {string} - value of the attribute
   */
  static async getValueAttribute(element, Attribute) {
    await WebDriverWaitings.elementIsLocated(element)
    const value = await this.driver.findElement(element).getAttribute(Attribute);
    logger.info(`Attribute of the ${element} is: \n${Attribute}=${value}`)
    return value;
  }

  /**
   * The function "getElements" is a static asynchronous function that takes an element as a parameter,
   * finds all matching elements using the driver, logs the elements, and returns them.
   * @param element - The `element` parameter is the locator used to find the elements on the web page.
   * It can be a CSS selector, XPath expression, or any other supported locator strategy.
   * @returns The value being returned is the array of elements found by the driver using the specified
   * element locator.
   */
  static async getElements(element) {
    const value = await this.driver.findElements(element);
    logger.info(`Elements of the ${element} are: \n$${value}`)
    return value;
  }

  /**
   * The function "rgbToHex" is a static function that takes 3 elements as parameters,
   * it transforms the color from rgb to hexadecimal
   * @param r , @param g, @param b 
   * @returns a string with the hexadecimal color
   */
  static rgbToHex(r, g, b) {
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  /**
   * The function "getColor" is a static asynchronous function that takes an element as a parameter,
   * finds the matching element using the driver and it transforms the color to hexadecimal
   * @param element - The `element` parameter is the locator used to find the elements on the web page.
   * It can be a CSS selector, XPath expression, or any other supported locator strategy.
   * @returns The value being returned is the string hexColor of element found by the driver using the specified
   * element locator.
   */
  static async getColor(element) {
    const value = await this.driver.findElement(element);
    const color = await value.getCssValue('color');
    logger.info(`The color is: ${color}`)
    const rgbaValues = color.match(/\d+/g);
    const hexColor = this.rgbToHex(rgbaValues[0], rgbaValues[1], rgbaValues[2]).toUpperCase();
    return hexColor;
  }
}

module.exports = WebDriverGettings;
