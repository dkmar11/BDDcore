const { describe, expect } = require('@jest/globals');
const  random = require('../../utils/random_generator');

describe('testing random generator class', () => {
  const alphanumericRegex = /^[a-zA-Z0-9-_ ]+$/;

  it('it should create a random space name correctly', () => {
    let spaceName = random.randomNameSpace();
    expect(spaceName).toContain("Space");
  });

  it('it should create a random task name correctly', () => {
    let taskName = random.randomNameTask();
    expect(taskName).toContain("task-");
  });

  it('it should create a random task description correctly', () => {
    let taskDescription = random.randomDescriptionTask();
    expect(taskDescription).toContain("task for the company: ");
  });

  it('it should create a random task alphanumeric id correctly', () => {
    let taskId = random.randomIdTask();
    expect(taskId).toMatch(alphanumericRegex);
  });

  it('it should create a random list name correctly', () => {
    let listName = random.randomNameList();
    expect(listName).toMatch(alphanumericRegex);
  });

  it('it should create a random folder name correctly', () => {
    let folderName = random.randomNameFolder();
    expect(folderName).toMatch(alphanumericRegex);
  });

  it('it should create a random name correctly', () => {
    let name = random.name();
    expect(name).toMatch(alphanumericRegex);
  });
});
  