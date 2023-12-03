const { Then } = require("@cucumber/cucumber");
const { expect } = require("expect");
const  validateSchema = require("../../../main/core/utils/validator");
const { schemasRoute } = require("../../../main/clickup/utils/clickup_constans");

Then("the response status code should be {int}", function(codeStatus) {
  expect(this.response.status).toBe(codeStatus);
});

Then("the response schema should be verified with {string}", function (jsonSchema) {
  const schemaPath = `${schemasRoute.ROUTE}${jsonSchema}.json`;
  expect(validateSchema(this.response.data, schemaPath)).toBeTruthy();
});

Then("the response body should be verified with:", function(table) {
  let expectedData = {};
  table.hashes().forEach((rowObj) => {
    if (rowObj.value.includes('<')) {
      const obj = this.getObjectAndPropertyFromString(rowObj.value)
      expectedData[obj.propertyName] = this[obj.objName][obj.propertyName];
    }
    else {expectedData[rowObj.key] = rowObj.value;} 
  })
  expect(this.response.data).toMatchObject(expectedData);
});
