# webpack-pro

1. mkdir webpack-pro && cd webpack-pro && yarn init && yarn add webpack webpack-cli -S (webpack 部分功能转移到webpack-cli)

2. package.json 新增 scripts;
```javascript
"scripts": {
    "build": "webpack",
    "dev": "webpack"
  }, 
```
3. 新建webpack.config.js,配置entry、output、module、plugins等相关配置;

4. 新增多文件入口配置，详细代码见webpack.config.js

目前已实现的配置：（后续会不断完善）
* js的处理：转换 ES6 代码，解决浏览器兼容问题,并且压缩js文件  yarn add @babel/core @babel/preset-env babel-loader @babel/plugin-transform-runtime babel-polyfill -S
* css的处理：编译css，自动添加前缀，抽取css到独立文件,并且压缩css  yarn add mini-css-extract-plugin css-loader  style-loader postcss-loader optimize-css-assets-webpack-plugin  -S
* html的处理：复制并压缩html文件 yarn add html-webpack-plugin html-loader -S 
* dist的清理：打包前清理源目录文件  clean-webpack-plugin
* assets的处理,对于小的图片打包成bas64位数据：静态资源处理  file-loader
* server的启用：development 模式下启动服务器并实时刷新  webpack-dev-server

 

