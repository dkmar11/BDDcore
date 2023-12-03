const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const CreateList = require("../../../../main/clickup/ui/list/create_list");
const WebDriverWaitings = require("../../../../main/core/utils/ui/web_driver_waitings");
const ListElements = require("../../../../main/clickup/ui/list/list_elements");
const OptionsList = require("../../../../main/clickup/ui/list/list_options");
const InfoList = require("../../../../main/clickup/ui/list/info_list");
  
Then("the {string} list should be in the {string} Space", async function (listName, space) {
  const name = this.replaceTag(listName)
  await WebDriverWaitings.waitUntilElementIsVisible(ListElements.locatorListElement(name));
  const namesList = await CreateList.getNamesSpaceList(space)
  expect(namesList).toContain(name);
});

Then("the {string} list should be in the {string} Folder", async function (listName, folder) {
  const name = this.replaceTag(listName)
  await WebDriverWaitings.waitUntilElementIsVisible(ListElements.locatorListElement(name));
  const namesList = await CreateList.getNamesFolderList(folder)
  expect(namesList).toContain(name);
});

Then("the {string} duplicated list should be in the {string} Space", async function (listName, space) {
  const name = this.replaceTag(listName)
  await WebDriverWaitings.waitUntilElementIsVisible(ListElements.locatorListElement(name));
  const namesList = await CreateList.getNamesSpaceList(space)
  const idList = await OptionsList.getIdListDuplicated(name, space)
  Object.assign(this.list, { id: idList });
  expect(namesList.some(item => item.startsWith(name))).toBe(true);
})

Then("the {string} list should not be in the {string} Space", async function (nameList, space) {
  const name = this.replaceTag(nameList)
  const namesList = await CreateList.getNamesSpaceList(space)
  expect(namesList).not.toContain(name);
});

Then("the {string} list should not be in the {string} Folder", async function (nameList, folder) {
  const name = this.replaceTag(nameList)
  const namesList = await CreateList.getNamesFolderList(folder)
  expect(namesList).not.toContain(name);
});

Then("the comment {string} should be in the comments list", async function (comment) {
  const commentsList = await InfoList.getComment();
  expect(commentsList).toContain(comment);
});


