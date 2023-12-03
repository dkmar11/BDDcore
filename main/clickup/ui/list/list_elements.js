const { By }  = require("selenium-webdriver");

/** The `ListElements` class provides methods to locate specific elements on a web page using CSS
selectors and XPath locators. */
class ListElements {
  /**
   * The function `locatorSpaceElement` returns a CSS selector for a specific element in a project list
   * bar item.
   * @param name - The `name` parameter is a string that represents the name of the element you want to
   * locate.
   * @returns a CSS locator for an element with a specific name.
   */
  locatorSpaceElement(name){
    return By.css(`[data-test="project-list-bar-item__${name}"] span.cu2-project-list-bar-item__link-text`);
  }
  /**
   * The function `locatorFolderElement` returns a CSS selector for a specific folder element based on
   * its name.
   * @param name - The name parameter is a string that represents the name of the folder element.
   * @returns a CSS selector that targets an element with a data-test attribute value of
   * "nav-category__header-{name}".
   */
  locatorFolderElement(name){
    return By.css(`div[data-test="nav-category__header-${name}"]`);
  }

  /**
   * The function `locatorListElement` returns a locator for a specific element with a given name.
   * @param name - The `name` parameter is a string that represents the name of the element you want to
   * locate.
   * @returns The function `locatorListElement(name)` is returning a `By` object that represents an
   * XPath locator for a specific element.
   */
  locatorListElement(name) {
    return By.css(`cu-nav-section.cu-nav-section.ng-star-inserted[data-test="nav-subcategory__${name}"]`);
  } 

  /**
   * The function returns a CSS locator for a button with a specific name in a project list bar item.
   * @param buttonName - The `buttonName` parameter is a string that represents the name of the button.
   * @returns a CSS selector that targets a specific button element on a web page. The CSS selector is
   * generated based on the provided button name.
   */
  locatorSpaceAddButton(buttonName){
    return By.css(`div[data-test="project-list-bar-item__${buttonName}-container__AT20_List_Test"]`);
  }
  /**
   * The function `locatorDestinySpace` returns a CSS locator for a specific project list dropdown
   * link.
   * @param nameSpace - The `nameSpace` parameter is a string that represents the name of a namespace
   * in the project list dropdown.
   * @returns a CSS locator for an anchor element with a specific data-test attribute value. The value
   * of the data-test attribute is constructed using the input parameter `nameSpace`.
   */
  locatorDestinySpace(nameSpace){
    return By.css(`a[data-test="project-list-dropdown__list-link__${nameSpace}"]`);
  }

  /**
   * The function `locatorFolderAddButton` returns a CSS selector for a specific button in a navigation
   * category.
   * @param buttonName - The `buttonName` parameter is a string that represents the name of the button
   * to be located in the folder.
   * @returns a CSS selector that targets a specific button element with a data-test attribute value
   * based on the provided buttonName parameter.
   */
  locatorFolderAddButton(buttonName){
    return By.css(`div[data-test="nav-category__${buttonName}-button"]`);
  }

  /**
   * The function `locatorListOption` returns a CSS locator for a dropdown option with a specific name.
   * @param name - The `name` parameter is a string that represents the name of the option in the
   * dropdown menu.
   * @returns a CSS locator for a specific element with the given name.
   */
  locatorListOption(name) {
    return By.css(`div.cu-dropdown.ng-star-inserted:has([data-test="nav-subcategory__ellipsis-nav-menu__${name}"])`);
    //return By.css(`div[data-test="nav-subcategory__ellipsis-nav-menu__${nameList}"]`); delete
  }
  /**
   * The function `locatorListCompleteElement` returns a locator for a specific element based on its
   * name.
   * @param name - The name parameter is a string that represents the name of the element you want to
   * locate.
   * @returns a locator element that can be used to locate a specific element on a webpage.
   */
  locatorListCompleteElement(name){
    return By.xpath(`//cu-nav-subcategory[.//div[contains(text(), '${name}')]]`);
  }
}

module.exports = new ListElements();