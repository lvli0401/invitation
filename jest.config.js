module.exports = {
  // enzyme配置文件位置
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // 是否显示覆盖率报告
  collectCoverage: true,
  // 告诉 jest 哪些文件需要经过单元测试测试
  // collectCoverageFrom: ['src/pages/index/index'],
  // coverageThreshold: {
  //   global: {
  //     statements: 90, // 保证每个语句都执行了
  //     functions: 90, // 保证每个函数都调用了
  //     branches: 90, // 保证每个 if 等分支代码都执行了
  //   },
  // },
}
