const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
const ListElements = require("./list_elements");

/** The OptionsList class provides methods for renaming, selecting, and duplicating space lists and
folder lists in a web application. */
class OptionsList{

  /**
     * The constructor function initializes variables for a space element, a rename option button, and a
     * name input field.
     */
  constructor(){
    this.renameOptionButton = By.css('a.nav-menu-item_rename');
    this.nameInput = By.css('input[data-test="nav-editor__input"]');
    this.readyElement = By.css('button[data-pendo="cu-dashboard-table__hide-closed-false"]');
    this.duplicateOptionButton = By.css('a.nav-menu-item_duplicate-list');
    this.moveOptionButton = By.css('a.nav-menu-item_move-list');
    this.customizeButton = By.xpath('//label[contains(., "Customize")]');
    this.assigneeCheckboxButton = By.xpath('//div[@class="cu-checkbox__label category-copy_checkbox-label" and contains(text(), "Assignee")]');
    this.dropdownSpaces = By.css('div[data-test="project-list-dropdown__nav-toggle"]');
    this.copyButton = By.css('button.cu-btn');
    this.moveButton = By.xpath('//button[.//div[text()="Move"]]');
    this.cancelButton = By.xpath('//button[.//div[text()="Cancel"]]');
    this.messageCopyCompleted = By.css('div[data-test="toast-items__close-button"]')
    this.readyElement = By.css('div[class="lv-empty_img"], cu-list-group');
    this.idElement = By.css('[data-test="nav-subcategory__component"]')
    this.dialog = By.css('h2#cu-modal__title');     
  }

  /**
    * This function renames a space in a list using WebDriverActions.
    * @param name - The current name of the space list element that you want to rename.
    * @param updateName - The `updateName` parameter is the new name that you want to assign to the
    * specified space in the list.
    * @param space - The "space" parameter represents the name or identifier of the space where the list
    * is located.
    */
  async renameSpaceList(name, updateName, space){
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(space));
    await WebDriverActions.elementHoverMove(ListElements.locatorSpaceElement(space));
    await WebDriverWaitings.idDataIsLocated(ListElements.locatorListElement(name));
    await WebDriverActions.clickOnElement(ListElements.locatorListElement(name));
    await WebDriverActions.clickOnElement(ListElements.locatorListOption(name));
    await WebDriverWaitings.waitUntilElementIsVisible(this.renameOptionButton);
    await WebDriverActions.clickOnElement(this.renameOptionButton);
    await WebDriverActions.clearInput(this.nameInput);
    await WebDriverActions.sendKeys(this.nameInput, updateName);
    await WebDriverActions.sendEnterKey(this.nameInput);
    await WebDriverWaitings.elementIsLocated(ListElements.locatorListElement(updateName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
  }
    
  /**
     * This function renames a folder list in a web application using WebDriverActions.
     * @param name - The current name of the folder list that needs to be renamed.
     * @param updateName - The `updateName` parameter is the new name that you want to give to the folder.
     * @param folder - The folder parameter is the name or identifier of the folder where the list is
     * located.
     */
  async renameFolderList(name, updateName, folder){
    await WebDriverActions.clickOnElement(ListElements.locatorFolderElement(folder));
    await WebDriverActions.elementHoverMove(ListElements.locatorFolderElement(folder));
    await WebDriverWaitings.idDataIsLocated(ListElements.locatorListElement(name));
    await WebDriverActions.clickOnElement(ListElements.locatorListElement(name));
    await WebDriverActions.clickOnElement(ListElements.locatorListOption(name));
    await WebDriverWaitings.waitUntilElementIsVisible(this.renameOptionButton);
    await WebDriverActions.clickOnElement(this.renameOptionButton);
    await WebDriverActions.clearInput(this.nameInput);
    await WebDriverActions.sendKeys(this.nameInput, updateName);
    await WebDriverActions.sendEnterKey(this.nameInput);
    await WebDriverWaitings.elementIsLocated(ListElements.locatorListElement(updateName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
  }

  /**
   * The function selects a list element by clicking on it and hovering over it.
   * @param spaceName - The spaceName parameter is a string that represents the name of the space
   * element that you want to select from a list.
   */
  async selectListElement(spaceName) {
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(spaceName));
    await WebDriverActions.elementHoverMove(ListElements.locatorSpaceElement(spaceName));
  }
  
  /**
   * This function clicks on a button in a specific space after hovering over it.
   * @param buttonName - The name or identifier of the button you want to click on in the space.
   * @param spaceName - The spaceName parameter is the name or identifier of the space element on the
   * webpage. It is used to locate and interact with the specific space element on the page.
   */
  async spaceClickAddButton(buttonName, spaceName) {
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(spaceName));
    await WebDriverActions.elementHoverMove(ListElements.locatorSpaceElement(spaceName));
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceAddButton(buttonName));
  }

  /**
   * The function `folderClickAddButton` clicks on a folder element and then clicks on a specific
   * button within that folder.
   * @param buttonName - The name or identifier of the button that needs to be clicked in the folder.
   * @param folderName - The folderName parameter is the name of the folder that you want to click on.
   */
  async folderClickAddButton(buttonName, folderName) {
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorFolderElement(folderName));
    await WebDriverActions.clickOnElement(ListElements.locatorFolderAddButton(buttonName));
  }

  /**
   * This function duplicates a space list and customizes it by assigning it to a different space.
   * @param listName - The name of the list that you want to duplicate.
   * @param destinySpace - The `destinySpace` parameter is the name or identifier of the space where
   * you want to duplicate the list.
   */
  async duplicateSpaceList(listName, destinySpace){
    await WebDriverActions.clickOnElement(ListElements.locatorListElement(listName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorListOption(listName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.duplicateOptionButton);
    await WebDriverActions.clickOnElement(this.duplicateOptionButton);
    await WebDriverWaitings.waitUntilElementIsVisible(this.dialog);
    await WebDriverActions.clickOnElement(this.customizeButton);
    await WebDriverActions.clickOnElement(this.assigneeCheckboxButton);
    await WebDriverActions.clickOnElement(this.dropdownSpaces);
    await WebDriverActions.clickOnElement(ListElements.locatorDestinySpace(destinySpace));
    await WebDriverActions.clickOnElement(this.copyButton);
    await WebDriverWaitings.waitUntilElementIsNotVisible(this.messageCopyCompleted);
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
  }

  /**
   * The function `getIdList` retrieves the data ID of a specific list in a given space.
   * @param listName - The name of the list you want to get the ID for.
   * @param destinySpace - The `destinySpace` parameter is the name or identifier of the space where
   * the list is located. It is used to locate the element representing the space in the web page.
   * @returns the value of the 'data-id' attribute of the element with the locator 'el'.
   */
  async getIdListDuplicated(listName, destinySpace){
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(destinySpace));
    const el = ListElements.locatorListCompleteElement(listName+" (copy)");
    await WebDriverWaitings.idDataIsLocated(el);
    const dataId = WebDriverGettings.getValueAttribute(el, 'data-id');
    return dataId
  }

  /**
 * The function moves a list from one space to another in a web application using WebDriver actions.
 * @param listName - The name of the list that you want to move.
 * @param targetSpace - The targetSpace parameter represents the space from which the list will be
 * moved. It is used to locate and click on the element representing the target space in the UI.
 * @param destinySpace - The `destinySpace` parameter in the `moveList` function represents the space
 * where the list will be moved to. It is used to locate the element that represents the destination
 * space in the user interface.
 */
  async moveList(listName, targetSpace, destinySpace) {
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(destinySpace));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    let moveButtonEnabled = false;
  
    while (!moveButtonEnabled) {
      await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(targetSpace));
      await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
      await WebDriverActions.clickOnElement(ListElements.locatorListElement(listName));
      await WebDriverActions.elementHoverMove(ListElements.locatorListElement(listName));
      await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
      await WebDriverActions.elementHoverMove(ListElements.locatorListElement(listName));
      await WebDriverActions.clickOnElement(ListElements.locatorListOption(listName));
      await WebDriverActions.clickOnElement(this.moveOptionButton);
      await WebDriverActions.clickOnElement(this.dropdownSpaces);
      await WebDriverActions.clickOnElement(ListElements.locatorDestinySpace(destinySpace));
      moveButtonEnabled = await WebDriverWaitings.isElementEnabled(this.moveButton);
      if (!moveButtonEnabled) {
        await WebDriverActions.clickOnElement(this.cancelButton);
      }
    }
    await WebDriverActions.clickOnElement(this.moveButton);
    await WebDriverWaitings.waitUntilElementIsNotVisible(this.dialog);
  }
}

module.exports = new OptionsList();