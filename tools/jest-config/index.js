module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/types/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/*.test.*',
    '!**/*.spec.*',
    '!dist/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 80,
    },
  },
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
    '^.+.(js|jsx)$': 'babel-jest',
  },
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(svg)$': './svgSpriteMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reporters: ['default', 'jest-junit'],
  testRegex: '**/*.(test|spec).(js|jsx|ts|tsx)$',
};
