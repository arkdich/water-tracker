/* eslint-disable */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devServer: {
    https: true,
    host: '0.0.0.0',
    port: '8080',
    key: path.resolve(__dirname, '192.168.100.16-key.pem'),
    cert: path.resolve(__dirname, '192.168.100.16.pem'),
    progress: true,
    writeToDisk: true,
    index: 'index.html',
  },
  entry: {
    shared: [
      'regenerator-runtime/runtime.js',
      './ts/class/waterStorage',
      './ts/utilities',
      './ts/components',
    ],
    script: { import: './ts/script.ts', dependOn: 'shared' },
    stats: { import: './ts/stats.ts', dependOn: 'shared' },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]',
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
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
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './manifest.webmanifest',
          to: '.',
        },
        {
          from: './img/favicon/apple-touch-icon.png',
          to: '.',
        },
        {
          from: './img/favicon/favicon.ico',
          to: '.',
        },
        {
          from: './img/favicon/icon-192x192.png',
          to: '.',
        },
        {
          from: './img/favicon/icon-512x512.png',
          to: '.',
        },
        {
          from: './img/favicon/icon.svg',
          to: '.',
        },
        {
          from: './img/splashscreens/ipad_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/ipadpro1_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/ipadpro2_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/ipadpro3_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/iphone6_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/iphoneplus_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/iphonex_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/iphonexr_splash.png',
          to: '.',
        },
        {
          from: './img/splashscreens/iphonexsmax_splash.png',
          to: '.',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './js/srcSw.js',
      swDest: './sw.js',
    }),
  ],
};
