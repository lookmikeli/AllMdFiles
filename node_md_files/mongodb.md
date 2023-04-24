# Mongodb 数据库

## 简介

### Mongodb 是什么

MongoDB 是一个基于分布式文件存储的数据库，官方地址 https://www.mongodb.com/

### 数据库是什么

数据库（DataBase）是按照数据结构来组织、存储和管理数据的 `应用程序`

### 数据库的作用

数据库的主要作用就是 管理数据 ，对数据进行 `增（c）、删（d）、改（u）、查（r）`

### 数据库管理数据的特点

相比于纯文件管理数据，数据库管理数据有如下特点：

1. 速度更快
2. 扩展性更强
3. 安全性更强

## 核心概念

Mongodb 中有三个重要概念需要掌握

- 数据库（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合
- 集合（collection） 集合类似于 JS 中的数组，在集合中可以存放很多文档
- 文档（document） 文档是数据库中的最小单位，类似于 JS 中的对象

**理解：**

- 一个` JSON 文件` 好比是一个 数据库 ，一个 `Mongodb` 服务下可以有 N 个数据库
- JSON 文件中的 `一级属性的数组值` 好比是 集合
- 数组中的对象好比是 `文档`
- 对象中的属性有时也称之为 `字段`

## 下载安装与启动

下载地址： https://www.mongodb.com/try/download/community
建议选择 `zip` 类型， 通用性更强
配置步骤如下:

1. 将压缩包移动到 `C:\Program Files` 下，然后解压
2. 创建 `C:\data\db` 目录，mongodb 会将数据默认保存在这个文件夹
3. 以 mongodb 中 bin 目录作为工作目录，启动命令行
4. 运行命令 `mongod`
5. 看到最后的 `waiting for connections` 则表明服务 `已经启动成功`
6. 然后可以使用 `mongo` 命令连接本机的 mongodb 服务
   > 注意：
   >
   > - 为了方便后续方便使用 mongod 命令，可以将 bin 目录配置到环境变量 Path 中
   > - 千万不要选中服务端窗口的内容 ，选中会停止服务，可以 敲回车 取消选中

## 命令行交互

### 数据库命令

1. 显示所有的数据库

```text
show dbs
```

2. 切换到指定的数据库，如果数据库不存在会自动创建数据库

```text
use 数据库名
```

3. 显示当前所在的数据库

```text
db
```

4. 删除当前数据库

```text
use 库名
db.dropDatabase()
```

### 集合命令

1. 创建集合

```text
db.createCollection('集合名称')
```

2. 显示当前数据库中的所有集合

```text
show collections
```

3. 删除某个集合

```text
db.集合名.drop()
```

4. 重命名集合

```text
db.集合名.renameCollection('newName')
```

### 文档命令

1. 插入文档

```text
db.集合名.insert(文档对象);
```

2. 查询文档

```text
db.集合名.find(查询条件)
```

`_id 是 mongodb 自动生成的唯一编号，用来唯一标识文档` 3. 更新文档

```text
db.集合名.update(查询条件,新的文档)
db.集合名.update({name:'张三'},{$set:{age:19}})

```

4. 删除文档

```text
db.集合名.remove(查询条件)
```

### 应用场景

#### 新增

- 用户注册
- 发布视频
- 发布商品
- 发朋友圈
- 发评论
- 发微博
- 发弹幕

### 删除

- 删除评论
- 删除商品
- 删除文章
- 删除视频
- 删除微博
  ......

## Mongoose

### 介绍

Mongoose 是一个对象文档模型库，官网 http://www.mongoosejs.net/

### 作用

方便使用代码操作 mongodb 数据库

### 使用流程

#### 连接数据库

```js
// 1.安装 mongoose
// 2.导入 mongoose
const mongoose = require("mongoose");

// 连接数据库终端 提示设置
// mongoose.set('strictQuery', true)

// 3.连接 mongodb 服务
// connect  mongoose 的方法用于连接服务
// 参数： 服务的 url            bilibili 数据库名称; 如果数据库不存在，会自动创建
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4. 设置回调 设置连接之后的成功回调
// 设置连接成功的回调
// on 有点绑定事件的意思 on 和 once的区别 连接断开 on 会尝试继续连接而 once 不会
// once 一次    事件回调函数只执行一次
mongoose.connection.once("open", () => {
  console.log("连接成功");
});

// 设置连接错误的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});

// 设置连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});

// 关闭 mongodb 的连接
// setTimeout(() => {
//   mongoose.disconnect()
// }, 2000)
```

#### 创建新文档

```js
// 4. 设置回调
// 设置连接之后的成功回调
mongoose.connection.once("open", () => {
  // 5.创建文档的结构对象 作用：约束里面文档的属性和属性的类型
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
  });

  // 6.创建模型对象 对文档操作的封装对象 增删改查
  // model ： mongoose 的方法 ； 参数1：集合名称  参数2：结构对象
  let BookModel = mongoose.model("books", BookSchema);

  // 7.新增 模型对象的方法 create()
  // 参数1：数据对象  参数2：callback (错误对象，插入成功后的文档对象)
  BookModel.create(
    {
      name: "西游记",
      author: "吴承恩",
      price: 99,
    },
    (err, data) => {
      // 判断是否有错误
      if (err) console.log(err);
      // 如果没有出错，则输出插入后的文档对象
      console.log(data);
      // 8.关闭数据库连接 项目运行过程中， 不会添加此代码
      mongoose.disconnect();
    }
  );
});

// 设置连接错误的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});

// 设置连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
```

#### 字段类型

| 类型       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| String     | 字符串                                                       |
| Number     | 数字                                                         |
| Boolean    | 布尔值                                                       |
| Array      | 数组，也可以使用 `[] `来标识                                 |
| Date       | 日期                                                         |
| Buffer     | Buffer 对象                                                  |
| Mixed      | 任意类型，需要使用 `mongoose.Schema.Types.Mixed  `指定       |
| ObjectId   | 对象 ID，需要使用 ` mongoose.Schema.Types.ObjectId` 指定     |
| Decimal128 | 高精度数字，需要使用 `mongoose.Schema.Types.Decimal128` 指定 |

```js
// 4. 设置回调
// 设置连接之后的成功回调
mongoose.connection.once("open", () => {
  // 5.创建文档的结构对象 作用：约束里面文档的属性和属性的类型
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time: Date,
    test: mongoose.Schema.Types.Mixed, // 任意类型
    id: mongoose.Schema.Types.ObjectId, // 必须是文档 id 唯一性
  });

  // 6.创建模型对象 对文档操作的封装对象 增删改查
  // model ： mongoose 的方法 ； 参数1：集合名称  参数2：结构对象
  let BookModel = mongoose.model("books", BookSchema);

  // 7.新增 模型对象的方法 create()
  // 参数1：数据对象  参数2：callback (错误对象，插入成功后的文档对象)
  BookModel.create(
    {
      name: "西游记",
      author: "吴承恩",
      price: 99,
      is_hot: true,
      tags: ["理智", "上头"],
      pub_time: new Date(),
      test: false,
    },
    (err, data) => {
      // 判断是否有错误
      if (err) console.log(err);
      // 如果没有出错，则输出插入后的文档对象
      console.log(data);
      // 8.关闭数据库连接 项目运行过程中， 不会添加此代码
      mongoose.disconnect();
    }
  );
});
```

#### 字段验证

```js
// 4. 设置回调
// 设置连接之后的成功回调
mongoose.connection.once("open", () => {
  // 5.创建文档的结构对象 作用：约束里面文档的属性和属性的类型
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // 设置 required 必填项 表示必须不为空
      unique: true, // 设置为独一无二的  唯一值
    },
    author: {
      type: String,
      default: "匿名", // 设置 default 默认值
    },
    // 类型
    style: {
      type: String,
      enum: ["城市", "穿越", "颜色"], // 枚举：设置的值必须是数组中的；要求你的属性值，必须在给定的值当中
    },
    price: Number,
  });

  // 6.创建模型对象 对文档操作的封装对象 增删改查
  // model ： mongoose 的方法 ； 参数1：集合名称  参数2：结构对象
  let BookModel = mongoose.model("books", BookSchema);

  // 7.新增 模型对象的方法 create()
  // 参数1：数据对象  参数2：callback (错误对象，插入成功后的文档对象)
  BookModel.create(
    {
      name: "西游记",
      // author: '吴承恩',
      price: 99,
      style: "颜色",
    },
    (err, data) => {
      // 判断是否有错误
      if (err) console.log(err); // console.log('插入失败')
      // 如果没有出错，则输出插入后的文档对象
      console.log(data);
      // 8.关闭数据库连接 项目运行过程中， 不会添加此代码
      mongoose.disconnect();
    }
  );
});
```

> unique 需要 重建集合 才能有效果
> 永远不要相信用户的输入

#### CURD

数据库的基本操作包括四个，增加（create），删除（delete），修改（update），查（read）

##### 增加

**插入一条**

```js
// 7.新增 模型对象的方法 create()
// 参数1：数据对象  参数2：callback (错误对象，插入成功后的文档对象)
BookModel.create(
  {
    name: "西游记",
    // author: '吴承恩',
    price: 99,
    style: "颜色",
  },
  (err, data) => {
    // 判断是否有错误
    if (err) console.log(err); // console.log('插入失败')
    // 如果没有出错，则输出插入后的文档对象
    console.log(data);
    // 8.关闭数据库连接 项目运行过程中， 不会添加此代码
    mongoose.disconnect();
  }
);
```

**批量插入**

```js
//1.引入mongoose
const mongoose = require("mongoose");
//2.链接mongodb数据库 connect 连接
mongoose.connect("mongodb://127.0.0.1:27017/project");
//3.设置连接的回调
mongoose.connection.on("open", () => {
  //4.声明文档结构
  const PhoneSchema = new mongoose.Schema({
    brand: String,
    color: String,
    price: Number,
    tags: Array,
  });

  //6.创建模型对象
  const PhoneModel = mongoose.model("phone", PhoneSchema);
  // 批量插入
  PhoneModel.insertMany(
    [
      {
        brand: "华为",
        color: "灰色",
        price: 2399,
        tags: ["电量大", "屏幕大", "信号好"],
      },
      {
        brand: "小米",
        color: "白色",
        price: 2099,
        tags: ["电量大", "屏幕大", "信号好"],
      },
    ],
    (err, data) => {
      if (err) throw err;
      console.log("写入成功");
      mongoose.connection.close();
    }
  );
});
```

##### 删除

```js
// 7. 删除一条
// 参数1：条件  参数2：callback
// data 对象
BookModel.deleteOne({ _id: "6443e42c8b5e7a4d1734eab7" }, (err, data) => {
  // 判断
  if (err) console.log("删除失败...");
  // 输入 data
  console.log(data); // { acknowledged: true, deletedCount: 1 }
});

// 批量删除
BookModel.deleteMany({ is_hot: "false" }, (err, data) => {
  // 判断
  if (err) console.log("删除失败...");
  // 输入 data
  console.log(data); // { acknowledged: true, deletedCount: 117 }
});
```

##### 更新文档

```js
// 7.更新文档 更新一条
// 参数1：条件 参数2：新的文档内容 参数3：callback
BookModel.updateOne({ name: "红楼梦" }, { price: 9.9 }, (err, data) => {
  // 判断 err
  if (err) console.log("更新失败...");
  // 输出 data
  console.log(data);
  /*   {
      acknowledged: true,
        modifiedCount: 1,
          upsertedId: null,
            upsertedCount: 0,
              matchedCount: 1
    } */
});

// 批量更新
BookModel.updateMany({ author: "余华" }, { is_hot: false }, (err, data) => {
  // 判断 err
  if (err) console.log("更新失败...");
  // 输出 data
  console.log(data);
  /*   {
        acknowledged: true,
          modifiedCount: 1,
            upsertedId: null,
              upsertedCount: 0,
                matchedCount: 1
      } */
});
```

##### 读取文档

```js
// 7.读取文档 读取一条
// 参数1：条件 参数2：callback
BookModel.findOne({ name: "狂飙" }, (err, data) => {
  // 失败
  if (err) console.log("读取失败...");
  // 成功 输出 data 变量的值
  console.log(data);
});

// 根据 ID 获取文档
// 参数1：ID编号  参数2：callback
BookModel.findById("6443e733ae871bd08c5bd725", (err, data) => {
  // 失败
  if (err) console.log("读取失败...");
  // 成功 输出 data 变量的值
  console.log(data);
});

// 批量获取
// 1.参数：有条件就写条件 ，没条件就写回调函数
BookModel.find({ author: "余华" }, (err, data) => {
  // 失败
  if (err) console.log("读取失败...");
  // 成功 输出 data 变量的值
  console.log(data);
});

// 读取所有
// 2.参数：没条件就写回调函数
BookModel.find((err, data) => {
  // 失败
  if (err) console.log("读取失败...");
  // 成功 输出 data 变量的值
  console.log(data);
});
```

#### 条件设置

##### 运算符

在 mongodb 不能 > < >= <= !== 等运算符，需要使用替代符号

- `>` 使用 `$gt`
- `<`使用 `$lt`
- `>` = 使用 `$gte`
- `<=` 使用 `$lte`
- `!==` 使用 `$ne`
  > db.students.find({id:{$gt:3}}); id 号比 3 大的所有的记录
```js
  // 价格小于 20 的图书
  // $lt 小于 less than
  BookModel.find({ price: { $lt: 20 } }, (err, data) => {
    if (err) console.log('读取失败...')
    console.log(data)

  })
```
##### 逻辑运算
`$or` 逻辑或的情况
> db.students.find({$or:[{age:18},{age:24}]});
`$and` 逻辑与的情况
> db.students.find({$and: [{age: {$lt:20}}, {age: {$gt: 15}}]});

```js
  // 曹雪芹 或者 余华的书   逻辑或 or
  // 参数1：条件  参数2：Callback ；  $or 或者
  BookModel.find({ $or: [{ author: '曹雪芹' }, { author: '余华' }] }, (err, data) => {
    if (err) console.log('读取失败...')
    console.log(data)
  })
```
```js
  // 价格大于30且小于70
  // $and 逻辑与
  BookModel.find({ $and: [{ price: { $gt: 30 } }, { price: { $lt: 70 } }] }, (err, data) => {
    if (err) console.log('读取失败...')
    console.log(data)
  })
```
##### 正则匹配
条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询
> db.students.find({name:/imissyou/});

```js
  // 正则编写方法1：
  // 正则表达式，搜索书籍名称中带有 三 的书籍
  BookModel.find({ name: /三/ }, (err, data) => {
    if (err) console.log('读取失败...')
    console.log(data)
  })

  // 正则编写方法2：
  // 变量适合的写法
  BookModel.find({ name: new RegExp('三') }, (err, data) => {
    if (err) console.log('读取失败...')
    console.log(data)

  })
```
#### 个性化读取
##### 设置字段
```js
  // 7.1 字段筛选
  // 0:不要的字段  1:要的字段;  筛选设置为1 的属性显示
  BookModel.find().select({ name: 1, author: 1, _id: 0 }).exec((err, data) => {
    if (err) console.log('读取失败')
    console.log(data)
  })
```
##### 数据排序
```js
  // sort 方法排序
  // 升序： 1  降序： -1
  BookModel.find().select({ name: 1, price: 1, _id: 0 }).sort({ price: -1 }).exec((err, data) => {
    if (err) console.log('读取失败')
    console.log(data)
  })
```
##### 数据的截取
```js
  // limit：限定几条  skip: 跳过
  BookModel.find().select({ name: 1, price: 1, _id: 0 }).sort({ price: 1 }).skip(3).limit(3).exec((err, data) => {
    if (err) console.log('读取失败')
    console.log(data)
  })
```
### 图形化管理工具
使用`图形化的管理工具`来对 Mongodb 进行交互
- Robo 3T 免费 https://github.com/Studio3T/robomongo/releases
- Navicat 收费 https://www.navicat.com.cn/