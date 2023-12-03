const { Given, When, Then } = require("@cucumber/cucumber");
const randomGenerator = require("../../../main/core/utils/random_generator")
const Request = require("../../../main/core/api/request_manager");
const apiMethods = require("../../../main/core/utils/api_methods");

Given(/the user sets the following (body parameters|parameters) for "(.+)"/, function(type, entity, table) {
  table.hashes().forEach((rowObj) => {
    let value = rowObj.value;
    if (rowObj.value.startsWith("(random") ) {
      const method = rowObj.value.replace(/[()]/g, "")
      value = randomGenerator[method]();
    }
    if (type === "body parameters") {
      if (rowObj.value === "true"){
        value = true;
      }else if (rowObj.value === "false"){
        value = false;
      }
      this.body[rowObj.key] = value;
      this[entity][rowObj.key] = value;
    }
    if (type === "parameters") {
      this[entity][rowObj.key] = value;
    }
  })
});

Then, When("the user sends a {string} request to {string}", async function(method, endpoint) {
  const url = this.replaceTag(endpoint);
  this.response = await Request.sendRequest(method, url, this.body);
  const entities = url.split("/").filter((element) => element !== "");

  if (method === apiMethods.POST) {
    if (this.response.data.id) {
      this[entities[entities.length - 1]].id = this.response.data.id;
    }
  }
  if (method === apiMethods.PUT) {
    if (this.response.data.id) {
      this[entities[0]].id = this.response.data.id;
    }
  }
});