@functional @tasks @ui @clearTrashAPI @createSpace @createFolder @createList @deleteSpace
Feature: UI Boards
  Test performed on CLICKUP UI, contains test cases related with Tasks feature

  @94 @createTask @smoke
  Scenario: A user can get a task on ui using search engine
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user opens the "<task.name>" on dashboard
    Then the user should see on task page the following information:
      | Name        | <task.name>        |
      | Description | <task.description> |

  @65 @smoke
  Scenario: A user can create a task on ui
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user creates a task with the following parameters:
      | Name        | (randomNameTask)        |
      | Description | (randomDescriptionTask) |
    And the user saves the task
    Then a popup modal should appear with the following message: "<task.name> Created!"
    And the user opens the "<task.name>" on dashboard
    And the user should see on task page the following information:
      | Name        | <task.name>        |
      | Description | <task.description> |

  @66 @createTask @smoke
  Scenario: A user can update a task on ui
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user opens the "<task.name>" on dashboard
    And the user updates a task with the following parameters:
      | Name        | (randomNameTask)        |
      | Description | (randomDescriptionTask) |
    And the user searches "<task.name>" into search tasks engine
    Then the user should see on task page the following information:
      | Name        | <task.name>        |
      | Description | <task.description> |

  @97 @smoke @createTask @statusTask
  Scenario: A user can mark a task as completed
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user opens the "<task.name>" on dashboard
    And the user marks the task as completed
    Then a popup modal should appear with the following message: "<task.name>"
    And the user closes the task
    And "<task.name>" should not be displayed into search tasks engine

  @69 @acceptance @subtask
  Scenario: A user can create a sub-task on a task
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user creates a task with the following parameters:
      | Name        | (randomNameTask)        |
      | Description | (randomDescriptionTask) |
    And the user adds sub tasks with the following parameters:
      | Subtask-0 | (randomNameTask) |
      | Subtask-1 | (randomNameTask) |
      | Subtask-2 | (randomNameTask) |
    And the user saves the task
    Then a popup modal should appear with the following message: "<task.name> Created!"
    And the user searches "<task.name>" into search tasks engine
    And the user should see on task page the following information:
      | Name        | <task.name>        |
      | Description | <task.description> |
      | Subtask-0   | <task.subtask-0>   |
      | Subtask-1   | <task.subtask-1>   |
      | Subtask-2   | <task.subtask-2>   |

  @96 @acceptance @subtask @createTask @e2e
  Scenario: A user can add a subtask on a task through the dashboard
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user adds some subtasks to "<task.name>" through the dashboard
      | Subtask-0 | (randomNameTask) |
      | Subtask-1 | (randomNameTask) |
      | Subtask-2 | (randomNameTask) |
    And the user searches "<task.name>" into search tasks engine
    Then the user should see on task page the following information:
      | Name        | <task.name>        |
      | Description | <task.description> |
      | Subtask-0   | <task.subtask-0>   |
      | Subtask-1   | <task.subtask-1>   |
      | Subtask-2   | <task.subtask-2>   |

  @98 @board @e2e
  Scenario: A user can create a task and to mark it as completed through board
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user creates a task with the following parameters:
      | Name        | (randomNameTask)        |
      | Description | (randomDescriptionTask) |
    And the user saves the task
    And the user closes the popup modal
    And the user opens the board
    And the user marks the task "<task.name>" as completed in board by button
    Then a popup modal should appear with the following message: "<task.name>"
    And the "<task.name>" task should be displayed in the COMPLETE section on board

  @01 @smoke @testing
  Scenario: Verify that a user can creat a task with only Task name filled
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user creates a task with the following parameters:
      | Name        | (randomNameTask) |
      | Description | (empty)          |
    And the user saves the task
    Then a popup modal should appear with the following message: "<task.name> Created!"

  @02 @negative @testing
  Scenario: Verify that a error message is displayed when task name is empty
    Given the user logs into ClickUp portal as "free" user
    When the user selects a space from the sidebar
    And the user creates a task with the following parameters:
      | Name        | (empty) |
      | Description | (empty) |
    And the user saves the task
    Then "Enter Task Name" message should apper on the task creation window
    And the user creates a task with the following parameters:
      | Name        | (empty)                 |
      | Description | (randomDescriptionTask) |
    And the user saves the task
    And "Enter Task Name" message should apper on the task creation window