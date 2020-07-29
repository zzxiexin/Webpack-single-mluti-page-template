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


目前已实现的配置：（后续会不断完善）
* js的处理：转换 ES6 代码，解决浏览器兼容问题 @babel/core @babel/preset-env babel-loader @babel/plugin-transform-runtime babel-polyfill
* css的处理：编译css，自动添加前缀，抽取css到独立文件 mini-css-extract-plugin css-loader  style-loader postcss-loader
* html的处理：复制并压缩html文件  html-webpack-plugin html-loader
* dist的清理：打包前清理源目录文件  clean-webpack-plugin
* assets的处理：静态资源处理  file-loader
* server的启用：development 模式下启动服务器并实时刷新  webpack-dev-server
