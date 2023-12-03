const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");

Then("the response body should contain a task with:", function(table) {
  let expectedData = {};
  table.hashes().forEach((rowObj) => {
    const obj = this.getObjectAndPropertyFromString(rowObj.value)
    expectedData[obj.propertyName] = this[obj.objName][obj.propertyName];
  })
  expect(this.response.data.tasks.some((task) => {
    return (
      task.id == expectedData.id &&
      task.name == expectedData.name &&
      task.description == expectedData.description
    );
  })).toBe(true);
});
