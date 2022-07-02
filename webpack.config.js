const path = require('path')
// 根据相对路径获取绝对路径
const resolvePath = relativePath => path.resolve(__dirname, relativePath)
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 分析包内容
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = () => {
  const prod = process.env.NODE_ENV === 'production'
  const styleLoader = (loaders = []) => [
    prod ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    ...loaders,
  ]

  return {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'source-map' : 'cheap-module-eval-source-map',
    entry: './src/App.tsx',
    output: {
      path: path.resolve('./app'),
      filename: prod ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: styleLoader(),
        },
        {
          test: /\.scss$/,
          use: styleLoader([
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ]),
        },
        {
          test: /\.(jpe?g|png|gif|bmp|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: prod ? 'img/[name].[contenthash:8].[ext]' : '[name].[ext]',
            },
          },
        },
        {
          test: /\.(svg|eot|woff|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: prod ? 'font/[name].[contenthash:8].[ext]' : '[name].[ext]',
            },
          },
        },
      ],
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
      contentBase: './app',
      disableHostCheck: true,
      host: '0.0.0.0',
      useLocalIp: true,
      open: 'Google Chrome',
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
    },
    // Resolve 配置 Webpack 如何寻找模块所对应的文件
    resolve: {
      // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。  resolve.extensions用于配置在尝试过程中用到的后缀列表，默认是：js 和 json
      extensions: ['.js', '.ts', '.tsx'],
      // 配置项通过别名来把原导入路径映射成一个新的导入路径
      alias: {
        '@': resolvePath('./src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        // title 配置
        title: 'Invitation',
        // 模板导入
        template: './public/index.html',
        // 名称为
        filename: 'index.html',
      }),
      new BundleAnalyzerPlugin({
        // analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
        // generateStatsFile: true // 是否生成stats.json文件
      }),
      new webpack.EnvironmentPlugin({
        ...process.env,
      }),
      prod &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
        }),
    ].filter(Boolean),
  }
}
