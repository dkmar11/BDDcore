/**
 * class taskEntity to save a task properties
 */
class TaskEntity {
  /**
   * @param {Obj} fields - a object to create a new task
   */
  constructor (fields) {
    this.id = fields.id ?? ''
    this.name = fields.name ?? 'Task_created-by Cucumber'
    this.description = fields.description ?? 'Task created by Cucumber'
  }
}

module.exports = TaskEntity;
