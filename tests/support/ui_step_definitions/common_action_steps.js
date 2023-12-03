const { Given, When } = require("@cucumber/cucumber");
const Login = require("../../../main/clickup/ui/login/login_page");
const sidebar = require("../../../main/clickup/ui/sidebar/sidebar");


Given("the user logs into ClickUp portal as {string} user", async function (user) {
  await Login.login(user)
});

When("the user searches {string} into search engine", async function(word) {
  const toSearch = this.replaceTag(word)
  await sidebar.searchByText(toSearch)
});
