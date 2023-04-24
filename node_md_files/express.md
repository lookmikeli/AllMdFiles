# express 框架

## express 介绍
express 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架，官方网址：https://www.expressjs.com.cn/
简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用（HTTP 服务）

## express 使用

###  express 下载
express 本身是一个 npm 包，所以可以通过 `npm` 安装
```text
npm init
npm i express

```
###  express 初体验
```js
// 1.导入 express
const express = require('express')
// 2.创建应用对象
const app = express()
// 3.创建路由
app.get('/home', (req, res) => {
  res.end('hi')
  // res.send('hi')
})
// 4.监听端口，启动服务器
app.listen(5000, () => {
  console.log('服务已启动，5000端口正在监听...')
})
```

## express 路由

### 什么是路由
官方定义： `路由确定了应用程序如何响应客户端对特定端点的请求`
通俗解释：告诉你去哪，对于`前端`，主要是导向告诉浏览器应该去哪，对于`后端`，可以理解为一个子服务，一个路由就是一个小的服务(server/app)，处理一个接口
> 路由是根据不同的 url 地址展示不同的内容或页面
### 路由的使用
一个路由的组成有 `请求方法` ， `路径` 和 `回调函数` 组成

express 中提供了一系列方法, 可以很方便的使用路由，使用格式如下：
```
app.<method>(path，callback)
```
```js
// 导入 express
const express = require('express')
// 创建应用对象
const app = express()

// 创建路由
app.get('/home', (req, res) => {
  res.end('hi')
  // res.send('hi')
})

// 默认 / 
app.get('/', (req, res) => {
  res.end('default')
})

// post
app.post('/home', (req, res) => {
  res.end('my home')
})

// all 匹配所有的方法
app.all('/test', (req, res) => {
  res.end('all test')
})

// * 匹配所有  通配符 
// 404 响应
app.all('*', (Req, res) => {
  res.end('<h1>404 Not Found</h1>')
})

// 监听端口，启动服务器
app.listen(5000, () => {
  console.log('服务已启动，5000端口正在监听...')
})
```

### 获取请求参数
express 框架封装了一些 `API` 来方便获取`请求报文中的数据`，并且`兼容原生` HTTP 

```js
// 导入 express
const express = require('express')
// 创建应用对象
const app = express()

// 获取请求的路由规则
app.get('/request', (req, res) => {
  //1. 获取报文的方式与原生 HTTP 获取方式是兼容的
  // 原生操作
  console.log(req.method) // 方法
  console.log(req.url) // /request
  console.log(req.httpVersion) // http协议版本
  console.log(req.headers) // 请求头

  //2. express 独有的获取报文的方式
  // express操作
  console.log(req.path) // 路径
  console.log(req.query) // 查询字符串(重要)
  // 获取 ip
  console.log(req.ip)
  // 获取指定的请求头
  console.log(req.get('host'))

  res.send('请求报文的获取')
})

// 监听端口，启动服务器
app.listen(5000, () => {
  console.log('服务已启动，5000端口正在监听...')
})
```

### 获取路由参数
路由参数指的是 `URL 路径中的参数（数据）`
```js
// 导入 express
const express = require('express')
// 创建应用对象
const app = express()

// 创建路由
// : 占位符
app.get('/:id.html', (req, res) => {
  // 获取 URL 路由参数
  // params  请求对象 req 上面的一个属性，用于存储所有的路由参数
  // id 是路由参数的一个和路径的占位符一一对应
  console.log(req.params.id)

  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('详情')
})

// 监听端口，启动服务器
app.listen(5000, () => {
  console.log('服务已启动，5000端口正在监听...')
})
```

## express 响应设置
express 框架封装了一些 `API` 来方便给客户端`响应数据`，并且`兼容原生 `HTTP 模块的获取方式

```js
// 导入 express
const express = require('express')

// 创建应用对象
const app = express()

//获取请求的路由规则
app.get('/response', (req, res) => {
  //1. express 中设置响应的方式兼容 HTTP 模块的方式
  // 原生响应
  res.statusCode = 404
  res.statusMessage = '错误' // 响应状态消息
  res.setHeader('content-type', 'text/html;charset=utf-8') // 响应头
  res.write('response1')  // 设置响应体
  res.end('response2')   // 设置响应体

  //2. express 的响应方法
  // express 响应
  res.status(500) //设置响应状态码
  res.set('aa', 'cc')  // 设置响应头
  res.send('中文响应不乱码，内置 res.setHeader') // 设置响应体
  //连贯操作
  res.status(500).set('aa', 'cc').send('都是可以这样设置的')

  //3. 其他响应
  res.redirect('http://atguigu.com')// 重定向
  res.download('./package.json');// 下载响应
  res.json(); // 响应 JSON
  res.sendFile(__dirname + '/home.html') // 响应文件内容

  // 示例：
  // 跳转响应 重定向
  res.redirect('http://jd.com')
  // 下载响应 参数绝对路径
  res.download(__dirname + '/singers.json')
  // JSON 响应
  res.json({
    name: 'zhangsan',
    status: 200,
    msg: 'JSON 文件',
  })
  // 响应文件 参数绝对路径
  res.sendFile(__dirname + '/02.form.html') // path.resolve() 创建绝对路径
})

// 监听端口，启动服务器
app.listen(5000, () => {
  console.log('服务已启动，5000端口正在监听...')
})
```

## express 中间件
### 什么是中间件
`中间件（Middleware）本质是一个回调函数`
`中间件函数` 可以像路由回调一样访问 `请求对象（request）` ， `响应对象（response）`

### 中间件的作用
`中间件的作用` 就是 `使用函数封装公共操作，简化代码`

### 中间件的类型
- 全局中间件
- 路由中间件

#### 定义全局中间件
`每一个请求` 到达服务端之后 `都会执行全局中间件函数`

声明中间件函数
```js
let recordMiddleware = function(request,response,next){
//实现功能代码
//.....
//执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
next();
}
```
应用中间件 `app.use() 全局中间件`
```js
app.use(recordMiddleware);

```
声明时可以直接将匿名函数传递给 `use`
```js
app.use(function (request, response, next) {
console.log('定义第一个中间件');
next();
})
```
#### 多个全局中间件
express 允许使用 app.use() 定义多个全局中间件
```js
app.use(function (request, response, next) {
console.log('定义第一个中间件');
next();
})
app.use(function (request, response, next) {
console.log('定义第二个中间件');
next();
})
```
#### 定义路由中间件
如果 `只需要对某一些路由进行功能封装` ，则就需要路由中间件
```js
app.get('/路径',`中间件函数`,(request,response)=>{
});
app.get('/路径',`中间件函数1`,`中间件函数2`,(request,response)=>{
});
```
**示例：**
```js
/* 
针对 /admin /setting 的请求，要求 URL 携带 code=521 参数，如未携带提示（暗号错误）
*/
/* 
记录每个请求的 url 和  IP 地址
*/

// 导入 express
const express = require('express')
// 创建应用对象
const app = express()

// 前台路由
app.get('/home', (req, res) => {
  res.send('前台')
})

// 声明中间件
let checkCodeMiddleware = (req, res, next) => {
  // 判断 URL 中是否 code 参数等于 521
  if (req.query.code === '521') {
    next() // 满足条件 执行后面的路由 callback
  } else {
    res.send('暗号错误')
  }
}

// 后台路由
app.get('/admin', checkCodeMiddleware, (req, res) => {
  res.send('后台')

})

// 后台设置
app.get('/setting', checkCodeMiddleware, (req, res) => {
  res.send('设置页面')
})

// 创建路由
app.all('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>')
})

// 监听端口，启动服务器
app.listen(5000, () => {
  console.log('服务已启动，5000端口正在监听...')
})
```
### 静态资源中间件
express 内置处理静态资源的中间件
```js
// 引入express框架
const express = require('express');
// 创建服务对象
const app = express();
// 静态资源中间件的设置，将当前文件夹下的public目录作为网站的根目录
// express.static(参数：静态资源文件夹的路径，) 返回值： 一个中间件函数
app.use(express.static(__dirname + './public')); //当然这个目录中都是一些静态资源

// 如果访问的内容经常变化，还是需要设置路由
// 但是，在这里有一个问题，如果public目录下有index.html文件，单独也有index.html的路由，
// 则谁书写在前，优先执行谁
app.get('/index.html',(request,response)=>{
respsonse.send('首页');
});
// 监听端口
app.listen(3000,()=>{
console.log('3000 端口启动....');
});
```
> 注意事项:
> 1. index.html 文件为`默认打开的资源`
> 2. 如果静态资源与路由规则同时匹配，`谁先匹配谁就响应`(`谁写在前`)
> 3. 路由响应动态资源，静态资源中间件响应静态资源

### 获取请求体数据 
### 获取请求体数据 body-parser 方式一(第三方包)
express 可以使用 `body-parser` 包处理请求体

第一步：安装
```
npm i body-parser
```
第二步：导入 body-parser 包
```js
const bodyParser = require('body-parser');
```
第三步：获取中间件函数
```js
//处理 querystring 格式的请求体
let urlencodedParser = bodyParser.urlencoded({extended:false});
//处理 JSON 格式的请求体
let jsonParser = bodyParser.json();
```
第四步：设置路由中间件，然后使用 `request.body` 来获取请求体数据
```js
app.post('/login', urlencodedParser, (request,response)=>{
// urlencodedParser 中间件函数执行完毕 后会向 request这个请求对象 上挂载一个body 属性
//获取请求体数据
//console.log(request.body);
//用户名
console.log(request.body.username);
//密码
console.log(request.body.userpass);
response.send('获取请求体数据');
});
```
获取到的请求体数据：
```js
[Object: null prototype] { username: 'admin', userpass: '123456' }
```

#### 获取请求体数据 方式二(内置：其实也三方借用)
```js
// 方式二
// 导入 express 模块
const express = require('express')

// 固定写法
app.use(express.urlencoded({ extended: false }))

// 创建路由规则
app.post('/login', (req, res) => {
  // urlencodedParser 中间件函数执行完毕 后会向 req这个请求对象 上挂载一个body 属性

  // 获取用户名 和 密码
  let { username, password } = req.body
  console.log(req.body)
  console.log(username)
  console.log(password)
  res.send(req.body)
  res.send('获取用户的数据')
})
```
## Router (小型的 app 应用对象)
### 什么是 Router
express 中的 Router 是一个`完整的中间件和路由系统`，可以看做是一个`小型的 app 对象`。

### Router 作用
对路由进行`模块化`，更好的管理路由

### Router 使用
创建独立的 JS 文件（homeRouter.js）
```js
//1. 导入 express
const express = require('express');
//2. 创建路由器对象
// 相当于小型的 app 对象 可以通过 router 去创建路由规则
const router = express.Router();
//3. 在 router 对象身上添加路由
router.get('/', (req, res) => {
res.send('首页');
})
router.get('/cart', (req, res) => {
res.send('购物车');
});
//4. 暴露 router
module.exports = router;
```
主文件
```js
const express = require('express');
const app = express();
//5.引入子路由文件
const homeRouter = require('./routes/homeRouter');
//6.设置和使用中间件
app.use(homeRouter);
app.listen(3000,()=>{
console.log('3000 端口启动....');
})
```
## EJS 模板引擎
### 什么是模板引擎
模板引擎是分离 `用户界面和业务数据` 的一种技术

### 文档查询
> 官网: https://ejs.co/
> 中文站：https://ejs.bootcss.com/

### EJS 使用
下载安装EJS
```
npm i ejs --save
```
代码示例
```js
//1.引入ejs
const ejs = require('ejs');
//2.定义数据
let person = ['张三','李四','王二麻子'];
//3.ejs解析模板返回结构
//<%= %> 是ejs解析内容的标记，作用是输出当前表达式的执行结构
let html = ejs.render(‘<%= person.join(",") %>’, {person:person});
//4.输出结果
console.log(html);
```
### EJS 常用语法
执行JS代码
```
<% code %> 
```
输出转义的数据到模板上
```
<%= code %>
```
输出非转义的数据到模板上
```
<%- code %>
```