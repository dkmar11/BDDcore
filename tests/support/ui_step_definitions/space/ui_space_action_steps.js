const { When } = require("@cucumber/cucumber");
const randomGenerator = require("../../../../main/core/utils/random_generator");
const spacePage = require("../../../../main/clickup/ui/space/space_page");
const spaceSummaryPage = require("../../../../main/clickup/ui/space/space_summary_page");
const spaceModalPage = require("../../../../main/clickup/ui/space/space_modal_page");

When("the user selects the new space option from the sidebar",async function() {
  await spacePage.clickNewSpaceButton();
});

When("the user creates the new space with:",async function(table) {
  const tableData = table.rowsHash();
  const randomName = randomGenerator.randomNameSpace();
  this.space.name = randomName;
  tableData.Name = randomName;
  this.space.id = await spacePage.createSpace(tableData);
});

When("the user selects Space settings from the sidebar",async function() {
  await spacePage.clickOnSpaceSettings(this.space.name);
});

When("the user selects More settings from the dropdown menu",async function() {
  await spacePage.clickOnMoreSettings();
});

When("the user selects All Space settings",async function() {
  await spacePage.clickOnAllSpaceSettings();
});

When("the user selects a space from the sidebar",async function() {
  await spacePage.selectSpace(this.space.name);
});

When("the user updates the space with:",async function(table) {
  const tableData = table.rowsHash();
  const randomName = randomGenerator.randomNameSpace();
  this.space.name = randomName;
  tableData.Name = randomName;
  await spaceSummaryPage.updateSpace(tableData);
});

When("the user selects Delete option from the dropdown menu",async function() {
  await spacePage.clickOnDeleteOption();
});

When("the user deletes the space",async function() {
  await spaceModalPage.deleteSpace();
});

When("the user selects Archive option from the dropdown menu",async function() {
  await spacePage.clickOnArchiveOption();
});

When("the user archives a space",async function() {
  await spaceModalPage.archiveSpace();
});

When("the user selects user settings from the sidebar",async function() {
  await spacePage.clickOnUserSettings();
});

When("the user selects Spaces option from the dropdown menu",async function() {
  await spacePage.clickOnSpacesOption();
});
