module.exports = {
  presets: ['@babel/env', '@babel/react', '@babel/typescript'],
  plugins: [
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    [
      'import',
      {
        style: true,
        libraryName: 'antd',
        libraryDirectory: 'es',
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
  ],
}
