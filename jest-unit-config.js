const config = require('./jest.config')
config.testMatch = ['**/*.spec.ts']
config.roots = ['<rootDir>/tests/unit']
module.exports = config
