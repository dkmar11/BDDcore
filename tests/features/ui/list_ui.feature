@ui @list @clearTrashAPI
Feature: UI Lists
  Test performed on Clickup, contains test cases related with Lists

  @85 @e2e
  Scenario: Verify that a folderless list can be created
    Given the user logs into ClickUp portal as "free" user
    When the user clicks on "add" button of "AT20_List_Test" Space record on the home page
    And the user selects List option
    And the user creates the List with:
      | Name       | (randomNameList)  |
    Then the "<list.name>" list should be in the "AT20_List_Test" Space
    And the user renames the created list with name "Name_Update" list from the "AT20_List_Test" Space
    And the "<list.name>" list should be in the "AT20_List_Test" Space
    And the user deletes the "<list.name>" list from the "AT20_List_Test" Space
    And the "<list.name>" list should not be in the "AT20_List_Test" Space

  @86 @e2e
  Scenario: Verify that a list can be created in a folder
    Given the user logs into ClickUp portal as "free" user
    And the user selects the "AT20_List_Test" Space
    When the user clicks on "add" button of "folder_test" Folder record
    And the user selects List option
    And the user creates the List with:
      | Name       | (randomNameList)  |
    Then the "<list.name>" list should be in the "folder_test" Folder
    And the user renames the created list with name "Name_Update" list from the "folder_test" Folder
    And the "<list.name>" list should be in the "folder_test" Folder
    And the user deletes the "<list.name>" list from the "folder_test" Folder
    And the "<list.name>" list should not be in the "folder_test" Folder

  @87 @e2e @acceptance @deleteList
  Scenario: Verify that a list in one space can be duplicated in another space
    Given the user logs into ClickUp portal as "free" user
    And the user selects the "AT20_List_Test" Space
    When the user duplicates "AT20_List" list with customize options into "UI Testing" space
    Then the "<list.name>" duplicated list should be in the "UI Testing" Space

  @88 @smoke
  Scenario: Verify that user can moves a list to another space
    Given the user logs into ClickUp portal as "free" user
    And the user selects the "AT20_List_Test" Space
    When the user moves the "AT20_List" list from "AT20_List_Test" space into the "UI Testing" space
    Then the "<list.name>" list should be in the "UI Testing" Space
    And the user moves the "AT20_List" list from "UI Testing" space into the "AT20_List_Test" space

  @89 @smoke
  Scenario: Verify that user can write a comment in the list
    Given the user logs into ClickUp portal as "free" user
    And the user selects the "AT20_List_Test" Space
    When the user writes "test_comment" as a comment on the "AT20_List"
    Then the comment "test_comment" should be in the comments list
