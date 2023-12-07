const { By } = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const configurationManager = require("../../../core/utils/configuration_manager");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
/**
 * class to login
 */
class LoginPage{
  /**
   * 
   * @param {webDriver} driver - web driver instance
   */
  constructor(){
    this.buttonLogin = By.xpath('//*[@data-testid="cu-button"][text()="Log in"]');
    this.loginSubmit = By.css('[data-test="login-submit"]');
    this.inputEmail = By.id('login-email-input');
    this.inputPassword = By.id('login-password-input');
    this.dashboard = By.css('div[data-test="dashboard__router-outlet-canvas"]');
    this.baseURL = configurationManager.environment["ui-url"];
  }
  /**
   * method to login on clickup plataform
   * note: 
   * 1.- it is logged in using the user defined in the configuration
   * 2.- if the user is already logged in, it does nothing
   * @param {String} user - user to be logged in
   */
  async login(user){
    const email = configurationManager.environment["users"][user]["email"]
    const password = configurationManager.environment["users"][user]["password"]
    await WebDriverActions.navigateTo(this.baseURL);
    await WebDriverActions.sendKeys(this.inputEmail, email);
    await WebDriverActions.sendKeys(this.inputPassword, password);
    await WebDriverActions.clickOnElement(this.loginSubmit);
    await WebDriverWaitings.elementIsLocated(this.dashboard);
  }
}

module.exports = new LoginPage();
