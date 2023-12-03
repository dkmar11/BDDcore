const { When } = require("@cucumber/cucumber");
const request = require("../../../../main/core/api/request_manager");
const clickupConstans = require("../../../../main/clickup/utils/clickup_constans");

When("the user sends a {string} request to Folders endpoint", async function(method) {
  const url = clickupConstans.getFoldersEndpoint(this.space.id);
  this.response = await request.sendRequest(method, url);
});