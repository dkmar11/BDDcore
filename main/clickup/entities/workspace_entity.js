/**
 * class workspaceEntity to save workspace properties
 */
class WorkspaceEntity {
  /**
  * @param {Obj} teams - a object to get a workspace
  */
  constructor (teams) {
    this.id = teams.id ?? ''
    this.name = teams.name ?? ''
  }
}

module.exports = WorkspaceEntity;
