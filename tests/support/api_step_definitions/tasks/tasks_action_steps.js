const {When} = require("@cucumber/cucumber");
const attachment_API = require("../../../../main/clickup/api/attachment_API");

When("the user upload an attachmenten as task complement", async function() {
  this.response = await attachment_API.createAttachment(this.task.id);
});