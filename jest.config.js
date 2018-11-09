module.exports = {
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99,
    },
  },
  collectCoverage: false,
  coverageReporters: ['json', 'html', 'text', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.js',
  ],
  setupFiles: ['<rootDir>/testSetup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
};
