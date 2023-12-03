const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverConditions = require("../../../core/utils/ui/web_driver_conditions");
const searchEngine = require("../search_engine/search_engine");
const space_page = require("../space/space_page");

/**
 * class to work with task page
 */
class Sidebar{
  /**
   * Constructor of the class where the selector are declared
   */
  constructor(){
    this.searchButton = By.css('div[data-test="search__inner"]');
    this.avatarIcon = By.css('div[data-test*="team-avatar"]');
  } 
  /**
   * method to start search by text in the sidebar clicking on the search button
   * @param {String} text - text to search
   * @returns {Boolean} - true if the result is found and false if not
   */
  async searchByText(text){
    await WebDriverActions.clickOnElement(this.searchButton);
    return await searchEngine.searchByText(text);
  }

  /**
   * method to search a space by id in the sidebar
   * @param id - to search a specific space
   * @returns {Boolean} - true if the result is found and false if not
   */
  async searchSpace(id){
    await WebDriverWaitings.waitUntilElementIsNotVisible(space_page.spaceIdLocation(id));
    const spaceElement = await WebDriverConditions.elementIsVisible(space_page.spaceIdLocation(id));
    if (!spaceElement) {
      return false;
    }
    return true;
  }
}

module.exports = new Sidebar();
