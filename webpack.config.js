const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const sass = require("sass");
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./src/index.tsx"],
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : "source-map",
  devServer: {
    devMiddleware: {
      publicPath: '/',
    },
    historyApiFallback: true,
    static: path.join(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|svg|jpg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
      // {
      //   test: /\.(ttf|eot|woff|woff2)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "fonts/[name].[ext]",
      //     },
      //   },
      // },
      // {
      //   test: /\.svg$/,
      //   use: "file-loader",
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: sass
            }
          }
        ]
      }
    ]
  },
  performance: { hints: false },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  output: {
    filename: process.env.NODE_ENV !== 'production' ? "[name].bundle.js" : "[name].bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    globalObject: 'this',
    clean: true
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.VERSION': JSON.stringify(require('./package.json').version) }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    // new HtmlWebpackExternalsPlugin({}),
    new MiniCssExtractPlugin({
      filename: "main.[contenthash].css"
    }),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        {
          from: "**/**",
          to: "./",
          context:"./public/",
          globOptions: {
            dot: true,
            ignore: ["**/index.html"],
          },
        },
      ]
    })
  ]
};
