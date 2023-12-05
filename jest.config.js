module.exports = {
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports/unit_test/test_results',
        outputName: 'report.xml',
      },
    ],
    [
      'jest-html-reporters',
      {
        publicPath: './reports/unit_test/test_results',
        filename: 'report.html',
      },
    ],
  ],
  coverageDirectory: './reports/unit_test/coverage',
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  testTimeout: 40000
};