const { Then, When } = require("@cucumber/cucumber");
const searchEngine = require("../../../main/clickup/ui/search_engine/search_engine");
const sidebar = require("../../../main/clickup/ui/sidebar/sidebar");

When, Then("the user closes the search engine", async function() {
  await searchEngine.closeSearchEngine()
});

Then("{string} should not be displayed into search engine", async function(word){
  const toSearch = this.replaceTag(word)
  const result = await sidebar.searchByText(toSearch);
  await searchEngine.closeSearchEngine();
  expect(result).toBe(false);
});