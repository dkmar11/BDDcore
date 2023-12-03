const request = require("../../core/api/request_manager");
const httpMethods = require("../../core/utils/api_methods");
const clickupApiRoutes = require("../utils/clickup_constans");

/** The ListsAPI class provides methods for interacting with lists in the ClickUp API. */
class ListsAPI {
  /**
   * The `getList` function is an asynchronous function that retrieves a list from a specified list ID
   * using the ClickUp API.
   * @param listId - The `listId` parameter is the unique identifier of the list you want to retrieve.
   * It is used to specify which list you want to get information about.
   * @param [fields] - The `fields` parameter is an optional object that allows you to specify
   * additional fields or options for the API request. It is used to customize the response data
   * returned by the API.
   * @returns The data from the API request is being returned.
   */
  async getLists(listId, fields = {}) {
    const endpointListsRoute = `${clickupApiRoutes.LISTS}${listId}`;
    return (
      await Request.sendRequest(httpMethods.GET, endpointListsRoute, fields)
    ).data;
  }
    
  /**
   * The `createList` function is an asynchronous function that sends a POST request to create a new
   * list using the ClickUp API.
   * @param listId - The `listId` parameter is the unique identifier for the list you want to create.
   * It is used to specify which project the new list should be created in.
   * @param [fields] - The `fields` parameter is an optional object that contains the data to be sent
   * in the request body. It can include various properties such as the name of the list, its
   * description, and any other relevant information needed to create the list.
   * @returns The data returned from the API request.
   */
  async createList(listId, fields = {}) {
    
    const endpointListsRoute = clickupApiRoutes.createListEndpoint(listId);
    return (
      await request.sendRequest(httpMethods.POST, endpointListsRoute, fields)
    ).data;
  }

  /**
 * The function `createFolderlessList` is an asynchronous function that creates a list without a folder
 * in ClickUp using the provided listId and fields.
 * @param listId - The `listId` parameter is the unique identifier of the list where the folderless
 * list will be created.
 * @param [fields] - The `fields` parameter is an optional object that contains additional data to be
 * sent in the request body. It can include properties such as the name, description, and other details
 * of the folderless list that you want to create.
 * @returns the data from the response of the POST request made to the specified endpoint.
 */
  async createFolderlessList(listId, fields = {}) {
    const endpointListsRoute = clickupApiRoutes.createFolderlessListEndpoint(listId);
    return (
      await request.sendRequest(httpMethods.POST, endpointListsRoute, fields)
    ).data;
  }

  /**
   * The function `getListFolderless` is an asynchronous function that retrieves a list of folderless
   * items from a specific space in ClickUp.
   * @param spaceId - The spaceId parameter is the unique identifier of the space for which you want to
   * retrieve the list of folderless lists.
   * @param [fields] - The `fields` parameter is an optional object that contains additional data or
   * options to be sent with the request. It allows you to customize the behavior of the
   * `getListFolderless` function.
   * @returns the data from the response of the POST request made to the specified endpoint.
   */
  async getListFolderless(spaceId, fields = {}) {
    const endpointListsRoute = `${clickupApiRoutes.SPACES}${spaceId}`;
    return (
      await request.sendRequest(httpMethods.POST, endpointListsRoute, fields)
    ).data;
  }

  /**
 * The `deleteList` function is an asynchronous function that deletes a list using the ClickUp API.
 * @param listId - The ID of the list that you want to delete.
 * @param [fields] - The `fields` parameter is an optional object that contains additional data to be
 * sent with the request. It can be used to specify any additional parameters or options required for
 * the delete operation.
 * @returns The data returned from the API request.
 */
  async deleteList(listId, fields = {}) {
    const endpointListsRoute = clickupApiRoutes.deleteListEndpoint(listId);
    return (
      await request.sendRequest(httpMethods.DELETE, endpointListsRoute, fields)
    ).data;
  }
}

module.exports = new ListsAPI();