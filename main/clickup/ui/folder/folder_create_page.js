const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
const WebDriverConditions = require("../../../core/utils/ui/web_driver_conditions");

/** 
* The "CreateFolder" class contains the specific funtions that allow interacting with the ClickUp UI to create a folder into a space, using the web drivers (Actions, Waitings, Gettings and Conditions). 
*/
class CreateFolderPage {
  /** In the constructor are declared the locators needed by methods to create a folder */
  constructor() {
    this.spaceElement = By.css('cu2-project-list-bar-item[data-test="project-list-bar-item__UI Testing"]');
    this.plusButton = By.css('div[data-test="project-list-bar-item__add-container__UI Testing"]')
    this.folderOption = By.css('button[data-test="dropdown-list-item__category"]');
    this.boxInputName = By.css('input[data-test="create-category__form-input"]');
    this.createFolderButton = By.css('div[data-test="create-category__create-folder"]');
    this.namesFolders = By.css('cu-nav-category[culazyitem][cucontentvisibilityauto]');
    this.readyElement = By.css('button[data-pendo="cu-dashboard-table__hide-closed-false"]');
  }
  /** 
   * The "clickPlusButton" method looks and click-on for the '+' button in the space element, 
  */
  async clickPlusButton() {
    await WebDriverWaitings.elementIsLocated(this.spaceElement);
    await WebDriverActions.elementHoverMove(this.spaceElement);
    await WebDriverWaitings.elementIsLocated(this.plusButton);
    await WebDriverActions.clickOnElement(this.plusButton);

  }
  /**
   * The "clickfolderOption" method choose the option 'Folder' in the add (+) menu
   */
  async clickFolderOption() {
    await WebDriverWaitings.elementIsLocated(this.folderOption);
    await WebDriverActions.clickOnElement(this.folderOption);
  }
  /**
   * The "setNameFolder" method set the folder name into the input box
   * @param folderName is the name that is wanted for the folder
   */
  async setNameFolder(folderName) {
    await WebDriverWaitings.elementIsLocated(this.boxInputName);
    await WebDriverActions.sendKeys(this.boxInputName, folderName);
  }
  /**
   * The "submitNewFolder" method looks and click-on for the 'Create Folder' button to finish the folder creation
   */
  async submitNewFolder() {
    await WebDriverWaitings.elementIsLocated(this.createFolderButton);
    await WebDriverActions.clickOnElement(this.createFolderButton);
    await WebDriverConditions.elementIsVisible(this.readyElement);
  }
  /** 
   * The "getNamesFolders" method gets the names of the folders in the space and organizes them into an array
   * @returns an array with the folders names
   */
  async getNamesFolders() {

    await WebDriverWaitings.elementIsLocated(this.spaceElement);
    await WebDriverActions.clickOnElement(this.spaceElement);
    await WebDriverWaitings.elementIsLocated(this.namesFolders);
    const elements = await WebDriverGettings.getElements(this.namesFolders);
    const folders = [];
    for (const element of elements) {
      const name = await element.getText();
      folders.push(name);
    }
    return folders;
  }
 
}

module.exports = new CreateFolderPage();
