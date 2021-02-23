/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const PhaserAssetsWebpackPlugin = require('phaser-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const phaser = path.join(__dirname, '/node_modules/phaser/dist/phaser.min.js')
const publicPath = 'public/'

module.exports = {
  entry: './src/ts/index.ts',
  output: {
    path: path.resolve(__dirname, publicPath),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      {
        test: /phaser\.min\.js$/,
        loader: 'expose-loader',
        options: {
          exposes: { globalName: 'Phaser', override: true }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, publicPath),
    host: 'localhost',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new PhaserAssetsWebpackPlugin(
      [
        {
          type: 'image',
          dir: './assets/images',
          prefix: '',
          rule: /^\w+\.(png|jpg|jpeg|gif)$/
        },
        {
          type: 'audio',
          dir: './assets/audios',
          prefix: '',
          rule: /^\w+\.(mp3|m4a|ogg)$/
        }
      ],
      {
        documentRoot: publicPath,
        output: 'src/ts/assets/assets.json',
        spriteSheetSettingsFileName: 'setting.json'
      }
    )
  ]
}
