const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const CreateFolderPage = require("../../../../main/clickup/ui/folder/folder_create_page.js");

Then("the {string} folder should be into the Space", async function (folderName) {
  const name = this.replaceTag(folderName)
  const folderNames = await CreateFolderPage.getNamesFolders()
  expect(folderNames).toContain(name);
});

Then("the {string} folder should not be into the Space", async function (folderName) {
  const name = this.replaceTag(folderName)
  const folderNames = await CreateFolderPage.getNamesFolders()
  expect(folderNames).not.toContain(name);
});