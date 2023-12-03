const { Before, After, AfterAll, Status } = require('@cucumber/cucumber');
const logger = require('../../../main/core/utils/logger');
const random = require('../../../main/core/utils/random_generator');
const listApi = require('../../../main/clickup/api/lists_API');
const TaskAPI = require('../../../main/clickup/api/tasks_API');
const TaskEntity = require('../../../main/clickup/entities/task_entity');
const WorkspaceEntity = require('../../../main/clickup/entities/workspace_entity');
const WorkspaceAPI = require('../../../main/clickup/api/workspace_API');
const FoldersAPI = require('../../../main/clickup/api/folder_API')
const spaceAPI = require('../../../main/clickup/api/space_API');
const SpaceEntity = require('../../../main/clickup/entities/space_entity');
const driver_manager = require('../../../main/core/selenium/driver_manager');
const TrashAPI = require('../../../main/clickup/api/trash_API');
const configuration_manager = require('../../../main/core/utils/configuration_manager');
const WebDriverActions = require('../../../main/core/utils/ui/web_driver_actions');

Before(async function(scenario) {
  logger.debug(scenario.pickle.name);
});

Before({ tags: "@ui" }, async function() {
  await driver_manager.init()
});

Before({ tags: "@createSpace" }, async function () {
  this.space = new SpaceEntity({});
  this.teams.id = await WorkspaceAPI.getWorkspace();
  this.body = {
    name: this.space.name = random.randomNameSpace(),
    multiple_assignees: this.space.multiple_assignees
  }
  this.space.id = await spaceAPI.createSpace(this.teams.id, this.body);
});

Before({ tags: "@createFolder" }, async function () {
  const payload = {'name': random.name()}
  const response = await FoldersAPI.createFolder(this.space.id, payload);
  this.folder = {...payload, id: Object.values(response.id).join('')};
});

Before({ tags: "@createList" }, async function () {
  const payload = {'name': random.name()}
  const response = await listApi.createList(this.folder.id, payload);
  this.list = {...payload, id: Object.values(response.id).join('')};
});

Before({ tags: "@createFolderlessList" }, async function () {
  const payload = {'name': random.name()}
  const response = await listApi.createFolderlessList(this.space.id, payload);
  this.list = {...payload, id: Object.values(response.id).join('')};
});

Before({ tags: "@createSecondList" }, async function () {
  const payload = {'name': random.name()}
  const response = await listApi.createList(this.folder.id, payload);
  this.asstList = {...payload, id: Object.values(response.id).join('')};
});

Before({ tags: "@createTask" }, async function () {
  this.task = new TaskEntity({});
  const payload = {
    name: this.task.name,
    description: this.task.description
  }
  this.task.id = await TaskAPI.createTask(this.list.id, payload);
});

After({ tags: "@clearTrashAPI" }, async function () {
  const teamId = this.teams.id || configuration_manager.environment["teamId"];
  await TrashAPI.clearTrash(teamId);
});

After({ tags: "@deleteFolder" }, async function () {
  await FoldersAPI.deleteFolder(this.folder.id);
});

After({ tags: "@deleteTask" }, async function () {
  await TaskAPI.deleteTask(this.task.id);
});

After({ tags: "@deleteList" }, async function () {
  await listApi.deleteList(this.list.id);
});

After({ tags: "@deleteSecondList" }, async function () {
  await listApi.deleteList(this.asstList.id);
});

Before({ tags: "@createWorkspace" }, async function () {
  this.teams = new WorkspaceEntity({});
  this.teams.id = await WorkspaceAPI.getWorkspace();
});

After({ tags: "@deleteSpace" }, async function () {
  await spaceAPI.deleteSpace(this.space.id);
});

After({ tags: '@ui' }, async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenShot = await WebDriverActions.takeScreenshot();
    if (screenShot) {
      this.attach(screenShot, 'image/png');
    }
  }
  await WebDriverActions.driver.manage().deleteAllCookies();
  await WebDriverActions.driver.executeScript('window.localStorage.clear()');
  await WebDriverActions.driver.executeScript('window.sessionStorage.clear()');
});

After({ tags: '@api' }, async function () {
  logger.info(`Waiting for the next API scenario`);
  await new Promise(resolve => setTimeout(resolve, configuration_manager.setUp.scenario_timeout));
});

AfterAll(async function () {
  if(await driver_manager.driver) {
    await driver_manager.driver.quit();
    logger.info('All windows were closed.');
  }
});
