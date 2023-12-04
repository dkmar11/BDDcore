const logger = require("../utils/logger");
const driver_factory = require("./driver_factory");
/**
 * 
 */
class DriverManager {
  /**
   * singleton pattern to ensure only one instance of the driver is created
   */
  constructor() {
    this.sessionExists = false;
  }
  /**
   * method to initialize the driver
   */
  async init(browser) {
    if (!this.sessionExists) {
      logger.info("Creating a new session");
      this.driver = await driver_factory.getDriver(browser);
      this.sessionExists = true;
    } else {
      logger.info("A session already exist");
    }
    logger.info(
      "Session ID:",
      (await this.driver.getSession()).getId()
    );
  }
  /**
   * method to close the driver
   */
  async close() {
    if (!this.sessionExists) {
      logger.info("Session does not exist");
    } else {
      await this.driver.quit();
      this.sessionExists = false;
      logger.info("Session closed");
    }
  }
}

module.exports = new DriverManager();
