@api @folders @smoke @createSpace @deleteSpace
Feature: Folders
  Test performed on API endpoints, contains test cases related with Folders CRUD

  @33 @createFolder @deleteFolder
  Scenario: Get Folders
    When the user sends a "GET" request to "/space/<space.id>/folder"
    Then the response status code should be 200
    And the response body should contain the Folder with:
      | key  | value         |
      | id   | <folder.id>   |
      | name | <folder.name> |
    And the response schema should be verified with "get_folders_schema"

  @34 @createFolder @deleteFolder
  Scenario: Get specific Folder
    When the user sends a "GET" request to "/folder/<folder.id>"
    Then the response status code should be 200
    And the response body should be verified with:
      | key  | value         |
      | id   | <folder.id>   |
      | name | <folder.name> |
    And the response schema should be verified with "get_folder_schema"

  @35 @deleteFolder
  Scenario: Create a Folder
    Given the user sets the following body parameters for "folder":
      | key  | value              |
      | name | (randomNameFolder) |
    When the user sends a "POST" request to "/space/<space.id>/folder"
    Then the response status code should be 200
    And the response body should be verified with:
      | key  | value         |
      | name | <folder.name> |
    And the response schema should be verified with "create_folder_schema"

  @36 @createFolder @deleteFolder
  Scenario: Update a folder
    Given the user sets the following body parameters for "folder":
      | key     | value                  |
      | name    | Changed_folder         |
    When the user sends a "PUT" request to "/folder/<folder.id>"
    Then the response status code should be 200
    And the response body should be verified with:
      | key  | value         |
      | id   | <folder.id>   |
      | name | <folder.name> |
    And the response schema should be verified with "update_folder_schema"

  @37 @createFolder
  Scenario: DELETE a folder
    When the user sends a "DELETE" request to "/folder/<folder.id>"
    Then the response status code should be 200
    And the user sends a "GET" request to "/space/<space.id>/folder"
    And the response body should contain the following folder data:
      | key     | value |
      | folders | []    |
