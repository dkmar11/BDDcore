const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
const WebDriverConditions = require("../../../core/utils/ui/web_driver_conditions");

/**
 * Class to work with space page
 */
class SpacePage {

  /**
   * Constructor of the class where the selector are declared
  */
  constructor(){
    this.newSpaceButton = By.css('div[data-pendo="create-new-space-button"]');
    this.nameSpaceInput = By.css('input[data-test="create-project-modal__form-input"]');
    this.nameSpaceInputNextButton = By.css('button[data-test="create-project-modal__next-step-create-new-space"]');
    this.spaceColorOrAvatarNextButton = By.css('button[data-test="create-project-modal__next-step-space-color-avatar"]');
    this.shareSpaceNextButton = By.css('button[data-test="create-project-modal__next-step-share"]');
    this.spaceStatusesNextButton = By.css('button[data-test="create-project-modal__statuses-btn"]');
    this.enabledClickAppsNextButton = By.css('button[data-test="create-project-modal__next-step-enable-clickapps"]');
    this.spaceSettingsNextButton = By.css('button[data-test="create-project-modal__next-step-default-settings"]');
    this.spaceConfirmationButton = By.css('button[data-test="create-project-modal__next-step-all-good"]');
    this.spaceMoreSettingsOption = By.xpath("//div[contains(@data-test, 'project-menu__controls')]//a[contains(@class, 'nav-menu-item nav-menu-item_space-settings')]");
    this.spaceAllSpaceSettingsOption = By.xpath("//div[contains(@data-test, 'project-menu__nav-all-space-settings')]//a[contains(@data-test,'project-menu-space-settings-btn')]");
    this.spaceDeleteOption = By.css("a[class='nav-menu-item nav-menu-item__delete_space ng-star-inserted']");
    this.spaceArchiveOption = By.css("a[class='nav-menu-item nav-menu-item_archive-unarchive']");
    this.spaceUserSettings = By.css("div[data-test='user-settings-dropdown-toggle']");
    this.spacesOption = By.css("a[data-test='workspace-settings-menu-item-spaces']");
  }
  /**
   * Method to locate the color that was selected, it receive as
   * @param color to insert in the dynamic locator
   * @returns a CSS locator with the specific color
   */
  spaceColorOrAvatar(color) {
    return By.css(`[data-test="avatar-color-option-${color}"]`);
  }

  /**
   * Method to locate the status that was selected, it receive as
   * @param status to insert in the dynamic locator
   * @returns a XPath locator with the specific status
   */
  spaceStatuses(status) {
    return By.xpath(`//div[contains(@class, "status-template__item")]//div[contains(.,"${status}")]`);
  }

  /**
   * Method to locate the new space that was created, it receive as
   * @param name to insert in the dynamic locator
   * @returns a CSS locator with the specific name
   */
  newSpaceCreatedLocation(name) {
    return By.css(`[data-test="project-list-bar-item__${name}"]`)
  }

  /**
   * The method performs a click on the "NEW SPACE" button using WebDriverActions.
   */
  async clickNewSpaceButton(){
    await WebDriverWaitings.elementIsLocated(this.newSpaceButton);
    await  WebDriverActions.clickOnElement(this.newSpaceButton);
  }

  /**
   * Method to create a new space
   * @param {Object} information - object that must contains the following space information:
   * space.name - name of the space
   * space.color - the color that was selected for the space
   * space.statuses - the different status for the space
   * @returns {id} of the new space
   */
  async createSpace (information){
    await WebDriverActions.clickOnElement(this.nameSpaceInput);
    await WebDriverActions.sendKeys(this.nameSpaceInput, information['Name']);
    await WebDriverActions.clickOnElement( this.nameSpaceInputNextButton);
    await WebDriverActions.clickOnElement( this.spaceColorOrAvatar(information['Color']));
    await WebDriverActions.clickOnElement( this.spaceColorOrAvatarNextButton);
    await WebDriverActions.clickOnElement( this.shareSpaceNextButton);
    await WebDriverActions.clickOnElement( this.spaceStatuses(information['Statuses']));
    await WebDriverActions.clickOnElement( this.spaceStatusesNextButton);
    await WebDriverActions.clickOnElement( this.enabledClickAppsNextButton);
    await WebDriverActions.clickOnElement( this.spaceSettingsNextButton);
    await WebDriverActions.clickOnElement( this.spaceConfirmationButton);
    const id = await WebDriverGettings.getValueAttribute(this.newSpaceCreatedLocation(information['Name']), 'data-id');
    return id;
  }

  /**
   * Method to locate the space settings, it receive as
   * @param name to insert in the dynamic locator
   * @returns a CSS locator with the specific name
   */
  spaceSettingsCssLocation(name) {
    return By.css(`div[data-test="project-list-bar-item__container__${name}"]`);
  }

  /**
   * Method to locate the space settings, it receive as
   * @param name to insert in the dynamic locator
   * @returns a Xpath locator with the specific name
   */
  spaceSettingsXpathLocation(name) {
    return `//a[contains(@data-test, 'project-list-bar-item__${name}')]`;
  }

  /**
   * The method performs a right-click on the new space that was created using WebDriverActions, it receive as
   * @param name to insert in the dynamics locators, this parameter comes from the space action steps file.
   */
  async clickOnSpaceSettings(name){
    await WebDriverConditions.elementIsVisible(this.spaceSettingsCssLocation(name));
    await WebDriverActions.clickOnElement(this.spaceSettingsCssLocation(name));
    await WebDriverActions.elementHoverMove(this.spaceSettingsCssLocation(name));
    const spaceElement = await WebDriverWaitings.spaceElementIsLocated(this.spaceSettingsXpathLocation(name));
    await WebDriverActions.rightClick(spaceElement);
  }

  /**
   * The method performs a click on the More settings option using WebDriverActions.
   */
  async clickOnMoreSettings (){
    await WebDriverConditions.elementIsVisible(this.spaceMoreSettingsOption);
    await WebDriverActions.elementHoverMove(this.spaceMoreSettingsOption);
    await WebDriverActions.clickOnElement(this.spaceMoreSettingsOption);
  }

  /**
   * The method performs a click on the All Space settings option using WebDriverActions.
   */
  async clickOnAllSpaceSettings (){
    await WebDriverActions.elementHoverMove(this.spaceAllSpaceSettingsOption);
    await WebDriverActions.clickOnElement(this.spaceAllSpaceSettingsOption);
  }

  /**
   * Method to locate the space through its name, it receives as
   * @param name to insert in the dynamic locator
   * @returns a CSS locator with the specific name
   */
  spaceNameLocation(name) {
    return By.xpath(`//cu-project-row[contains(.,"${name}")]`);
  }

  /**
   * The method performs a click on a space on the side bar.
   * @param name name of space that it will be clicked on the side bar.
   * note:
   * - Side bar should be opened
   */
  async selectSpace (name){
    await WebDriverConditions.elementIsVisible(this.spaceNameLocation(name));
    await WebDriverActions.elementHoverMove(this.spaceNameLocation(name));
    await WebDriverActions.clickOnElement(this.spaceNameLocation(name));
  }

  /**
   * The method performs a click on Delete option using WebDriverActions.
   */
  async clickOnDeleteOption (){
    await WebDriverConditions.elementIsVisible( this.spaceDeleteOption);
    await WebDriverActions.elementHoverMove( this.spaceDeleteOption);
    await WebDriverActions.clickOnElement( this.spaceDeleteOption);
  }

  /**
   * The method performs a click on Archive option using WebDriverActions.
   */
  async clickOnArchiveOption (){
    await WebDriverConditions.elementIsVisible( this.spaceArchiveOption);
    await WebDriverActions.elementHoverMove( this.spaceArchiveOption);
    await WebDriverActions.clickOnElement( this.spaceArchiveOption);
  }
  /**
   * The method performs a click on User settings using WebDriverActions.
   */
  async clickOnUserSettings (){
    await WebDriverConditions.elementIsVisible(this.spaceUserSettings);
    await WebDriverActions.elementHoverMove(this.spaceUserSettings);
    await WebDriverActions.clickOnElement(this.spaceUserSettings);
  }

  /**
   * The method performs a click on Spaces option using WebDriverActions.
   */
  async clickOnSpacesOption (){
    await WebDriverConditions.elementIsVisible(this.spacesOption);
    await WebDriverActions.elementHoverMove(this.spacesOption);
    await WebDriverActions.clickOnElement(this.spacesOption);
  }
}
module.exports = new SpacePage();
