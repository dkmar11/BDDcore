const { By } = require('selenium-webdriver')
const { describe, it, expect } = require('@jest/globals');
const WebDriverActions = require("../../../utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../utils/ui/web_driver_waitings");
const driver_manager = require('../../../../core/selenium/driver_manager');

describe('testing the WebDriverWaitings class', () => {
  const baseURL = "http://uitestingplayground.com/";
  let result;

  it('should be able to get a browser', async() => {
    await driver_manager.init("EDGE");
    await WebDriverActions.navigateTo(baseURL);
    expect(await WebDriverActions.driver.getCurrentUrl()).toBe(baseURL);
    expect(driver_manager.sessionExists).toBe(true);
  });

  it('it should confirm the correct functionality of the elementIsLocated method', async() => {
    try {
      let loadDelayElement = By.xpath("//div[@class='col-sm']//a[contains(., 'Load Delay')]");
      await WebDriverWaitings.elementIsLocated(loadDelayElement);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the spaceElementIsLocated method', async() => {
    try {
      let testElement = "//div[@class='col-sm']//a[contains(., 'Hidden Layers')]";
      await WebDriverWaitings.spaceElementIsLocated(testElement);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the waitUntilElementIsVisible method', async() => {
    try {
      let testElement = By.xpath("//div[@class='col-sm']//a[contains(., 'Load Delay')]");
      await WebDriverActions.clickOnElement(testElement);
      let appearButton = By.css("button[class='btn btn-primary']");
      await WebDriverWaitings.waitUntilElementIsVisible(appearButton);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the waitUntilElementIsEnable method', async() => {
    try {
      let appearButton = By.css("button[class='btn btn-primary']");
      await WebDriverWaitings.waitUntilElementIsEnable(appearButton);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the isElementEnabled method', async() => {
    try {
      let appearButton = By.css("button[class='btn btn-primary']");
      await WebDriverWaitings.isElementEnabled(appearButton);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the elementIsLocatedOnly method', async() => {
    try {
      let appearButton = By.css("button[class='btn btn-primary']");
      await WebDriverWaitings.elementIsLocatedOnly(appearButton);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the waitUntilElementIsNotVisible method', async() => {
    const url = "http://uitestingplayground.com/visibility"
    await WebDriverActions.navigateTo(url);
    try {
      let removedButton =  By.css("button[id='removedButton']");
      await WebDriverWaitings.elementIsLocated(removedButton);
      let hideButton = By.css("button[id='hideButton']");
      await WebDriverActions.clickOnElement(hideButton);
      await WebDriverWaitings.waitUntilElementIsNotVisible(removedButton);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('it should confirm the correct functionality of the elementIsStale method', async() => {
    try {
      let removedButton =  By.css("button[id='removedButton']");
      await WebDriverWaitings.elementIsStale(removedButton);
      result = true;
    } catch (error) {
      result = false;
    }
    expect(result).toBe(true);
  });

  it('should be able to quit the browser', async() => {
    await driver_manager.close();
    expect(driver_manager.sessionExists).toBe(false);
  });
});