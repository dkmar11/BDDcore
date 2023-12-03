const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const getProperties = require("../../../../main/core/utils/get_properties");
const replacer = require("../../../../main/clickup/utils/replacer");

Then("the response body should contain the Space with:", function (table) {
  const expectedProperties = getProperties(table.hashes());
  const actualResult = this.response.data;

  for (const property of expectedProperties) {
    let expectedValue = property.value;
    if(typeof expectedValue === 'string'){
      expectedValue = this.space.name;
    }else if( typeof expectedValue === Boolean ){
      expectedValue = property.value
    }
    const actualValue =  replacer.getPropertyByPath(actualResult, property.key);
    let isPropertyFound = false;
    if (actualValue.toString() === expectedValue.toString()) {
      isPropertyFound = true;
    }
    expect(isPropertyFound).toBe(true);
  }
});

Then("the response error body for space should contain:", function (table) {
  const actualResult = this.response.data;
  const expectedProperties = getProperties(table.hashes());

  for (const property of expectedProperties) {
    const key = property.key;
    let expectedValue = property.value;
    const actualValue = actualResult[key];
    expect(actualValue).toEqual(expectedValue);
  }
});