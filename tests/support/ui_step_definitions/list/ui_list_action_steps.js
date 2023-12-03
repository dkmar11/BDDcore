const { When, Given } = require("@cucumber/cucumber");
const random_generator = require("../../../../main/core/utils/random_generator");
const CreateList = require("../../../../main/clickup/ui/list/create_list");
const OptionsList = require("../../../../main/clickup/ui/list/list_options");
const DeleteList = require("../../../../main/clickup/ui/list/delete_list");
const WebDriverWaitings = require("../../../../main/core/utils/ui/web_driver_waitings");
const ListElements = require("../../../../main/clickup/ui/list/list_elements");
const InfoList = require("../../../../main/clickup/ui/list/info_list");

Given("the user selects the {string} Space", async function (spaceName) {
  await CreateList.selectSpaceElement(spaceName);
}
);

When("the user clicks on {string} button of {string} Space record on the home page", async function (nameButton, spaceName) {
  await CreateList.spaceClickAddButton(nameButton, spaceName);
}
);

When("the user clicks on {string} button of {string} Folder record", async function (nameButton, folderName) {
  await CreateList.folderClickAddButton(nameButton, folderName);
}
);

When("the user selects List option", async function () {
  await CreateList.clickListOption ();
}
);

When("the user creates the List with:", async function (table) {
  const data = table.rowsHash();
  const random = data.Name.replace(/[()]/g, "");
  const name = random_generator[random]();
  await CreateList.setListNameAndSubmit(name);
  Object.assign(this.list, { name: name });
});

When("the user renames the created list with name {string} list from the {string} Space", async function (newName, space) {
  await OptionsList.renameSpaceList(this.list.name, newName, space);
  Object.assign(this.list, { name: newName });
});

When("the user renames the created list with name {string} list from the {string} Folder", async function (newName, folder) {
  await OptionsList.renameFolderList(this.list.name, newName, folder);
  Object.assign(this.list, { name: newName });
});

When("the user deletes the {string} list from the {string} Space", async function (listName, space) {
  const name = this.replaceTag(listName)
  await DeleteList.deleteSpaceList(name, space)
  await WebDriverWaitings.waitUntilElementIsNotVisible(ListElements.locatorListElement(name));
});

When("the user deletes the {string} list from the {string} Folder", async function (listName, folder) {
  const name = this.replaceTag(listName)
  await DeleteList.deleteFolderList(name, folder)
  await WebDriverWaitings.waitUntilElementIsNotVisible(ListElements.locatorListElement(name));
});

When("the user duplicates {string} list with customize options into {string} space", async function (listName, destinySpace) {
  await OptionsList.duplicateSpaceList(listName, destinySpace);
  Object.assign(this.list, { name: listName });
});

When("the user moves the {string} list from {string} space into the {string} space", async function (listName, targetSpace, destinySpace) {
  await OptionsList.moveList(listName, targetSpace, destinySpace);
  Object.assign(this.list, { name: listName });
});

When("the user writes {string} as a comment on the {string}", async function (comment, listName) {
  await InfoList.writeCommentList(comment, listName)
  
})
