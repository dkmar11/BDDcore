const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverConditions = require("../../../core/utils/ui/web_driver_conditions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const logger = require("../../../core/utils/logger");
/**
 * class to work with search engine when the windows is opened
 * the search engine is opened by clicking on the search button
 * the search engine is closed by sending the escape key
 * the search engine is cleaned by clicking on the clean button
 */
class searchEngine{
  /**
   * Constructor of the class where the selector are declared
   */
  constructor(){
    this.searchEngineBody = By.css('div[data-test="command-bar__body"]');
    this.searchInput = By.css('input[data-test="command-bar__input"]');
    this.cleanContainerButton = By.css('[class*="InputContainer-clearButton"]');
  }
  /**
   * method to get the selector of the result of the search
   * @param {String} text - text to search
   * @returns {By} - selector to find the result
   */
  getRecordResultByText(text){
    return By.xpath(`//span[contains(@class, "Highlight")][text()="${text}"]`);
  }
  /**
   * method to search by text on search engine and select according to the text sent
   * @param {String} text - text to search
   * @returns {Boolean} - true if the result is found and false if not
   * note: if the result is not found the search engine will be closed
   */
  async searchByText(text){
    await WebDriverWaitings.elementIsLocated(this.searchEngineBody)
    await WebDriverActions.sendKeys(this.searchInput, text);
    try{
      await WebDriverActions.clickOnElement(this.getRecordResultByText(text));
      return true;
    }
    catch{
      logger.debug('no result found')
      await this.closeSearchEngine();
      return false;
    }
  }
  /**
   * this method closes the search engine if the search engine body is open or button error is displayed
   * it is cleaned doing a click on the clean button and send the escape key to close the search engine body 
   * if the search engine body is not open the method does nothing 
   * @param {String}
   * @returns {Promise<void>}
   */
  async closeSearchEngine(){
    if(await WebDriverConditions.elementIsVisible(this.searchEngineBody)){
      logger.debug('cleaning search engine')
      await WebDriverActions.clickOnElement(this.cleanContainerButton);
      await WebDriverActions.sendEscapeKey();
    }
    logger.debug('search engine cleaned')
  }
}

module.exports = new searchEngine();
