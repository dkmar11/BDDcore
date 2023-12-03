@api @tasks @smoke
Feature: Tasks
  Test performed on API endpoints, contains test cases related with Boards CRUD and Attachments

  @20 @createTask @createSpace @createFolder @createList @deleteSpace
  Scenario: A user can get their tasks
    When the user sends a "GET" request to "/list/<list.id>/task"
    Then the response status code should be 200
    And the response body should contain a task with:
      | key         | value              |
      | id          | <task.id>          |
      | name        | <task.name>        |
      | description | <task.description> |
    And the response schema should be verified with "get_tasks_schema"

  @21 @createSpace @createFolder @createList @deleteSpace
  Scenario: A user can create a task
    Given the user sets the following body parameters for "task":
      | key         | value                   |
      | name        | (randomNameTask)        |
      | description | (randomDescriptionTask) |
    When the user sends a "POST" request to "/list/<list.id>/task"
    Then the response status code should be 200
    And the response body should be verified with:
      | key         | value              |
      | name        | <task.name>        |
      | description | <task.description> |
    And the response schema should be verified with "post_tasks_schema"

  @22 @createTask @createSpace @createFolder @createList @deleteSpace
  Scenario: A user can update a task
    Given the user sets the following body parameters for "task":
      | key         | value                   |
      | name        | (randomNameTask)        |
      | description | (randomDescriptionTask) |
    When the user sends a "PUT" request to "/task/<task.id>"
    Then the response status code should be 200
    And the response body should be verified with:
      | key         | value              |
      | name        | <task.name>        |
      | description | <task.description> |
    And the response schema should be verified with "update_tasks_schema"

  @61 @negative @bug
  Scenario: A user cannot get a random task
    Given the user sets the following parameters for "task":
      | key | value          |
      | id  | (randomIdTask) |
    When the user sends a "GET" request to "/task/<task.id>"
    Then the response status code should be 404
    And the response body should be verified with:
      | key   | value          |
      | err   | Task not found |
      | ECODE | OTHER          |

  @23 @bug @createTask @createSpace @createFolder @createList @deleteSpace
  Scenario: A user can delete a task
    When the user sends a "DELETE" request to "/task/<task.id>"
    Then the response status code should be 200
    And the user sends a "GET" request to "/task/<task.id>"
    And the response status code should be 404
    And the response body should be verified with:
      | key   | value                   |
      | err   | Task not found, deleted |
      | ECODE | ITEM_013                |

  @39 @attachment @createWorkspace @createSpace @createList @createFolder @createTask @deleteSpace
  Scenario: Upload attachments
    When the user upload an attachmenten as task complement
    Then the response status code should be 200
    And the response body should be verified with:
      | key            | value              |
      | name           | image_test.jpg     |
