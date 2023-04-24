# files system

> fs` 模块可以实现与硬盘的交互`
例如：文件的创建、删除、重命名、移动，还有文件内容的写入、读写，以及文件夹的相关操作

## 文件写入

### 异步写入文件

```js
// 导入fs模块
// require 全局函数用于导入模块 规定
// 'fs' 模块名称 规定
const fs = require('fs')

```
```js
// 异步写入文件
// 语法: fs.writeFile(file, data[, options], callback)
// file 文件名
// data 待写入的数据
// options 选项设置(可选)
// callback 写入回调函数
// 返回值: undefined

// 多线程: 线程1 解析js代码 ; 线程2(io线程) 写入文件
fs.writeFile('./test.txt', '测试文件', err => {
    // err 写入失败: 错误对象 写入成功: null
    if (err) return console.log('写入失败');
    console.log('写入成功');
})
```
### 同步写入
```js
// 不追求性能
fs.writeFileSync('./test1.txt', 'test')
```
### 文件写入的追加方法
```js
// 引入 fs模块
const fs = require('fs')
// 调用 appendFile 参数和写入一致
fs.appendFile('./test.txt', '==>追加文件', err => {
    // 写入错误 err 就是一个错误对象 Error
    if (err) return console.log('追加写入失败');
    // 写入成功 返回 null 为true
    console.log('追加写入成功');
})
```
### 同步追加写入
```js
fs.appendFileSync('./test.txt', '\r\n==>追加同步写入文件')
```
### writeFile 实现追加写入
```js
fs.writeFile('./test.txt', '==> writeFile实现追加写入', { flag: 'a' }, err => {
    if (err) return console.log('写入失败');
    console.log('写入成功');
})
```
### createWriteStream 流式写入
```js
// 参数1：path 路径参数 参数2：options 配置选项(可选)   返回值：obj
// 和 writeFile 的区别
// 程序打开一个文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数；
// 流式写入方式适用于 大文件写入或者频繁写入的场景，writeFile 适合频率较低的场景

// 3.1导入 fs
const fs = require('fs')

// 3.2创建写入流对象
const ws = fs.createWriteStream('./test3.txt')

// 3.3 write
ws.write('流式写入第一句\r\n')
ws.write('流式写入第二句\r\n')
ws.write('流式写入第n...句\r\n')

// 3.4 关闭通道(可选) 执行完毕自动关闭
ws.close()

// 4.写入文件的场景 当需要持久化保存数据的时候，需要想到 文件写入
// 下载文件 安装软件 保存程序日志，如git  编辑器保存文件 视频录制
```

## 文件读取
```js
// 引入 fs 模块
const fs = require('fs')
```
### 异步读取
```js
// 语法： fs.readFile(path[, options], callback)
// path：文件路径 options(可选): 选择配置 callback： 回调函数  返回值：undefined
fs.readFile('./test.txt', (err, dataStr) => {
    if (err) return console.log('读取失败');
    console.log(dataStr); // <Buffer e6 b5 8b e8 af 95 e6 96 87 e4 bb b6 3d 3d ... more bytes>
    console.log(dataStr.toString()); //==>追加同步写入文件==> ...
})
```
### 同步读取
```js
const data = fs.readFileSync('./test.txt')
console.log(data.toString()); // ==>追加同步写入文件==> ...
```
### 流式读取 
> 片级读取 `大文件提高效率`
```js
// 4.1 创建读取流对象
const rs = fs.createReadStream('./test.txt')
// 4.2 绑定 data 事件 chunk 块儿
// 每当读取到一块==> 就执行一次回调函数并且把读取到的内容传递给 形参 chunk
rs.on('data', chunk => {
    console.log(chunk.length); // 不够就显示 118 字节 => kb
    console.log(chunk.toString()); // 测试文件==>追加文件
})
// 4.3 end 可选事件
rs.on('end', () => {
    console.log('读取完毕');
})
```
## 文件复制
```js
// 导入 fs 模块
const fs = require('fs')
```
###  方式一

```js
// 复制文件夹的内容
// 读取文件内容
let data = fs.readFileSync('test/test.txt')
// // 写入文件
// 参数一：要写入到的文件路径 参数二：读取的数据
fs.writeFileSync('test/test4.txt', data)
```
### 方式二  `流式操作`

```js
// 创建读取流对象
const rs = fs.createReadStream('test/test.txt')
// 创建写入流对象
const ws = fs.createWriteStream('test/test5.txt')
// 绑定 data 事件
// 每当读取到 一块 ==> 就执行一次回调函数并且把读取到的内容传递给 形参 chunk
rs.on('data', chunk => {
  ws.write(chunk)
})
```
###  简易写法  pipe  `管道`

```js
// rs读取到文件通过管道传递给ws
rs.pipe(ws)
```
## 文件移动与重命名 
> 本质都是更改文件的路径
### 重命名
```js
// 调用 rename 方法  重命名
// 参数1：要修改的文件路径 参数2：文件新路径 参数3：回调函数
fs.rename('./test1.txt', './重命名test.txt', err => {
  if (err) return console.log('操作失败！')
  console.log('操作成功！')
})
```
### 文件移动
```js
// 文件的移动
fs.rename('./重命名test.txt', 'test/重命名test.txt', err => {
  if (err) return console.log('操作失败！')
  console.log('操作成功！')
})

```
### 同步文件移动与重命名
```js
// 同步文件移动与重命名
fs.renameSync(oldPath, newPath)
```
## 删除文件
### 方法1：
```js
// 1.导入 fs 模块
// 2.调用 unlink 方法  unlink 取消链接  同步方法 ：unlinkSync
// 参数1：文件的路径 参数2：callback
fs.unlink('./test/test4.txt', err => {
  if (err) return console.log('删除失败！')
  console.log('删除成功！')
})
```
### 方法2：
```js
// 方法2： rm 方法 14.4  同步方法 ：rmSync
fs.rm('./test/test5.txt', err => {
  if (err) return console.log('删除失败！')
  console.log('删除成功！')
})
```
## 文件夹操作
### 创建文件夹
#### 创建文件夹
```js
// 1.导入 fs 模块
const fs = require('fs')
// 2.创建文件夹 mk方法 make 制作 + dir  directory 文件夹
// 参数1：文件夹路径 参数2：选择配置 options(可选) 参数3：callback
fs.mkdir('./html', err => {
  if (err) return console.log('创建失败！')
  console.log('创建成功！')
})
```
#### 递归创建
```js
// 2.2 递归创建 需要添加 options 这个参数 recursive:递归
fs.mkdir('./html/js/css', { recursive: true }, err => {
  if (err) return console.log('创建失败！')
  console.log('创建成功！')
})
```
### 读取文件夹
```js
// 2.3 读取文件夹  dir 文件夹
fs.readdir('./test', (err, data) => {
  if (err) return console.log('读取失败！')
  console.log(data)  // data 返回数组 文件夹名称列表 list
})
```
### 删除文件夹
#### 删除文件夹
```js
// 2.4 删除文件夹 rm remove 删除 删除文件夹必须为空
fs.rmdir('./html', err => {
  if (err) return console.log('删除失败！' + err.message)
  console.log('删除成功!')
})
```
#### 递归删除
> 不推荐使用,`未来会被移除`
```js
// 递归删除 需要添加配置对象 options 未来这种方式会被移除 不推荐使用
fs.rmdir('./html', { recursive: true }, err => {
  if (err) return console.log('删除失败！' + err.message)
  console.log('删除成功!')
})
```
#### rm 删除文件夹
> `推荐使用`: rm 删除文件夹
```js
// 推荐使用: rm 删除文件夹
fs.rm('./html', { recursive: true }, err => {
  if (err) return console.log('删除失败！' + err.message)
  console.log('删除成功!')
})
```
## 查看资源状态
```js
// 1. 导入 fs 模块
const fs = require('fs')

// 2.使用 stat 方法 status 缩写
fs.stat('./test/test.txt', (err, data) => {
  if (err) return console.log('操作失败!' + err.message)
  // console.log(data) // 返回一个 Stats 对象

  // 查看文件类型 
  // isFile  查看这个目标资源是不是一个文件
  console.log(data.isFile()) // true
  // isDirectory 检查目标资源是不是一个文件夹
  console.log(data.isDirectory()) // false

})
```

## 路径
### 相对路径
```js
const fs = require('fs')
// 相对路径
fs.writeFileSync('./index.html', 'hi') // 当前目录下创建写入
fs.writeFileSync('index.html', 'hi') // 当前目录下创建写入
fs.writeFileSync('../index.html', 'hi') // 当前目录的上一级创建写入
```
### 相对路径  `bug`
> 相对路径 bug   `__dirname` 解决这个问题  __dirname :所在文件的所在目录的`'绝对路径'`
相对路径`参照物`:`命令行的工作目录`
```js
// 相对路径 bug  __dirname 解决这个问题  __dirname :所在文件的所在目录的'绝对路径'
// 相对路径参照物:命令行的工作目录
fs.writeFileSync(__dirname, './index.html', 'hi') // 命令行工作的目录下创建写入
fs.writeFileSync(__dirname + '/index.html', 'hi') // 当前目录下创建写入
```
### 绝对路径
```js
// 绝对路径
fs.writeFileSync('D:/index.html', 'hi') // D盘 根目录目录下创建写入
fs.writeFileSync('/index.html', 'hi') // D盘 根目录目录下创建写入
```