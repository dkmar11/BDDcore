const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const spaceSummaryPage = require("../../../../main/clickup/ui/space/space_summary_page");
const searchEngine = require("../../../../main/clickup/ui/search_engine/search_engine");
const sidebar = require("../../../../main/clickup/ui/sidebar/sidebar");

Then("the space should display the following information:",async function(table) {
  const tableData = table.rowsHash();
  const actualResult = await spaceSummaryPage.getSpace();
  tableData.Name = this.space.name;
  expect(actualResult).toMatchObject(tableData);
});

Then("the space should not be displayed into search engine", async function(){
  const spaceName = this.space.name
  const result = await sidebar.searchByText(spaceName);
  await searchEngine.closeSearchEngine();
  expect(result).toBe(false);
});

Then("the space should not be displayed in the sidebar", async function(){
  const result = await sidebar.searchSpace(this.space.id);
  expect(result).toBe(false);
});
