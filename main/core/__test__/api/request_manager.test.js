const {describe, expect} = require('@jest/globals');
const requestManager = require('../../api/request_manager')
const axios = require('axios');

requestManager.instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

describe('RequestManager unitests', () => {
  it('should successfully send a GET request', async () => {
    const result = await requestManager.sendRequest('GET', '/posts');
    expect(result.status).toEqual(200);
  });

  it('should successfully send a POST request', async () => {
    const response = {
      title: 'foo',
      body: 'bar',
      userId: 5
    };
    const body = {
      title: 'foo',
      body: 'bar',
      userId: 5
    }
    const result = await requestManager.sendRequest('POST', '/posts', body);
    expect(result.data).toMatchObject(response);
    expect(result.status).toEqual(201);
  });

  it('should successfully send a PUT request', async () => {
    const response = {
      id: 3,
      title: 'foo',
      body: 'bar',
      userId: 5
    };
    const body = {
      title: 'foo',
      body: 'bar',
      userId: 5
    }
    const result = await requestManager.sendRequest('PUT', '/posts/3', body);
    expect(result.data).toMatchObject(response);
    expect(result.status).toEqual(200);
  });

  it('should successfully send a DELETE request', async () => {
    const result = await requestManager.sendRequest('DELETE', '/posts/3');
    expect(result.status).toEqual(200);
  });
});
/* eslint-enable */
