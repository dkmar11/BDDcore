const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
/**
 * class to work with task page
 */
class Board {
  /**
   *Constructor of the class where the selector are declared
   */
  constructor() {
    this.boardIcon = By.css('div[data-test="data-view-item__Board"]');
  }
  /**
   * method to get the selector of a board card on "to do" column by task name
   * @param {String} name - name of task
   * @returns {By} - selector of board card
   */
  boardCardNameToDo(name){
    return By.css(`div[data-status="to do"] cu-dashboard-board-card[data-test="dashboard-board-card__${name}"]`)
  }
  /**
   * method to get the selector of a board card on "COMPLETE" column by task name
   * @param {String} name - name of task
   * @returns {By} - selector of board card
  */
  boardCardNameComplete(name){
    return By.css(`div[data-status="complete"] cu-dashboard-board-card[data-test="dashboard-board-card__${name}"]`)
  }
  /**
   * method to get the selector of the button for marking a task as completed according to the name
   * @param {String} name - name of task
   * @returns {By} - selector of the button for marking a task as completed
   */
  markTaskAsCompletedButtonName(name){
    return By.css(`div[data-status="to do"] cu-dashboard-board-card[data-test="dashboard-board-card__${name}"] div[cutooltip="Close task"]`)
  }
  /**
   * method to mark a task as completed by button
   * @param {String} name - name of task
   */
  async markTaskAsCompleted(name){
    await WebDriverActions.elementHoverMove(this.boardCardNameToDo(name));
    await WebDriverActions.clickOnElement(this.markTaskAsCompletedButtonName(name))
  }
}


module.exports = new Board();
