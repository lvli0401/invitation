const path = require('path')
// 根据相对路径获取绝对路径
const resolvePath = relativePath => path.resolve(__dirname, relativePath)
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 分析包内容
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = () => {
  const prod = process.env.NODE_ENV === 'production'
  const styleLoader = (loaders = [], modules = true) => [
    prod ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader', // translates CSS into CommonJS
      options: {
        importLoaders: 1,
        modules,
        sourceMap: true,
      },
    },
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
      library: '[name]_library',
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: ['happypack/loader?id=babel'],
        },
        {
          test: /\.css$/,
          use: styleLoader(),
        },
        {
          test: /\.scss$/,
          use: styleLoader(
            [
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                },
              },
            ],
            true,
          ),
        },
        {
          test: /\.less$/,
          use: styleLoader(
            [
              {
                loader: 'less-loader',
                options: {
                  modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                  },
                  javascriptEnabled: true,
                },
              },
            ],
            false,
          ),
        },
        {
          test: /\.(jpe?g|png|gif|bmp)$/,
          use: ['happypack/loader?id=url-loader'],
        },
        {
          test: /\.(svg|eot|woff|ttf)$/,
          use: ['happypack/loader?id=file-loader'],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
          },
          commons: {
            name: 'commons',
            priority: 10,
            chunks: 'initial',
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            minChunks: 2,
            enforce: true,
          },
        },

        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true,
      },
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i, //测试匹配文件,
          // include: /\/includes/, //包含哪些文件
          // excluce: /\/excludes/, //不包含哪些文件
          cache: false, //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
          parallel: true, //使用多进程并行运行来提高构建速度
          sourceMap: true,
          //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
          //返回true以uglify块，否则返回false。
          chunkFilter: chunk => {
            // `vendor` 模块不压缩
            if (chunk.name === 'vendor') {
              return false
            }
            return true
          },
        }),
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
      new HappyPack({
        /*
         * 必须配置
         */
        // id 标识符，要和 rules 中指定的 id 对应起来
        id: 'babel',
        // 需要使用的 loader，用法和 rules 中 Loader 配置一样
        // 可以直接是字符串，也可以是对象形式
        threadPool: happyThreadPool,
        verbose: process.env.HAPPY_VERBOSE === '1',
        loaders: ['babel-loader?cacheDirectory'],
      }),
      new HappyPack({
        id: 'url-loader',
        threadPool: happyThreadPool,
        verbose: process.env.HAPPY_VERBOSE === '1',
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024,
              name: prod ? 'img/[name].[contenthash:8].[ext]' : '[name].[ext]',
            },
          },
        ],
      }),
      new HappyPack({
        id: 'file-loader',
        threadPool: happyThreadPool,
        verbose: process.env.HAPPY_VERBOSE === '1',
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: prod ? 'font/[name].[contenthash:8].[ext]' : '[name].[ext]',
            },
          },
        ],
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
