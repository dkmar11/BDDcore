const {describe, expect} = require('@jest/globals');
const WebDriverGettings = require('../../../utils/ui/web_driver_gettings');
const driver_manager = require('../../../selenium/driver_manager');
const { By }  = require("selenium-webdriver");
describe('testing WebDriverGettings class', () => {
  it('should be able to get browser', async () => {
    const URL =  "http://uitestingplayground.com/";
    await driver_manager.init('EDGE');
    await WebDriverGettings.driver.get(URL);
    expect(await WebDriverGettings.driver.getCurrentUrl()).toBe(URL);
    expect(driver_manager.sessionExists).toBe(true);
  });

  it('should be able to get a text from an element', async () => {
    await WebDriverGettings.driver.get('http://uitestingplayground.com/verifytext');
    const text = await WebDriverGettings.getText(By.xpath("//span[normalize-space(.)='Welcome UserName!']"))
    expect(text).toBe('Welcome UserName!');
  });

  it("should be able to get an attribute's value from an element", async () => {
    await WebDriverGettings.driver.get('http://uitestingplayground.com/progressbar');
    const value = await WebDriverGettings.getValueAttribute(By.id("startButton"), "class")
    expect(value).toBe('btn btn-primary btn-test');
  });

  it("should be able to get elements from DOM", async () => {
    const elements = await WebDriverGettings.getElements(By.css('.btn'))
    expect(elements).toHaveLength(2);
  });

  it("should return the correct hexadecimal color for the minimum RGB color input", async () => {
    expect(WebDriverGettings.rgbToHex(0, 0, 0)).toBe('#000000');
    expect(WebDriverGettings.rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(WebDriverGettings.rgbToHex(1, 1, 1)).toBe('#010101');
    expect(WebDriverGettings.rgbToHex(254, 254, 254)).toBe('#fefefe');
    expect(WebDriverGettings.rgbToHex(128, 128, 128)).toBe('#808080');
  });

  it("should be able to get the color of an element", async () => {
    const color1 = await WebDriverGettings.getColor(By.id("startButton"));
    const color2 = await WebDriverGettings.getColor(By.id("stopButton"));
    expect(color1).toBe('#FFFFFF');
    expect(color2).toBe('#FFFFFF');
  });

  it("should be able to quit the browser", async () => {
    await driver_manager.close();
    expect(driver_manager.sessionExists).toBe(false);
  });
});