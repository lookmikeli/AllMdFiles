# ES6

## 变量不能重复声明
## 块级作用域
let const
- {}
- if {}
- if else {}
- while ...
> 变量只在代码块里面有效，出代码块以外无效，读取不到
## 不存在变量提升
> let const 不存在变量提升, var 除外

## 不影响作用域链
```js
{
  let a = '123'
  function fn(){
    console.log(a)
  }
  fn(); // 123
}
```
## 解构赋值
ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值，这被称为解构赋值

1. 数组的解构
```js
const [a,b,c] = ['我是a','我是b','我是c']  // 必须索引对应
console.log(a, b, c) // 我是a 我是b 我是c
```
2. 对象的解构
```js
const {name , age} = {name:'张三', age: 18} // 简写
const obj = {
  name: '张三',
  age: 18,
  song: function () {
    console.log('唱歌')
  }
}
let { name, age, song } = obj
console.log(age); // 18
console.log(name) // 张三
song() //方法解构
```
## 模板字符串
> `${变量名}` 可换行

## 简化对象写法
ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法
```js
let name = '张山'
let song = function () {
    return '唱歌'
}

const obj = {
  name, // 等价于 name: name 
  song, // 等价于 song: song
  say(){
    return 'sayHi'
  }
}
console.log(obj.name, obj.song()) // 张山 唱歌
```
> 注意：属性名和变量名一样才能简写

## 箭头函数
ES6 允许使用 `箭头` (=>) 定义函数
```js
let fun = (a,b) =>{
  return a + b 
}
```
> 注意：
> 1. 箭头函数 this 是静态的；this 始终指向函数声明时所在作用域下的 this 的值
> 2. 不能作为构造实例化对象
> 3. 没有arguments 变量
> 4. 箭头函数简写：
    1) 省略小括号：参数只有一个时候
    2) 省略花括号：当代码体只有一条语句的时候; 如果是 return 语句 return 也必须省略；语句执行的结果就是返回值
```js
let fn = a => a + a
console.log(fn(2)) // 函数返回值 4
```
> 注意:以上简写只针对`箭头函数`

### 箭头函数适用与不适用
1. 箭头函数`适合`与 this 无关的回调、定时器、数组的方法回调
2. 箭头函数`不适合`与 this 有关的回调、事件回调、对象的方法

## ES6 允许给函数的参数赋值初始值
### 参数初始值
```js
// 1.参数初始值
function sum(a, b) {
  return a + b
}
function sum1(a, b = 0) {
  return a + b
}
console.log(sum(1, 2)); // 3
console.log(sum(1)); // NaN
console.log(sum1(1)); // 1
console.log(sum1(1, 2)); // 3
```
> 注意：具有默认值的参数，一般位置要靠后(潜规则)

### 与解构赋值结合
```js
// 2.与解构赋值结合
function fn({ name, age, sex = '女' }) { // 解构赋值默认值
  console.log(name); // 张三
  console.log(age); // 18
  console.log(sex) // 女 没有传实参：使用默认值
}
fn({
  name: '张三',
  age: 20,
})
```

## rest 参数(剩余参数)
```js
// arguments
function data() {
  console.log(arguments); // 对象 { '0': 1, '1': 2, '2': 3 }
}
data(1, 2, 3)

// rest 参数 参数必须要放到参数最后
// arguments
function data2(a,...args) {
  console.log(args); // 数组 [ 2, 3 ]
}
data2(1, 2, 3)
```
## 扩展运算符
> `...` 扩展运算符能将 `数组` 转换为逗号分隔的 `参数序列`
```js
const arr = ['孙悟空', '猪八戒', '沙和尚'] // => '孙悟空', '猪八戒', '沙和尚'
function person() {
  console.log(arguments)
}
person(...arr) // person('孙悟空', '猪八戒', '沙和尚')
```
### 扩展运算符 引用场景
1. 数组的合并
```js
const startArr = ['a', 'b', 'c']
const lastArr = ['e', 'f', 'g']
const newArr = [...startArr, ...lastArr]
console.log(newArr); // [ 'a', 'b', 'c', 'e', 'f', 'g' ]
```
2. 数组的克隆
```js
const arr = ['a', 'b', 'c']
const newArr = [...arr]
console.log(newArr); // [ 'a', 'b', 'c' ]
```
3. 将伪数组转为真正的数组

## Symbol 数据类型
### Symbol 介绍与创建
ES6 引入原始数据类型 Symbol，表示独一无二的值；它是javascript语言的第七种数据类型，是一种类似于字符串的数据类型
> undefined string symbol object null number boolean
特点：
- Symbol的值是唯一的，用来解决命名冲突的问题
- Symbol值不能与其他数据类型进行运算
- Symbol定义的对象属性不能使用 for...in 循环遍历，但可以使用 Reflect.ownKeys 来获取对象的所有键名

```js
// 创建 Symbol
let s = Symbol()
console.log(typeof s); // symbol
let s2 = Symbol('描述') // 描述字符串(注释) 只是一个标准
let s3 = Symbol('描述') // 描述字符串(注释) 只是一个标准
console.log(s2 === s3) // false

// Symbol.for() 创建
let s4 = Symbol.for('描述') // Symbol 函数对象 通过 描述字符串 来获取唯一的 Symbol 值
console.log(typeof s4) // symbol
let s5 = Symbol.for('描述') // Symbol 函数对象 通过 描述字符串 来获取唯一的 Symbol 值 
console.log(s4 === s5) // true

```
> 注意事项：
> 不能与数据进行运算

### Symbol 使用
> 使用场景就是给对象添加属性和方法，表示独一无二的
> Symbol，表示独一无二的值 
```js
// 方式一
// 向对象中添加方法 get set 且 不重复 和 覆盖 原有的属性和方法
let person = {
  uname: '张三',
  age: 18,
  sing: function () {
    console.log('唱歌')
  },
  say: function () {
    console.log('say hi')
  }
}
// 声明一个对象
let obj = {
  sing: Symbol(),
  say: Symbol()
}

person[obj.sing] = function () {
  console.log('可以唱歌')
}
person[obj.say] = function () {
  console.log('可以说话')
}
console.log(person)
/* {
  uname: '张三',
  age: 18,
  sing: [Function: sing],
  say: [Function: say],
  [Symbol()]: [Function(anonymous)],
  [Symbol()]: [Function(anonymous)]
} */

// 方式二
let persons = {
  uname: '李四',
  [Symbol('say')]: function () {
    console.log('可以说话')
  },
  [Symbol('sing')]: function () {
    console.log('可以唱歌')
  }
}
console.log(persons)
/* {
  uname: '李四',
  [Symbol(say)]: [Function: [say]],
  [Symbol(sing)]: [Function: [sing]]
} */
```
### Symbol 内置值（属性）
除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol值，指向语言内部使用的方法：
1. Symbol.replace  当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值；
2. Symbol.split  当该对象被str.split(myObject)方法调用时，会返回该方法的返回值；
3. Symbol.hasInstance  当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法；
...
> 这些属性 **例如：** `hasInstance` 都是 Symbol 里面的属性，固定的写法; 而 `Symbol.hasInstance` 这个整体又作为对象的的属性去设置，来改变对象在特定场景下的表现，等同于扩展对象的功能；

## 迭代器
> JS里面：iterator接口 指的是`对象里面的一个属性` Symbol.iterator

迭代器（iterator）是一种接口，为各种不同的数据结构提供统一的访问机制；任何数据解构只要部署 iterator 接口，就可以完成遍历操作；
1. ES6 创造了一种新的遍历命令for...of循环，iterator 接口主要供for...of消费
2. 原生具备 iterator 接口的数据（可用 for of遍历）
  - Arry
  - Arguments
  - Set
  - Map
  - String
  - TypedArray
  - NodeList
```js
   let arr = ['a', 'b', 'c']
    const obj = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    for (let k in obj) console.log(k) // 键
    for (let k in arr) console.log(k) // 索引号
    // 只要 arr 对象里面具有 Symbol.iterator 属性就可以使用 for of 循环
    for (let v of arr) console.log(v) // 元素
```
3. 工作原理
  1) `Symbol.iterator对应的函数` 创建一个指针对象，指向当前数据结构的起始位置
  2) 第一次调用对象的 next 方法（`返回对象的next方法`），指针自动指向数据结构的第一个成员
  3) 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
  4) 每次调用 next 方法返回一个包含 value 和done 属性的对象
  ```js
    let iterator = arr[Symbol.iterator]() // 1) 函数调用
    // 2) 调用对象的 next 方法
    console.log(iterator.next()); //   { value: 'a', done: false }
    console.log(iterator.next()); //   { value: 'b', done: false }
    console.log(iterator.next()); //   { value: 'c', done: false }
    console.log(iterator.next()); //   { value: undefined, done: true }  done 是 do 完成时
  ```
  > 注意：需要自定义遍历数据的时候，要想到迭代器

## 生成器
生成器其实就是一个特殊的函数 异步编程
```js
// yield 函数代码的分隔符 next 每调用一次 执行一次分隔符
function* gen() {
  console.log(111)
  yield '我是老大'
  console.log(222)
  yield '我是老二'
  console.log(333)
  yield '我是老六'
  console.log('生成器函数')
}
let iterator = gen() // 不能直接调用
// iterator.next() //  111
console.log(iterator.next()) // { value: '我是老大', done: false }
// iterator.next() //  222
// iterator.next() //  333
// iterator.next() // 生成器函数  

```

### 生成器函数的传参
```js
// yield 函数代码的分隔符 next 每调用一次 执行一次分隔符
function* gen(arg) {
  console.log(arg)
  let one = yield '我是老大'
  console.log(one)
  let two = yield '我是老二'
  console.log(two)
  let three = yield '我是老六'
  console.log(three)
}

// 执行获取迭代器对象
let iterator = gen('111')
console.log(iterator.next())
// next 方法可以传入实参
console.log(iterator.next('222'))
console.log(iterator.next('333'))
console.log(iterator.next('444'))

/* 
111
{ value: '我是老大', done: false }
222
{ value: '我是老二', done: false }
333
{ value: '我是老六', done: false }
444
{ value: undefined, done: true } */
```

## Promise
> 作用:解决回调地狱

Promise 是异步编程的解决方案; Promise是一个构造函数;
用来封装异步操作并可以获取成功或失败的结果
1)  Promise 构造函数: Promise (excutor){}
2)  Promise.prototype.then 方法
2)  Promise.prototype.catch 方法

```js
    // 实例化 Promise 对象
    const p = new Promise(function (resolve, reject) {
      setTimeout(function () {
        // let data = '用户数据'
        // resolve(data) // 状态从等待改为已成功 => 调用 then 方法
        let err = '读取用户数据失败'
        reject(err)  // 状态从等待改为已失败 => 调用 catch 方法
      }, 2000)
    })

    // 调用 promise 对象的 then 方法
   p.then(function (value) {
      console.log(value);
    }, function (reason) {
      console.error(reason)
    })
   
```
### Promise 案例
```js
// 使用 promise 封装
const p = new Promise(function (resolve, reject) {
  fs.readFile('./es6.mda', (err, data) => {
    // 判断如果失败
    if (err) reject(err) // 状态:进行中改为已失败,并且设置失败的值,是这个错误对象
    resolve(data)  // 如果成功, 状态:进行中改为已成功; 
  })
})

// then 方法处理成功和失败的结果
p.then(function (value) {
  // 成功 输出结果是 buffer 需要toString转换
  console.log(value.toString())
}, function (reason) {
  console.log(reason.message + '读取失败')
})
```

### Promise 发送 Ajax请求 案例
```js
  // 发送 AJAX 请求
    // 接口地址: https://api.apiopen.top/getJoke

    const p = new Promise((resolve, reject) => {
      // 1.创建对象
      const xhr = new XMLHttpRequest()
      // 2.初始化
      xhr.open('get', 'https://api.apiopen.top/getJoke')
      // 3.发送
      xhr.send()
      // 4.绑定事件,处理响应结果
      xhr.onreadystatechange = function () {
        // 判断
        if (xhr.readyState === 4) {
          // 判断状态码
          if (xhr.status >= 200 && xhr.status < 300) {
            // 如果成功  就修改 promise 的状态从进行中改为已成功 
            resolve(xhr.response);
          } else {
            // 如果失败 就修改 promise 的状态从进行中改为已失败
            reject(xhr.status)
          }
        }
      }
    })
    // 指定回调
    p.then(function (value) {
      console.log(value);
    }, function (reason) {
      console.error(reason)
    })
```

### Promise.prototype.then
```js
 // 创建 promise 对象
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('用户数据')
        // reject('出错了')
      }, 1000)
    })

    // 调用 then 方法  返回的结果:是 promise 对象,对象状态由回调函数的执行结果来决定
    // 1.如果回调函数中返回的结果是 非 Promise 类型的属性, 状态为成功, 返回的结果就是 promise 成功的值
    const result = p.then(value => {
      console.log(value);
      // 1.非 Promise 类型的属性
      // return 123
      // 2.是 Promise 对象
      // return new Promise((resolve, reject) => {
      //   resolve('成功') // 成功 then 方法返回的promise 状态就决定了,返回promise对象的状态,也是成功;then 方法 成功的值就是then方法 返回 promise 成功的值
      //   reject('失败') // 失败同理
      // })
      // 3.抛出错误
      throw new Error('出错了') // 如果错误 promise 状态也是失败 ;错误的值就是抛出错误的值
    }, reason => {
      console.warn(reason)
    })
    console.log(result)

    // 链式调用解决回调地狱
    p.then(value => {

    }).then(value => {

    })
```
### Promise catch 方法
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 设置 p 对象的状态为失败，并设置失败的值
    reject('出错了')
  }, 1000)
})

// 方式一
p.then(function (value) { }, function (reason) {
  console.error(reason) // 失败的
})

// 方式二
p.catch(function (reason) {
  console.warn(reason)
})
```
## Set
类似数组，但`成员的值都是唯一的`，集合实现了 `iterator` 接口，所以可以使用` 扩展原算符` 和 `for...of...`进行遍历

集合的属性和方法：
- size:    返回集合的元素个数
- add:     增加一个新元素，返回当前集合
- delete:  删除元素，返回 boolean 值
- has:     检测集合中是否包含某个元素，返回 boolean 值

```js
// 声明一个 Set 集合
let s = new Set() // 集合
// 传入初始参数，接收可迭代数据，一般是数组  集合
let s2 = new Set(['小a', '大a', '小b', '大b', '小a'])
console.log(s2) // {'小a', '大a', '小b', '大b'} 会自动去重
let result = [...s2] // 使用扩展运算符展开 成为数组
console.log(result) // ['小a', '大a', '小b', '大b']

// 元素的个数
console.log(s2.size) // 4
// 添加新的元素
console.log(s2.add('小c')) // {'小a', '大a', '小b', '大b', '小c'}
// 删除元素
s2.delete('小c')
console.log(s2) // {'小a', '大a', '小b', '大b'}
// 检测
console.log(s2.has('大d')) // false
// 清空
s2.clear()
console.log(s2) // Set(0) {size: 0}

// 可以通过for...of 遍历
```

## Map
Map数据结构，类似对象，也是键值对的集合；但是'键'的范围不限于字符串，各种类型的值(包括对象)都可以当做键；Map也实现了 iterator 接口，所有可以使用 扩展运算符 和 for...of 遍历

属性和方法：
- size:   返回Map的元素个数
- set:    增加一个新元素，返回当前 Map
- get:    返回键名对象的键值
- has:    检测 Map 中是否包含某个元素，返回 Boolean
- clear:  清空集合，返回 undefined
```js
// 声明 Map
let m = new Map()

// 添加元素
m.set('name', '张三')
console.log(m) // {'name' => '张三'}

m.set('change', function () {
  console.log('可以改变')
})
console.log(m) // {"change" => function () { console.log('可以改变') }}

let key = {
  person: '人类'
}
m.set(key, ['男人', '女人'])
console.log(m) // {Object => Array(2)}

// size 长度
console.log(m.size) // 3
// 删除
m.delete('name')
console.log(m) //  {'change' => ƒ, {…} => Array(2)}
// 获取
console.log(m.get('change'))
/*
ƒ () {
  console.log('可以改变')
} */
// 清空 clear
m.clear()
console.log(m) // Map(0) {size: 0}
```

## class 类
class (类)作为对象的模板；通过class关键字，可以定义类；基本上，Es6 的class可以看作只是一个语法糖，它的绝大部分功能，Es5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

知识点：
- class         声明类
- constructor   定义构造函数初始化
- extends       继承父级构造方法
- static        定义静态方法和属性
- 父类方法可以重写

### class 类初使用
```js
// Es5 写法
// 人
function Person(uname, age) {
  this.uname = uname
  this.age = age
}
// 添加方法
Person.prototype.sing = function () {
  console.log('唱歌')
}
// 实例化对象
let ming = new Person('小明', 18)
ming.sing() // 唱歌
console.log(ming) // {uname: '小明', age: 18}

// Es6 class
// 关键字 类名
class Persons {
  // 构造方法 固定写法名字不能修改
  //  当 (new + 类名) 就会自动执行实例对象上的 constructor 方法
  constructor(uname, age) {
    this.uname = uname
    this.age = age
  }
  // 方法的语法固定,不能使用 Es5 的对象完整形式
  // 小括号写：形参 ，花括号写：代码体
  sing() {
    console.log('唱歌')
  }
}

let zs = new Persons('张三', '18')
console.log(zs)
```
### 静态成员
> Es5 `静态成员`的属性和方法, 是存在于构造函数的; 动态成员是存在于实例对象上的
> class 类 `静态属性`: `static` 标注的属性和方法 它属于 类 而不属于实例对象
```js
// Es5 静态成员的属性和方法, 是存在于构造函数的; 动态成员是存在于实例对象上的
class Person {
  // 静态属性
  // static 标注的属性和方法 它属于 类 而不属于实例对象
  static name = '人类'
  static say() {
    console.log('说话')
  }
}
let zs = new Person()
console.log(zs.name) // undefined
console.log(Person.name) // 人类
```

### 继承
#### Es5 继承
```js
// 对象继承
// Es5
// 人 父级构造函数
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sing = function () {
  console.log('唱歌')
}

// 子级构造函数
// 女人
function Woman(name, age, sex) {
  // call 改变 this 指向
  Person.call(this, name, age)
  // 独有的做初始化
  this.sex = sex
}
// 设置子级构造函数的原型
// Woman 的实例对象上就有  父级 的方法
Woman.prototype = new Person

// 设置子类的方法
Woman.prototype.say = function () {
  console.log('说话')
}

// 实例化
const min = new Woman('小敏', 18, '女')
min.sing() // 唱歌
console.log(min)
```

#### class 类继承
```js
// class 类 继承
class Person {
  // 构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  // 父类的成员的属性
  say() {
    console.log('讲段子')
  }
}

// 子类 继承
// extends 关键字 继承必须固定
class Woman extends Person {
  // 构造方法
  constructor(name, age, sex, height) {
    // 子类调父类的方法做初始化
    super(name, age,) // 等价于  Person.call(this, name, age)
    this.sex = sex
    this.height = height
  }
  // 子类独有的方法
  playGame() {
    console.log('打豆豆')
  }
  sing() {
    console.log('唱DJ')
  }
}

// 实例化
const min = new Woman('小敏', 18, '女', 188)
min.say() // 讲段子
min.playGame() // 打豆豆
min.sing()  // 唱DJ
console.log(min)
```

#### 子类对父类方法的重写
> 重写:子类声明一个跟父类同名的方法, 对父级功能进行改进
```js
 // 父类的成员的属性
  say() {
    console.log('讲段子')
  }

// 子类独有的方法
// 重写:子类声明一个跟父类同名的方法, 对父级功能进行改进
say(){
  console.log('背诵')
}
```
> 注意:在JS里面子类不能直接去调用父类的同名方法; super()也不能

### getter 和 setter 设置
```js
// get 和 set
// 获取执行 get  设置时执行 set
// 没有构造函数也合法
class Phone {
  get price() { // 对 price 的属性的读取,绑定了一个函数,只要读取实例对象的price属性;就会执行这个函数里面的代码; 而且函数的返回值就是属性的值
    console.log('读取到价格属性了')
    return '我是属性的值'
  }
  // set 必须要有一个参数
  set price(newValue) {
    console.log('价格属性被修改了')
  }
}

// 实例化对象
let s = new Phone()
console.log(s.price) // 我是属性的值

// 修改
s.price = 'free'
```
> 使用场景:
> - get 通常来对对象的动态属性进行封装`(计算封装)`
> - set 添加更对的控制或者是判断`(判断需求)`

## 模块化
模块化是指将一个大的程序文件,拆分成许多小的文件,然后将小文件组合起来

### 模块化的好处
1. 防止命名冲突
2. 代码复用
3. 高维护性 

### Es6 模块化语法
模块功能主要由两个命令构成: export 和 import
 - export 命令用于规定模块的对外接口
 - import 命令用于输入其他模块提供的功能

#### ES6 模块暴露数据 

分别暴露 
```html
  <script>

  // test1.js 文件
  export let name = 'es6模块化'
  export function fn() {
  console.log('我是一个模块的成员');
  }

  </script>

  <script type="module">
    // 引入 test1.js 模块内容
    // 1.通用方式引入 标签
    import *as m1 from './test1.js'
    console.log(m1); // Module {Symbol(Symbol.toStringTag): 'Module'}
    // 2.解构赋值形式引入
    import {name, fn} from './test1.js'
  </script>

```
统一暴露 
```html
<script>
// test2.js 文件
let name = 'es6模块化'
function fn() {
  console.log('我是一个模块的成员');
}
// 统一暴露
export { name, fn }
</script>

<script type="module">
// 1.通用方式引入 标签
// 引入 test2.js 模块内容
import *as m2 from './test2.js'
console.log(m2); // Module {Symbol(Symbol.toStringTag): 'Module'}
// 2.解构赋值形式引入
// as 别名
import {name  as uname , fn as fun} from './test2.js'
console.log(uanme, fun)
</script>
```
默认暴露

```html
<script>
// test3.js 文件
// 默认暴露 可以是任意类型 对象居多
export default {
  name: 'es6模块化',
  fn: function () {
    console.log('我是一个模块的成员');
  }
}
</script>

<script type="module">
// 引入 test3.js 模块内容 标签
import *as m3 from './test3.js'
console.log(m3); // Module {Symbol(Symbol.toStringTag);'Module'}
// 2.解构赋值形式引入
import { default as m3 } from './test3.js'
console.log(m3);

// 3. 简便形式引入 针对默认暴露
import m3 from './test3.js'
</script>
```
#### JS 文件引入 src 属性引入
```html
<!-- html 页面 -->
<script src="./app.js" type="module"></script>
```
```js
// 入口文件   app.js 文件

// 模块引入
import * as m1 from './test1.js'
import * as m2 from './test2.js'
import * as m3 from './test3.js'
console.log(m1);
console.log(m2);
console.log(m3); 
```

# ES7

## async 和 await
async 和 await 两种语法结合让异步代码像同步代码一样

## async 函数
1. async 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定
```js
// async 函数
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
## await 表达式
1. await 必须写在 async 函数中
2. await 右侧的表达式一般为 promise 对象
3. await 返回的是 promise 成功的值
4. await 的 promise 失败了，就会抛出异常，需要通过 try...catch 捕获处理

成功
```js
// 创建 promise 对象
const p = new Promise((resolve, reject) => {
  resolve('成功的值')
})

// await 要放在 async 函数中；但 async 里面可以没有 await
async function main() {
  // await 返回结果是 promise 对象，成功的值；
  let result = await p
  console.log(result); // '成功的值'
}
// 调用函数
main()
```
失败
```js

// 创建 promise 对象
const p = new Promise((resolve, reject) => {
  reject('失败了')
})

// await 要放在 async 函数中；但 async 里面可以没有 await

async function main() {
  // 如果 promise 对象失败了，需要使用 try...catch 来捕获
  try {
    let result = await p
    console.log(result); // '成功的值'
  } catch (err) {  // catch 得到失败的结果
    console.log(err)
  }
}
// 调用函数
main()
```

### 练习
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

## ES11 私有属性
```js
class Person {
  // 公有属性
  name
  // 私有属性 需要加 #号
  #age
  #weight
  // 构造方法 初始化
  constructor(name, age, weight) {
    this.name = name
    this.#age = age
    this.#weight = weight

  }
  // 私有属性只能在类 内部调用
  intro() {
    console.log(this.name)
    console.log(this.#age)
    console.log(this.#weight)
  }
}

// 实例化
const girl = new Person('小敏', 18, '45kg')
console.log(girl) //  {name: '小敏', #age: 18, #weight: '45kg'}
console.log(girl.#age) // 报错： 私有字段“#age”必须在封闭类 调用 
girl.intro()
```

## 可选链操作符 (?.)
```js
// ?.
// 判断前者是否满足条件 或者 存在
```

## 动态 import 按需下载，按需加载

html 页面
```html
<html>
  <body>
    <button id="btn">点击</button>
    <script src="./app.js" type="module"></script>
  </body>
</html>
```

hello.js 文件
```js
export function hello() {
  alert('hello')
}
```

入口 js 文件
```js
// 入口文件

// 静态导入：不管后续用不用都导入进来
import * as m1 from './hello.js'

// 获取元素
const btn = document.querySelector('#btn')
btn.onclick = function () {
  // 动态导入 
  // 使用 import() 函数 ；返回结果：是 promise 对象,成功的值就是模块暴露的对象
  import('./hello.js').then(module => {
    // console.log(module)
    module.hello()
  })
}
```


