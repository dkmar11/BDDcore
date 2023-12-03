const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");

/** 
* The "UpdateFolder" class contains the specific funtions that allow interacting with the ClickUp UI to rename a folder into a space, using the web drivers (Actions and Waitings). 
*/
class UpdateFolderModal {
  /** In the constructor are declared the locators needed by methods to update a folder */
  constructor() {
    this.spaceElement = By.css('cu2-project-list-bar-item[data-test="project-list-bar-item__UI Testing"]');
    this.renameOption = By.css('a.nav-menu-item_rename');
    this.inputNameBox = By.css('[data-test="nav-editor__input"]')
  }
  /** The "folderContainer" method finds the locator with a specific folder name
   * @param folderName parameter is a string that contains the name of folder to be found
   * @returns the css locator for an specific folder
   */
  folderContainer(folderName) {
    return By.css(`div[data-test="nav-category__header-${folderName}"]`);
  }

  /** The "renameFolder" method finds a folder into a space and changes its name
   * @param folderName parameter is a string that contains the name of folder to be found
   * @param newName parmeter is a string that contains the new name for the folder
  */
  async renameFolder(folderName, newName) {
    await WebDriverWaitings.elementIsLocated(this.spaceElement);
    await WebDriverActions.clickOnElement(this.spaceElement);
    const folderElement = await WebDriverWaitings.elementIsLocated(this.folderContainer(folderName));
    await WebDriverActions.elementHoverMove(this.folderContainer(folderName));
    await WebDriverActions.rightClick(folderElement);
    await WebDriverWaitings.elementIsLocated(this.renameOption);
    await WebDriverActions.clickOnElement(this.renameOption);
    await WebDriverActions.clearInput(this.inputNameBox);
    await WebDriverActions.sendKeys(this.inputNameBox, newName);
    await WebDriverActions.sendEnterKey(this.inputNameBox);
  }

}

module.exports = new UpdateFolderModal();
