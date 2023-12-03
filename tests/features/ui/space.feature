@ui @space @functional
Feature: UI Space
  Test performed on ClickUp UI, contains test cases related with Space

  @77 @e2e @createSpace @deleteSpace
  Scenario: Verify the user can update a space on UI
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user selects Space settings from the sidebar
    And the user selects More settings from the dropdown menu
    And the user selects All Space settings
    And the user updates the space with:
      | Name     | (randomNameSpace) |
      | Color    | #EC555C           |
      | Statuses | Scrum             |
    And the user selects Space settings from the sidebar
    And the user selects More settings from the dropdown menu
    And the user selects All Space settings
    Then the space should display the following information:
      | Name     | <Space.name> |
      | Color    | #EC555C      |
      | Statuses | Scrum        |

  @76 @e2e @deleteSpace
  Scenario: Verify the user can create a space on UI
    Given the user logs into ClickUp portal as "free" user
    When the user selects the new space option from the sidebar
    And the user creates the new space with:
      | Name     | (randomNameSpace) |
      | Color    | #EC555C           |
      | Statuses | Scrum             |
    And the user selects Space settings from the sidebar
    And the user selects More settings from the dropdown menu
    And the user selects All Space settings
    Then the space should display the following information:
      | Name     | <Space.name> |
      | Color    | #EC555C      |
      | Statuses | Scrum        |

  @75 @createSpace @deleteSpace
  Scenario: Verify the user can review the Space Information
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user selects Space settings from the sidebar
    And the user selects More settings from the dropdown menu
    And the user selects All Space settings
    Then the space should display the following information:
      | Name     | <Space.name> |
      | Color    | #FFFFFF      |
      | Statuses | Custom       |

  @78 @createSpace
  Scenario: Verify the user can delete a space on UI
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user selects Space settings from the sidebar
    And the user selects Delete option from the dropdown menu
    And the user deletes the space
    Then the space should not be displayed in the sidebar
    And the space should not be displayed into search engine

  @79 @createSpace
  Scenario: Verify the user can archive a space on UI
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user selects Space settings from the sidebar
    And the user selects Archive option from the dropdown menu
    And the user archives a space
    And the user selects user settings from the sidebar
    And the user selects Spaces option from the dropdown menu
    And the user selects Archives Spaces option from the dashboard
    Then the space name should be displayed in the list of archived spaces
    And the user deletes permanently the space "<Space.name>"
    And the "<Space.name>" space should no longer be displayed in the archived spaces list
