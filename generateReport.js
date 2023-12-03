let reporter = require("cucumber-html-reporter");

let options = {
  theme: "bootstrap",
  jsonFile: `reports/cucumber/cucumber_report.json`,
  output: `reports/cucumber/cucumber_report.html`,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {},
};

reporter.generate(options);
