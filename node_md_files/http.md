# HTTP 协议
## 概念
HTTP（hypertext transport protocol）协议；中文叫超文本传输协议
是一种基于TCP/IP的应用层通信协议
这个协议详细规定了 浏览器 和万维网 服务器 之间互相通信的规则。
协议中主要规定了两个方面的内容
- 客户端：用来向服务器发送数据，可以被称之为请求报文
- 服务端：向客户端返回数据，可以被称之为响应报文

## 创建 http 服务
### 创建 http 服务
#### 导入 http 模块
```js
// 1.导入 http 模块
const http = require('http')
```

#### 创建服务对象
>   callback
>   形参1： request 接收`请求报文`的**封装对象**
>   形参2： response 接收`响应报文`的**封装对象**
```js
// 2.创建服务对象
// http 对象 createServer http对象的方法
// 返回： 一个对象
const server = http.createServer((request, response) => {
  // callback 函数什么时候执行：当服务接收到 http 请求的时候就会执行
  // 形参1： request 接收请求报文的封装对象
  // 形参2： response 接收响应报文的封装对象

  // 设置响应头: 客户端用什么格式去解析响应体
  response.setHeader('content-type', 'text/html;charset=utf-8')

  // 设置响应体
  response.end('hi,雷好啊!')
})
```

#### 监听端口，响应服务
```js
// 3.监听端口，响应服务
// listen server 的方法
// 参数1: 端口号  http 默认: 80 访问可不写; https 默认:443
// 参数2: callback
server.listen(5000, () => {

  // callback 当服务启动成功后执行
  console.log('服务已经启动！')

})
```
### 注意事项
1. 命令行 ctrl + c 停止服务
2. 当服务启动后，更新代码 必须重启服务才能生效
3. 响应内容中文乱码的解决办法
```js
  // 设置响应头: 客户端用什么格式去解析响应体
 response.setHeader('content-type', 'text/html;charset=utf-8')
```
4. 端口号被占用
```js
Error: listen EADDRINUSE: address already in use :::9000
```
1）关闭当前正在运行监听端口的服务 （ 使用较多 ）
2）修改其他端口号

## 提取 http 的报文
```js
// 1.导入 http 模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  // 获取请求方法
  console.log(request.method) // GET
  
  // 获取请求的 url
  console.log(request.url) // 只包含 url 中的路径与查询字符串

  // 获取 http 协议的版本号
  console.log(request.httpVersion) // 1.1

  // 获取 http 的请求头
  console.log(request.headers) // 对象

  // 设置响应体
  response.end('hi')
})
// 3.监听端口，响应服务
server.listen(5000, () => {
  console.log('服务已经启动！')

})
```

## 提取 http 报文的请求体
```js
// 1.导入 http 模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  // 1. 声明一个变量 接受响应体的结果
  let body = ''
  // 2. 绑定 data 事件
  // chunk 本身是一个 buffer ''
  request.on('data', chunk => {
    body += chunk
  })

  // 3. 绑定 end 事件
  request.on('end', () => {
    // 数据取完触发的事件
    console.log(body)
    // 响应 
    response.end('hi')

  })

  // 设置响应体
  response.end('hi')
})

// 3.监听端口，响应服务
server.listen(5000, () => {
  console.log('服务已经启动！')

})

```
## 提取 http 报文中的URL路径和查询字符串**(重要)**
> parse url对象里面的方法 解析
> 参数1: 需要解析的 url 字符串 `(urlString)`
> 参数2: 解析查询字符串`(布尔值)` true; `query属性` 会被设置为一个`对象`   (parseQueryString)
```js
// 导入 http 模块
const http = require('http')

const url = require('url')
// 创建服务对象
const server = http.createServer((request, response) => {
  // 2. 解析 request.url
  console.log(request.url)
  // parse url对象里面的方法 解析
  // 参数1: 需要解析的 url 字符串 (urlString)
  // 参数2: 解析查询字符串(布尔值) true; query属性 会被设置为一个对象 (parseQueryString)
  const res = url.parse(request.url, true)
  console.log(res)

  // 路径
  console.log(res.pathname)
  // 查询字符串
  // 这里的 keyword 是查询字符串的键 取决于查询字符串请求的key
  console.log(res.query.keyword)
    response.end('url')
})
// 监听端口，响应服务
server.listen(5000, () => {
  console.log('服务已经启动！')
})

```
## 提取 http 报文中的URL路径和查询字符串**(重要)** 新方式
```js
// 导入 http 模块
const http = require('http')

// 创建服务对象
const server = http.createServer((request, response) => {
  // 实例化 URL 的对象
  // URL 参数1: 可以是一个 url 字符串
  // let url = new URL('http://www.xxx.com/search?a=100&b=200') // 第一种方式
  let url = new URL(request.url, 'http://www.xxx.com') // 第二种方式

 let url = new URL('http://127.0.0.1:5000/search?username=100')
  console.log(url)
  //  打印这个 url 对象 下面是它的属性 和方法
  URL {
  href: 'http://127.0.0.1:5000/search?username=100',
  origin: 'http://127.0.0.1:5000',
  protocol: 'http:',
  username: '',
  password: '',
  host: '127.0.0.1:5000',
  hostname: '127.0.0.1',
  port: '5000',
  pathname: '/search',
  search: '?username=100',
  searchParams: URLSearchParams { 'username' => '100' },
  hash: ''
}
 
  // 输出路径
  console.log(url.pathname)
  // 输出 keyword 查询字符串
  console.log(url.searchParams.get('key'))

  // console.log(url)
  response.end('url NEW')
})

server.listen(5000, () => {
  console.log('服务已经启动！')

})
```
### http 请求练习
```js
// 1导入 http 模块
const http = require('http')

// 2. 创建服务对象
const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  // 获取请求的方法
  // 解构赋值
  let { method } = req
  // 获取请求的 url 路径
  // 解构赋值
  let { pathname } = new URL(req.url, 'http://127.0.0.1')
  if (method === 'GET' && pathname === '/login') return res.end('登录页面') // 登录的情况
  if (method === 'GET' && pathname === '/reg') return res.end('注册页面') // 注册的情况
  else res.end(
    '访问失败'
  )
  // res.end('practice') 一次只能出现一次响应体
})
// 3.监听端口，启动服务
server.listen(5000, () => {
  console.log('服务启动')

})
```
## 设置响应
```js
// 导入 http 模块
const http = require('http')

// 创建服务对象
const server = http.createServer((req, res) => {
  // 1.设置相应状态码 
  res.statusCode = 200 // 默认 200
  // res.statusCode = 404 // 默认 200
  // 2.设置响应状态描述
  res.statusMessage = 'hi' // 不用设置 自动匹配 响应状态码
  // 3.设置响应头
  // 参数1：响应头的名字
  // 参数2：响应的值
  // res.setHeader('content-type', 'text/html;charset=utf-8')
  // server  标识服务端的名字 名字可以自定义
  res.setHeader('server', 'node.js')

  // 4.响应体的设置
  // 4.1. write 设置了响应体 end 里面可以不写
  // 4.2. res.write 可以多次调用
  // 4.3. 执行 callback 必须有一个 end 方法且不能多个
  res.write('say hi')
  res.write('say hi')
  res.write('say hi')
  res.write('say hi')

  res.end('res') // 设置响应体

})
// 监听端口，启动服务
server.listen(5000, () => {
  console.log('服务启动')

})
```
### http 响应练习优化
```js
// 导入 http 模块
const http = require('http')
const fs = require('fs')

// 创建服务对象
const server = http.createServer((req, res) => {
  // 读取文件的内容
  let html = fs.readFileSync(__dirname + '/10.table.html')

  // end 方法的参数 可以是字符串 也可以是 buffer
  // console.log(html.toString())
  res.end(html)

})
// 监听端口，启动服务
server.listen(5000, () => {
  console.log('服务启动')
})
```
## 静态资源服务(重要)
> 静态资源是指 **内容长时间不发生改变的资源** ，例如图片，视频，CSS 文件，JS文件，HTML文件，字体文
件等
动态资源是指 内容经常更新的资源 ，例如百度首页，网易首页，京东搜索列表页面等

### 网站根目录或静态资源目录(重要)
> HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 静态资源目录 ，也称之为 网站根目录

### 网页中的 URL
网页中的 URL 主要分为两大类：相对路径与绝对路径

#### 绝对路径

| 形式                 | 特点                                                         |
| -------------------- | ------------------------------------------------------------ |
| http://baidu.com/web | eb直接向目标资源发送请求，容易理解。网站的外链会用到此形式   |
| //baidu.com/web      | 与页面 URL 的协议拼接形成完整 URL 再发送请求。大型网站用的比较多 |
| /web                 | 与页面 URL 的协议、主机名、端口拼接形成完整 URL 再发送请求。中小型网站 |

#### 相对路径

相对路径在发送请求时，需要与`当前页面` URL `路径进行 计算` ，得到完整 URL 后，再发送请求，学习阶
段用的较多

例如当前网页url为： http://www.baidu.com/search/start.html

> 注意：./ 和 不写都是`当前目录下`;  ../ 是上级目录

| 形式               | 最终的 URL                              |
| ------------------ | --------------------------------------- |
| ./css/app.css      | http://www.baidu.com/search/css/app.css |
| js/app.js          | http://www.baidu.com/search/js/app.js   |
| ../img/logo.png    | http://www.baidu.com/img/logo.png       |
| ../../mp4/show.mp4 | http://www.baidu.com/mp4/show.mp4       |

### 设置资源类型（mime类型）
媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、
文件或字节流的性质和格式。
> mime 类型结构： [type]/[subType]
> 例如： text/html text/css image/jpeg image/png application/json

HTTP 服务可以设置响应头 Content-Type 来表明响应体的 MIME 类型，浏览器会根据该类型决定如何处理
资源

下面是常见文件对应的` mime 对象` 类型:
```js
html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg',
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
```
> 对于未知的资源类型，可以选择` application/octet-stream`类型，浏览器在遇到该类型的响应
时，会对响应体内容进行独立存储，也就是我们常见的 `下载` 效果

#### 练习
```js
/*
创建一个 HTTP 服务，端口为 5000,满足以下要求 
* GET  /index.html     响应 /page/index.html 的文件内容
* GET  /css/app.css    响应 /page/css/app.css 的文件内容
* GET  /images/logo.png    响应 /page/images/logo.png 的文件内容
 */

// 导入 http 模块
const http = require('http')
const fs = require('fs')
const path = require('path')

// 声明一个 mimes 对象
const mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

	// 创建服务对象
const server = http.createServer((req, res) => {
  // res.setHeader('content-type', 'text/html;charset=utf-8')

  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end('<h1>405 Method Not Allowed</h1>')
    return
  }

  // 获取请求 URL 的路径
  let { pathname } = new URL(req.url, 'http://127.0.0.1')
  // 拼接文件路径
  let filePath = __dirname + '/page' + pathname

  // 异步读取 fs api
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 设置字符集
      res.setHeader('contnet-type', 'text/html;charset=utf-8')

      // 判断错误的代码
      switch (err.code) {
        case 'ENOENT':
          res.statusCode = 404
          res.end('<h1>404 Not Found</h1>')
          return
        case 'EPERM':
          res.statusCode = 403
          res.end('<h1>403 ForBidden</h1>')
          return
        default:
          res.statusCode = 500
          res.end('<h1>Internal Server Error</h1>')
      }
      return
    }

    // 获取文件后缀名
    let ext = path.extname(filePath).slice(1)
    // 获取对应的类型
    const type = mimes[ext]
    if (type) {
      // 匹配到了                      text/html;charset=utf-8
      if (ext === 'html') {
        res.setHeader('content-type', type + ';charset=utf-8')
      } else {
        res.setHeader('content-type', type)
      }
    } else {
      // 没有匹配到
      res.setHeader('content-type', 'application/octet-stream')
    }
    // 响应文件内容
    res.end(data)
  })

  // if (pathname === '/index.html') {
  //   // 读取文件的内容
  //   let html = fs.readFileSync(__dirname + '/page/index.html')
  //   res.end(html)  // 设置响应体
  // } else if (pathname === '/css/app.css') res.end(fs.readFileSync(__dirname + '/page/css/app.css'))
  // else if (pathname === '/image/logo.jpg') res.end(fs.readFileSync(__dirname + '/page/image/logo.jpg'))
  // else {
  //   res.statusCode = 404
  //   res.end('<h1>404 Not Found<h1>')
  // }

  // end 方法的参数 可以是字符串 也可以是 buffer
  // console.log(html.toString())

})
// 监听端口，启动服务
server.listen(5000, () => {
  console.log('服务启动')

})
```