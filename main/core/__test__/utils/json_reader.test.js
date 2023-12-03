const JsonReader = require('../../utils/json_reader');
const jsonReader = new JsonReader();
const { describe, expect } = require('@jest/globals');

describe('testing JsonReader class', () => {
  const fileName = "core/__test__/utils/support_test_files/test_data.json";

  it('it should read correctly a JSON file', () => {
    const exampleJson = {
      "name": "Jose Canseco",
      "age": 25,
      "email": "jose.canseco@example.com"
    };
    const parsedData = jsonReader.read(fileName);
    expect(parsedData).toEqual(exampleJson);
  });
});
