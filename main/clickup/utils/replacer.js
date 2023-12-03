/**
Class to help to replace 
@class Replacer
*/
class Replacer{
    
  /** 
  * @arguments obj - to get the value
  * @arguments path - to get the value
  */
  getPropertyByPath(obj, path) {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        value = value[key];
      } else {
        value = undefined;
        break;
      }
    }
    return value;
  }
}

module.exports = new Replacer();