/**
  class to hold clickup api constants
  @class ClickupConstants
*/
class ClickupConstants {
  /**
    get clickup api endpoint for get workspace
    @method getTasksEndpoint
    @return {string} clickup api endpoint for get workspace
  */
  getWorkspaceEndpoint() {
    return `/team`
  }
  /**
    get clickup api endpoint for get folders
    @method getFolderssEndpoint
    @param {string} spaceId - id for a space
    @return {string} clickup api endpoint for get folders
  */
  getFoldersEndpoint(spaceId) {
    return `/space/${spaceId}/folder`
  }
  /**
    get clickup api endpoint for get folders
    @method getFolderssEndpoint
    @param {string} spaceId - id for a space
    @return {string} clickup api endpoint for get folders
  */
  createFoldersEndpoint(spaceId) {
    return `/space/${spaceId}/folder`
  }
  /**
    get clickup api endpoint for get all tasks
    @method getTasksEndpoint
    @param {string} idList - id of the list
    @return {string} clickup api endpoint for get all tasks
  */
  getTasksEndpoint(idList) {
    return `/list/${idList}/task`
  }

  /**
   * The function `getList` returns a URL string for retrieving a list of items from a specific folder
   * with the given folder ID and query parameters.
   * @param idFolder - The id of the folder for which you want to retrieve the list.
   * @param queryParams - The `queryParams` parameter is a string that represents additional parameters
   * to be included in the URL query string. These parameters are used to provide additional
   * information or filters for the list request.
   * @returns a string that represents a URL for a list of items in a specific folder. The URL includes
   * the folder ID and any query parameters that are passed in.
   */
  getListsEndpoint(idFolder, queryParams) {
    return `/folder/${idFolder}/list?${queryParams}`
  }

  /**
 * The `getListEndpoint` function returns the endpoint URL for a given list ID.
 * @param idList - The idList parameter is the unique identifier of a list.
 * @returns a string that represents the endpoint for a specific list. The endpoint is constructed by
 * concatenating the "/list/" string with the value of the idList parameter.
 */
  getListEndpoint(idList) {
    return `/list/${idList}`
  }

  /**
 * The function `getFolderlessList` returns a URL string for retrieving a list of items in a specific
 * space without any folders.
 * @param idSpace - The id of the space for which you want to retrieve the folderless list.
 * @param queryParams - The `queryParams` parameter is a string that represents additional parameters
 * to be included in the URL query string. These parameters are typically used to filter or sort the
 * results of the API request.
 * @returns a string that represents a URL path.
 */
  getFolderlessListEndpoint(idSpace, queryParams) {
    return `/space/${idSpace}/list?${queryParams}`
  }

  /**
   * The function creates an endpoint URL for listing items in a folder with the given folder ID and
   * query parameters.
   * @param idFolder - The id of the folder for which the list endpoint is being created. This
   * parameter is used to specify the folder in the endpoint URL.
   * @param queryParams - The `queryParams` parameter is an object that contains key-value pairs
   * representing the query parameters to be included in the endpoint URL.
   * @returns a string that represents the endpoint URL for listing items in a folder. The URL includes
   * the folder ID and any query parameters that are passed in.
   */
  createListEndpoint(idFolder, queryParams) {
    return `/folder/${idFolder}/list?${queryParams}`
  }

  /**
   * The function creates an endpoint for a folderless list in a specific space with given query
   * parameters.
   * @param idSpace - The id of the space for which the list endpoint is being created. This is
   * typically a unique identifier for a specific space in an application or system.
   * @param queryParams - The `queryParams` parameter is an object that contains key-value pairs
   * representing the query parameters to be included in the endpoint URL.
   * @returns a string that represents an endpoint for a list in a specific space, with the provided
   * space ID and query parameters.
   */
  createFolderlessListEndpoint(idSpace, queryParams) {
    return `/space/${idSpace}/list?${queryParams}`
  }
  /**
   * 
   * @param {string} idTask  - id of the task
   * @returns {string} clickup api endpoint for delete task
   */
  deleteTaskEndpoint(idTask) {
    return `/task/${idTask}`
  }
    
  /**
   * The function returns the endpoint URL for deleting a list with the given ID.
   * @param idList - The `idList` parameter is the unique identifier of the list that you want to
   * delete.
   * @returns a string that represents the endpoint for deleting a list. The string is in the format
   * "/list/{idList}", where {idList} is the value of the idList parameter passed to the function.
   */
  deleteListEndpoint(idList) {
    return `/list/${idList}`
  }
  /**
    get clickup api endpoint for create a space
    @method methodCreateSpaceEndpoint
    @return {string} clickup api endpoint for create a space
  */
  methodCreateSpaceEndpoint(teamsId){
    return `/team/${teamsId}/space`
  }
  /**
   * 
   * @param {string} spaceId  - id of the task
   * @returns {string} clickup api endpoint for delete a space
   */
  deleteSpaceEndpoint(spaceId){
    return `/space/${spaceId}`
  }
  /**
   * 
   * @param {string} spaceId  - id of the task
   * @returns {string} clickup api endpoint for delete a space
   */
  deleteFolderEndpoint(idFolder){
    return `/space/${idFolder}`
  }

  /**
   * The function `attachmentEndpoint` returns the endpoint URL for attaching a file to a task.
   * @param taskId - The `taskId` parameter is the unique identifier for a task. It is used to specify
   * which task the attachment endpoint is referring to.
   * @returns a string that represents the endpoint for retrieving attachments for a specific task. The
   * endpoint is constructed using the taskId parameter.
   */
  attachmentEndpoint(taskId){
    return `/task/${taskId}/attachment`
  }

  /**
 * The `clearTrashEndpoint` function returns an endpoint URL for clearing the trash for a specific
 * team.
 * @param teamId - The `teamId` parameter is the unique identifier for a team. It is used to specify
 * the team for which the trash endpoint is being accessed.
 * @returns a string that represents the endpoint for clearing the trash for a specific team. The
 * endpoint includes the teamId parameter and a query string that specifies the types of items to be
 * cleared from the trash.
 */
  clearTrashEndpoint(teamId){
    return `/team/${teamId}/trash?name=&type%5B%5D=task&type%5B%5D=subtask&type%5B%5D=subcategory&type%5B%5D=category&type%5B%5D=project&type%5B%5D=doc&type%5B%5D=conversation&type%5B%5D=page&type%5B%5D=field&type%5B%5D=dashboard&type%5B%5D=projectTag&type%5B%5D=form&type%5B%5D=reminder&type%5B%5D=timeEntry`
  }
}
module.exports = new ClickupConstants();

const schemasRoute = {
  ROUTE: "/clickup/api/resources/schemas/",
};
module.exports.schemasRoute = schemasRoute;
