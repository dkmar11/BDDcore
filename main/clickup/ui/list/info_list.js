const { By }  = require("selenium-webdriver");
const WebDriverActions = require("../../../core/utils/ui/web_driver_actions");
const WebDriverWaitings = require("../../../core/utils/ui/web_driver_waitings");
const WebDriverGettings = require("../../../core/utils/ui/web_driver_gettings");
const ListElements = require("./list_elements");

/** The InfoList class is a JavaScript class that provides methods for writing and retrieving comments
on a list. */
class InfoList{
  /**
     * The constructor function defines various CSS selectors for different elements in a web page.
     */
  constructor(){
    this.infoOptionButton = By.css('a.nav-menu-item_list-info');
    this.commentButton = By.css('button.cu-list-details-comment-count__comments-btn');
    this.commentsSection = By.css('div[data-test="comments-container"]');
    this.commentBar = By.css('.cu-comment-bar__editor > .ql-editor');
    this.sendCommentButton = By.css('[data-test="comment-bar__send-btn"]');
    this.readyElement = By.css('div[class="lv-empty_img"], cu-list-group');
    this.commentSelector = By.css('div[data-test="comment-viewer-content"]');
  }

  /**
       * The function `writeCommentList` allows the user to write a comment on a specific list in a web
       * application.
       * @param comment - The comment parameter is the text of the comment that you want to write.
       * @param listName - The `listName` parameter is the name of the list on which the comment will
       * be written.
       */
  async writeCommentList(comment, listName) {
    await WebDriverActions.clickOnElement(ListElements.locatorListElement(listName));
    await WebDriverWaitings.waitUntilElementIsVisible(this.readyElement);
    await WebDriverActions.clickOnElement(ListElements.locatorListOption(listName));
    await WebDriverActions.clickOnElement(this.infoOptionButton);
    await WebDriverActions.clickOnElement(this.commentButton);
    await WebDriverWaitings.waitUntilElementIsEnable(this.commentsSection)
    await WebDriverActions.clickOnElement(this.commentBar);
    await WebDriverActions.sendKeys(this.commentBar, comment)
    await WebDriverActions.clickOnElement(this.sendCommentButton);
  }

  /**
       * The function retrieves a list of comments from a web page using a specified selector.
       * @returns a list of comments.
       */
  async getComment(){
    const commentsList = [];
    try {
      await WebDriverWaitings.elementIsLocated(this.commentSelector);
      const elements = await WebDriverGettings.getElements(this.commentSelector);
      await WebDriverGettings.getElements(this.commentSelector);
      for (const element of elements) {
        const name = await element.getText();
        commentsList.push(name);
      }
      return commentsList;
    } catch {
      return commentsList;
    }
  }
}

module.exports = new InfoList();