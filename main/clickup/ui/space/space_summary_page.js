const { By, Key } = require("selenium-webdriver");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings")
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const spacePage = require("./space_page");

/**
 * Class to work with space summary page 
 */
class SpaceSummaryPage{

  /**
   * Constructor of the class where the selector are declared
   */
  constructor(){
    this.spaceModalContainer = By.xpath("//div[contains(@data-pendo, 'create-project-modal__main-stage-summary')]");
    this.spaceNameInput = By.xpath("//div[contains(@class, 'cu-create-project-modal__summary-value')][preceding-sibling::div['Space name']]");
    this.spaceColor = By.xpath("//div[contains(@class, 'cu-create-project-modal__summary-row')]//div[contains(@data-test, 'project-avatar__item-icon')]");
    this.spaceStatuses = By.xpath("//div[contains(@class, 'cu-create-project-modal__summary-status_custom')]//div[contains(@style, 'color')]");
    this.spaceNameInputText = By.css("input[data-test='create-project-modal__form-input']");
    this.spaceNameInputTextButton = By.css('button[data-test="create-project-modal__next-step-create-new-space"]');
    this.spaceColorOrAvatarNextButton = By.css('button[data-test="create-project-modal__next-step-space-color-avatar"]');
    this.spaceStatusesNextButton = By.css('button[data-test="create-project-modal__statuses-btn"]');
    this.spaceSaveChangesButton = By.css("button[data-test= 'create-project-modal__next-step-all-good']");
  }

  /**
   * Method to get the space as a object with name,color and statuses properties
   * @returns {Object} space object with its properties
   */
  async getSpace(){
    await WebDriverWaitings.elementIsLocated(this.spaceModalContainer);
    const status = await this._getStatuses();
    return {
      Name: await WebDriverGettings.getText(this.spaceNameInput),
      Color: await WebDriverGettings.getColor(this.spaceColor),
      Statuses: status
    }
  }

  /**
   * Method to get the statuses according to the number of elements found
   * @returns string status
   */
  async _getStatuses(){
    let arrayStatuses = [];
    await WebDriverWaitings.elementIsLocated(this.spaceModalContainer);
    arrayStatuses.push(...await WebDriverGettings.getElements(this.spaceStatuses));
    let numberStatuses = arrayStatuses.length;

    const listStatuses = {
      2 : 'Custom',
      9 : 'Scrum',
    }
    let defaultStatus = 'Custom';
    const status = listStatuses[numberStatuses] || defaultStatus;
    return status;
  }

  /**
   * Method to update a space
   * @param {Object} information - object that must contains the following space information:
   * space.name - name of the space
   * space.color - the color that was selected for the space
   * space.statuses - the different status for the space
   */
  async updateSpace(information){
    await WebDriverWaitings.elementIsLocated(this.spaceModalContainer);
    await WebDriverActions.clickOnElement(this.spaceNameInput);
    await WebDriverActions.clickOnElement(this.spaceNameInputText);
    await WebDriverActions.sendKeys(this.spaceNameInputText, Key.CONTROL + "a");
    await WebDriverActions.sendKeys(this.spaceNameInputText, Key.DELETE + "a");
    await WebDriverActions.sendKeys(this.spaceNameInputText, information['Name']);
    await WebDriverActions.clickOnElement(this.spaceNameInputTextButton);
    await WebDriverActions.clickOnElement(this.spaceColor);
    await WebDriverActions.clickOnElement(spacePage.spaceColorOrAvatar(information['Color']));
    await WebDriverActions.clickOnElement(this.spaceColorOrAvatarNextButton);
    await WebDriverActions.clickOnElement(this.spaceStatuses);
    await WebDriverActions.clickOnElement(spacePage.spaceStatuses(information['Statuses']));
    await WebDriverActions.clickOnElement(this.spaceStatusesNextButton);
    await WebDriverActions.clickOnElement(this.spaceSaveChangesButton);
  }
}

module.exports = new SpaceSummaryPage();