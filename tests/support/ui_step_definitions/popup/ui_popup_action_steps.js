const { When } = require("@cucumber/cucumber");
const WebDriverActions = require("../../../../main/core/utils/ui/web_driver_actions");
const popup = require("../../../../main/clickup/ui/popup/popup");

When("the user closes the popup modal", async function() {
  await WebDriverActions.clickOnElement(popup.popupCloseButton);
});