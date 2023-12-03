@api @space @createWorkspace @deleteSpace @smoke
Feature: Space
  Test performed on API endpoints, contains test case related with space

  @29 @createSpace
  Scenario: Verify the user can get a space
    When the user sends a "GET" request to "/space/<space.id>"
    Then the response status code should be 200
    And the response body should contain the Space with:
      | key                                      | value        |
      | name                                     | <Space.name> |
      | multiple_assignees                       | true         |
      | features.due_dates.enabled               | true         |
      | features.due_dates.start_date            | true         |
      | features.due_dates.remap_due_dates       | true         |
      | features.due_dates.remap_closed_due_date | false        |
      | features.sprints.enabled                 | false        |
      | features.points.enabled                  | false        |
      | features.custom_items.enabled            | false        |
      | features.checklists.enabled              | true         |
      | features.zoom.enabled                    | false        |
      | features.milestones.enabled              | false        |
      | features.remap_dependencies.enabled      | true         |
      | features.dependency_warning.enabled      | true         |
      | features.status_pies.enabled             | true         |
      | features.status_pies.enabled             | true         |
      | features.emails.enabled                  | true         |
    And the response schema should be verified with "get_space_schema"

  @30
  Scenario: Verify the user can create a space
    Given the user sets the following body parameters for "space" feature:
      | key                                      | value             |
      | name                                     | (randomNameSpace) |
      | multiple_assignees                       | true              |
      | features.due_dates.enabled               | true              |
      | features.due_dates.start_date            | true              |
      | features.due_dates.remap_due_dates       | true              |
      | features.due_dates.remap_closed_due_date | false             |
      | features.sprints.enabled                 | false             |
      | features.points.enabled                  | false             |
      | features.custom_items.enabled            | false             |
      | features.checklists.enabled              | true              |
      | features.zoom.enabled                    | false             |
      | features.milestones.enabled              | false             |
      | features.remap_dependencies.enabled      | true              |
      | features.dependency_warning.enabled      | true              |
      | features.status_pies.enabled             | true              |
      | features.emails.enabled                  | true              |
    When the user sends a "POST" request to "/team/<teams.id>/space"
    Then the response status code should be 200
    And the response body should contain the Space with:
      | key                                      | value        |
      | name                                     | <Space.name> |
      | multiple_assignees                       | true         |
      | features.due_dates.enabled               | true         |
      | features.due_dates.start_date            | true         |
      | features.due_dates.remap_due_dates       | true         |
      | features.due_dates.remap_closed_due_date | false        |
      | features.sprints.enabled                 | false        |
      | features.points.enabled                  | false        |
      | features.custom_items.enabled            | false        |
      | features.checklists.enabled              | true         |
      | features.zoom.enabled                    | false        |
      | features.milestones.enabled              | false        |
      | features.remap_dependencies.enabled      | true         |
      | features.dependency_warning.enabled      | true         |
      | features.status_pies.enabled             | true         |
      | features.status_pies.enabled             | true         |
      | features.emails.enabled                  | true         |
    And the response schema should be verified with "create_space_schema"

  @31 @createSpace
  Scenario: Verify the user can update a space
    Given the user sets the following body parameters for "space" feature:
      | key                                      | value             |
      | name                                     | (randomNameSpace) |
      | multiple_assignees                       | true              |
      | features.due_dates.enabled               | true              |
      | features.due_dates.start_date            | true              |
      | features.due_dates.remap_due_dates       | true              |
      | features.due_dates.remap_closed_due_date | false             |
      | features.sprints.enabled                 | false             |
      | features.points.enabled                  | false             |
      | features.custom_items.enabled            | false             |
      | features.checklists.enabled              | true              |
      | features.zoom.enabled                    | false             |
      | features.milestones.enabled              | false             |
      | features.remap_dependencies.enabled      | true              |
      | features.dependency_warning.enabled      | true              |
      | features.status_pies.enabled             | true              |
      | features.emails.enabled                  | true              |
    When the user sends a "PUT" request to "/space/<space.id>"
    Then the response status code should be 200
    And the response body should contain the Space with:
      | key                                      | value        |
      | name                                     | <Space.name> |
      | multiple_assignees                       | true         |
      | features.due_dates.enabled               | true         |
      | features.due_dates.start_date            | true         |
      | features.due_dates.remap_due_dates       | true         |
      | features.due_dates.remap_closed_due_date | false        |
      | features.sprints.enabled                 | false        |
      | features.points.enabled                  | false        |
      | features.custom_items.enabled            | false        |
      | features.checklists.enabled              | true         |
      | features.zoom.enabled                    | false        |
      | features.milestones.enabled              | false        |
      | features.remap_dependencies.enabled      | true         |
      | features.dependency_warning.enabled      | true         |
      | features.status_pies.enabled             | true         |
      | features.status_pies.enabled             | true         |
      | features.emails.enabled                  | true         |
    And the response schema should be verified with "update_space_schema"

  @32 @createSpace
  Scenario: Verify the user can delete a space
    When the user sends a "DELETE" request to "/space/<space.id>"
    Then the response status code should be 200
    And the user sends a "GET" request to "/space/<space.id>"
    And the response status code should be 404
    And the response error body for space should contain:
      | key | value           |
      | err | Space not found |
    And the response schema should be verified with "delete_space_schema"
