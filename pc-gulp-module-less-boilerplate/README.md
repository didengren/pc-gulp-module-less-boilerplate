# 前端切图脚手架
## 概述
### 运行方法
- Run npm install to initialize.
- Run gulp or gulp dev to open develop mode.
- Run gulp publish to generate final code.

## 结构说明
	\app - 项目源代码
		\compenents - 存放组件
		\img - 存放图片
		\js - 存放ES6代码
		\less - 存放LESS代码
		\lib - 存放第三方库文件（如Jquery）
		index.jade - 页面文件
	\build - 开发模式生成代码
	\gulpconfig - gulp配置的部分解耦
	gulpfile.js - gulp config
## 版本更新
### V1.0.0
- 开设开发模式
- 进行less，jade，ES6的编译
- 监控less，jade，ES6更改并动态更新
- 拥有浏览器自动刷新
- css进行autoprefixer
- js，less添加sourceMap
- 可以编译ES6（模块化）
- 开设生产模式
- 对css，js进行压缩
- 对图片png进行压缩
- 开设组件化开发模式
- 添加组件浏览器预览

### 未来期望
- 添加CSS雪碧功能
- 添加CSS图片base64功能
- 文件MD5计算与替换
- pug代替jade

## 常见问题
### 脚手架提供的外网IP在手机端无法连接
	按下WIN+R，进入cmd。输入ipconfig命令，确认外网的IP地址确实是脚手架提供的。
	有些时候脚手架提供的IP不一定是外网所需要的_(:з」∠)_
