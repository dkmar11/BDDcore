const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const getProperties = require("../../../../main/core/utils/get_properties");

Then("the response body should contain the Folder with:", function (dataTable) {
  const expectedProperties = getProperties(dataTable.hashes());
  const actualResult = this.response.data.folders;
  
  for (const property of expectedProperties) {
    let expectedValue = property.value.trim();
    expectedValue = expectedValue.replace('<folder.id>', this.folder.id);
    expectedValue = expectedValue.replace('<folder.name>', this.folder.name);
    let isPropertyValueFound = false;
    for (const folder of actualResult) {
      const actualValue = folder[property.key];
      if (actualValue && actualValue.toString() === expectedValue) {
        isPropertyValueFound = true;
        break;
      }
    }
    expect(isPropertyValueFound).toBe(true);
  }
})

Then("the response body should contain the following folder data:", function (table) {
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
