const { By } = require("selenium-webdriver");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
/**
 * class to work with popup page
 */
class popup{
  /**
   * Constructor of the class where the selector are declared
   */
  constructor() {
    this.popupCloseButton = By.css('.toast__close-button');
    this.popupText = By.css('span[data-test*="toast__name-link"], div[class*="toast__undo-row ng-star-inserted"]');
  }
  /**
   * Method to get the text of the popup.
   * note:
   * 1.- this method waits for the popup to be located
   * 2.- this method replaces the \n with a space
   * @returns {String} - text of the popup
   */
  async getText() {
    const text = await WebDriverGettings.getText(this.popupText);
    return text.replace(/\n/g, " ");
  }
}

module.exports = new popup();
