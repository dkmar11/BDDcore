const request = require("../../core/api/request_manager");
const httpMethods = require("../../core/utils/api_methods");
const clickupApiRoutes = require("../utils/clickup_constans");
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

/** The `AttachmentApi` class is responsible for creating attachments for a specific task using the
ClickUp API. */
class AttachmentApi {
/**
 * The function creates an attachment for a task using an image file.
 * @param taskId - The taskId parameter is the unique identifier of the task to which the attachment
 * will be added.
 * @returns the result of the `sendRequest` function call.
 */
  async createAttachment(taskId) {
    const endpointAttachmentRoute = clickupApiRoutes.attachmentEndpoint(taskId);
    const imagePath = path.join(__dirname, '../../clickup/api/resources/files/image_test.jpg')
  
    const data = new FormData();
    data.append('attachment', fs.createReadStream(imagePath));
  
    return (await request.sendRequest(httpMethods.POST, endpointAttachmentRoute, data, {} ));
  }
}

module.exports = new AttachmentApi();