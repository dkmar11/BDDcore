const {describe, expect} = require('@jest/globals');
const configurationManager = require('../../utils/configuration_manager');
describe('ConfigurationManager', () => {

  it('should have the properties "environment", "browser", "log-level", "capabilities" on "setUp"', () => {
    expect(configurationManager.setUp).toHaveProperty('environment');
    expect(configurationManager.setUp).toHaveProperty('browser');
    expect(configurationManager.setUp).toHaveProperty('log-level');
    expect(configurationManager.setUp).toHaveProperty('capabilities');
  });

  it('should have the properties "timeout", "implicit_wait", "conditions_timeout" on "setUp"', () => {
    expect(configurationManager.setUp).toHaveProperty('timeout');
    expect(configurationManager.setUp).toHaveProperty('implicit_wait');
    expect(configurationManager.setUp).toHaveProperty('conditions_timeout');
  });

  it('should have the properties "api-url", "ui-url", "users" on "environment"', () => {
    expect(configurationManager.environment).toHaveProperty('api-url');
    expect(configurationManager.environment).toHaveProperty('ui-url');
    expect(configurationManager.environment).toHaveProperty('users');
  });

  it('should not have credentials any user', () => {
    const users = configurationManager.environment.users;
    Object.keys(users).forEach(user => {
      expect(users[user].token_bearer).toBe("");
      expect(users[user].token).toBe("");
      expect(users[user].email).toBe("");
      expect(users[user].password).toBe("");
    });
  });

});
