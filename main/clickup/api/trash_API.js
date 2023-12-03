const request = require('../../core/api/request_manager')
const clickupConstants = require('../utils/clickup_constans')
const apiMethods = require('../../core/utils/api_methods')


/** The TrashAPI class provides a method to clear the trash for a specific team in ClickUp. */
class TrashAPI {
  /**
   * The function `clearTrash` clears the trash for a specific team in ClickUp.
   * @param teamId - The teamId parameter is the unique identifier for the team whose trash you want to
   * clear.
   * @returns The response data from the API call.
   */
  static async clearTrash(teamId) {
    const url = clickupConstants.clearTrashEndpoint(teamId)
    const response = await request.sendRequest(apiMethods.DELETE, url);
    return response.data;
  }
}
module.exports = TrashAPI