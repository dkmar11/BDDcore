const {describe, expect} = require('@jest/globals');
const apiMethods = require("../../utils/api_methods");

describe('testing apiMethods object', () => {
  it('should have the properties GET, POST, PUT, DELETE', () => {
    expect(apiMethods).toHaveProperty('GET');
    expect(apiMethods).toHaveProperty('POST');
    expect(apiMethods).toHaveProperty('PUT');
    expect(apiMethods).toHaveProperty('DELETE');
  });

  it('should return "GET", "POST", "PUT", "DELETE" ', () => {
    expect(apiMethods.GET).toBe('GET');
    expect(apiMethods.POST).toBe('POST');
    expect(apiMethods.PUT).toBe('PUT');
    expect(apiMethods.DELETE).toBe('DELETE');
  });
});