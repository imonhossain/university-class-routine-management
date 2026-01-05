export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!test/**/*'],
  maxWorkers: 1,
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^@test/(.*)': '<rootDir>/test/$1',
  },
  setupFiles: ['<rootDir>/test/jest-init.ts'],
  testMatch: ['<rootDir>/test/e2e/**/*.{ts,js}'],
};
