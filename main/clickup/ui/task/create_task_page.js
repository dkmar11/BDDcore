const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const logger = require("../../../core/utils/logger");
/**
 * class to work with task page
 */
class CreateTaskPage{
  /**
   * Constructor of the class where the selector are declared
   */
  constructor(){
    this.newTaskButton = By.css('div[data-test="float-button__toggle-simple-container-create-task"]');
    this.titleInput = By.css('textarea[cupendoid="quick-create-task-name-field"]');
    this.descriptionInput = By.css('.ql-block[data-block-id*="block"]');
    this.summitButton = By.css('div[data-test="draft-view__submit-btn_createTask"]');
    this.addSubTaskButton = By.css('div[class*="add-item-subtask"], a[class*="subtasks-add"]')
    this.subTaskControlButton = By.css('div[class*="subtasks-controls"]')
  }
  /**
   * @param {Object} task - object that must contains the following task information:
   * task.name - name of the task
   * task.description - description of the task
   */
  async createTask(task){
    logger.debug("Creating task");
    await WebDriverActions.clickOnElement(this.newTaskButton);
    await WebDriverActions.sendKeys(this.titleInput, task.name);
    await WebDriverActions.sendKeys(this.descriptionInput, task.description);
  }
  /**
   * Method to add subtasks to a task
   * @param {Array} subTasks - it should be an array of strings with the subtasks name, default it is an empty array.
   * for example:
   * [
   *  "subtask1",
   *  "subtask2"
   * ]
   */
  async addSubTask(subTasks) {
    await WebDriverActions.clickOnElement(this.addSubTaskButton)
    await WebDriverWaitings.elementIsLocated(this.subTaskControlButton)
    for (let index = 0; index < subTasks.length; index++) {
      await WebDriverActions.driver.switchTo().activeElement().sendKeys(subTasks[index]);
      await WebDriverActions.clickOnElement(this.addSubTaskButton)
    }
  }
}

module.exports = new CreateTaskPage();