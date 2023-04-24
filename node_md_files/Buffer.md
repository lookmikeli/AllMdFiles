## Buffer（缓冲器）
### 概念

Buffer 是一个类似于数组的 对象 ，用于表示固定长度的字节序列
Buffer 本质是一段内存空间，专门用来处理 二进制数据 。

### 特点

1.Buffer 大小固定且无法调整
2.Buffer 性能较好，可以直接对计算机内存进行操作
3.每个元素的大小为 1 字节（byte）
### 使用

#### 创建 Buffer

Node.js 中创建 Buffer 的方式主要如下几种：
```text
1.Buffer.alloc
```

```js
// alloc
// Buffer node.js 内置模块(全局变量)
// alloc 分配 Buffer 对象的一个方法
// 创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
let buf = Buffer.alloc(10)
// console.log(buf);
```
    2.Buffer.allocUnsafe
```js
// allocUnsafe   不安全的
// allocUnsafe 创建的buffer 不会对旧的数据清零 ;可能会影响执行结果，所以叫 unsafe ，但是效率比 alloc 高
let buf_2 = Buffer.allocUnsafe(10)
// console.log(buf_2);
```
    3.Buffer.from
```js
// 3. from
// 将一个字符或一个数组转换为 buffer
let buf_3 = Buffer.from('hi')
// console.log(buf_3); // 16进制
let buf_4 = Buffer.from([102, 50, 200, 400, 51, 22])
console.log(buf_4);
```

####  Buffer 与字符串的转化

```js
// buffer 与字符串的转换
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
// 注意: toString 默认是按照 utf-8 编码方式进行转换的
console.log(buf_4.toString()); // iloveyou   utf-8
```
#### Buffer 读写

```js
// [] 
// Buffer 可以直接通过 [] 的方式对数据进行处理
let buf = Buffer.from('hello')
console.log(buf[0]); // 104
console.log(buf[0].toString(2)); // 01101000 这里的toString(2) 是进行二进制转换
buf[0] = 90
console.log(buf.toString()); // Zello

```
####  Buffer 溢出 和 中文(了解)

```js
// 溢出
let buf = Buffer.from('hello')
buf[0] = 360 // 二进制最高255  会舍弃高位的数字高于；八位的数字都丢掉

// 中文
let buf = Buffer.from('你好')
console.log(buf); // e4 bd a0 ('你')   e5 a5 bd ('好') utf-8
```