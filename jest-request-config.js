const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']
config.roots = ['<rootDir>/tests/request']

module.exports = config
