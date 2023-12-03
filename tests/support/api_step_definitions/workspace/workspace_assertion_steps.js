const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const getProperties = require("../../../../main/core/utils/get_properties");

Then("the response body should contain the Workspace with:", function (table) {
  const expectedProperties = getProperties(table.hashes());
  const actualResult = this.response.data;
  expectedProperties.forEach((property) => {
    const { value } = property;
    if (value === "<teams.id>") {
      property.value = actualResult.teams[0].id;
    } else if (value === "<teams.name>") {
      property.value = actualResult.teams[0].name;
    }
  });
  expectedProperties.forEach((property) => {
    const { key, value } = property;
    expect(actualResult.teams[0][key]).toEqual(value);
  });
});




