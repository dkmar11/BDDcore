const WebDriverActions = require('../../../utils/ui/web_driver_actions');
const WebDriverWaitings = require('../../../utils/ui/web_driver_waitings');
const WebDriverConditions = require('../../../utils/ui/web_driver_conditions');
const { By } = require('selenium-webdriver');
const DriverManager = require('../../../selenium/driver_manager');


describe('WebDriverActions', () => {
  const baseURL = "http://uitestingplayground.com";
  let result;
  describe('navigateTo', () => {
    it('should navigate to the specified URL', async () => {
      await DriverManager.init('EDGE');
      await WebDriverActions.navigateTo(baseURL);
      const testElement = By.css(`div[id="navbarSupportedContent"]`);
      await WebDriverWaitings.waitUntilElementIsVisible(testElement);
      const isElementVisible = await WebDriverConditions.elementIsVisible(testElement);
      expect(isElementVisible).toBe(true);
    });
  });

  describe('clickOnElement', () => {
    it('should click on the specified element', async () => {
      const testElement = By.css(`a[href='/textinput']`);
      const resultElement = By.css(`input.form-control[type='text']`);
      await WebDriverActions.clickOnElement(testElement);
      const isElementVisible = await WebDriverConditions.elementIsVisible(resultElement);
      expect(isElementVisible).toBe(true);
    });
  });

  describe('sendKeys', () => {
    it('should send keys to the specified element after clearing it', async () => {
      const testElement = By.css('#newButtonName');
      const value = "test";
      try {
        await WebDriverActions.sendKeys(testElement , value);
        result = true;
      } catch (error) {
        result = false;
      }
      expect(result).toBe(true);
    });
  });

  describe('sendEnterKey', () => {
    it('should send the Enter key to the specified element', async () => {
      const testElement = By.css('#newButtonName');
      try {
        await WebDriverActions.sendEnterKey(testElement);
        result = true;
      } catch (error) {
        result = false;
      }
      expect(result).toBe(true);
    });
  });

  describe('clearInput', () => {
    it('should send the Enter key to the specified element', async () => {
      const testElement = By.css('#newButtonName');
      const value = "test";
      await WebDriverActions.sendKeys(testElement, value);
      try {
        await WebDriverActions.clearInput(testElement);
        result = true;
      } catch (error) {
        result = false;
      }
      expect(result).toBe(true);
    });
  });

  describe('elementHoverMove', () => {
    it('should hover over the specified element', async () => {
      const testElement = By.css(`#updatingButton`);
      try {
        await WebDriverActions.elementHoverMove(testElement);
        result = true;
      } catch (error) {
        result = false;
      }
      expect(result).toBe(true);
      await DriverManager.close();
    });
  });
});
