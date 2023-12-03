const Validator = require("jsonschema").Validator;
const Read  = require("./json_reader");

/**
 * Validates the response body structure with a Json schema template
 * @param {object} response response body from request
 * @param {string} schemaPath path to schema to compare with
 */
const validateSchema = function (response, schemaPath) {
  let validator = new Validator();
  let schema = new Read(schemaPath);
  return validator.validate(response, schema).valid;
};

module.exports = validateSchema;
