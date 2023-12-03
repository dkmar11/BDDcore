const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const ListElements = require("./list_elements");

/** The DeleteList class provides methods to locate and delete a specific list element on a webpage. */
class DeleteList{

  /**
   * The constructor function initializes variables for different elements on a webpage.
   */
  constructor(){
    this.deleteOptionButton = By.css('a.nav-menu-item__delete_list-folder');
    this.confirmDeleteButton = By.xpath(`//button[contains(., 'Delete')]`);
    this.readyElement = By.css('div[class="lv-empty_img"], cu-list-group');
  }
  
  /**
   * This function deletes a space list by clicking on the specified elements and confirming the delete
   * action.
   * @param name - The name of the list that you want to delete.
   * @param space - The "space" parameter is the name or identifier of the space where the list is
   * located.
   */
  async deleteSpaceList(name, space){
    await WebDriverActions.clickOnElement(ListElements.locatorSpaceElement(space));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorListElement(name));
    await WebDriverActions.clickOnElement(ListElements.locatorListOption(name));
    await WebDriverWaitings.waitUntilElementIsEnable(this.deleteOptionButton);
    await WebDriverActions.clickOnElement(this.deleteOptionButton);
    await WebDriverActions.clickOnElement(this.confirmDeleteButton);
    await WebDriverWaitings.elementIsLocated(this.readyElement);
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
  }

  /**
    * The function deletes a folder and its associated list.
    * @param name - The name of the folder list that you want to delete.
    * @param folder - The folder parameter is the name or identifier of the folder that contains the list
    * you want to delete.
  */
  async deleteFolderList(name, folder){
    await WebDriverActions.clickOnElement(ListElements.locatorFolderElement(folder));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorListElement(name));
    await WebDriverActions.clickOnElement(ListElements.locatorListOption(name));
    await WebDriverWaitings.waitUntilElementIsEnable(this.deleteOptionButton);
    await WebDriverActions.clickOnElement(this.deleteOptionButton);
    await WebDriverActions.clickOnElement(this.confirmDeleteButton);
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverWaitings.waitUntilElementIsEnable(this.readyElement);
  }
}

module.exports = new DeleteList();