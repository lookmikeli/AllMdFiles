# package 包管理工具
## 包介绍
### 包
『包』英文单词是`package` ，代表了一组特定功能的源码集合

### 常用的包管理工具
- npm
- yarn
- cnpm

## npm 
npm 全称 `Node Package Manager` ，翻译为中文意思是『Node 的包管理工具』
npm 是 node.js 官方内置的包管理工具，是 `必须要掌握住的工具`

### npm 的安装
node.js 在安装时会 `自动安装 npm` ，所以如果你已经安装了 node.js，可以直接使用 npm
可以通过 `npm -v` 查看版本号测试，如果显示版本号说明安装成功，反之安装失败

### npm 基本使用
#### 初始化
创建一个空目录，然后以此目录作为工作目录 `启动命令行工具` ，执行 `npm init`
`npm init`命令的作用是将文件夹初始化为一个『包』， `交互式创建 package.json 文件`
`package.json` 是包的配置文件，每个包都必须要有 `package.json`

`package.json` 内容示例：
```json
{
  "name": "test",                // 包的名字
  "version": "1.0.0",            // 包的版本
  "description": "学习 npm",     // 包的描述
  "main": "index.js",            // 包的入口文件
  "scripts": {                   // 脚本配置
    "test": "echo \"Error: no test specified\" && exit 1",
    "server":"node ./index.js",  // 别名
    "start": "node ./index.js"   // 别名 
  },
  "author": "",                  // 作者
  "license": "ISC",              // 开源证书
  "dependencies": {
    "uniq": "^1.0.1"
  }
}
```
> 初始化的过程中还有一些注意事项：
>  1. package name ( `包名` ) 不能使用中文、大写，默认值>  是 `文件夹的名称` ，所以文件夹名称也不
>  能使用中文和大写
>  2. version ( `版本号` )要求 `x.x.x` 的形式定义， `x` 必>  须是数字，默认值是 `1.0.0`
>  3. ISC 证书与 MIT 证书功能上是相同的，关于开源证书扩展阅>  读http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html
>  4. `package.json` 可以手动创建与修改
>  5. 使用 `npm init -y` 或者 `npm init --yes` 极速创建 `package.json`

#### 搜索包
`网站搜索` 网址是 `https://www.npmjs.com/`

#### 下载安装包
我们可以通过 `npm install` 和 `npm i` 命令安装包
> 例如：
> npm i <包名>
> npm i axios

运行之后文件夹下会增加两个资源
- `node_modules` 文件夹 存放下载的包
- `package-lock.json` 包的锁文件 ，用来锁定包的版本
>安装 uniq 之后， uniq 就是当前这个包的一个 `依赖包` ，有时会简称为 `依赖`
>比如我们创建一个包名字为 A，A 中安装了包名字是 B，我们就说 B 是 A 的一个依赖包 ，也会说A 依赖 B

####  require 导入 npm 包基本流程
1. 在当前文件夹下 node_modules 中寻找同名的文件夹
2. 在上级目录中下的 node_modules 中寻找同名的文件夹，直至找到磁盘根目录

### 生产环境与开发环境
开发环境是程序员 `专门用来写代码` 的环境，一般是指程序员的电脑，开发环境的项目一般 `只能程序员自`
己访问
生产环境是项目 `代码正式运行` 的环境，一般是指正式的服务器电脑，生产环境的项目一般 `每个客户都可以访问`

###  生产依赖与开发依赖

| 类型     | 命令                                     | 补充                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------ |
| 生产依赖 | npm i -S uniq<br />npm i --save uniq     | -S 等效于 --save， -S 是默认选项<br />包信息保存在 package.json 中 dependencies 属性 |
| 开发依赖 | npm i -D less<br />npm i --save-dev less | -D 等效于 --save-dev<br />包信息保存在 package.json 中 devDependencies 属性 |

### 全局安装
> `-g` 全局  global
```
npm i -g nodemon
```
> 说明：
- 全局安装的命令不受工作目录位置影响
- 可以通过 `npm root -g` 可以查看全局安装包的位置
- `不是所有的包都适合全局安装` ， 只有全局类的工具才适合，可以通过 `查看包的官方文档来确定安装方式` ，这里先不必太纠结

### 报错  修改 windows 执行策略
 键入命令 `set-ExecutionPolicy remoteSigned` 选择 `A`

### 环境变量 Path
Path 是操作系统的一个`环境变量`，可以设置一些文件夹的路径，在当前工作目录下找不到可执行文件时，就会在环境变量 Path 的目录中挨个的查找，如果找到则执行，如果没有找到就会报错

**查找目录**：
此电脑 > 属性 > 高级系统设置 > 高级 > 环境变量 > Path

> 补充说明：
- 如果希望某个程序在任何工作目录下都能正常运行，就应该将该程序的所在目录配置到环境变量 Path 中
- windows 下查找命令的所在位置
    - `cmd 命令行` 中执行 `where nodemon`
    -` powershell命令行` 执行 `get-command nodemon`


### 安装包依赖
在项目协作中有一个常用的命令就是 `npm i` ，通过该命令可以依据 `package.json` 和 `package-lock.json` 的依赖声明安装项目依赖
```
npm i
npm install

```
> `node_modules` 文件夹大多数情况都`不会存入版本库`

### 安装指定版本的包
`格式`
npm i <包名@版本号>
`示例`
npm i jquery@1.11.2

###  删除依赖

 `局部删除`
npm remove uniq
npm r uniq
 `全局删除`
npm remove `-g` nodemon

### 配置命令别名
配置 `package.json` 中的 `scripts` 属性

```json
{

"scripts": {
"server": "node server.js",
"start": "node index.js",
},

}

```
使用别名执行命令
```
npm run server
npm run start
```
不过 `start` 别名比较特别，使用时可以省略` run`
```
npm  start
```
>补充说明：
 - npm start 是项目中常用的一个命令，一般用来启动项目
 - npm run 有自动向上级目录查找的特性，跟 require 函数也一样
 - 对于陌生的项目，我们可以通过查看 scripts 属性来参考项目的一些操作

## cnpm

### 介绍
cnpm 是一个淘宝构建的 `npmjs.com` 的完整镜像，也称为『淘宝镜像』，网址https://npmmirror.com/
cnpm 服务部署在国内 `阿里云服务器上` ， 可以提高包的下载速度
官方也提供了一个全局工具包 `cnpm` ，操作命令与 npm 大体相同

### 安装
通过 `npm` 来安装 `cnpm` 工具
> npm install -g cnpm --registry=https://registry.npmmirror.com

### 操作命令

| 功能         | 命令                                                         |
| ------------ | ------------------------------------------------------------ |
| 初始化       | cnpm init / cnpm init                                        |
| 安装包       | cnpm i uniq<br />cnpm i -S uniq<br />cnpm i -D uniq<br />cnpm i -g nodemon |
| 安装项目依赖 | cnpm i                                                       |
| 删除         | cnpm r uniq                                                  |


###  npm 配置淘宝镜像

- 直接配置
- 工具配置

####  直接配置
执行如下命令即可完成配置
```
npm config set registry https://registry.npmmirror.com/

```
#### 工具配置
使用 `nrm` 配置 npm 的镜像地址 `npm registry manager`

1. 安装 nrm
> npm i -g nrm

2. 修改镜像
> nrm use taobao

3. 检查是否配置成功（选做）
> npm config list
检查 registry 地址是否为 https://registry.npmmirror.com/ , 如果 是 则表明成功

>补充说明：
1. `建议使用第二种方式` 进行镜像配置，因为后续修改起来会比较方便
2. 虽然 cnpm 可以提高速度，但是 npm 也可以通过淘宝镜像进行加速，所以 `npm 的使用率还是高于 cnpm`
