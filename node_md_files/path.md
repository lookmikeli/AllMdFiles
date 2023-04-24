## path 模块

**path 模块提供了 操作路径 的功能，我们将介绍如下几个较为常用的几个 API：**

| API           | 说明                      |
| :------------ | :------------------------ |
| path.resolve  | 拼接规范的绝对路径 `常用` |
| path.sep      | 获取操作系统的路径分隔符  |
| path.parse    | 解析路径并返回对象        |
| path.basename | 获取路径的基础名称        |
| path.dirname  | 获取路径的目录名          |
| path.extname  | 获得路径的扩展名          |

### 例如：
#### 写入文件
```js
// 导入模块
const fs = require('fs')
const path = require('path')
// 写入文件
fs.writeFileSync(__dirname + './index.html', 'hi')
console.log(__dirname + './index.html')

```

### resolve
> 解决拼接问题
__dirname :所在文件的所在目录的`'绝对路径'`

```js
// resolve 解决   以文件的绝对路径进行拼接
console.log(path.resolve(__dirname, 'index.html')) // 绝对路径
console.log(path.resolve(__dirname, '/index.html')) // D:\index.html
```
### sep 
```js
// sep 分隔符
console.log(path.sep) // \

```
### parse 
```js
// parse 方法   解析  __dirname : '全局变量'
console.log(__filename) // 文件的绝对路径
const str = 'D:\\我的学习\\Node.js\\newDay\\path_code\\path.js'
console.log(path.parse(str))
/* {
root: 'D:\\',
  dir: 'D:\\我的学习\\Node.js\\newDay\\path_code',
    base: 'path.js',
      ext: '.js',
        name: 'path'
} */

```
### basename
```js
// basename 获取文件名
console.log(path.basename(str)) // path.js
```
### dirname
```js
// dirname 文件的路径
console.log(path.dirname(str)) // D:\我的学习\Node.js\newDay\path_code
```
### extname
```js
// extname 文件拓展名
console.log(path.extname(str)) // .js
```