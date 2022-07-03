module.exports = {
  presets: [
    ['@babel/env', { targets: { node: 'current' } }],
    '@babel/react',
    '@babel/typescript',
  ],
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
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
}
