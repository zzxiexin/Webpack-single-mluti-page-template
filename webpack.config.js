const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob')
const handleCurDir = name => {
    return path.join(__dirname, name);
}

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(handleCurDir('./src/*/index.js'));
    console.log('entryFiles===> ' + entryFiles);

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
                    template: handleCurDir(`src/${pageName}/${pageName}.html`),
                    filename: `${pageName}.html`,
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
    const devMode = argv.mode !== 'production';
    return {
        entry,
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
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CleanWebpackPlugin(), // 清理之前的打包文件
        ].concat(htmlWebpackPlugins)
    }
}