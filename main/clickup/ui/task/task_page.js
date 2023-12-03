const { By } = require("selenium-webdriver");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings")
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const logger = require("../../../core/utils/logger");
/**
 * class to work with task page
 */
class TaskPage {
  /**
   * Constructor of the class where the selector are declared
   */
  constructor() {
    this.taskNameInput = By.css('textarea[data-test="task-name-textarea"]');
    this.taskNameDiv = By.id('task-name');
    this.taskDescriptionDiv = By.css('[data-test="task-editor"]>div.ql-editor');
    this.taskDescriptionInput = By.css('[data-test="task-editor"]>div.ql-editor>.ql-block');
    this.taskContainer = By.css('div[data-test="task-container"]');
    this.taskHistoryItem = By.css('cu-task-history-item');
    this.taskCloseButton = By.css('button[data-test="task-close"]');
    this.taskSettingsButton = By.css('div[data-test="view-task__ellipsis-menu"]');
    this.taskDeleteButton = By.css('.nav-menu-item__delete_task')
    this.loaderIcon = By.css('cu-loader[class*="cu-loader"]')
    this.subTaskTitle = By.css('a[class*="task-todo-item__name-text-inner-link"]')
    this.taskStatusButton = By.css('span[class*="task-status__value"]')
  }
  /**
   * Method to get the task as a object with name and description properties
   * note: 
   * 1.-the task container is closed after getting the task object
   * 2.- the task container should be opened
   * @returns {Object} task object with name and description
   */
  async getTask() {
    await WebDriverWaitings.elementIsLocated(this.taskContainer);
    const taskName = await WebDriverGettings.getText(this.taskNameDiv);
    const taskDescription = await WebDriverGettings.getText(this.taskDescriptionInput)
    const subTasks = await this.getSubTasks();
    await WebDriverActions.clickOnElement(this.taskCloseButton);
    return {
      name: taskName,
      description: taskDescription,
      ...subTasks
    }
  }
  /**
   * method to get subtasks to the task
   * @returns {Object} Subtask object with the subtask's tittle
   * example:
   * {
   *  "subtask-0": "subtask1 tittle",
   *  "subtask-1": "subtask2 tittle"
   * }
   */
  async getSubTasks() {
    const subTasks = await WebDriverGettings.getElements(this.subTaskTitle);
    let result = {};
    if (subTasks.length > 0) {
      logger.debug(`Subtasks were found: ${subTasks.length}`)
      for (let index = 0; index < subTasks.length; index++) {
        result["subtask-"+index] = await subTasks[index].getText();
        logger.debug(`Subtask ${index} tittle: ${result["subtask-"+index]}`)
      }
    }
    return result;
  }

  /**
   * Method to delete a task on the task page
   * note: 
   * 1.- the task container should be opened
   * 2.- this method waits for the undo item to be stale
   */
  async deleteTask() {
    await WebDriverWaitings.elementIsLocated(this.taskContainer);
    await WebDriverActions.clickOnElement(this.taskSettingsButton);
    await WebDriverActions.clickOnElement(this.taskDeleteButton);
  }

  /**
   * Method to update a task on the task page
   * note: the task container should be opened
   * @param {Object} task - object that must contains the following task information:
   * task.name - name of the task to update
   * task.description - description of the task task to update
   */
  async updateTask(task) {
    await WebDriverWaitings.elementIsLocated(this.taskContainer);
    await WebDriverWaitings.elementIsLocated(this.taskHistoryItem);
    await WebDriverActions.clickOnElement(this.taskNameInput);
    await WebDriverActions.clearInput(this.taskNameInput)
    await WebDriverActions.sendKeys(this.taskNameInput, task.name);
    await WebDriverActions.clickOnElement(this.taskDescriptionDiv);
    await WebDriverWaitings.elementIsStale(this.loaderIcon)
    await WebDriverActions.clickOnElement(this.taskDescriptionDiv);
    await WebDriverWaitings.waitForElementPropertyWithValue(this.taskDescriptionDiv, 'contenteditable', 'true')
    await WebDriverActions.clearInput(this.taskDescriptionInput)
    await WebDriverActions.sendKeys(this.taskDescriptionInput, task.description);
    await WebDriverActions.sendEscapeKey();
    await WebDriverWaitings.waitForElementPropertyWithValue(this.taskDescriptionDiv, 'contenteditable', 'false')
    await WebDriverActions.clickOnElement(this.taskCloseButton);
  }
}

module.exports = new TaskPage();
