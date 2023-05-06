# 前端工程化与 webpack
## 前端工程化
### 1.实际的前端开发
  - 模块化（js 的模块化、css 的模块化、资源的模块化）
  - 组件化（复用现有的 UI 结构、样式、行为）
  - 规范化（目录结构的划分、编码规范化、接口规范化、文档规范化、 Git 分支管理）
  - 自动化（自动化构建、自动部署、自动化测试）
### 2. 什么是前端工程化
前端工程化指的是：在`企业级的前端项目开发`中，把前端开发所需的`工具`、`技术`、`流程`、`经验`等进行规范化、标准化。
企业中的 Vue 项目和 React 项目，都是基于`工程化的方式`进行开发的。
好处：前端开发`自成体系`，有一套`标准的开发方案和流程`。
### 3. 前端工程化的解决方案
[webpack](https://www.webpackjs.com/) 

## webpack 的基本使用
### 1. webpack 介绍
概念：webpack 是`前端项目工程化的具体解决方案`。
主要功能：它提供了友好的`前端模块化开发`支持，以及`代码压缩混淆`、`处理浏览器端 JavaScript 的兼容性`、`性能优化`等强大的功能。
好处：让程序员把`工作的重心`放到具体功能的实现上，提高了前端`开发效率`和项目的`可维护性`。
注意：目前 Vue，React 等前端项目，基本上都是基于 webpack 进行工程化开发的。

### 2. **项目使用**
① 新建项目空白目录，并运行 `npm init –y` 命令，初始化包管理配置文件 `package.json`
② 新建 `src` 源代码目录
③ 新建 src -> `index.html` 首页和 src -> `index.js` 脚本文件
④ 初始化首页基本的结构
⑤ 运行 `npm install jquery –S` 命令，安装 jQuery; `-S` 等同于 `--save` 包放入`dependencies`节点里面 `生产环境`
⑥ 通过 ES6 模块化的方式导入 jQuery，实现列表隔行变色效果

### 3. 项目中安装 `webpack`
命令:
```
npm install webpack webpack-cli
```
> 注：
> `dependencies` 生产环境(`开发阶段`和`产品上线`的依赖); 命令加：`-S`或者`不加默认`, `-S`是`--save`的简写
> `devDependencies` 开发环境(`只在开发阶段`会被用到); 命令加：`-D`, `-D` 是 `--save-dev` 的简写

### 4. 在项目中配置 webpack
① 在`项目根目录`中，创建名为 `webpack.config.js` 的 webpack 配置文件，并初始化如下的基本配置：
```js
// 使用 node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
  // webpack 运行的模式；可选值有两个 development(开发模式) 和 production(生产模式)
  mode: 'development',
}
```
② 在 `package.json` 的 `scripts` 节点下，新增 `dev` 脚本如下：
```json
// scripts 里面的代码可以被运行
 "scripts": {
    "dev": "webpack" // script 节点下的脚本，可以通过 npm run 执行，例如 npm run dev； start 脚本名可以省略 run
    // 脚本名：dev(合法就行)  命令：webpack(固定写法)
  }
```
> 注：通过 `npm run` 来指定运行的脚本名字，就可以直接去运行脚本对应的这一行命令；  
③ 在终端中运行 `npm run dev` 命令，启动 webpack 进行项目的打包构建
#### 4.1 mode 的可选值
`mode 节点`的可选值有两个，分别是：
① development
  - `开发环境`
  - `不会`对打包生成的文件进行`代码压缩`和`性能优化`
  - 打包`速度快`，适合在`开发阶段`使用

② production
  - `生产环境`
  - `会`对打包生成的文件进行`代码压缩`和`性能优化`
  - 打包`速度很慢`，仅适合在项目`发布阶段`使用

#### 4.2 webpack.config.js 文件的作用
`webpack.config.js` 是 `webpack` 的配置文件。webpack 在真正开始`打包`构建`之前`，会`先读取这个配置文件`，从而`基于给定的配置`，对项目进行`打包`。
注意：由于 webpack 是基于 `node.js 开发出来的`打包工具，因此在它的配置文件中，支持使用 node.js 相关
的语法和模块进行 webpack 的个性化配置。

#### 4.3 webpack 中的默认约定
在 webpack 4.x 和 5.x 的版本中，有如下的默认约定：
① 默认的`打包入口`文件为 `src` -> `index.js`
② 默认的`输出文件`路径为 `dist` -> `main.js`
> 注意：可以在 `webpack.config.js` 中修改打包的默认约定

#### 4.4 自定义打包的入口与出口
在 webpack.config.js 配置文件中，通过 `entry 节点`指定`打包的入口`。通过 `output 节点`指定`打包的出口`。
示例代码如下：
```js
const path = require('path') // node.js 中专门操作路径的模块
module.exports = {
  mode: 'production',
  // entry: '指定要处理那个文件' 不设置默认 index.js
  entry: path.join(__dirname, './src/index1.js'),
  // 指定生成的文件要放到哪里, 默认 main.js
  output: {
    // path 属性；存放到那个目录
    path: path.join(__dirname, './dist'),
    // 生成的文件名
    filename: 'bundle.js'
  }
}
```
## webpack 中的插件
### 1. webpack 插件的作用
通过安装和配置第三方的插件，可以`拓展 webpack 的能力`，从而让 webpack 用起来`更方便`。最常用的webpack 插件有如下两个：(**放置内存里面**)
① `webpack-dev-server`
  - 类似于 node.js 阶段用到的 nodemon 工具
  - 每当修改了源代码，webpack 会`自动`进行项目的`打包`和`构建`
② `html-webpack-plugin`
  - webpack 中的 HTML 插件（类似于一个模板引擎插件）
  - 可以通过此插件自定制 index.html 页面的内容

### 2. webpack-dev-server
`webpack-dev-server` 可以让 webpack `监听项目源代码的变化`，从而进行`自动打包构建`。
#### 2.1 安装 webpack-dev-server
```
npm i webpack-dev-server -D
```
#### 2.2 配置 webpack-dev-server
① 修改 `package.json -> scripts` 中的 `dev` 命令如下：
```json
"scripts": {
    "dev": "webpack serve" // script 节点下的脚本，可以通过 npm run 执行
  }
```  
② 再次运行 `npm run dev` 命令，重新进行项目的打包
③ 在浏览器中访问 `http://localhost:8080` 地址，查看自动打包效果

> 注意：webpack-dev-server 会启动一个`实时打包的 http 服务器`

#### 2.3 打包生成的文件哪儿去了？
① `不配置` webpack-dev-server 的情况下，webpack 打包生成的文件，会存放到`实际的物理磁盘`上
  - 严格遵守开发者在 webpack.config.js 中指定配置
  - 根据 `output 节点`指定路径进行存放
② 配置了 webpack-dev-server 之后，打包生成的文件存`放到了内存中`
  - 不再根据 output 节点指定的路径，存放到实际的物理磁盘上
  - `提高了`实时打包输出的`性能`，因为内存比物理磁盘速度快很多

#### 2.4 生成到内存中的文件该如何访问？
webpack-dev-server 生成到内存中的文件，`默认`放到了`项目的根目录中`，而且是`虚拟的、不可见的`。
  - 可以直接用 `/ `表示`项目根目录`，`后面跟上要访问的文件名称`，即可访问内存中的文件
  - 例如 `/bundle.js` 就表示要访问 webpack-dev-server 生成到内存中的 bundle.js
  
> 注意：可以通过配置 `webpack.config.js`
```js
// 配置 webpack-dev-server,支持自动打包
devServer: {
    static: './src/' // 允许配置从根目录下提供静态文件
  }
```  
### 3. html-webpack-plugin
html-webpack-plugin 是 `webpack 中的 HTML 插件`，可以通过此插件`自定制` index.html `页面的内容`。
`需求`：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，`复制到项目根目录中一份`！
#### 3.1 安装 html-webpack-plugin
```
npm i html-webpack-plugin -D
```
#### 3.2 配置 html-webpack-plugin
```js
// 1.导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2.new创建构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
  // 指定要复制那个页面
  template: './src/index.html',
  // 指定复制出来的文件名和存放路径
  filename: './index.html'
})
module.exports = {
// 3.插件的数组，将来 webpack 在运行时，会加载并调用这些插件
  plugins: [htmlPlugin],
}
```
#### 3.3 作用 html-webpack-plugin
① 通过 HTML 插件复制到项目根目录中的 index.html 页面，`也被放到了内存中`
② HTML 插件在生成的 index.html `页面`，`自动注入`了打包的 bundle.js 文件

> 注：只需要了解这些配置的作用，项目会使用 [vue-cli](https://github.com/vuejs/vue-cli) 来自动生成配置

### 4. devServer 节点
在 webpack.config.js 配置文件中，可以通过 `devServer` 节点对 webpack-dev-server 插件进行更多的配置，
示例代码如下：
```js
module.exports = {
 devServer: {
    // 首次打包成功,自动打开浏览器
    open: true,
    // 指定运行的主机地址
    host: '127.0.0.1',
    // 端口号默认80
    port: 80,
  }
}
```
> 注意：凡是修改了 webpack.config.js 配置文件，或修改了 package.json 配置文件，`必须重启实时打包的服务器`，否则最新的配置文件无法生效！ 

## webpack 中的 loader
### 1. loader 概述
在实际开发过程中，webpack 默认只能打包处理以 `.js` 后缀名结尾的模块。其他非 `.js 后缀名结尾的模块`，webpack 默认处理不了，`需要调用 loader 加载器才可以正常打包`，否则会报错！
loader 加载器的作用：`协助 webpack 打包处理特定的文件模块`。比如：
  - css-loader 可以打包处理 .css 相关的文件
  - less-loader 可以打包处理 .less 相关的文件
  - babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法

### 2. loader 的调用过程  
``` 
                                                                                                      ==> 调用 loader 处理
                                                                              ==> 是否配置了babel ==>|
                                                                                                      ==> 报错
                                                    ==> 是否包含高级js语法  ==>| 
                                                                              ==> webpack 进行处理
将要被 webpack 打包处理的文件模块 ==> 是否为js模块 ==>|
                                                                                ==> 调用 loader 处理
                                                    ==> 是否配置了对应loader ==>|
                                                                                ==> 报错
```
### 3. 打包处理 css 文件
① 运行 `npm i style-loader css-loader -D` 命令，安装处理 css 文件的 loader
② 在 webpack.config.js 的 `module` -> `rules` 数组中，添加 loader 规则如下：
```js
module.exports = {
 module: { // 所有第三方文件模块的匹配规则
    rules: [ // 文件后缀的匹配规则
      // 定义了不同模块对应的 loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
```
其中，`test` 表示匹配的`文件类型`， `use(使用)` 表示对应`要调用的 loader`
注意：
  - use 数组中指定的 loader `顺序是固定的`
  - 多个 loader 的调用顺序是：`从后往前调用`

### 4. 打包处理 less 文件
① 运行 npm i `less-loader` `less` -D 命令 注意: `高版本不需要安装 less 模块`
② 在 webpack.config.js 的 `module` -> `rules` 数组中，添加 loader 规则如下：
```js
module.exports = {
 module: { // 所有第三方文件模块的匹配规则
    rules: [ // 文件后缀的匹配规则
      // 处理 .less 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader','less-loader'] }
    ]
  }
}
```
### 5. 打包处理样式表中与 `url 路径相关`的文件
① 运行 npm i `url-loader file-loader` -D 命令
② 在 webpack.config.js 的 `module` -> `rules` 数组中，添加 loader 规则如下：
```js
module.exports = {
 module: { 
    rules: [ 
      // 处理 图片 文件的 loader
      { test: /\.gif|png|jpg$/, use: 'url-loader?limit=470' },
    ]
  }
}
```
其中 `?`之后的是 `loader 的参数项`：
  - limit 用来指定`图片的大小`，单位是字节（byte）
  - 只有 `≤` limit 大小的图片，才会被转为 `base64` 格式的图片

> 注意: 在 `webpack` 里面一切皆是模块,都可以用 ES6 导入语法进行导入和使用, 且解析打包都会被放入 `bundle.js` 里面进行导出渲染

### 6. 打包处理 js 文件中的高级语法
webpack 只能打包处理`一部分`高级的 JavaScript 语法。对于那些 webpack 无法处理的高级 js 语法，需要借助于 `babel-loader` 进行`打包`处理。例如 webpack 无法处理下面的 JavaScript 代码：
- index.js 默认`入口文件`
```js
// 1.定义了名为 info 装饰器函数
function info(target) {
  // 2.为目标添加静态属性 info
  target.info = 'Person info.'
}

// 3. 为 Person 类应用 info 装饰器 
@info
// 定义一个普通的类
class Person { }

// 4. 打印 Person 的静态属性 info
console.log(Person.info);
```

#### 6.1 安装 babel-loader 相关的包
运行如下的命令安装对应的依赖包：
npm i `babel-loader` `@babel/core` `@babel/plugin-proposal-decorators` -D
在 webpack.config.js 的 `module` -> `rules` 数组中，添加 loader 规则如下：
```js
// 使用 babel-loader 处理高级的 JS 语法
// 注意:在配置 babel-loader 的时候,只需要把自己写的代码进行编译打包即可; 且必须使用 exclude 指定排除项, 因为 node_modules 目录下的第三方包不需要被打包
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
#### 6.2 配置 babel-loader
在项目根目录下，创建名为 `babel.config.js` 的配置文件，定义 `Babel 的配置项`如下：
```js
module.exports = {
  // 声明 babel 可用的插件
  // 将来,webpack 在调用 babel-loader 的时候,会先加载 plugins 插件来使用
  "plugins": [
    ["@babel/plugin-proposal-decorators", { legacy: true }]
  ]
}
```
[详情请参考 Babel 的官网](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) 

## 打包发布
### 1. 为什么要打包发布
`项目开发完成之后`，需要使用 webpack `对项目进行打包发布`，主要原因有以下两点：
① `开发环境下`，打包生成的文件`存放于内存中`，无法获取到最终打包生成的文件
② `开发环境下`，打包生成的文件`不会进行代码压缩和性能优化`
`为了让项目能够在生产环境中高性能的运行`，因此需要对项目进行打包发布。

### 2. 配置 webpack 的打包发布
在 `package.json` 文件的 `scripts` 节点下，新增 `build` 命令如下：
```json
"scripts": {
    "dev": "webpack serve", // 开发环境中,运行 npm run dev 命令
    "build":"webpack --mode production", // 项目发布时,运行 npm run build 命令
  },
```  
`--mode` 是一个参数项，用来指定 webpack 的`运行模式`。production 代表生产环境，会对打包生成的文件
进行`代码压缩`和`性能优化`。
> 注意：通过 --mode 指定的参数项，会`覆盖` webpack.config.js 中的 `mode` 选项。
### 3. 把 JavaScript 文件统一生成到 js 目录中
在 `webpack.config.js` 配置文件的 `output` 节点中，进行如下的配置：
```js
module.exports = {
 // 指定生成的文件要放到哪里
  output: {
    // path 属性； 存放到那个目录
    path: path.join(__dirname, 'dist'),
    // 明确告诉 webpack 把生成的 bundle.js 文件存放到 dist 目录下的 js 子目录中 
    filename: 'js/bundle.js'
  },
}
```  
### 4. 把图片文件统一生成到 image 目录中
修改 webpack.config.js 中的配置项，新增 `generator` 选项即可指定图片文件的输出路径：
```js
 module: {
    rules: [
      output:{
        test: /\.gif|png|jpg$/,
        type: 'asset', // 相当于使用了 url-loader,能够对图片进行处理
        parser: {
            dataUrlCondition: {
              // 小于10kb的图片转为base64
              // 优点：减少请求数量  缺点：体积会大一点
              maxSize: 10 * 1024 // 10kb
            }
          },
        generator: {
          // 输出图片名称
            filename: 'images/[hash:8][ext][query]'
              },
        }
    ]
},
```      
### 5. 自动清理 dist 目录下的旧文件
```js
module.exports = {
output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js',
    // 自动清空上次打包结果
    // 原理：在打包前，将path整个目录清空，再进行打包
    clean: true,
  },
}
```  

## Source Map
### 1. 生产环境遇到的问题
前端项目在投入生产环境之前，都需要对 JavaScript 源代码进行`压缩混淆`，从而减小文件的体积，提高文件的加载效率。此时就不可避免的产生了另一个问题：
`对压缩混淆之后的代码除错（debug）`是一件极其困难的事情
  - 变量被替换成`没有任何语义`的名称
  - 空行和注释被剔除

### 2. 什么是 Source Map  
`Source Map 就是一个信息文件，里面储存着位置信息`。也就是说，Source Map 文件中存储着压缩混淆后的代码，所对应的`转换前的位置`。
有了它，出错的时候，除错工具将`直接显示原始代码`，`而不是转换后的代码`，能够极大的方便后期的调试。

### 3. webpack 开发环境下的 Source Map
在`开发环境下`，webpack `默认启用了` Source Map 功能。当程序运行出错时，可以直接在控制台提示`错误行的位置`，并`定位到具体的源代码`：
#### 3.1 默认 Source Map 的问题
开发环境下默认生成的 Source Map，记录的是`生成后的代码的位置`。会导致`运行时报错的行数`与`源代码的行数`不一致的问题。

#### 3.2 解决默认 Source Map 的问题
开发环境下，推荐在 `webpack.config.js` 中添加如下的配置，即可`保证运行时报错的行数`与`源代码的行数`保持一致：
```js
module.exports = {
  mode: 'development', // 开发环境
  // 在开发调试阶段，建议都把 devtool 的值设置为 eval-source-map
  // 此选项生成 Source Map 能够保证“运行时报错的行数”与“源代码的行数”保持一致
  devtool: "eval-source-map",
}
```
### 4. webpack `生产环境`下的 Source Map
在`生产环境下`，如果`省略了 devtool 选项`，则最终生成的文件中`不包含 Source Map`。这能够`防止原始代码`通过 Source Map 的形式`暴露`给别有所图之人。
#### 4.1 只定位行数不暴露源码
在生产环境下，如果`只想定位报错的具体行数`，且``不想暴露源码``。此时可以将 `devtool` 的值设置为`nosources-source-map`。
```js
module.exports = {
  mode: 'production', // 生产环境
  // 在实际发布上线的时候，建议把 devtool 的值设置为 nosources-source-map或者直接关闭 Source-map
  devtool: "nosources-source-map",
}
```
#### 4.2 定位行数且暴露源码
在生产环境下，如果`想在定位报错行数的同时`，`展示具体报错的源码`。此时可以将 `devtool` 的值设置为`source-map`。
> 采用此选项后：你应该将你的服务器配置为，`不允许普通用户访问 source map 文件`！

### 5. Source Map 的最佳实践
① 开发环境下：
  - 建议把 devtool 的值设置为 `eval-source-map`
  - 好处：可以精准定位到具体的错误行

② 生产环境下：
  - 建议`关闭 Source Map` 或将 devtool 的值设置为 `nosources-source-map`
  - 好处：防止源码泄露，提高网站的安全性

### 6.拓展
在 `webpack.config.js` 配置文件中配置 `@` 的符号所在的路径
```js
module.exports = {
resolve: {
    alias: {
      // 告诉 webpack 程序员写的代码中，@ 符号表示 src 这一层目录
      '@': path.join(__dirname, './src/')
    }
  }
 }  
```  