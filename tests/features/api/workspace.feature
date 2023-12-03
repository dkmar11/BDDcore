@api @workspace @createWorkspace @smoke @25
Feature: Workspace
  Test performed on API endpoints, contains test case related with workspace

  Scenario: Verify the user can get its workspace
    When the user sends a "GET" request to Workspace endpoint
    Then the response status code should be 200
    And the response body should contain the Workspace with:
      | key   | value        |
      | id    | <teams.id>   |
      | name  | <teams.name> |
    And the response schema should be verified with "get_workspace_schema"
