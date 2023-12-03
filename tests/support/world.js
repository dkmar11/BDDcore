/**
 * World class
 */
const {
  setWorldConstructor,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

/**
 * Custom World
 */
function CustomWorld({ attach }) {
  this.attach = attach;
  this.response = {};
  this.teams = {};
  this.space = {};
  this.list = {};
  this.asstList = {};
  this.folder = {};
  this.task = {};
  this.body = {};
  /**
   * method to get property and value from string:
   * @param {String} string - <object.property>
   * @returns {object} - {objName: object, propertyName: property}
   */
  this.getObjectAndPropertyFromString = function(string) {
    const result = {};
    const cleanedString = string.replace(/[<>]/g, '');
    const [object, Property] = cleanedString.split('.');
    result.objName = object;
    result.propertyName = Property;
    return result;
  }

  this.replaceTag = function (string) {
    const regex = RegExp(/<[\w .]+>/g);
    if (regex.test(string)) {
      for (const tag of string.match(/<[\w .]+>/g)) {
        let objectAndProperty = this.getObjectAndPropertyFromString(tag);
        let value = this[objectAndProperty.objName][objectAndProperty.propertyName];
        string = string.replace(tag, value);
      }
    }
    return string;
  };
}

setDefaultTimeout(60 * 1000);
setWorldConstructor(CustomWorld);