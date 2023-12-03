const { describe, expect } = require('@jest/globals');
const  validateSchema = require('../../utils/validator');

describe('testing validator schema method', () => {
  const schemaPath = "core/__test__/utils/support_test_files/test_schema.json";

  it('it should read correctly a JSON schema file', () => {
    const exampleJson = {
      "firstName": "John",
      "lastName": "Wick",
      "age": 21
    }
    expect(validateSchema(exampleJson, schemaPath)).toBeTruthy();
  });
});
