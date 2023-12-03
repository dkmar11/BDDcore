const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const getProperties = require("../../../../main/core/utils/get_properties");


Then("the response body should contain the following list data:", function (table) {
  const expectedProperties = getProperties(table.hashes());
  const actualResult = this.response.data.lists;
  for (const property of expectedProperties) {
    let expectedValue = property.value.trim();
    expectedValue = expectedValue.replace('<list.id>', this.list.id);
    expectedValue = expectedValue.replace('<list.name>', this.list.name);
    let isPropertyValueFound = false;
    for (const list of actualResult) {
      const actualValue = list[property.key];
      if (actualValue && actualValue.toString() === expectedValue) {
        isPropertyValueFound = true;
        break;
      }
    }
    expect(isPropertyValueFound).toBe(true);
  }
});

Then("the response body creation list should be verified with:", function (table) {
  const expectedProperties = table.hashes();
  const actualResult = this.response.data;

  for (const property of expectedProperties) {
    let expectedKey = property.key.trim();
    let expectedValue = property.value.trim();
    expectedValue = expectedValue.replace('<list.name>', this.list.name);

    const actualValue = actualResult[expectedKey];
    expect(actualValue).toBe(expectedValue);
  }
});

Then("the response body should contain the following list:", function (table) {
  const actualResult = this.response.data;
  const expectedProperties = getProperties(table.hashes(), actualResult);

  for (const property of expectedProperties) {
    const key = property.key;
    let expectedValue = property.value;
    expectedValue = this.replaceTag(expectedValue);

    const actualValue = actualResult[key];

    expect(actualValue).toEqual(expectedValue);
  }
});