module.exports = {
    rootDir: '.',
    moduleFileExtensions: ['js', 'json', 'ts'],
    testMatch: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // 👈 necessário para funcionar com aliases do tsconfig
    },
    testEnvironment: 'node',
  };
  