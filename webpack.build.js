const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: "index.js",
        // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
        libraryTarget: 'commonjs2'
    },
    externals: {
        "react": {
            commonjs: "react",//如果我们的库运行在Node.js环境中，import _ from 'react'等价于const _ = require('react')
            commonjs2: "react"//同上
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom"
        },
        "prop-types":{
            commonjs: "prop-types",
            commonjs2: "prop-types"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     // you can specify a publicPath here
                        //     // by default it use publicPath in webpackOptions.output
                        //     publicPath: '../'
                        // }
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    // 输出 Source Map
    devtool: 'source-map'
};