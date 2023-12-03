const { When, Then } = require("@cucumber/cucumber");
const WebDriverActions = require("../../../../main/core/utils/ui/web_driver_actions");
const dashboard = require("../../../../main/clickup/ui/dashboard/dashboard");

When, Then("the user opens the {string} on dashboard", async function(word) {
  const toOpen = this.replaceTag(word)
  await WebDriverActions.clickOnElement(dashboard.taskRecordName(toOpen));
});

When, Then("the user searches {string} into search tasks engine", async function(word) {
  const toSearch = this.replaceTag(word)
  await dashboard.searchByText(toSearch)
});

When("the user selects Archives Spaces option from the dashboard",async function() {
  await dashboard.clickOnArchivedSpacesOption();
});
