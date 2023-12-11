const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect")
const taskPage = require("../../../../main/clickup/ui/task/task_page");
const WebDriverWaitings = require("../../../../main/core/utils/ui/web_driver_waitings");
const create_task_page = require("../../../../main/clickup/ui/task/create_task_page");
const WebDriverGettings = require("../../../../main/core/utils/ui/web_driver_gettings");

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

Then("{string} message should apper on the task creation window", async function(textExpected) {
  await WebDriverWaitings.elementIsLocated(create_task_page.taskCreationWindow);
  expect(await WebDriverGettings.getText(create_task_page.taskNameError)).toBe(textExpected);
});
