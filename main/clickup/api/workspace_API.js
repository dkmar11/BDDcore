const request = require('../../core/api/request_manager')
const clickupConstants = require('../utils/clickup_constans')
const apiMethods = require('../../core/utils/api_methods')
/**
 * class to manage task api
 */
class WorkspaceAPI {
/**
 * Method to return the workspace id 
 */
  static async getWorkspace() {
    const url = clickupConstants.getWorkspaceEndpoint()
    const response = await request.sendRequest(apiMethods.GET, url);
    return response.data.teams[0].id;
  }
}
module.exports = WorkspaceAPI