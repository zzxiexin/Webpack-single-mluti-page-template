const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 把css文件单独分离出来
const HtmlWebPackPlugin = require("html-webpack-plugin"); // 将打包的js注入到html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除之前打包的文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const glob = require('glob')
const handleCurDir = name => {
    return path.join(__dirname, name);
}

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(handleCurDir('./src/*/index.js'));
    console.log('entryFiles===> ', entryFiles);
    console.log('typeof of entryFiles===> ', Array.isArray(entryFiles));
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index]; // 获取入口文件的路径
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1]; // 获取入口文件的名称

            entry[pageName] = entryFile;
            // 循环动态打包文件
            htmlWebpackPlugins.push(
                new HtmlWebPackPlugin({
                    inlineSource: '.css$',
                    template: handleCurDir(`./src/${pageName}/index.html`),
                    filename: handleCurDir(`./dist/${pageName}/index.html`),
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();
console.log('entry===>', entry);
module.exports = (env, argv) => {
    console.log(new MiniCssExtractPlugin())
    const devMode = argv.mode !== 'production';
    const outputPath = {
        filename: '[name].[chunkhash:8].js',
        path: handleCurDir('./dist/js'),
        publicPath: ''
    }
    return {
        entry,
        output: outputPath,
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
                        'postcss-loader',

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
                                outputPath: '../images',
                                limit: 100000
                            }
                        }]
                }

            ]
        },
        plugins: [
            new MiniCssExtractPlugin({    // 分离css
                filename: "../css/[name].[chunkhash:8].css",
                chunkFilename: "[id].[chunkhash:8].css",
            }),
            new CleanWebpackPlugin(), // 清理之前的打包文件
            new OptimizeCssAssetsWebpackPlugin(), //压缩css文件
        ].concat(htmlWebpackPlugins)
    }
}
