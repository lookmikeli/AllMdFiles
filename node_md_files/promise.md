# Promise 
作用：解决回调地狱

## 介绍
1. 抽象表达：
- Promise 是一门新的技术(ES6规范)
- Promise 是 JS 中进行异步编程的`新解决方案`
> 备注：就方案是单纯使用回调函数
2. 具体表达：
- 从语法上来说：Promise 是一个构造函数
- 从功能上来说：Promise 对象用来封装一个异步操作并可以`获取其成功/失败的结果值`

### 异步编程示例
`callback`
* fs 文件操作
```js
require('fs').readFile('./index.html', (err, data) =>{})
```
* 数据库操作
* AJAX
* 定时器
```js
setTimeout(() =>{}, 2000)
```
### 指定回调函数的方式更加灵活
1. 旧的：必须在启动异步任务前指定
2. promise：启动异步任务 => 返回promise对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定/多个)


### 支持链式调用，可以解决回调地狱的问题
1. 回调地狱
  - 回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件
2. 回调地狱的缺点
  - 不便于阅读
  - 不便于异常处理
3. 解决方案
  - promise 链式调用

### 总结(重要)
1. promise 是 ES6引入的`异步编程`，新的解决方案；从语法上来说它是一个`构造函数`，可以`实例化对象`，`封装异步操作`，`获取成功和失败`的结果；其优点是`支持链式调用`，可以`解决回调地狱`的问题；
2. 指定回调函数的方式更加灵活

## 使用
案例
```js
// 生成随机函数
function random(start, end) {
  return Math.ceil(Math.random() * (end - start + 1) + start - 1)
}

// 获取元素
const btn = document.querySelector('button')

// 绑定单击事件
btn.addEventListener('click', function () {
  //  定时器
  // setTimeout(function () {
  //   // 30 %
  //   // 获取 1 - 100 的一个随机数
  //   let n = random(1, 100)
  //   if (n <= 30) {
  //     alert('恭喜中奖')
  //   } else {
  //     alert('欢迎下次光临')
  //   }
  // }, 1000)

  // promise 形式实现
  // 1.实例化需要接收一个参数，参数是一个函数类型的值
  // 2.两个形参 resolve(状态已成功) 都是函数类型的数据
  // 3.reject(状态已失败) 都是函数类型的数据
  // 4. 异步任务成功 调用 resolve ；否则失败调用 reject
  const p = new Promise((resolve, reject) => {
    //  定时器
    setTimeout(function () {
      // 30 %
      // 获取 1 - 100 的一个随机数
      let n = random(1, 100)
      if (n <= 30) {
        resolve(n) // 将 promise 对象(p)的状态设置为 已成功；还可以获取异步任务成功的值
      } else {
        reject(n) // 将 promise 对象(p)的状态设置为 已失败 ; 还可以获取异步任务失败的值
      }
    }, 1000)
  })

  // 调用 对象的 then 方法
  // 1.then 接收两个参数，都是函数类型的值
  // 2.第一个参数是对象成功的回调； 第二个参数是对象失败的回调
  p.then((value) => {
    // value 接收成功的结果
    alert('恭喜中奖，您中奖的号码为:' + value);
  }, (reason) => {
    // reason 接收失败的结果或者原因
    alert('再接再厉，您的号码为:' + reason);
  })
})
```
读取文件
```js
const { log } = require('console')
const fs = require('fs')

// 回调函数的形式
// fs.readFile('./test1.js', (err, data) => {
//   // 如果错误 抛出错误
//   if (err) throw err
//   // 输出文件内容
//   console.log(data.toString())
// })

// Promise 形式
// 1.创建 promise 对象
let p = new Promise((resolve, reject) => {
  fs.readFile('./test1.js', (err, data) => {
    // 如果错误 
    if (err) reject(err.message)
    // 如果成功
    resolve(data)
  })
})

// 调用对象的 then 方法
p.then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})
```
发送 ajax 请求
```js
const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
  // 创建 Promise
  const p = new Promise((resolve, reject) => {
    // 1.创建对象
    const xhr = new XMLHttpRequest()
    // 2.初始化
    xhr.open('get', 'http://127.0.0.1/api')
    // 3.发送
    xhr.send()
    // 4.处理响应的事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // 判断状态码
        if (xhr.status >= 200 && xhr.status < 300) {
          // 输出响应体
          resolve(xhr.response)
        } else {
          // 输出失败响应状态码
          reject(xhr.status)
        }
      }
    }
  })

  // 调用对象的 then 方法
  p.then(value => {
    console.log(value);
  }, reason => {
    console.error(reason)
  })
})
```
函数封装
```js
/**
 * 封装一个函数 mineReadFile 读取文件
 * @param {*} path 文件路径
 * @return {*} promise 对象
 */
function mineReadFile(path) {
  // 返回结果是 promise 对象
  return new Promise((resolve, reject) => {
    // 读取文件
    require('fs').readFile(path, (err, data) => {
      // 判断
      if (err) reject(err)
      // 成功
      resolve(data)
    })
  })
}
mineReadFile('./api.js').then(value => {
  // 输出成功文件内容
  console.log(value.toString())
}, reason => {
  // 输出失败原因或者失败结果
  console.error(reason.message)
})
```
node 内置 util模块的 promisify 方法
```js
/**
 * util.promisify 方法
 */
// 引入 util 模块
const util = require('util')
// 引入 fs 模块
const fs = require('fs')
// 返回一个新的函数 调用返回的结果是 promise 对象
let mineReadFile = util.promisify(fs.readFile)
mineReadFile('./test1.js').then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})
```
封装 发送 ajax请求函数
```js
/**
 * 发送 GET AJAX 请求
 * @param {*} url  
 * @param {*} method 请求方法
 * @returns {*} Promise 对象
 */
function sendAJAX(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()
    // 处理结果
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response)
        } else {
          reject(this.status)
        }
      }
    }
  })
}

sendAJAX('get', 'http://127.0.0.1/api').then(value => {
  console.log(value);
}, reason => {
  console.warn(reason)
})
```

## Promise 的状态改变
状态：
实例对象中的一个`内置属性`：`PromiseState`
- pending  未决定的
- resolved / fullfilled  成功
- rejected  失败

状态改变: 2种
1. pending =>  resolved
2. pending =>  rejected
> 说明：
> 只有两种，且一个 promise 对象`只能改变一次`；无论变为成功还是失败，都会有一个结果数据；
> 成功的结果数据一般称为` value`, 失败的结果数据一般称为 `reason`

### Promise 对象的值
实例对象中的另一个`内置属性`：`PromiseResult`
保存着异步任务 成功 / 失败的结果

修改值：
- resolve
- reject

## API
### 1. Promise 构造函数：Promise(excutor){}
  1) excutor 函数： 执行器 (resolve, reject)=> {}
  2) resolve 函数： 内部定义成功时我们调用的函数 value => {}
  3) reject 函数：  内部定义失败时我们调用的函数 reason => {}
  > 说明：executor 会在 Promise `内部立即同步调用,立即执行`，异步操作在执行器中执行

```js
  let p = new Promise((resolve, reject) => {
  // 同步调用,立即执行，不会被加入任务队列中
  console.log(111);
})
console.log(222)
// 打印结果是 111 =>  222
```
**重要**
```js
// 里面的代码立即执行，是同步调用
(resolve, reject) => {
  console.log(111);
}
```

### 2. Promise.prototype.then 方法：(onResolved, onRejected)=> {}
  1) onResolved 函数：成功的回调函数 (value)=> {}
  2) onRejected 函数：失败的回调函数 (reason)=> {}
  > 说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调； 返回一个`新的 promise 对象`

### 3. Promise.prototype.catch 方法：(onRejected)=> {}
  1) onRejected 函数：`失败的回调函数` (reason)=> {}
 > 注意： catch 只能指定失败的回调
 > 说明：then()的语法糖，相当于：then(undefined, onRejected)

**以下是静态成员 …………**
### 4. Promise.resolve 方法：(value)=> {}
  1) value: 成功的数据或 promise 对象
  > 说明：返回一个成功/失败的 promise 对象
```js
let p = Promise.resolve(111)
console.log(p); // {<fulfilled>: 111}
// 如果传入的参数为 非 Promise类型的对象，则返回的结果为成功promise对象
// 如果传入的参数为 Promise 对象，则参数的结果决定了 resolve 的结果
let p2 = Promise.resolve(new Promise((resolve, reject) => {
  // resolve('成功')
  reject('失败')
}))
console.log(p2) // {<fulfilled>: '成功'}   {<rejected>: '失败'}

// 处理报错
p2.catch(reason => {
  console.log(reason)  // 失败
})
```

### 5. Promise.reject 方法：(reason)=> {}
  1) reason: 失败的原因
  > 说明：返回一个失败的 promise 对象

```js
let p = Promise.reject(111)
console.log(p) // {<rejected>: 111}
// 不管传入什么类型的数值，它的返回结果都是失败的 promise 对象
// 传的什么，它失败的结果就是什么
let p2 = Promise.reject(new Promise((resolve, reject) => {
  resolve('成功')
})) // {<fulfilled>: '成功'}

console.log(p2) // {<rejected>: Promise}
```

### 6. Promise.all 方法：(promises)=> {}
  1) promises: 包含 n 个 promise 的数组
  > 说明：返回一个新的 promise, 只有所有的 promise 都成功才成功，只要有一个失败了就直接失败
```js
let p1 = new Promise((resolve, reject) => {
  resolve('ok')
})
let p2 = Promise.resolve('成功')
// let p3 = Promise.resolve(111)
let p3 = Promise.reject('err')
const result = Promise.all([p1, p2, p3])
// 只有都成功，all方法返回的结果才是一个成功的 promise 对象，而且成功的结果值，是三个 promise 对象成功的结果，组成的数组
// 如果有一个失败了，all方法返回的结果就是一个失败的 promise 对象，而且失败的结果值，就是失败的这个 promise 对象的失败的值

// 都成功
console.log(result)/* 
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Array(3) */

// 有失败
console.log(result)/* 
[[Prototype]]:Promise
[[PromiseState]]:"rejected"
[[PromiseResult]]:"err"
 */
```
### 7. Promise.race 方法：(promises)=> {}
  1) promises: 包含 n 个 promise 的数组
  > 说明：返回一个新的 promise, `第一个完成`的 promise 的结果状态就是最终的结果状态 

## promise 的几个关键问题
1. 如何改变 promise 的状态
  1) resolve(value): 如果当前是 pending 就会变为 resolved
  2) reject(reason): 如果当前是 pending 就会变为 rejected
  3) 抛出异常：如果当前是 pending 就会变为 rejected
```js
let p = new Promise((resolve, reject) => {
  //  抛出错误
  throw new Error('错误')
})
console.log(p); // {<rejected>: Error: 出错}
```
2. 一个 promise 指定多个成功/失败回调函数，都会调用吗？
当 promise 改变为对应状态时都会调用，状态没有改变且是 pending 都不会执行


3. 改变 promise 状态和指定回调函数谁先谁后?
  1) 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再执行回调函数
  正常情况下，改变状态在`异步任务`里面；
  2) 如何先改变状态再指定回调？
     ① 在`执行器中直接调用` resolve()/reject()
     ② 延迟更长时间才调用 then()
  3) 什么时候才能得到数据？(重要)
     ① 如果`先`指定的`回调`，那当`状态`发生`改变`时，回调`函数就会调用`，得到数据
     ② 如果`先`改变的`状态`，那当`指定回调`时，回调`函数就会调用`，得到数据 
4. promise.then() 返回的新 promise 的结果状态由什么决定？(重要)
  1) 简单表达：由 `then()` 指定的`回调函数执行`的结果决定
  2) 详细表达：
      ① 如果`抛出异常`，新 promise 变为 `rejected`，reason 为`抛出的异常`
      ② 如果返回的是`非 promise` 的任意值，新 promise 变为 `resolved`, value 为返回的值
      ③ 如果返回的是另一个`新 promise`, 此 `promise 的结果`就会成为新 promise 的结果

5. promise 如何串连多个操作任务？
  1) promise 的 then()返回一个新的 promise, 可以形成 `then()的链式调用`
  2) 通过 then 的`链式调用`串连多个同步/异步任务
```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('OK')
  }, 1000)
})

// then 方法 返回的结果，也是一个 promise 对象
p.then(value => {
  return new Promise((resolve, reject) => {
    resolve('成功')
  })
}).then(value => {
  console.log(value) // 成功
  // 非 promise 的任意值，新 promise 变为 resolved ; 返回结果  undefined
}).then(value => {
  console.log(value) // undefined
})
```

6. promise 异常穿透？
  1) 当使用 promise 的 `then 链式调用`时，可以在`最后指定失败的回调`
  2) 前面任何操作出了异常，都会传到最后失败的回调中处理

7. 中断 promise 链？
  1) 当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数
  2) 办法：在回调函数中`返回一个 pending 状态`的 promise 对象
```js
let p = new Promise((resolve, reject) => {
  resolve('OK')
})
p.then(value => {
  console.log(111)
  return new Promise(() => { }) // 返回一个 pending 状态, 后面的 then 方法就不会执行
}).then(value => {
  console.log(222)
}).then(value => {
  console.log(333)
}).catch(reason => {
  console.error(reason)
})
```

## async 与 await
### async 函数
1. 函数的`返回值`为 `promise 对象`
2. `promise` 对象的`结果`由 `async` 函数执行的`返回值决定`
```js
// async 函数 和  then 方法返回规则一样
async function fn() {
  // return '不是 promise 对象'
  // 情况1：只要(返回的结果不是一个) promise 类型的对象，则这个结果就是成功的 promise 对象

  // throw Error('出错')
  // 情况2：(抛出错误)，返回的结果是一个失败的 promise

  // 情况3: 返回的结果是一个 Promise 对象
  return new Promise((resolve, reject) => {
    // 成功：则函数返回的结果是成功的 promise；值也是成功的值
    resolve('成功')
    // 失败：返回的结果也是失败的 promise ，值也是失败的值
    // reject('失败')
  })
}

const result = fn() // 对象的状态：由函数内部的 return来决定
result.then(value => {
  console.log(value);
}, reason => {
  console.warn(reason)
})
```
### await 表达式
1. await 右侧的表达式`一般`为 `promise` 对象，但也可以是其他的值
2. 如果右侧表达式是 `promise` 对象，`await` 返回的是 `promise 成功的值`
3. 如果表达式是`其它值`，直接将此作为` await 的返回值`

> 注意：
> 1. `await` 必须写在 `async` 函数中，但` async 函数`中`可以没有 await`
> 2. 如果 await 的 promise `状态失败`了，就会抛出异常，需要通过 try...catch 捕获处理

读取文件
```js
// 读取文件
const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)

async function read() {
  try {
    // 读取第一个文件的内容
    let data1 = await mineReadFile('./test1.js')
    let data2 = await mineReadFile('./test2.js')
    let data3 = await mineReadFile('./test3.js')
    console.log(data1 + data2 + data3)
  } catch (error) {
    console.log(error.message)
  }
}
read()
```
发送 AJAX 请求
```js
// 发送 AJAX 请求  返回的结果是一个 promise 对象
function sendAjax(url) {
  return new Promise((resolve, reject) => {
    // 1.创建对象
    const xhr = new XMLHttpRequest()
    // 2.初始化
    xhr.open('get', url)
    // 3.发送
    xhr.send()
    // 4.事件绑定
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // 成功
          resolve(xhr.response)
        } else {
          // 如果失败
          reject(xhr.status)
        }
      }
    }
  })
}

// promise then 方法测试 
// const result = sendAjax('http://127.0.0.1/api').then(value => {
//   console.log(value)
// }, reason => { })

// async 与 await 测试
async function ajax() {
  // 发送 Ajax请求
  const result = await sendAjax('http://127.0.0.1/api')
  const result2 = await sendAjax('http://127.0.0.1/api/next')
  console.log(result)
  console.log(result2)
}
ajax()
```
