const chrome = require("./chrome");
const edge = require("./edge");
const remote = require("./remote")
const JsonReader = require("../utils/json_reader");
const reader = new JsonReader();

/**
 * Class to manage the driver browser
 */
class Driverfactory {
  /**
   * get the driver browser and configurations
   */
  constructor() {
    this.browsers = { chrome, edge, remote};
    this.configuration = reader.read('../configuration.json');
  }
  /**
   * @returns - browser instance
   */
  async getDriver(browserRequired) {
    const browser = browserRequired===undefined ? this.configuration.browser.toLowerCase() : browserRequired.toLowerCase();
    let capabilities = browser === "remote" ? this.configuration.remote : this.configuration.capabilities;
    let instance = await this.browsers[
      browser
    ](capabilities);
    return instance;
  }
}

module.exports = new Driverfactory();
