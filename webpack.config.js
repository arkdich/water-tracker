/* eslint-disable */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    index: 'index.html',
    writeToDisk: true,
  },
  entry: {
    script: './ts/script.ts',
    stats: './ts/stats.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name].[contenthash].[ext]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({ template: './index.html' }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
  ],
};
