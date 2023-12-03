const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");

/** 
* The "DeleteFolder" class contains the specific funtions that allow interacting with the ClickUp UI to rename a folder into a space, using the web drivers (Actions and Waitings). 
*/
class DeleteFolderModal {
  /** In the constructor are declared the locators needed by methods to delete a folder */
  constructor() {
    this.spaceElement = By.css('cu2-project-list-bar-item[data-test="project-list-bar-item__UI Testing"]');
    this.deleteOption = By.css('a.nav-menu-item__delete_list-folder');
    this.deleteTextBox = By.css('input[class="cu-dc__input"]')
    this.deleteButton = By.css('div[data-test=btn__text]')
  }

  /** The "folderContainer" method finds the locator with a specific folder name
   * @param folderName parameter is a string that contains the name of folder to be found
   * @returns the css locator for an specific folder
   */
  folderContainer(folderName){
    return By.css(`div[data-test="nav-category__header-${folderName}"]`);
  }

  /** The "deleteFolder" method finds a folder into a space and deletes it
   * @param folderName parameter is a string that contains the name of folder to be found
  */
  async deleteFolder(folderName) {
    await WebDriverWaitings.elementIsLocated(this.spaceElement);
    await WebDriverActions.clickOnElement(this.spaceElement);
    const folderElement = await WebDriverWaitings.elementIsLocated(this.folderContainer(folderName));
    await WebDriverActions.elementHoverMove(this.folderContainer(folderName));
    await WebDriverActions.rightClick(folderElement);
    await WebDriverWaitings.elementIsLocated(this.deleteOption);
    await WebDriverActions.clickOnElement(this.deleteOption);
    await WebDriverWaitings.elementIsLocated(this.deleteTextBox);
    await WebDriverActions.clickOnElement(this.deleteTextBox);
    await WebDriverActions.sendKeys(this.deleteTextBox, folderName);
    await WebDriverWaitings.elementIsLocated(this.deleteButton);
    await WebDriverActions.clickOnElement(this.deleteButton);
  }
}

module.exports = new DeleteFolderModal();