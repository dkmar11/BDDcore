const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
const WebDriverConditions = require("../../../core/utils/ui/web_driver_conditions");
const logger = require("../../../core/utils/logger");
/**
 * class to work with task page
 */
class Dashboard {
  /**
   *Constructor of the class where the selector are declared
   */
  constructor() {
    this.searchInput = By.css('input[data-test="search-filter-input"]');
    this.resultRows = By.css('cu-task-row[data-test="task-list__task-row"]');
    this.archivedSpacesOption = By.xpath("//div[contains(@class,'cu-sts__tab ng-star-inserted')][contains(., 'Archived Spaces')]");
    this.cardItemSkeleton = By.css('div[class*="CardItemSkeleton"]');
  }
  /**
   * method to get the selector of the result of the search on dashboard
   * @param {String} name - name of task or subtask
   * @returns {By} - selector of task
   */
  taskRecordName(name) {
    return By.css(`span[data-test="task-row-main__${name}"]`);
  }

  /**
   * method to get the selector of the div on the dashboard according to the task or subtask name
   * @param {String} name - name of task or subtask
   * @returns {By} - selector of task
   */
  taskDivName(name) {
    return By.css(`div[data-test="task-row__container__${name}"]`);
  }
  /**
   * method to get the selector of the button to add new subtasks to a task according to the task name
   * @param {String} name - name of task
   * @returns {By} - selector of task
   */
  subTaskAddButtonName(name) {
    return By.css(`div[data-test="task-row__container__${name}"] div[data-test="subtasks-by-status-popup-create-tasks"]`);
  }
 
  /**
   * method to search a task by name on the dashboard search engine 
   * @param {String} text - text to search
   * @returns {Boolean} - true if the result is found and false if not
   */
  async searchByText(text) {
    await WebDriverActions.sendKeys(this.searchInput, text);
    try {
      await WebDriverWaitings.elementIsLocated(this.resultRows);
      await WebDriverActions.clickOnElement(this.taskRecordName(text));
      return true
    } catch {
      logger.debug(`the tasks with the name ${text} was not found`)
      return false
    }
  }

  /**
   * Method to add subtasks to a task
   * @param {String} task - name of task to add subtasks
   * @param {Array[string]} subTasks - it should be an array of strings with the subtasks name.
   * for example:
   * [
   *  "subtask1",
   *  "subtask2"
   * ]
   */
  async addSubTasks(task, subTasks) {
    await WebDriverActions.elementHoverMove(this.taskDivName(task));
    await WebDriverActions.clickOnElement(this.subTaskAddButtonName(task));
    for (let index = 0; index < subTasks.length; index++) {
      await WebDriverActions.driver.switchTo().activeElement().sendKeys(subTasks[index]);
      await WebDriverActions.sendEnterKeyToActiveElement();
      await WebDriverWaitings.elementIsLocated(this.taskRecordName(subTasks[index])); 
    }
  }

  /**
   * The method performs a click on Archived Spaces tab using WebDriverActions.
   */
  async clickOnArchivedSpacesOption (){
    await WebDriverConditions.elementIsVisible(this.archivedSpacesOption);
    await WebDriverActions.elementHoverMove(this.archivedSpacesOption);
    await WebDriverActions.clickOnElement(this.archivedSpacesOption);
  }

  /**
   * Method to locate the archived space through its name, it receive as
   * @param name to insert in the dynamic locator
   * @returns a XPath locator with the specific space name
   */
  listArchivedSpaces(name) {
    return By.xpath(`//div[@class='cu-sts__project-name'][contains(., '${name}')]`);
  }

  /**
   * The method search the archived space using WebDriverActions, it receive as
   * @param name to insert in the dynamics locators, this parameter comes from the space assertion steps file.
   * @returns {Boolean} - true if the archived space is found and false if not
   */
  async searchNameSpace(name){
    let spaceLocated = await WebDriverConditions.elementIsVisible(this.listArchivedSpaces(name));
    if(spaceLocated){
      await WebDriverGettings.getText(this.listArchivedSpaces(name));
      return true;
    }
    return false;
  }

  /**
   * Method to locate the  Delete permanently button through the archived space name, it receive as
   * @param name to insert in the dynamic locator
   * @returns a XPath locator with the specific space name
   */
  deletePermanentlyButtonLocation(name) {
    return By.xpath(`//button[contains(@class,'cu-sts__btn-delete')][preceding-sibling::div[contains(.,'${name}')]]`);
  }

  /**
   * The method performs click on the Delete permanently button using WebDriverActions, it receive as
   * @param name to insert in the dynamics locators, this parameter comes from the space assertion steps file.
   */
  async clickOnDeletePermanentlyButton (name){
    await WebDriverConditions.elementIsVisible(this.deletePermanentlyButtonLocation(name));
    await WebDriverActions.elementHoverMove(this.deletePermanentlyButtonLocation(name));
    await WebDriverActions.clickOnElement(this.deletePermanentlyButtonLocation(name));
    await WebDriverWaitings.waitUntilElementIsNotVisible(this.listArchivedSpaces(name));
  }

}

module.exports = new Dashboard();
