const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const dashboard = require("../../../../main/clickup/ui/dashboard/dashboard");

Then("{string} should not be displayed into search tasks engine", async function(word){
  const toSearch = this.replaceTag(word)
  const result = await dashboard.searchByText(toSearch)
  expect(result).toBe(false);
});

Then("the space name should be displayed in the list of archived spaces",async function() {
  const spaceName = this.space.name
  const result = await dashboard.searchNameSpace(spaceName);
  expect(result).toBe(true);
});

Then("the user deletes permanently the space {string}",async function(name) {
  name = this.space.name;
  await dashboard.clickOnDeletePermanentlyButton(name);
});

Then("the {string} space should no longer be displayed in the archived spaces list",async function(name) {
  name = this.space.name;
  const result = await dashboard.searchNameSpace(name);
  expect(result).toBe(false);
});