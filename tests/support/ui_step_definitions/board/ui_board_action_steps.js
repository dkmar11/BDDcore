const { When } = require("@cucumber/cucumber");
const WebDriverActions = require("../../../../main/core/utils/ui/web_driver_actions");
const board = require("../../../../main/clickup/ui/board/board");

When("the user opens the board", async function() {
  await WebDriverActions.clickOnElement(board.boardIcon)
});

When("the user marks the task {string} as completed in board by button", async function(word) {
  const taskName = this.replaceTag(word)
  await board.markTaskAsCompleted(taskName)
});