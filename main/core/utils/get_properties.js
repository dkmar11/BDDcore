/**
 * Converts a feature datatable into list of properties for Jest assertion
 * @param {object[]} datatable to convert
 */
const getProperties = function (datatable) {
  let properties = [];
  for (const element of datatable) {
    let value = element.value;
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else if (!isNaN(value)) {
      value = +value;
    } else if (value === "[]") {
      value = [];
    } else if (value == "null") {
      value = null;
    }
    properties.push({ key: element.key, value: value });
  }
  return properties;
};
module.exports = getProperties;
