const request = require('../../core/api/request_manager')
const clickupConstants = require('../utils/clickup_constans')
const apiMethods = require('../../core/utils/api_methods')
/**
 * class to manage task api
 */
class TaskAPI {
/**
 * @param {Int} idList - list id to create task
 * @param {Object} body - body of request
 * @returns {String} id of created task
 */
  static async createTask(idList, body) {
    const url = clickupConstants.getTasksEndpoint(idList)
    const response = await request.sendRequest(apiMethods.POST, url, body);
    return response.data.id
  }
  /**
   * @param {String} idTask id task to delete
   */
  static async deleteTask(idTask) {
    const url = clickupConstants.deleteTaskEndpoint(idTask)
    await request.sendRequest(apiMethods.DELETE, url);
  }
}
module.exports = TaskAPI