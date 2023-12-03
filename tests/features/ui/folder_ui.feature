@ui @smoke @folders @82
Feature: UI Folders
  Test performed on Clickup, contains test cases related with Folders

  Scenario: A user can create, update and delete a folder by UI
    Given the user logs into ClickUp portal as "free" user
    When the user clicks on Add button and chooses the Folder option
    And the user creates a folder with the following parameters:
      | Name  | (randomNameFolder) |
    And the user submits the folder by doing click on Create Folder button
    Then the "<folder.name>" folder should be into the Space
    And the user updates the created folder changed its name by "NewFolderName"
    And the "<folder.name>" folder should be into the Space
    And the user deletes the NewFolderName folder
    And the "<folder.name>" folder should not be into the Space
