const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 把css文件单独分离出来
const HtmlWebPackPlugin = require("html-webpack-plugin"); // 将打包的js注入到html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除之前打包的文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
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
            filename: '[name].[chunkhash:8].js',
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
                    test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'url-loader', // 根据图片大小，把图片优化成base64
                            options: {
                                name: '[name]_[hash].[ext]',
                                outputPath: 'images/',
                                limit: 10000
                            }
                        }]
                }

            ]
        },
        plugins: [
            new MiniCssExtractPlugin({     // 分离css
                filename: "[name].[chunkhash:8].css",
                chunkFilename: "[id].[chunkhash:8].css"
            }),
            new HtmlWebPackPlugin({            // 将打包好的文件注入html模板
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new CleanWebpackPlugin(), // 清理之前的打包文件
            new OptimizeCssAssetsWebpackPlugin(), //压缩css文件
        ]
    }
}
