const axios = require('axios');
const configurationManager = require('../utils/configuration_manager');
const logger = require('../utils/logger');

/** The RequestManager class is responsible for sending HTTP requests using axios and handling the
response. */
class RequestManager {
  /**
  * The constructor function creates an instance of the axios library with a base URL taken from the configuration manager.
  */
  constructor() {
    this.instance = axios.create({
      baseURL: configurationManager.environment["api-url"]
    });
  }

  /** The `sendRequest` method is responsible for sending an HTTP request using the axios library. It
  takes in four parameters: `method`, `url`, `body`, and `queryParams`. */
  async sendRequest(method, url, body = {}, queryParams = {}) {
    const isAttachmentURL = url.match(/attachment/);
    const isTrashURL = url.includes('/trash?name=&type%5B%5D');
    const token = configurationManager.environment["users"]["free"]["token"];
    const token_bearer = configurationManager.environment["users"]["free"]["token_bearer"];
    const baseURL = isTrashURL ? configurationManager.environment["api-url-trash"] : this.instance.defaults.baseURL;

    const requestOptions = {
      method,
      url,
      baseURL,
      params: queryParams,
      data: body,
      timeout: isAttachmentURL ? 10000 : 5000,
      headers: {
        "Content-Type": isAttachmentURL ? "multipart/form-data" : "application/json",
        Authorization: isTrashURL ? token_bearer : token
      },
    };

    try {
      const response = await this.instance.request(requestOptions);
      logger.info(`Received response for ${method} request to ${url} | Code status: ${response.status} | body sent: ${JSON.stringify(body)}`);
      logger.debug(`Response: ${JSON.stringify(response.data)}`);
      return response;
    } catch (error) {
      logger.info(`Received response for ${method} request to ${url} | Code status: ${error.response.status} | Response: ${JSON.stringify(error.response.data)} | body sent: ${error.config.data}`);
      return error.response;
    }
  }
}

module.exports = new RequestManager();
