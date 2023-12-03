const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect")
const taskPage = require("../../../../main/clickup/ui/task/task_page");

Then("the user should see on task page the following information:", async function(table) {
  let expectedData = {};
  const objTable = table.rowsHash();
  Object.keys(objTable).forEach(async(key) => {
    let value = objTable[key];
    if (value.includes('<')) {
      const obj = this.getObjectAndPropertyFromString(value)
      expectedData[obj.propertyName] = this[obj.objName][obj.propertyName];
    }
  });
  const actualInformation = await taskPage.getTask();
  expect(actualInformation).toMatchObject(expectedData);
});
