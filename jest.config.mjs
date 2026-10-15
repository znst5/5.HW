export default {
  roots: ['<rootDir>/src'],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(git|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },

  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['<rootDir>/src/js/__tests__/test.js'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/js/__tests__/e2e.test.js'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    }
  ]
};
