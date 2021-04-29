const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const handleCurDir = name => {
    return path.join(__dirname, name);
}
module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    return {
        entry: [
            "babel-polyfill",
            handleCurDir('./src/index.js')
        ],
        output: {
            filename: '[name].js',
            path: handleCurDir('./dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({     // 压缩css
                filename: "[name].[chunk].css",
                chunkFilename: "[id].[chunk].css"
            }),
            new HtmlWebPackPlugin({            // 将打包好的文件注入html模板
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new CleanWebpackPlugin(), // 清理之前的打包文件
        ]
    }
}
