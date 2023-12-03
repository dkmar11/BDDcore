const logger = require('../../utils/logger');

describe('Logger functionality', () => {
  let debugMock, infoMock, warnMock, errorMock;

  beforeAll(() => {
    debugMock = jest.spyOn(logger, 'debug');
    infoMock = jest.spyOn(logger, 'info');
    warnMock = jest.spyOn(logger, 'warn');
    errorMock = jest.spyOn(logger, 'error');
  });

  afterAll(() => {
    jest.restoreAllMocks(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Logger methods are called correctly', () => {
    const debugMessage = 'Debug message';
    const infoMessage = 'Info message';
    const warnMessage = 'Warning message';
    const errorMessage = 'Error message';

    logger.debug(debugMessage);
    logger.info(infoMessage);
    logger.warn(warnMessage);
    logger.error(errorMessage);

    expect(debugMock).toHaveBeenCalledWith(debugMessage);
    expect(infoMock).toHaveBeenCalledWith(infoMessage);
    expect(warnMock).toHaveBeenCalledWith(warnMessage);
    expect(errorMock).toHaveBeenCalledWith(errorMessage);
  });
});