const JsonReader = require("./json_reader");
const reader = new JsonReader();

/**
* The ConfigurationManager class reads configuration and environment data from JSON files.
*/
class ConfigurationManager {
  /**
  * The constructor function reads configuration and environment data from JSON files.
  */
  constructor() {
    this.setUp = reader.read("../configuration.json");
    this.environment =
      reader.read("../environment.json")[this.setUp.environment];
  }
}
  
module.exports = new ConfigurationManager();