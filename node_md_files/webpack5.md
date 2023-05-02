# webpack 基础
---
## 基本使用
`Webpack` 是一个静态资源打包工具。

它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。

输出的文件就是编译好的文件，就可以在浏览器段运行了。

我们将 `Webpack` 输出的文件叫做 `bundle`。

## 功能介绍
Webpack 本身功能是有限的:

- 开发模式：仅能编译 JS 中的 `ES Module` 语法
- 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

## 开始使用
### 1.资源目录
```text
webpack_code # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
        ├── js # js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js # 项目主文件
```
### 2. 创建文件
- count.js
```js
export default function count(x, y) {
  return x - y;
}
```
- sum.js
```js
export default function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
```
- main.js 入口文件
```js
// 导入
import count from "./js/count"; 
import sum from "./js/sum";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```
### 3. 下载依赖
- 初始化`package.json`
```
npm init -y
```
此时会生成一个基础的 `package.json` 文件。
需要注意的是 `package.json` 中 `name` 字段不能叫做 `webpack`, 否则下一步会`报错`
- 下载依赖 开发依赖(devDependencies)
```
npm i webpack webpack-cli -D 
```
### 4. 启用 Webpack
- 开发模式
```
npx webpack ./src/main.js --mode=development
```
- 生产模式
```
npx webpack ./src/main.js --mode=production
```
`npx webpack`: 是用来`运行`本地安装 `Webpack` 包的。

`./src/main.js`: 指定 `Webpack` 从 `main.js` 文件开始打包，不但会打包 `main.js`，还会将其`依赖`也`一起打包`进来。

`--mode=xxx`：指定模式（环境）。


### 5. 观察输出文件
默认 `Webpack` 会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下文件情况就好了

### 小结
`Webpack` 本身功能比较少，只能处理 `js` 资源，一旦遇到 `css` 等其他资源就会`报错`;所有主要学习`如何处理其他资源`。

# 基本配置
## 5 大核心概念
1. entry（入口）
指示 Webpack 从哪个文件开始打包

2. output（输出）
指示 Webpack 打包完的文件输出到哪里去，如何命名等

3. loader（加载器）
webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

4. plugins（插件）
扩展 Webpack 的功能

5. mode（模式）

主要由两种模式：
- 开发模式：development
- 生产模式：production
## 准备 Webpack 配置文件
在项目根目录下新建文件：`webpack.config.js`
```js
module.exports = {
  // 入口
  entry: "",
  // 输出
  output: {},
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "",
};
```

## 修改配置文件
1. 配置文件

Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范
```js
const path = require('path')
// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  // 入口 
  // 那个文件作为打包入口
  entry: './src/main.js', // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, 'dist'), // 需要用绝对路径
    // 文件的输出名称
    filename: 'mian.js',
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
    ],
  },
  // 插件
  plugins: [
    // 插件的配置
  ],
  // 模式
  // 开发模式
  mode: 'development',
}
```

2. 运行指令
```
npx webpack
```
> 注意： 写了配置文件就运行 `npx webpack` 命令； 没写配置文件运行 ` npx webpack ./src/main.js --mode=development` 或 ` npx webpack ./src/main.js --mode=production` 会自动查找配置，加载里面的配置执行；
## 小结
`Webpack` 将来都通过 `webpack.config.js` 文件进行配置，来增强 Webpack 的功能

# 开发模式介绍
开发模式顾名思义就是我们开发代码时使用的模式。

这个模式下我们主要做两件事：

1. 编译代码，使浏览器能识别运行
开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源

2. 码质量检查，树立代码规范
提前检查代码的一些隐患，让代码运行时能更加健壮。
提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观

# 处理样式资源
使用 Webpack 如何处理 Css、Less、Sass、Scss、Styl 样式资源

## 介绍
Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源

我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用

官方文档找不到的话，可以从社区 Github 中搜索查询

中文文档：
https://webpack.docschina.org/loaders/

## #处理 Css 资源
### 1. 下载包
```
npm i css-loader style-loader -D
```
> 注意：需要下载两个 loader

### 2. 功能介绍
- css-loader：负责将 `Css` 文件编译成 `Webpack` 能识别的模块
- style-loader：会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容
此时样式就会以 Style 标签的形式在页面上生效

### 3. 配置
```js
const path = require('path')
// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  // 入口 
  // 那个文件作为打包入口
  entry: './src/main.js', // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, 'dist'), // 需要用绝对路径
    // 文件的输出名称
    filename: 'mian.js',
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 正则 只检测 .css结尾 的文件
        use: [ // 执行顺序，从右到左(从下到上)
          "style-loader", // 将js中的css通过创建style标签的形式，显示到页面上，添加到 htnl 文件中生效
          "css-loader"], // 将css资源编译成commonjs的模块到 js 中
      },
    ],
  },
  // 插件
  plugins: [
    // 插件的配置
  ],
  // 模式
  // 开发模式
  mode: 'development',
}
```
### 4. 添加 Css 资源
src/css/index.css
```css
.box1 {
  width: 100px;
  height: 100px;
  background-color: pink;
}
```
src/main.js
```js
// 想要 webpack 打包资源，必须要引入资源
import './css/index.css';
```
public/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack5</title>
  </head>
  <body>
    <h1>Hello Webpack5</h1>
    <!-- 准备一个使用样式的 DOM 容器 -->
    <div class="box1"></div>
    <!-- 引入打包后的js文件，才能看到效果 -->
    <script src="../dist/main.js"></script>
  </body>
</html>
```
### 5. 运行指令
```
npx webpack
```
index.html 页面查看效果

## 处理 Less 资源
### 1. 下载包
```
npm i less-loader -D
```
### 2. 功能介绍
- less-loader：负责将 Less 文件编译成 Css 文件
### 3. 配置
```js
const path = require('path')
// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  // 入口 
  // 那个文件作为打包入口
  entry: './src/main.js', // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, 'dist'), // 需要用绝对路径
    // 文件的输出名称
    filename: 'mian.js',
  },
  // 加载器
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 只检测 .css结尾 的文件
        use: [ // 执行顺序，从右到左(从下到上)
          "style-loader", // 将js中的css通过创建style标签的形式，显示到页面上，添加到 htnl 文件中生效
          "css-loader"], // 将css资源编译成commonjs的模块到 js 中
      },
      {
        test: /\.less$/,
        // loader: 'xxx', // 而 loader 只能使用一个
        use: [ // use 可以使用多个 loader ；
          'style-loader',
          'css-loader',
          'less-loader', // 将less编译成css文件
        ],
      },
    ],
  },
  // 插件
  plugins: [
    // 插件的配置
  ],
  // 模式
  // 开发模式
  mode: 'development',
}
```
### 4. 添加 Less 资源
src/less/index.less
```less
.box2 {
  width: 100px;
  height: 100px;
  background-color: red;
}
```
src/main.js
```js
// 入口文件
import count from "./js/count";
import sum from "./js/sum";
// 想要 webpack 打包资源，必须要引入资源
import './css/index.css';
import './less/index.less';
```
public/index.html
```html
<body>
  <h1>hello webpack</h1>
  <div class="box1"></div>
  <div class="box2"></div>
  <script src="../dist/mian.js"></script>
</body>
```
### 5. 运行指令
```
npx webpack
```
index.html 页面查看效果

## 处理 Sass 和 Scss 资源
### 1. 下载包
```
npm i sass-loader sass -D
```
>注意：需要下载两个

### 2. 功能介绍
- `sass-loader`：负责将 `Sass` 文件编译成 `css`文件
- `sass`：`sass-loader` 依赖 `sass` 进行编译
### 3. 配置
```js
 {
   test: /\.s[ac]ss$/,
   use: [
   // 将 JS 字符串生成为 style 节点
   'style-loader',
   // 将 CSS 转化成 CommonJS 模块
   'css-loader',
   // 将 Sass 编译成 CSS
   'sass-loader',
        ],
 }
```
### 4. 添加 Sass 资源
src/sass/index.sass
```css
/* 可以省略大括号和分号 */
.box3
  width: 100px
  height: 100px
  background-color: #eee
```
src/sass/index.scss
```css
.box4{
  width: 100px;
  height: 100px;
  background-color: aqua;
}
```
src/main.js
```js
// 入口文件
import count from "./js/count";
import sum from "./js/sum";
// 想要 webpack 打包资源，必须要引入资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
```
public/index.html
```html
<body>
  <h1>hello webpack</h1>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
  <script src="../dist/mian.js"></script>
</body>
```
### 5. 运行指令
```
npx webpack
```

## 处理 Styl 资源
### 1. 下载包
```
npm i stylus-loader -D
```
### 2. 功能介绍
- `stylus-loader`：负责将 `Styl` 文件编译成 `Css`文件
### 3. 配置
```js
{
  test: /\.styl$/,
  use: [
      'style-loader',
      'css-loader',
       // 将 stylus 编译成 CSS
       'stylus-loader',
        ],
},
```
### 4. 添加 Styl 资源
src/styl/index.styl
```css
/* 可以省略大括号、分号、冒号 */
.box 
  width 100px 
  height 100px 
  background-color yellow
```
src/main.js
```js
// 入口文件
import count from "./js/count";
import sum from "./js/sum";
// 想要 webpack 打包资源，必须要引入资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
```
public/index.html
```html
<body>
  <h1>hello webpack</h1>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
  <div class="box5"></div>
  <script src="../dist/mian.js"></script>
</body>
```
5. 运行指令
```
npx webpack
```
# 处理图片资源
过去在 Webpack4 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

> 注意：现在 `Webpack5` 已经将两个 Loader 功能`内置到 Webpack` 里了，我们只需要简单`配置即可处理图片`资源

## 1. 配置
```js
 {
  // 配置
  test: /\.(png|jpe?g|gif|webp|svg)$/,
  type: 'asset',
 }
```
## 2. 添加图片资源
src/images/1.jpeg
src/images/2.png
src/images/3.gif
## 3. 使用图片资
src/less/index.less
```css
.box1 {
  width: 100px;
  height: 100px;
  background-image:url('../images/1.jpeg');
  background-size: cover;
}
```
src/sass/index.sass
```css
.box2 {
  width: 100px;
  height: 100px;
  background-image:url('../images/2.png');
  background-size: cover;
}
```
src/styl/index.styl
```css
.box5
  width 100px
  height  100px
  background-image url('../images/3.gif')
  background-size cover
```
## 4. 运行指令
```
npx webpack
```
## 对图片资源进行优化
> 将小于某个大小的图片转化成 data URI 形式（Base64 格式）
```js
 {
  // 配置
  test: /\.(png|jpe?g|gif|webp|svg)$/,
  type: 'asset', // 会转base64
  // 图片优化
  parser: {
    dataUrlCondition: {
    // 小于10kb的图片转为base64
    // 优点：减少请求数量;  缺点：体积会大一点
      maxSize: 10 * 1024 // 10kb
    }
  }
 }
```
> 此时输出的图片文件就只有两张，有一张图片以 data URI 形式内置到 js 中了 （注意：需要将上次打包生成的文件清空，再重新打包才有效果）


# 修改输出资源的名称和路径
## 1. 配置
入口文件打包路径
```js
  output: {
    path: path.resolve(__dirname, 'dist'), 
    // 入口文件打包输出文件名
    filename: 'static/js/mian.js',
  },
```
图片打包路径
```js
{
  test: /\.(png|jpe?g|gif|webp|svg)$/,
  type: 'asset', // 会转base64
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024 
    }
  },
  // 打包图片路径配置
  generator: {
    // 输出图片名称
    filename: 'static/images/[hash:8][ext][query]'
    // 将图片文件输出到 static/images 目录中
    // [hash:8]: hash值取8位； hash值：图片的id,唯一的
    // [ext]: 使用之前的文件扩展名
    // [query]: 添加之前的query参数 查询参数
  }
}
```
## 2. 修改 index.html
```html
<body>
  ...
  <!-- 修改 js 资源路径 -->
  <script src="../dist/static/js/mian.js"></script>
</body>
```
## 3. 运行指令
```
npx webpack
```
- 此时输出文件目录：
（注意：需要将上次打包生成的文件清空，再重新打包才有效果）
```
├── dist
    └── static
         ├── imgs
         │    └── 7003350e.png
         └── js
              └── main.js
```
## 自动清空上次打包资源
### 1. 配置
```js
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'static/js/mian.js',
    // 自动清空上次打包结果
    // 原理：在打包前，将path整个目录清空，再进行打包
    clean: true,
  },
```
### 2. 运行指令
```
npx webpack
```
# 处理字体图标资源
## 1. 下载字体图标文件
打开阿里巴巴矢量图标库:https://www.iconfont.cn/
选择想要的图标添加到购物车，统一下载到本地

## 2. 添加字体图标资源
- src/fonts/iconfont.ttf
- src/fonts/iconfont.woff
- src/fonts/iconfont.woff2
- src/css/iconfont.css
  - 注意字体文件路径需要修改
  ```css
  @font-face {
  font-family: "iconfont"; /* Project id 4045679 */
  <!-- 修改字体文件路径 -->
  src: url('../fonts/iconfont.woff2?t=1682840151963') format('woff2'),
       url('../fonts/iconfont.woff?t=1682840151963') format('woff'),
       url('../fonts/iconfont.ttf?t=1682840151963') format('truetype');
  }
  ```

src/main.js

```js
// 入口文件
import count from "./js/count";
import sum from "./js/sum";
// 想要 webpack 打包资源，必须要引入资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
// 引入字体文件
import './css/iconfont.css'
```
public/index.html
```html
<body>
  ...
  <!-- 使用字体图标 -->
  <span class="iconfont icon-aichegujiabeifen7"></span>
  <span class="iconfont icon-weixiu"></span>
  <span class="iconfont icon-weixiu"></span>

  <script src="../dist/static/js/mian.js"></script>
</body>
```
## 配置
```js
{
   test: /\.(ttf|woff2?)$/,
   type: 'asset/resource', // 文件原封不动的输出
   generator: {
     // 输出名称
     filename: 'static/media/[hash:8][ext][query]'
     // 将字体文件输出到 static/media 目录中
   }
}
```
注意：
`type: "asset/resource"`和`type: "asset"`的区别：
1. `type: "asset/resource"` 相当于`file-loader`, 将文件转化成 Webpack 能识别的资源，其他不做处理
2. `type: "asset"` 相当于`url-loader`, 将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式
## 4. 运行指令
```
npx webpack
```

# 处理其他资源
开发中可能还存在一些其他资源，如音视频等
## 1. 配置
处理其他资源
```js
{
  test: /\.(ttf|woff2?|map3|map4|avi|rmvb)$/, // 处理其他资源
  type: 'asset/resource', // 文件原封不动的输出
  generator: {
    // 输出名称
    filename: 'static/media/[hash:8][ext][query]'
    // 将字体文件输出到 static/media 目录中 media 媒体
  }
}
```
> 注意：就是在处理字体图标资源基础上增加其他文件类型，统一处理即可

# 处理 js 资源
Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。

其次开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测。

- 针对 js 兼容性处理，我们使用 Babel 来完成
- 针对代码格式，我们使用 Eslint 来完成
> 注意：先完成 Eslint，检测代码格式无误后，再由 Babel 做代码兼容性处理

## Eslint
可组装的 `JavaScript` 和 `JSX(React)` 检查工具。

这句话意思就是：它是用来检测 js 和 jsx 语法的工具，可以配置各项功能

我们使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查

## 1. 配置文件
配置文件由很多种写法：

- .eslintrc.*：新建文件，位于项目根目录
   `.eslintrc`
   `.eslintrc.js`
   `.eslintrc.json`
    区别在于配置格式不一样 `选择其一`
- `package.json` 中 `eslintConfig`：不需要创建文件，在原有文件基础上写
ESLint 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

## EslintWebpackPlugin 插件
首先，需要安装 `eslint-webpack-plugin`：
```
npm install eslint-webpack-plugin --save-dev
```
注意: 如果未安装 eslint >= 7 ，你还需先通过 npm 安装：
```
npm install eslint --save-dev
```
然后把插件添加到你的 webpack 配置。例如：
> 注意：
> 1. 插件需要引入
> 2. 每一个插件都是构造函数 需要 new 调用
```js
// 引入 ESLintPlugin 插件 
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  // 插件的配置
  // 每一个插件都是构造函数 需要 new 调用
  //  plugins: [new ESLintPlugin(options)],
  plugins: [
    // new ESLintPlugin 里面传配置选项
    new ESLintPlugin({
      // 检测那些文件
      context: path.resolve(__dirname, 'src')
    })
  ],
  // ...
};
```
**选项** options
你可以传入 `eslint` 参数
`context`
  - 类型：`String`
  - 默认值：`compiler.context`
指定文件根目录，类型为字符串。

`eslintPath`
  - 类型：`String`
  - 默认值：`eslint`
用于 linting 的 `eslint` 实例的路径。如果 `eslintPath` 是类似官方 eslint 的目录，或者指定了 `formatter` 选项，那么就不需要安装 `eslint` 了。
[...官方文档等等](https://webpack.docschina.org/plugins/eslint-webpack-plugin/)

## 2. 具体配置
以 `.eslintrc.js` 配置文件为例：具体实例往下
```js
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.nodejs.cn/docs/latest/
};
```
1. parserOptions 解析选项
```js
parserOptions: {
  ecmaVersion: 6, // ES 语法版本
  sourceType: "module", // ES 模块化
  ecmaFeatures: { // ES 其他特性
    jsx: true // 如果是 React 项目，就需要开启 jsx 语法
  }
}
```
2. rules 具体规则
- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)
```js
rules: {
  semi: "error", // 禁止使用分号
  'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', // 要求 switch 语句中有 default 分支，否则警告
    { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
  ],
  eqeqeq: [
    'warn', // 强制使用 === 和 !==，否则警告
    'smart' // https://eslint.org/docs/latest/rules/eqeqeq#smart 除了少数情况下不会有警告
  ],
}
```
更多规则详见:https://eslint.org/docs/latest/rules/

3.extends 继承
开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

现有以下较为有名的规则：

[Eslint 官方的规则](https://eslint.org/docs/latest/rules/)：`eslint:recommended` 
[Vue Cli 官方的规则](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential` 
[React Cli 官方的规则](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app` 
```js
// 例如在React项目中，我们可以这样写配置
module.exports = {
  extends: ["react-app"],
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};
```

## 3. 在 Webpack 中使用
1. 下载包
```
npm i eslint-webpack-plugin eslint -D
```
2. 定义 Eslint 配置文件
- .eslintrc.js
```js
// 配置检查 
module.exports = {
  // 继承 Eslint 规则 官方规则
  extends: ["eslint:recommended"],
  // 环境变量
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // 语法环境
  parserOptions: {
    ecmaVersion: 6, // es6
    sourceType: "module", // es module
  },
  // 规则
  rules: {
    // 2 ：错误级别的错误，当被触发的时候，程序会退出
    "no-var": 2, // 不能使用 var 定义变量
  },
}
```
3.修改 js 文件代码
- main.js
```js
// 入口文件
import count from "./js/count";
import sum from "./js/sum";
// 想要 webpack 打包资源，必须要引入资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';
// 引入字体文件
import './css/iconfont.css'
let result = count(2, 1)
console.log(result)
console.log(sum(1, 2, 3, 4));
```
4. 配置
- webpack.config.js
```js
const path = require('path')
// 引入 ESLintPlugin 插件
const ESLintPlugin = require('eslint-webpack-plugin'); // *

// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  entry: './src/main.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/mian.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/, 
        use: [ 
          "style-loader", 
          "css-loader"], 
      },
     ...
    ],
  },
  // 插件
  plugins: [
    // 插件的配置
    // 每一个插件都是构造函数 需要 new 调用
    new ESLintPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, 'src')  // *
    })
  ],
  // 模式
  // 开发模式
  mode: 'development',
}
```
5. 运行指令
```
npx webpack
```
6. `ESLint` vscode 插件
可以自动检测
需要`忽略`创建：.eslintignore  文件进行添加忽略
- .eslintignore
```ignore
# 忽略 eslint 要检测的文件
dist
```
# Babel
JavaScript 编译器。

主要用于`将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法`，以便能够运行在当前和旧版本的浏览器或其他环境中
## 1. 配置文件
配置文件由很多种写法：

- `babel.config.*`：新建文件，位于项目根目录
    1. `babel.config.js`
    2. `babel.config.json`
- `.babelrc.*`：新建文件，位于项目根目录
    1. `.babelrc`
    2. .`babelrc.js`
    3. `.babelrc.json`
- p`ackage.json` 中 `babel`：不需要创建文件，在原有文件基础上写
Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

## 2. 具体配置
以 `babel.config.js` 配置文件为例：
```js
module.exports = {
  // 预设   Babel 插件
  presets: [],
};
```
### presets 预设
简单理解：就是一组 `Babel 插件`, `扩展 Babel 功能`
- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设
## 3. 在 Webpack 中使用
1. 下载包
webpack 没有才需要
```
npm i babel-loader @babel/core @babel/preset-env -D
```
2. 定义 Babel 配置文件
- babel.config.js
```js
module.exports = {
  // 智能预设，能够编译 ES6 语法
  presets: ['@babel/preset-env']
}
```
3. 配置
- webpack.config.js
```js
rules: [
      // loader 的配置
     ...
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // exclude: 排除； 排除node_modules中的js文件（这些文件不处理）
        loader: 'babel-loader',
        // 可以在里面和外面写 babel.config.js 
        // options: {
        //   presets: ['@babel/preset-env']
        // }
      }
    ],
```
4. 运行指令
```
npx webpack
```
# 处理 Html 资源
## 1. 下载包
```
npm i html-webpack-plugin -D
```
## 2. 配置
- webpack.config.js
```js
// 引入 HtmlWebpackPlugin 插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
...
plugins: [
    // 调用  HtmlWebpackPlugin 插件打包html
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建新的html文件
      // 新的html文件特点：1.机构和原来一致 2.会自动引入打包输出的资源
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
```
## 3. 修改 index.html 
去掉引入的 js 文件，因为 `HtmlWebpackPlugin 会自动引入`
```html
<!-- 手动引入的js不需要了，通过插件自动引入 -->
<!-- <script src="../dist/static/js/mian.js"></script> -->
```
## 4. 运行指令
```
npx webpack
```
此时 dist 目录就会输出一个 index.html 文件

# 开发服务器&自动化
每次写完代码都需要手动输入指令才能编译代码，太麻烦了，我们希望一切自动化

## 1. 下载包
```
npm i webpack-dev-server -D
```
## 2. 配置
- webpack.config.js
```js
 // 插件
  plugins: [
    ...
  ],
  // 开发服务器：不会输出资源，在内存中编译打包的
  // 实现写完代码自动编译打包
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
```
## 3. 运行指令
```
npx webpack serve
```
> 注意:注意运行指令发生了变化
> 1.并且当你使用开发服务器时，所有代码都会`在内存中编译打包`，并`不会输出到 dist 目录下`。
> 2.`开发`时我们`只关心代码能运行`，`有效果即可`，至于代码被编译成什么样子，我们并不需要知道。

# 生产模式
`生产模式`是`开发完成代码后`，我们需要得到`代码将来部署上线`。

这个模式下我们主要对代码进行优化，让其运行性能更好。

优化主要从两个角度出发:
1. 优化代码运行性能
2. 优化代码打包速度
## 生产模式准备
分别准备两个配置文件来放不同的配置

### 1. 文件目录
```
├── webpack-test (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── .eslintrc.js(Eslint配置文件)
    ├── babel.config.js(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
```
### 2. 修改 webpack.dev.js 
因为文件目录变了，所以所有`绝对路径`需要`回退一层`目录才能找到对应的文件
```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
   # path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
   # // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
    #  context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
    #  template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
};
```
运行开发模式的指令：
```
npx webpack serve --config ./config/webpack.dev.js
```
### 3. 修改 webpack.prod.js
```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
  #  path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true,
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
    #  context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
    #  template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],


 # // devServer: {
 # //   host: "localhost", // 启动服务器域名
 # //   port: "3000", // 启动服务器端口号
 # //   open: true, // 是否自动打开浏览器
 # // },
 # mode: "production",
};
```
运行生产模式的指令：
```
npx webpack --config ./config/webpack.prod.js
```
### 4. 配置运行指令
方便运行不同模式的指令，我们将指令定义在 package.json 中 scripts 里面
```json
// package.json
{
  // 其他省略
  "scripts": {
    "start": "npm run dev",
    "dev": "npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  }
}
```
以后`启动指令`：
- 开发模式：`npm start` 或 `npm run dev`
- 生产模式：`npm run build`

# Css 处理
## 提取 Css 成单独文件
---
Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式

这样对于网站来说，会出现闪屏现象，用户体验不好

我们应该是单独的 Css 文件，通过 link 标签加载性能才好

### 1. 下载包
```
npm i mini-css-extract-plugin -D
```
###  2. 配置
- webpack.prod.js
```js
const path = require('path')
// 引入 ESLintPlugin 插件
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入 HtmlWebpackPlugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
# // 引入 MiniCssExtractPlugin 插件
# const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  // 入口 
  // 那个文件作为打包入口
  entry: './src/main.js', // 相对路径
  // 输出 打包后的文件输出到哪里
  output: {
    // 所有文件的输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, '../dist'), // 需要用绝对路径
    // 入口文件打包输出文件名
    filename: 'static/js/mian.js',
    // 自动清空上次打包结果
    // 原理：在打包前，将path整个目录清空，再进行打包
    clean: true,
  },
  // 加载器 loader 帮助webpack识别不能识别的模块
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 只检测 .css结尾 的文件
        use: [ // 执行顺序，从右到左(从下到上)
        # MiniCssExtractPlugin.loader, // 提取css成单独文件
          "css-loader"], // 将css资源编译成commonjs的模块到 js 中
      },
      {
        test: /\.less$/,
        // loader: 'xxx', // 而 loader 只能使用一个
        use: [ // use 可以使用多个 loader ；
         # MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader', // 将less编译成css文件
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
         # MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
        #  MiniCssExtractPlugin.loader,
          'css-loader',
          // 将 stylus 编译成 CSS
          'stylus-loader',
        ],
      },
      {
        // webpack 内置的功能
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset', // 会转base64
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转为base64
            // 优点：减少请求数量  缺点：体积会大一点
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          // 输出图片名称
          filename: 'static/images/[hash:8][ext][query]'
          // 将图片文件输出到 static/images 目录中
          // [hash:8]: hash值取8位； hash值：图片的id,唯一的
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数 查询参数
        }
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi|rmvb)$/, // 处理其他资源
        type: 'asset/resource', // 文件原封不动的输出
        generator: {
          // 输出名称
          filename: 'static/media/[hash:8][ext][query]'
          // 将字体文件输出到 static/media 目录中 media 媒体
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // exclude: 排除； 排除node_modules中的js文件（这些文件不处理）
        loader: 'babel-loader',
        // 可以在里面和外面写 babel.config.js 
        // options: {
        //   presets: ['@babel/preset-env']
        // }
      }
    ],
  },
  // 插件 拓展功能
  plugins: [
    // 插件的配置
    // 每一个插件都是构造函数 需要 new 调用
    new ESLintPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src')
    }),
    // 调用  HtmlWebpackPlugin 插件打包html
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建新的html文件
      // 新的html文件特点：1.机构和原来一致 2.会自动引入打包输出的资源
      template: path.resolve(__dirname, '../public/index.html')
    }),
  #  // 调用  MiniCssExtractPlugin 插件 把css打包成为单独的文件
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css',
    })
  ],
  // 指定模式
  // 生产模式
  mode: 'production',
}
```
### 3. 运行指令
```
npm run build
```
## Css 兼容性处理
### 1. 下载包
```
npm i postcss-loader postcss postcss-preset-env -D
```
### 2. 配置
- webpack.prod.js
```js
const path = require('path')
// 引入 ESLintPlugin 插件
const ESLintPlugin = require('eslint-webpack-plugin');
// 引入 HtmlWebpackPlugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 MiniCssExtractPlugin 插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  // 入口 
  // 那个文件作为打包入口
  entry: './src/main.js', // 相对路径
  // 输出 打包后的文件输出到哪里
  output: {
    // 所有文件的输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, '../dist'), // 需要用绝对路径
    // 入口文件打包输出文件名
    filename: 'static/js/mian.js',
    // 自动清空上次打包结果
    // 原理：在打包前，将path整个目录清空，再进行打包
    clean: true,
  },
  // 加载器 loader 帮助webpack识别不能识别的模块
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 只检测 .css结尾 的文件
        use: [ // 执行顺序，从右到左(从下到上)
          MiniCssExtractPlugin.loader, // 提取css成单独文件
          "css-loader", // 将css资源编译成commonjs的模块到 js 中
         #{
         #  loader: "postcss-loader",
         #  options: { // 对象形式可以用options给 postcss-loader 写配置；如果是默认配置，直接写名字就可以了
         #    postcssOptions: {
         #      plugins: [
         #        "postcss-preset-env", // 能解决大多数样式兼容性问题
         #      ],
         #    },
         #  },
         #},
        ],

      },
      {
        test: /\.less$/,
        // loader: 'xxx', // 而 loader 只能使用一个
        use: [ // use 可以使用多个 loader ；
          MiniCssExtractPlugin.loader,
          'css-loader',
         #{
         #  loader: "postcss-loader",
         #  options: {
         #    postcssOptions: {
         #      plugins: [
         #        "postcss-preset-env", // 能解决大多数样式兼容性问题
         #      ],
         #    },
         #  },
         #},
          'less-loader', // 将less编译成css文件
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
         #{
         #  loader: "postcss-loader",
         #  options: {
         #    postcssOptions: {
         #      plugins: [
         #        "postcss-preset-env", // 能解决大多数样式兼容性问题
         #      ],
         #    },
         #  },
         #},
          'sass-loader',// 将 Sass 编译成 CSS
        ],
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        # {
        #   loader: "postcss-loader",
        #   options: {
        #     postcssOptions: {
        #       plugins: [
        #         "postcss-preset-env", // 能解决大多数样式兼容性问题
        #       ],
        #     },
        #   },
        # },
          'stylus-loader', // 将 stylus 编译成 CSS
        ],
      },
      {
        // webpack 内置的功能
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset', // 会转base64
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转为base64
            // 优点：减少请求数量  缺点：体积会大一点
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          // 输出图片名称
          filename: 'static/images/[hash:8][ext][query]'
          // 将图片文件输出到 static/images 目录中
          // [hash:8]: hash值取8位； hash值：图片的id,唯一的
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数 查询参数
        }
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi|rmvb)$/, // 处理其他资源
        type: 'asset/resource', // 文件原封不动的输出
        generator: {
          // 输出名称
          filename: 'static/media/[hash:8][ext][query]'
          // 将字体文件输出到 static/media 目录中 media 媒体
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // exclude: 排除； 排除node_modules中的js文件（这些文件不处理）
        loader: 'babel-loader',
        // 可以在里面和外面写 babel.config.js 
        // options: {
        //   presets: ['@babel/preset-env']
        // }
      }
    ],
  },
  // 插件 拓展功能
  plugins: [
    // 插件的配置
    // 每一个插件都是构造函数 需要 new 调用
    new ESLintPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src')
    }),
    // 调用  HtmlWebpackPlugin 插件打包html
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建新的html文件
      // 新的html文件特点：1.机构和原来一致 2.会自动引入打包输出的资源
      template: path.resolve(__dirname, '../public/index.html')
    }),
    // 调用  MiniCssExtractPlugin 插件 把css打包成为单独的文件
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css',
    })
  ],
  // 指定模式
  // 生产模式
  mode: 'production',
}
```
### 3. 控制兼容性
我们可以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性做到什么程度
```json
{
  // 其他省略
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```
### 4.合并配置 封装
- webpack.prod.js
```js
...
// 用来获取处理样式的 loader
#function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader, // 提取css成单独文件
    "css-loader", // 将css资源编译成commonjs的模块到 js 中
    {
      loader: "postcss-loader",
      options: { // 对象形式可以用options给 postcss-loader 写配置；如果是默认配置，直接写名字就可以了
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
    // 等价于 .filter(item => Boolean(item))
  ].filter(Boolean)  // 过滤 pre 没传参的undefined过滤掉
#}

// 配置文件
// node.js 使用 CommonJS 模块化 
module.exports = {
  // 入口 
  // 那个文件作为打包入口
  entry: './src/main.js', // 相对路径
  // 输出 打包后的文件输出到哪里
  output: {
    // 所有文件的输出路径
    // __dirname node.js 的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, '../dist'), // 需要用绝对路径
    // 入口文件打包输出文件名
    filename: 'static/js/mian.js',
    // 自动清空上次打包结果
    // 原理：在打包前，将path整个目录清空，再进行打包
    clean: true,
  },
  // 加载器 loader 帮助webpack识别不能识别的模块
  module: {
    rules: [
      // loader 的配置
      {
        test: /\.css$/, // 只检测 .css结尾 的文件
     #   use: getStyleLoader(), // 执行顺序，从右到左(从下到上)
      },
      {
        test: /\.less$/,
        // loader: 'xxx', // 而 loader 只能使用一个
     #   use: getStyleLoader('less-loader'), // 将less编译成css文件
      },
      {
        test: /\.s[ac]ss$/,
     #   use: getStyleLoader('sass-loader'), // 将 Sass 编译成 CSS
      },
      {
        test: /\.styl$/,
     #   use: getStyleLoader('stylus-loader'), // 将 stylus 编译成 CSS
      },
    ],
  },
}
```
### 5. 运行指令
```
npm run build
```
## Css 压缩
### 1. 下载包
```
npm i css-minimizer-webpack-plugin -D
```
### 2. 配置
- webpack.prod.js
```js
  // 引入 CssMinimizerPlugin 插件
# const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

...
// 插件 拓展功能
  plugins: [
    // 插件的配置
    // 每一个插件都是构造函数 需要 new 调用
    new ESLintPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src')
    }),
    // 调用  HtmlWebpackPlugin 插件打包html
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建新的html文件
      // 新的html文件特点：1.机构和原来一致 2.会自动引入打包输出的资源
      template: path.resolve(__dirname, '../public/index.html')
    }),
    // 调用  MiniCssExtractPlugin 插件 把css打包成为单独的文件
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css',
    }),
   # // 直接调用 css压缩
   # new CssMinimizerPlugin(),
  ],
```
### 3. 运行指令
```
npm run build
```
# html 压缩
默认生产模式已经开启了：html 压缩和 js 压缩
不需要额外进行配置


# 总结
---
1. 两种开发模式
  - 开发模式：代码能编译自动化运行
  - 生产模式：代码编译优化输出
2. Webpack 基本功能
  - 开发模式：可以编译 ES Module 语法
  - 生产模式：可以编译 ES Module 语法，压缩 js 代码
3. Webpack 配置文件
  - 5 个核心概念
    1. entry
    2. output
    3. loader
    4. plugins
    5. mode
  - devServer 配置
4. Webpack 脚本指令用法
  - `webpack` 直接打包输出
  - `webpack serve` 启动开发服务器，内存编译打包没有输出