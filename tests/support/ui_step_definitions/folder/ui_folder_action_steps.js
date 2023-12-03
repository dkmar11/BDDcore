const { When } = require("@cucumber/cucumber");
const CreateFolderPage = require("../../../../main/clickup/ui/folder/folder_create_page.js");
const RandomGenerator = require("../../../../main/core/utils/random_generator");
const UpdateFolderModal = require("../../../../main/clickup/ui/folder/folder_update_modal.js");
const DeleteFolderModal = require("../../../../main/clickup/ui/folder/folder_delete_modal.js");

When("the user clicks on Add button and chooses the Folder option", async function () {
  await CreateFolderPage.clickPlusButton();
  await CreateFolderPage.clickFolderOption ();
});


When("the user creates a folder with the following parameters:",async function(table) {
  const data = table.rowsHash();
  const random = data.Name.replace(/[()]/g, "");
  const name = RandomGenerator[random]();
  await CreateFolderPage.setNameFolder(name);
  Object.assign(this.folder, { name: name });
});

When("the user submits the folder by doing click on Create Folder button", async function () {
  await CreateFolderPage.submitNewFolder();
});

When("the user updates the created folder changed its name by {string}", async function (newName) {
  await UpdateFolderModal.renameFolder(this.folder.name, newName);
  Object.assign(this.folder, { name: newName });
});

When("the user deletes the NewFolderName folder", async function () {
  await DeleteFolderModal.deleteFolder(this.folder.name);
});
