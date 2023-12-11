const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const logger = require("../../../core/utils/logger");
const WebDriverConditions = require("../../../core/utils/ui/web_driver_conditions");
/**
 * class to work with task page
 */
class CreateTaskPage {
  /**
   * Constructor of the class where the selector are declared
   */
  constructor() {
    this.taskCreationWindow = By.css('cu-create-task[class="ng-star-inserted"]')
    this.newTaskButton = By.css('button[data-test="create-task-menu__new-task-button"]');
    this.titleInput = By.css('textarea[data-test="draft-view__title-task"]');
    this.descriptionInput = By.css('.ql-block[data-block-id*="block"]');
    this.summitButton = By.css('button[data-test="draft-view__quick-create-create"]');
    this.addSubTaskButton = By.css('div[class*="add-item-subtask"], a[class*="subtasks-add"]');
    this.subTaskControlButton = By.css('div[class*="subtasks-controls"]');
    this.taskNameError = By.css('div[cupendoid="quick-create-task-enter-task-name-error"]');
  }
  /**
   * @param {Object} task - object that it will be filled into 
   * - the task name input field (task.name)
   * - the description input field (task.description)
   * note: the new task button is clicked if it is not open the task creation window
   * @returns {Boolean}
   */
  async createTask(task) {
    logger.debug("Creating task");
    if(!await WebDriverConditions.elementIsVisible(this.taskCreationWindow)){
      await WebDriverActions.clickOnElement(this.newTaskButton);
    }
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
