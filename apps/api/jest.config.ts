export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!test/**/*'],
  maxWorkers: 1,
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^@test/(.*)': '<rootDir>/test/$1',
  },
  setupFiles: ['<rootDir>/test/jest-init.ts'],
  testMatch: ['<rootDir>/test/e2e/**/*.{ts,js}'],
  testTimeout: 30000,
  verbose: true,
};
