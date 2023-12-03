@api @list @smoke @createWorkspace @createSpace @createFolder @deleteSpace @deleteFolder
Feature: Lists

  Tests performed based on the CRUD of the List feature

  @53 @createList @deleteList
  Scenario: GET a list of lists.
    When the user sends a "GET" request to "/folder/<folder.id>/list"
    Then the response status code should be 200
    And the response schema should be verified with "get_lists_schema"
    And the response body should contain the following list data:
      | key            | value              |
      | id             | <list.id>          |
      | name           | <list.name>        |

  @54 @deleteList
  Scenario: Verify the creation of lists with the API
    And the user sets the following body parameters for "list":
      | key         | value                   |
      | name        | (randomNameList)        |
    When the user sends a "POST" request to "/folder/<folder.id>/list"
    Then the response status code should be 200
    And the response schema should be verified with "create_list_schema"
    And the response body creation list should be verified with:
      | key            | value              |
      | name           | <list.name>        |

  @55 @createFolderlessList @deleteList
  Scenario: GET a list of folderless lists.
    When the user sends a "GET" request to "/space/<space.id>/list"
    Then the response status code should be 200
    And the response schema should be verified with "get_folderless_lists_schema"
    And the response body should contain the following list data:
      | key            | value              |
      | id             | <list.id>          |
      | name           | <list.name>        |

  @56 @deleteList
  Scenario: Verify the creation of folderless lists with the API
    And the user sets the following body parameters for "list":
      | key         | value                   |
      | name        | (randomNameList)        |
    When the user sends a "POST" request to "/space/<space.id>/list"
    Then the response status code should be 200
    And the response schema should be verified with "create_folderless_lists_schema"
    And the response body creation list should be verified with:
      | key            | value              |
      | name           | <list.name>        |

  @57 @createList @deleteList
  Scenario: GET a specific list.
    When the user sends a "GET" request to "/list/<list.id>"
    Then the response status code should be 200
    And the response schema should be verified with "get_list_schema"
    And the response body should contain the following list:
      | key            | value              |
      | id             | <list.id>          |
      | name           | <list.name>        |

  @58 @createList @deleteList
  Scenario: Update a list.
    Given the user sets the following body parameters for "list":
      | key             | value                   |
      | name            | Updated_List_Name       |
      | content         | Updated_List_Content    |
    When the user sends a "PUT" request to "/list/<list.id>"
    Then the response status code should be 200
    And the response schema should be verified with "update_list_schema"
    And the response body should contain the following list:
      | key            | value              |
      | id             | <list.id>          |
      | name           | <list.name>        |

  @59 @createList
  Scenario: DELETE a specific list.
    When the user sends a "DELETE" request to "/list/<list.id>"
    Then the response status code should be 200
    And the user sends a "GET" request to "/folder/<folder.id>/list"
    And the response body should contain the following list:
      | key            | value              |
      | lists          | []                 |

  @60 @createFolderlessList @createSecondList @createTask @deletetask @deleteList @deleteSecondtList
  Scenario: Add task to specific list
    When the user sends a "POST" request to "/list/<asstList.id>/task/<task.id>"
    Then the response status code should be 200
