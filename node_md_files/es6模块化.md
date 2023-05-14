### 按需导出与按需导入的注意事项

① 每个模块中可以使用`多次`按需导出
② 按需`导入的成员名称`必须和`按需导出的名称`保持一致
③ 按需导入时，可以使用 `as 关键字`进行重命名
④ 按需导入可以和默认导入一起使用

```js
// 按需导出
export let m1 = 'aaa';
export let m2 = 'CCC';
export function say() {}

// 默认导出
export default {
  a: 20
};
```

```js
import info, { m1, m2 as m3, say } from './03.按需导出.js';

// 按需导入
console.log(m1); // aaa
console.log(m3); // CCC
console.log(say); // [Function: say]

// 默认导入
console.log(info); // { a: 20 }

// 总结：默认导入 可用和 按需导入 配合使用
```

### Promise

1. Promise 是一个构造函数

- 我们可以创建 Promise 的实例 const p = new Promise()
- new 出来的 Promise 实例对象，`代表一个异步操作`

2. Promise.prototype 上包含一个 .then() 方法

- 每一次 new Promise() 构造函数得到的实例对象，
- 都可以通过`原型链的方式`访问到 .then() 方法，例如 p.then()

3.  `.then()`方法用来`预先指定`成功和失败的回调函数

```js
p.then(
  value => {
    console.log(value + '成功');
  },
  reason => {
    console.log(reason + '失败原因');
  }
);
```

### .then() 方法的特性

如果上一个 .then() 方法中`返回了一个新的 Promise 实例对象`，则可以通过下一个 .then() 继续进行处理。通过 .then() 方法的`链式调用`，就解决了回调地狱的问题

### async await (ES8)

如果某个方法的`返回值是 Promise 实例对象`，那么就可以在`前面加上 await` 来进行修饰，`修饰完毕`后，这个返回值就`不再是 Promise 实例`，变成了一个真正的值；

### async/await 的使用注意事项

- 如果在 function 中使用了 await，则 function `必须`被 async 修饰
- 在 async 方法中，`第一个 await 之前的代码会同步执行`，await `之后的代码会异步执行`

### 同步任务和异步任务

为了防止某个`耗时任务`导致`程序假死`的问题，JavaScript 把待执行的任务分为了两类：
① `同步任务`（synchronous）

- 又叫做`非耗时任务`，指的是在主线程上排队执行的那些任务
- 只有前一个任务执行完毕，才能执行后一个任务

② 异步任务（asynchronous）

- 又叫做`耗时任务`，异步任务由 JavaScript `委托给`宿主环境进行执行
- 当异步任务执行完成后，会`通知 JavaScript 主线程执行`异步任务的`回调函数`

### 同步任务和异步任务的执行过程

1. JS 主线程会从自己的执行站里面，会按照顺序执行所有的任务，当发现 同步任务 JS 主线程 自己执行，如果是 异步任务 就委托给 `宿主环境` 去执行然后 JS 主线程 就可以去执行其他的非耗时任务

① 同步任务由 JavaScript 主线程次序执行
② 异步任务`委托给`宿主环境执行
③ 已完成的异步任务`对应的回调函数`，会被加入到任务队列中等待执行
④ JavaScript 主线程的`执行栈`被清空后，会读取任务队列中的回调函数，次序执行
⑤ `JavaScript 主线程不断重复上面的第 4 步`

### EventLoop 概念

`JavaScript 主线程从“任务队列”中读取异步任务的回调函数，放到执行栈中依次执行`。这个`过程是循环不断`的，所以整个的这种运行机制又称为 `EventLoop`（事件循环）。

## 使用 ES6 模块化 创建路由 提供 API 接口

① 搭建项目的基本结构
② 创建基本的服务器
③ 创建 `db` 数据库操作模块
④ 创建 `user_ctrl` 业务模块
⑤ 创建 `user_router` 路由模块

### 创建基本的服务器

- app.js

```js
import express from 'express';

const app = express();

app.listen(80, () => {
  console.log('server running at http://127.0.0.1');
});
```

### 创建 db 数据库操作模块

- db/index.js

```js
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'my_db_01', // 要操作的数据库名称
  user: 'root', // 登录数据库的用户名
  password: 'admin123' // 密码
});

// 默认导出的是 pool.promise 方法的返回值
export default pool.promise();
```

### 创建 user_ctrl 模块 try...catch 捕获错误

- controller/user_ctrl.js

```js
import db from '../db/index.js';

// 使用 ES6 的按需导出语法，将 getAllUser 方法导出
export async function getAllUser(req, res) {
  // 使用 try...catch 捕获 Promise 异步任务中产生的异常错误,并在 catch 块中进行处理
  try {
    // 解构 数组
    const [rows] = await db.query('select id, username, nickname from ev_users');
    res.send({
      status: 0,
      msg: '获取用户列表数据成功！',
      data: rows
    });
    // 处理异常错误
  } catch (err) {
    res.send({ status: 1, msg: '获取用户列表数据失败!', desc: err.message });
  }
}
```

### 创建 user_router 模块

- router/user_router.js

```js
// 路由模块
import express from 'express';
// 按需导入 getAllUser 方法来获取数据库数据
import { getAllUser } from '../controller/user_ctrl.js';

// 创建路实例对象
const router = new express.Router();

// 监听客户端 GET 请求
router.get('/user', getAllUser);

// 共享
export default router;
```

### 导入并挂载路由模块

- app.js

```js
import express from 'express';
// 1.导入路由模块
import userRouter from './router/user_router.js';

const app = express();

// 2. 路由模块的挂载
app.use('/api', userRouter);

app.listen(80, () => {
  console.log('server running at http://127.0.0.1');
});
```
