const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const board = require("../../../../main/clickup/ui/board/board");
const WebDriverConditions = require("../../../../main/core/utils/ui/web_driver_conditions");

Then("the {string} task should be displayed in the TO DO section on board", async function(word) {
  const toSearch = this.replaceTag(word)
  const result = await WebDriverConditions.elementIsVisible(board.boardCardNameToDo(toSearch))
  expect(result).toBe(true);
});


Then("the {string} task should be displayed in the COMPLETE section on board", async function(word) {
  const toSearch = this.replaceTag(word)
  const result = await WebDriverConditions.elementIsVisible(board.boardCardNameComplete(toSearch))
  expect(result).toBe(true);
});