const { By} = require("selenium-webdriver");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings")
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");

/**
 * Class to work with space modal page 
 */
class SpaceModalPage{

  /**
  * Constructor of the class where the selector are declared
  */
  constructor(){
    this.spaceModalContainer = By.css("div[data-test='modal__dialog']");
    this.spaceCurrentName = By.css("div[class='cu-dc__subtitle']");
    this.spaceNameInputText = By.css("input[type='text'][class='cu-dc__input ng-untouched ng-pristine ng-valid']");
    this.spaceDeleteButton = By.css("button[class='cu-btn cu-btn_fw-sm']");
    this.spaceArchiveButton = By.css("button[data-test='confirm-archive-project-btn']");
  }

  /**
   * Method to delete a space through the UI
   */
  async deleteSpace(){
    await WebDriverWaitings.elementIsLocated(this.spaceModalContainer);
    await WebDriverActions.clickOnElement(this.spaceNameInputText);
    await WebDriverActions.sendKeys(this.spaceNameInputText, WebDriverGettings.getText(this.spaceCurrentName));
    await WebDriverActions.clickOnElement(this.spaceDeleteButton);
  }

  /**
   * Method to archive a space through the UI
   */
  async archiveSpace(){
    await WebDriverWaitings.elementIsLocated(this.spaceModalContainer);
    await WebDriverActions.clickOnElement(this.spaceArchiveButton);
  }
}
module.exports = new SpaceModalPage();