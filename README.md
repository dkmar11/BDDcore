# ClickUp Testing

This project is an example of BDD.

Software under testing: [ClickUp](https://clickup.com/)

- [API reference](https://clickup.com/api/)
- [UI reference](https://clickup.com/onboarding)

### Main Technologies Used

- Node
- Cucumber
- Selenium

## Deployment

Firstly, you need to have an account on [ClickUp](https://app.clickup.com/signup) and enter your credentials in "./environment.json". Additionally, you will require an API token, for which a tutorial can be found [here](https://clickup.com/api/developer-portal/authentication/).

Example:

```json
{
  "test": {
    "api-url": "https://api.clickup.com/api/v2",
    "ui-url": "https://app.clickup.com/login",
    "api-url-trash": "https://app.clickup.com/trash/v1",
    "users": {
      "free": {
        "token_bearer": "",
        "token": "your token",
        "email": "your email",
        "password": "your password"
      }
    }
  }
}

```

Finally you need to install dependencies

```bash
  npm install
```


## Running Tests

To run code tests, run the following commands

```bash
  npm run check:code
  npm run check:features
  npm run test:jest
```
### Cucumber
To run API tests, run the following command

```bash
  npm run test:api
```

To run UI tests, run the following command (working)

```bash
  npm run test:ui
```

## Deploy to Docker
Requirements
- Docker installed
1.- Build the Container:
```bash
  docker build -t <name> .
```
2.- Run the Container:
```bash
  docker run -it <name>
```
Now you can use the previous command 

## Bugs reports 
- The bugs reports can be found [here](https://github.com/dkmar11/BDDcore/issues)

## Test analysis and Test design  
- Access the basic Test Analysis and Design for ClickUp [here](https://docs.google.com/spreadsheets/d/1ug7k0OmLeF3Sh0dLAYzvs0QTlEnj-789W-Mk4dGG6yk/edit?usp=sharing). Please note that acceptance criteria access might be limited.

#### Test cases from Test design 
to run the [test cases](https://docs.google.com/document/d/1fEJIDjNIiySEZM4rqhiRfnBNhcDrnZN7OAV_GAL8E18/edit?usp=sharing) created before

@01 "Verify that a user can create a task with only Task name filled"
```bash
  npm run test:case1
```
@01 "Verify that a error message is displayed when task name is empty" - IN PROGRESS

## Cautions
- UI testing is in progress, the application had some updated in its UI
