const request = require("../../core/api/request_manager");
const httpMethods = require("../../core/utils/api_methods");
const clickupApiRoutes = require("../utils/clickup_constans");
/**
 * class to manage folders api
 */
class FoldersAPI {
  /**
   * The funtion 'createFolder' creates a folder in ClickUp using the a space id, this can using a field, but it´s optional.
   * @param {Int} idSpace - space id to create folders
	 * @param [fields] - The `fields` parameter is an optional object that contains the data to be sent
   * @returns {String} id of created folders
   */
  async createFolder(spaceId, fields = {}) {
    const endpointFolderRoute = clickupApiRoutes.createFoldersEndpoint(spaceId);
    return (
      await request.sendRequest(httpMethods.POST, endpointFolderRoute, fields)
    ).data;
  }
  /**
  * This funtion :'deleteFolder', deletes a folder using the ClickUp API.
  * @param {String} folderId id folder to delete
  * @return {String} this contains the data from the API request DELETE
  */
  async deleteFolder(idFolder) {
    const endpointFolderRoute = clickupApiRoutes.deleteFolderEndpoint(idFolder);
    return (
      await request.sendRequest(httpMethods.DELETE, endpointFolderRoute)
    ).data;
  }

}

module.exports = new FoldersAPI();
