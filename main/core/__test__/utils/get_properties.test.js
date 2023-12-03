const {describe, expect} = require('@jest/globals');
const getProperties = require('../../utils/get_properties');

describe('testing getProperties function', () => {

  it('should convert a simple datatable with string values to a object list of string values', () => {
    const datatable = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
      { key: 'key3', value: 'value3' }
    ];
    const expectedProperties = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
      { key: 'key3', value: 'value3' }
    ];
    expect(getProperties(datatable)).toEqual(expectedProperties);
  });

  it('should convert a datatable with boolean values to a object list of boolean values', () => {
    const datatable = [
      { key: 'key1', value: 'true' },
      { key: 'key2', value: 'false' },
      { key: 'key3', value: 'true' }
    ];
    const expectedProperties = [
      { key: 'key1', value: true },
      { key: 'key2', value: false },
      { key: 'key3', value: true }
    ];
    expect(getProperties(datatable)).toEqual(expectedProperties);
  });

  it('should convert a datatable with numeric string values to a object list of numeric values', () => {
    const datatable = [
      { key: 'key1', value: '1' },
      { key: 'key2', value: '2' },
      { key: 'key3', value: '3' }
    ];
    const expectedProperties = [
      { key: 'key1', value: 1 },
      { key: 'key2', value: 2 },
      { key: 'key3', value: 3 }
    ];
    expect(getProperties(datatable)).toEqual(expectedProperties);
  });

  it('should convert a datatable with empty array string value to a object list of empty array', () => {
    const datatable = [
      { key: 'key1', value: '[]' },
      { key: 'key2', value: '[]' },
      { key: 'key3', value: '[]' }
    ];
    const expectedProperties = [
      { key: 'key1', value: [] },
      { key: 'key2', value: [] },
      { key: 'key3', value: [] }
    ];
    expect(getProperties(datatable)).toEqual(expectedProperties);
  });

  it('should convert a datatable with null string value to a object list of  null value', () => {
    const datatable = [
      { key: 'key1', value: 'null' },
    ];
    const expectedProperties = [
      { key: 'key1', value: null },
    ];
    expect(getProperties(datatable)).toEqual(expectedProperties);
  });

  it('should be able to convert a datatable with mixed values to a object list of mixed values', () => {
    const datatable = [
      { key: 'key1', value: 'null' },
      { key: 'key2', value: '[]' },
      { key: 'key3', value: '10' },
      { key: 'key4', value: "text" },
      { key: 'key5', value: "true" }
    ];
    const expectedProperties = [
      { key: 'key1', value: null },
      { key: 'key2', value: [] },
      { key: 'key3', value: 10 },
      { key: 'key4', value: "text" },
      { key: 'key5', value: true }
    ];
    expect(getProperties(datatable)).toEqual(expectedProperties);
  });
});
