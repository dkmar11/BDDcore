const { When } = require("@cucumber/cucumber");
const request = require("../../../../main/core/api/request_manager");
const clickupConstans = require("../../../../main/clickup/utils/clickup_constans");

When("the user sends a {string} request to Workspace endpoint", async function(httpMethod) {
  const url = clickupConstans.getWorkspaceEndpoint();
  this.response = await request.sendRequest(httpMethod, url);
});

