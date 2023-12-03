const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
const ListElements = require("./list_elements");


/** The CreateListPage class is a JavaScript class that represents a page for creating lists, with
methods for clicking buttons, setting list names, and getting the names of existing lists. */
class CreateList {
  /**
   * The constructor function initializes various elements and buttons used in a JavaScript program.
   */
  constructor() {
    this.optionListButton = By.xpath('//button[@data-test="dropdown-list-item__subcategory"]');
    this.inputListName = By.css('input[data-test="simple-input-modal__label"]');
    this.createButton = By.xpath('//div/button[@data-test="simple-input-modal__button"]');
    this.namesListsElement = By.css("div.cu-nav-section__name-text");
    this.readyElement = By.css('div[class="lv-empty_img"], cu-list-group');
  }

  /**
   * The function clicks on the add button after waiting for certain elements to be located and
   * performing a hover move action.
   */
  async selectSpaceElement(spaceName) {
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(spaceName));
    await WebDriverActions.elementHoverMove(ListElements.locatorSpaceElement(spaceName));
  }
  
  /**
   * The function performs a series of actions in a web page, including clicking on an element,
   * hovering over another element, and clicking on a button.
   * @param buttonName - The parameter "buttonName" is the name or identifier of the button that you
   * want to click on. It is used to locate the specific button element on the webpage.
   * @param spaceName - The spaceName parameter is the name or identifier of the space element on the
   * webpage. It is used to locate and interact with the specific space element on the page.
   */
  async spaceClickAddButton(buttonName, spaceName) {
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(spaceName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.elementHoverMove(ListElements.locatorSpaceElement(spaceName));
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceAddButton(buttonName));
  }

  /**
   * The function performs a click action on a folder element and then clicks on a button element
   * within that folder.
   * @param buttonName - The name or identifier of the button that needs to be clicked in the folder.
   * @param folderName - The folderName parameter is a string that represents the name of the folder.
   */
  async folderClickAddButton(buttonName, folderName) {
    await WebDriverActions.clickOnElement(ListElements.locatorFolderElement(folderName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorFolderAddButton(buttonName));
  }

  /**
   * The function performs a click action on a list option button using WebDriverActions.
   */
  async clickListOption() {
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverWaitings.elementIsLocated(this.optionListButton);
    await WebDriverActions.clickOnElement(this.optionListButton);
  }

  /**
   * The function sets a list name and submits it.
   * @param name - The name parameter is the name of the list that you want to set and submit.
   */
  async setListNameAndSubmit(name) {
    await WebDriverWaitings.elementIsLocated(this.readyElement);
    await WebDriverWaitings.elementIsLocated(this.inputListName);
    await WebDriverActions.sendKeys(this.inputListName, name)
    await WebDriverActions.clickOnElement(this.createButton);
    await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
  }

  
  /**
   * This function retrieves a list of names from a specified namespace in a web page.
   * @param spaceName - The spaceName parameter is the name of the space for which you want to retrieve
   * the list of names.
   * @returns a list of names.
   */
  async getNamesSpaceList(spaceName){
    await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(spaceName));
    const namesList = [];
    try {
      await WebDriverWaitings.elementIsLocated(this.namesListsElement);
      const elements = await WebDriverGettings.getElements(this.namesListsElement);
      await WebDriverGettings.getElements(this.namesListsElement);
      for (const element of elements) {
        const name = await element.getText();
        namesList.push(name);
      }
      return namesList;
    } catch {
      return namesList;
    }
  }

  /**
    * The function `getNamesFolderList` retrieves a list of names from a specified folder in a web page.
    * @param folderName - The folder name that you want to retrieve the names list from.
    * @returns an array of names.
  */
  async getNamesFolderList(folderName){
    await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorFolderElement(folderName));
    const namesList = [];
    try {
      await WebDriverWaitings.elementIsLocated(this.namesListsElement);
      const elements = await WebDriverGettings.getElements(this.namesListsElement);
      await WebDriverGettings.getElements(this.namesListsElement);
      for (const element of elements) {
        const name = await element.getText();
        namesList.push(name);
      }
      return namesList;
    } catch {
      return namesList;
    }
  }
}

module.exports = new CreateList();