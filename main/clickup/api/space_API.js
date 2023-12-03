const request = require('../../core/api/request_manager')
const clickupConstants = require('../utils/clickup_constans')
const apiMethods = require('../../core/utils/api_methods')
/**
 * class to manage space api
 */
class SpaceAPI {
/**
   * Method to create a space
   * @param {Int} teamId - teams id to create a space
   * @param {object} body - body of request
*/
  async createSpace(teamId, body) {
    const url = clickupConstants.methodCreateSpaceEndpoint(teamId)
    const response = await request.sendRequest(apiMethods.POST, url, body);
    return response.data.id;
  }
  /**
   * @param {String} spaceId id space to delete
   */
  async deleteSpace(spaceId) {
    const url = clickupConstants.deleteSpaceEndpoint(spaceId);
    await request.sendRequest(apiMethods.DELETE, url);
  }
}
module.exports = new SpaceAPI
