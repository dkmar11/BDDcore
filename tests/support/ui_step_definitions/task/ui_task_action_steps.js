const { When, Then } = require("@cucumber/cucumber");
const randomGenerator = require("../../../../main/core/utils/random_generator");
const createTaskPage = require("../../../../main/clickup/ui/task/create_task_page");
const dashboard = require("../../../../main/clickup/ui/dashboard/dashboard");
const taskPage = require("../../../../main/clickup/ui/task/task_page");
const WebDriverActions = require("../../../../main/core/utils/ui/web_driver_actions");

When("the user creates a task with the following parameters:",async function(table) {
  const objTable = table.rowsHash();
  Object.keys(objTable).forEach(async(key) => {
    let value = objTable[key];
    if (value.startsWith("(random") ) {
      const method = objTable[key].replace(/[()]/g, "")
      value = await randomGenerator[method]();
    }
    this.task[key.toLowerCase()] = value;
  });
  await createTaskPage.createTask(this.task)
});

When("the user adds sub tasks with the following parameters:", async function(table) {
  const objTable = table.rowsHash();
  let subTasksName = [];
  for (const key of Object.keys(objTable)) {
    let value = objTable[key];
    if (value.startsWith("(random")) {
      const method = objTable[key].replace(/[()]/g, "");
      value = await randomGenerator[method]();
      subTasksName.push(value);
      this.task[key.toLowerCase()] = value;
    }
  }
  await createTaskPage.addSubTask(subTasksName);
});

When("the user adds some subtasks to {string} through the dashboard", async function(word, table) {
  const taskName = this.replaceTag(word)
  const objTable = table.rowsHash();
  let subTasksName = [];
  for (const key of Object.keys(objTable)) {
    let value = objTable[key];
    if (value.startsWith("(random")) {
      const method = objTable[key].replace(/[()]/g, "");
      value = await randomGenerator[method]();
      subTasksName.push(value);
      this.task[key.toLowerCase()] = value;
    }
  }
  await dashboard.addSubTasks(taskName, subTasksName)
});


When("the user saves the task",async function() {
  await WebDriverActions.clickOnElement(createTaskPage.summitButton);
});

When("the user updates a task with the following parameters:",async function(table) {
  const objTable = table.rowsHash();
  Object.keys(objTable).forEach(async(key) => {
    let value = objTable[key];
    if (value.startsWith("(random") ) {
      const method = objTable[key].replace(/[()]/g, "")
      value = await randomGenerator[method]();
    }
    this.task[key.toLowerCase()] = value;
  });
  await taskPage.updateTask(this.task)
});

When("the user deletes the task", async function() {
  await taskPage.deleteTask()
});

When, Then("the user closes the task", async function() {
  await WebDriverActions.clickOnElement(taskPage.taskCloseButton);
});

When("the user marks the task as completed", async function() {
  await WebDriverActions.clickOnElement(taskPage.taskStatusButton);
});
