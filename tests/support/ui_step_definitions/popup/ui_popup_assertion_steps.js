const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const popup = require("../../../../main/clickup/ui/popup/popup");
const WebDriverWaitings = require("../../../../main/core/utils/ui/web_driver_waitings");

Then("a popup modal should appear with the following message: {string}", async function (message) {
  let toReplace = message.match(/<([^>]+)>/g);
  if(toReplace){
    toReplace.forEach((obj) => {
      message = message.replace(obj, this.replaceTag(obj));
    });
  }
  const txtReceived = await popup.getText();
  await WebDriverWaitings.elementIsStale(popup.popupText);
  expect(message).toBe(txtReceived);
});