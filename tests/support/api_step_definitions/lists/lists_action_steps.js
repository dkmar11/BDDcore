const { Given } = require("@cucumber/cucumber");

Given("the user has list in a folder with ID {int}", function(folderId) {
  this.folder = {id: folderId};
});

Given("the user has list in a space with ID {int}", function(spaceId) {
  this.space = {id: spaceId};
});