# 会话控制

------
## 介绍
所谓会话控制就是 `对会话进行控制`
HTTP 是一种无状态的协议，它没有办法区分多次的请求是否来自于同一个客户端， `无法区分用户`
而产品中又大量存在的这样的需求，所以我们需要通过 `会话控制` 来解决该问题
常见的会话控制技术有三种：
- cookie
- session
- token

## cookie
### cookie 是什么
cookie 是 HTTP 服务器发送到用户浏览器并保存在本地的一小块数据
`cookie 是保存在浏览器端的一小块数据`
`cookie 是按照域名划分保存的`

### cookie 的特点
浏览器向服务器发送请求时，会自动将 `当前域名下` 可用的 cookie 设置在请求头中，然后传递给服务
这个请求头的名字也叫 `cookie` ，所以将 `cookie 理解为一个 HTTP 的请求头也是可以的`

### cookie 的运行流程
1. 填写账号和密码校验身份，`服务器`校验通过后下发 cookie
2. 有了 cookie 之后，`客户端`后续向服务器发送请求时，就会自动携带 cookie

### 浏览器操作 cookie
浏览器操作 cookie 的操作，使用相对较少，大家了解即可
1. 禁用所有 cookie
2. 删除 cookie
3. 查看 cookie

### cookie 的代码操作
```js
// 导入 express
const express = require('express')
// 导入 cookie-parser
const cookieParser = require("cookie-parser")

// 创建应用对象
const app = express()
// 设置cookie-parser 为全局中间件
app.use(cookieParser())

// 创建路由规则
app.get('/set-cookie', (req, res) => {
  // 参数1 ：键名  参数2：键值
  // res.cookie('name', 'zhangsan') // 会在浏览器关闭的时候销毁
  res.cookie('name', 'lisi', { maxAge: 60 * 1000 })   // maxAge 设置cookie 的生命周期
  res.cookie('theme', 'blue')
  res.send('ok')
})

// 删除 cookie
app.get('/remove-cookie', (req, res) => {
  // 调用方法 参数：需要删除的cookie名
  res.clearCookie('name')
  res.send('删除成功')
})

// 获取 cookie
app.get('/get-cookie', (req, res) => {
  // 获取 cookie
  console.log(req.cookies)
  // res.send('获取 cookie')
  res.send('欢迎您 ' + req.cookies.name)
})

// 启动服务
app.listen(3000, () => {
  console.log('服务监听中...')
})
```
> 不同浏览器中的 cookie 是相互独立的，不共享

## session
### session 是什么
session 是保存在 `服务器端的一块儿数据` ，保存当前访问用户的相关信息
### session 的作用
实现会话控制，可以识别用户的身份，快速获取当前用户的相关信息

### session 运行流程（重要）
1. 填写账号和密码校验身份，`服务器`校验通过后创建 `session 信息` ，然后将 `session_id` 的值通过响应头返回给`浏览器`
2. 有了 cookie，下次`客户端`发送请求时会`自动携带 cookie`，服务器通过 `cookie `中的 `session_id` 的值确定用户的身份

### session 的代码操作
```js
// 导入 express
const express = require('express')

//1. 安装包 npm i express-session connect-mongo
//2. 引入 express-session connect-mongo
const session = require("express-session");
const MongoStore = require('connect-mongo');

// 创建应用对象
const app = express()

//3. 设置 session 的中间件
// session 返回一个函数
app.use(session({
  name: 'sid', //设置cookie的name，默认值是：connect.sid
  secret: 'atguigu', //参与加密的字符串（又称签名） 加严
  saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
  resave: true, //是否在每次请求时重新保存session
  store: MongoStore.create({
    // 数据存储到 bilibili 数据库里
    mongoUrl: 'mongodb://127.0.0.1:27017/bilibili' //数据库的连接配置
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作  前端 doucment.cookie 访问
    maxAge: 1000 * 60 * 5 // 这一条 是控制 sessionID 的过期时间的！！！  同时控制 cookie 和服务器的session的生命周期
  },
}))

// 创建路由规则
app.get('/', (req, res) => {
  res.send('ok')
})

// 登录
app.get('/login', (req, res) => {
  // username=admin&password=admin
  if (req.query.username === 'admin' && req.query.password === 'admin') {
    // 设置 session
    req.session.username = 'admin'
    // 成功响应
    res.send('登录成功...')
  } else {
    res.send('登录失败...')
  }
})

// session 的读取
app.get('/cart', (req, res) => {
  // 检测 session 是否存在用户数据
  // username 键与上面路由得匹配
  if (req.session.username) {
    res.send('首页页面,欢迎您~' + req.session.username)
  } else {
    res.send('您还没有登录...')
  }
})

// session 销毁
app.get('/logout', (req, res) => {
  // destroy 销毁 
  req.session.destroy(() => {
    res.send('退出成功...')
  })
})

// 启动服务
app.listen(3000, () => {
  console.log('服务监听中...')
})
```

## session 和 cookie 的区别
cookie 和 session 的区别主要有如下几点：
1. 存在的位置
  - cookie：浏览器端
  - session：服务端
2. 安全性
  - cookie 是以明文的方式存放在客户端的，安全性相对较低
  - session 存放于服务器中，所以安全性 相对 较好
3. 网络传输量
  - cookie 设置内容过多会增大报文体积， 会影响传输效率
  - session 数据存储在服务器，只是通过 cookie 传递 id，所以不影响传输效率
4. 存储限制
  - 浏览器限制单个 cookie 保存的数据不能超过 4K ，且单个域名下的存储数量也有限制
  - session 数据存储在服务器中，所以没有这些限制

 ## token(重要)
 ### token 是什么
 `token` 是`服务端`生成并返回给 HTTP 客户端的一串`加密字符串`， `token` 中保存着 `用户信息`
 ### token 的作用
 实现会话控制，可以识别用户的身份，主要用于移动端 APP
 ### token 的工作流程（重要）
 1. 填写账号和密码校验身份，`服务器`校验通过后响应 token，token 一般是在`响应体`中返回给`客户端`的
  2. 后续发送请求时，**`需要手动`**将 token 添加在请求报文中，一般是放在`请求头中`

###  token 的特点
  1. 服务端压力更小
    - 数据存储在客户端
  2. 相对更安全
    - 数据加密
    - 可以避免 CSRF（跨站请求伪造）
  3. 扩展性更强
    - 服务间可以共享
    - 增加服务节点更简单
### JWT
JWT（JSON Web Token ）是目前最流行的跨域认证解决方案，可用于基于 `token` 的身份验证
JWT 使 token 的生成与校验更规范
我们可以使用 `jsonwebtoken` 包 来操作 token
```js
// 导入 jwt
const jwt = require('jsonwebtoken')

// 生成 token
// 参数1：存储用户的数据 参数2：加密字符串 参数3：配置对象（可以设置 token 的生命周期）
const token = jwt.sign({
  username: 'li'
}, 'hi^_^', {
  expiresIn: 60, // 生命周期 单位秒
})
console.log(token);

let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpIiwiaWF0IjoxNjgyMzIwNTUzLCJleHAiOjE2ODIzMjA2MTN9.HPkof64g4o3N8PlFBkd2QQWmPMymYpwYsmzV0MEwlto'
// 校验 token
// verify 参数1： token  参数2：参与加密的字符串  参数3：callback
jwt.verify(t, 'hi^_^', (err, data) => {
  if (err) {
    console.log('校验失败');
    return
  }
  console.log(data)
})
```
> 扩展阅读：https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

