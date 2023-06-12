## ** 推荐安装的 VScode 中的 Vue 插件 **

1. [Vue 3 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
2. [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

---

# vue2

## vue 实例 和 vue 模板

```html
<!-- 
    初识Vue：
      1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
      2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
      3.root容器里的代码被称为【Vue模板】；
      4.Vue实例和容器是一一对应的；
      5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；
      6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
      7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

      注意区分：js表达式 和 js代码(语句)
          1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
                (1). a
                (2). a+b
                (3). demo(1)
                (4). x === y ? 'a' : 'b'

          2.js代码(语句)
                (1). if(){}
                (2). for(){}
  -->
```

### 指令语法 和 插值语法

```html
<!-- 
    Vue模板语法有2大类：
      1.插值语法：
          功能：用于解析标签体内容。
          写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
      2.指令语法：
          功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
          举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，
              且可以直接读取到data中的所有属性。
          备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。

		 -->
```

## 单项数据绑定和双向数据绑定

```html
<!-- 
  Vue中有2种数据绑定的方式：
      1.单向绑定(v-bind)：数据只能从data流向页面。
      2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
        备注：
            1.双向绑定一般都应用在表单类元素上（如：input、select等）
            2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
-->
```

## 数据代理

```html
<!-- 
  1.Vue中的数据代理：
        通过vm对象来代理data对象中属性的操作（读/写）
  2.Vue中数据代理的好处：
        更加方便的操作data中的数据
  3.基本原理：
        通过Object.defineProperty()把data对象中所有属性添加到vm上。
        为每一个添加到vm上的属性，都指定一个getter/setter。
        在getter/setter内部去操作（读/写）data中对应的属性。
-->
```

## 键盘事件处理

```html
<!-- 
  1.Vue中常用的按键别名：
        回车 => enter
        删除 => delete (捕获“删除”和“退格”键)
        退出 => esc
        空格 => space
        换行 => tab (特殊，必须配合keydown去使用)
        上 => up
        下 => down
        左 => left
        右 => right

  2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

  3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
        (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
        (2).配合keydown使用：正常触发事件。

  4.也可以使用keyCode去指定具体的按键（不推荐）

  5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
-->
```

> 注意：简写的情况下，只有是`不需要修改所依赖的属性`；不要要用到 `setter` 的时候才能简写

## 什么是 vue

官方给出的概念：Vue (读音 /vjuː/，类似于 view) 是一套`用于构建用户界面`的前端`框架`。

1. 构建用户界面
   - 用 vue 往 html 页面中填充数据，非常的方便
2. 框架
   - 框架是一套现成的解决方案，程序员只能遵守框架的规范，去编写自己的业务功能！
   - 要学习 vue，就是在学习 vue 框架中规定的用法！
   - vue 的指令、组件（是对 UI 结构的复用）、路由、Vuex、vue 组件库
   - 只有把上面老师罗列的内容掌握以后，才有开发 vue 项目的能力！

## vue 的两个特性

1. `数据驱动视图`：
   在使用了 vue 的页面中，vue 会`监听数据的变化`，从而`自动`重新渲染页面的结构。

   - 数据的变化**会驱动视图**自动更新
   - 好处：程序员只管把数据维护好，那么页面结构会被 vue 自动渲染出来！
   - 注意：数据驱动视图是`单向的数据绑定`。

2. `双向数据绑定`：
   在`填写表单`时，双向数据绑定可以辅助开发者在`不操作 DOM 的前提下`，`自动`把用户填写的内容`同步到`数据源中。

   > 在网页中，form 表单负责**采集数据**，Ajax 负责**提交数据**。

   - js 数据的变化，会被自动渲染到页面上
   - 页面上表单采集的数据发生变化的时候，会被 vue 自动获取到，并更新到 js 数据中

3. MVVM
   `MVVM` 是 vue 实现`数据驱动视图`和`双向数据绑定`的核心原理。MVVM 指的是 Model、View 和 ViewModel，它把每个 HTML 页面都拆分成了这三个部分

4. MVVM 的工作原理
   `ViewModel 作为 MVVM 的核心`，是它把当前页面的`数据源`（Model）和`页面的结构`（View）连接在了一起。
   当`数据源发生变化`时，会被 ViewModel 监听到，VM 会根据最新的数据源`自动更新`页面的结构
   当`表单元素的值发生变化`时，也会被 VM 监听到，VM 会把变化过后最新的值`自动同步`到 Model 数据源中

> 注意：数据驱动视图和双向数据绑定的底层原理是 MVVM（`Mode 数据源`、`View 视图`、`ViewModel` 就是 vue 的实例）

## vue 的基本使用

1. 基本使用步骤
   ① 导入 vue.js 的 script 脚本文件
   ② 在页面中声明一个将要被 vue 所控制的 DOM 区域
   ③ 创建 vm 实例对象（vue 实例对象）

```html
<body>
  <!-- 希望 vue 能够控制下面的这个 div ,帮我们把数据填充到 div 内部-->
  <div id="app">{{ username }}</div>
  <!-- {{ 要渲染的数据}} 固定语法-->

  <!-- 1.导入 vue 的库文件，在 window 全局就有了 vue 这个构造函数 -->
  <script src="./lib/vue-2.6.12.js"></script>
  <!-- 2.创建 vue 的实例对象 -->
  <script>
    // 创建 vue 的实例对象
    const vm = new Vue({
      // 配置项
      el: '#app', // el属性固定写法，表示当前 vm 实例要控制页面上的哪个区域，接收的值是一个选择器
      // data 对象就是要渲染到页面上的数据
      data: {
        username: 'zs',
        password: '123',
      },
    })
  </script>
</body>
```

## vue 指令

`指令（Directives）`是 vue 为开发者提供的`模板语法`，用于`辅助开发者渲染页面的基本结构`。
vue 中的指令`按照不同的用途`可以分为如下 6 大类：
① `内容渲染`指令
② `属性绑定`指令
③ `事件绑定`指令
④ `双向绑定`指令
⑤ `条件渲染`指令
⑥ `列表渲染`指令

### 1. 内容渲染指令

1. `v-text` 指令的缺点：会覆盖元素内部原有的内容！
2. `{{ }}` 插值语法表达式：在实际开发中用的最多，只是`内容的占位符`，不会覆盖原有的内容！
   > 注意：插值表达式`只能`用到`元素的内容节点`，`不能`用到`元素的属性节点`里
3. `v-html` 指令的作用：可以把带有`标签`的字符串，渲染成真正的 HTML 内容！

```html
<!-- 
      v-bind	: 单向绑定解析表达式, 可简写为 :xxx
      v-model	: 双向数据绑定
      v-for  	: 遍历数组/对象/字符串
      v-on   	: 绑定事件监听, 可简写为@
      v-if 	 	: 条件渲染（动态控制节点是否存存在）
      v-else 	: 条件渲染（动态控制节点是否存存在）
      v-show 	: 条件渲染 (动态控制节点是否展示)

  v-text指令：
      1.作用：向其所在的节点中渲染文本内容。
      2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

  v-html指令：
      1.作用：向指定节点中渲染包含html结构的内容。
      2.与插值语法的区别：
            (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
            (2).v-html可以识别html结构。
      3.严重注意：v-html有安全性问题！！！！
            (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
            (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！ 

  v-cloak指令（没有值）：
						1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
						2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。  

  v-once指令(没有值)：
						1.v-once所在节点在初次动态渲染后，就视为静态内容了。
						2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。  
            
  v-pre指令：
            1.跳过其所在节点的编译过程。
            2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。                           
              
-->
```

### 2. 属性绑定指令

> 注意：插值表达式只能用在元素的**内容节点**中，不能用在元素的**属性节点**中！

- 在 vue 中，可以使用 `v-bind:` 指令，为元素的`属性`动态绑定值；
  如果需要为`元素的属性`动态绑定`属性值`，则需要用到 `v-bind` 属性绑定指令。用法示例如下：

```html
<body>
  <div id="app">
    <input type="text" v-bind:placeholder="tips" />

    <hr />
    <!-- vue 规定 v-bind: 指令可以简写为 ： -->
    <img :src="photo" alt="" style="width: 100px;" />

    <hr />
    <!-- 在 vue 提供的模板渲染语法中，除了支持绑定简单的数据值之外，还支持 Javascript 表达式的运算 -->
    <div>1 + 2 的结果是: {{1+2}}</div>
    <div>{{tips}} 反转的结果是：{{tips.split('').reverse().join('')}}</div>
    <div :title="'box'+index">这是一个div</div>
  </div>

  <!-- 导入 vue 的库文件，在 window 全局就有了 vue 这个构造函数 -->
  <script src="./lib/vue-2.6.12.js"></script>
  <script>
    // 创建 vue 的实例对象
    const vm = new Vue({
      // 配置项
      el: '#app',
      data: {
        tips: '请输入用户名',
        photo: 'https://img2.baidu.com/it/u=2544477017,4232328507',
        index: 3,
      },
    })
  </script>
</body>
```

- 简写是英文的 `:`

- 在使用 v-bind 属性绑定期间，如果绑定内容需要进行`动态拼接`，则字符串的外面应该`包裹单引号`，例如：

  ```xml
  <div :title="'box' + index">这是一个 div</div>
  ```

### 3. 事件绑定

1. `v-on:` 简写是 `@`

2. 语法格式为：

```html
<body>
  <div id="app">
    <p>count的值是: {{count}}</p>
    <!-- 在绑定事件处理函数的时候，可以使用小括号来传递参数 -->
    <!-- v-on：指令可以被简写为 @  -->
    <button v-on:click="add(1)">+1</button>
    <button @click="sub">-1</button>
  </div>

  <!-- 导入 vue 的库文件，在 window 全局就有了 vue 这个构造函数 -->
  <script src="./lib/vue-2.6.12.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        count: 0,
      },
      // methods 的作用，就是定义事件的处理函数
      methods: {
        add(n = 0) {
          // console.log(vm === this);
          // vm.count += 1
          // this.count += 1
          this.count += n
          // 如果在方法中要修改 data 中的数据，可以通过 this 访问到
        },
        sub() {
          // console.log('sub成功');
          this.count -= 1
        },
      },
    })
  </script>
</body>
```

3. `$event` 的应用场景：如果默认的事件对象 e 被覆盖了，则可以手动传递一个 $event。例如：

   ```xml
   <button @click="add(3, $event)"></button>

   methods: {
      add(n, e) {
   			// 如果在方法中要修改 data 中的数据，可以通过 this 访问到
   			this.count += 1
      }
   }
   ```

4. 事件修饰符：
   在事件处理函数中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。因此，vue 提供了`事件修饰符`的概念，来辅助程序员更方便的对`事件的触发进行控制`。

| 事件修饰符 | 说明                                                        |
| ---------- | ----------------------------------------------------------- |
| `.prevent` | `阻止默认行为`（例如：阻止 a 连接的跳转、阻止表单的提交等） |
| ` .stop`   | `阻止事件冒泡`                                              |
| .capture   | 以捕获模式触发当前的事件处理函数                            |
| .once      | 绑定的事件只触发 1 次                                       |
| .self      | 只有在 event.target 是当前元素自身时触发事件处理函数        |

​

- `.prevent`

  ```xml
  <a @click.prevent="xxx">链接</a>
  ```

- `.stop`

  ```xml
  <button @click.stop="xxx">按钮</button>
  ```

5. 按键修饰符
   在监听`键盘事件`时，我们经常需要`判断详细的按键`。此时，可以为`键盘相关的事件`添加`按键修饰符`;

```html
<div id="app">
  <!-- 只有在 key 是 Esc 时调用 clearInput 处理方法 -->
  <input type="text" @keyup.esc="clearInput" />

  <!-- 只有在 key 是 Enter 时调用 commitAjax 处理方法 -->
  <input type="text" @keyup.enter="commitAjax" />
</div>
```

### 4. v-model 双向绑定指令

vue 提供了 `v-model 双向数据绑定`指令，用来辅助开发者在`不操作 DOM` 的前提下，`快速获取表单的数据`。

```html
<div id="app">
  <p>用户的名字是：{{username}}</p>
  <input type="text" v-model="username" />
  <hr />
  <!-- 单向数据绑定 -->
  <input type="text" :value="username" />
  <hr />
  <select v-model="city">
    <option value="">请选择城市</option>
    <option value="1">重庆</option>
    <option value="2">北京</option>
    <option value="3">四川</option>
  </select>
</div>
```

1. input 输入框
   - type="radio"
   - type="checkbox"
   - type="xxxx"
2. textarea
3. select
   > 注意：`v-model 双向数据绑定`指令，只能对表单元素进行操作; 表单里面的值`会自动同步`到数据源

#### 4. 1 v-model 指令的修饰符

`为了方便对用户输入的内容进行处理`，vue 为 v-model 指令提供了 3 个修饰符:

| 修饰符  | 作用                                       | 示例                           |
| ------- | ------------------------------------------ | ------------------------------ |
| .number | 自动将用户的输入值转为数值类型             | <input v-model.number="age" /> |
| .trim   | 自动过滤用户输入的首尾空白字符             | <input v-model.trim="msg" />   |
| .lazy   | 在“change”时而非“input”时更新,失去焦点更新 | <input v-model.lazy="msg" />   |

```html
<div id="app">
  <input type="text" v-model.number="n1" />+<input
    type="text"
    v-model.number="n2"
  />
  =<span>{{n1+n2}}</span>
  <hr />
  <input type="text" v-model.trim="username" />
  <button @click="showName">获取用户名</button>
  <hr />
  <input type="text" v-model.lazy="username" />
</div>
```

#### **收集表单数据**

```html
<!-- 
  收集表单数据：
      若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
      若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
      若：<input type="checkbox"/>
          1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
          2.配置input的value属性:
              (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
              (2)v-model的初始值是数组，那么收集的的就是value组成的数组
      备注：v-model的三个修饰符：
              lazy：失去焦点再收集数据
              number：输入字符串转为有效的数字
              trim：输入首尾空格过滤
-->
```

### 5. 条件渲染指令

```html
<!-- 
  条件渲染：
        1.v-if
              写法：
                  (1).v-if="表达式" 
                  (2).v-else-if="表达式"
                  (3).v-else="表达式"
              适用于：切换频率较低的场景。
              特点：不展示的DOM元素直接被移除。
              注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

        2.v-show
              写法：v-show="表达式"
              适用于：切换频率较高的场景。
              特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
          
        3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
-->
```

> 注意: template 可以配合 v-if 使用; `不能配合` v-show 使用

#### v-if 和 v-show 的区别

1. `v-show` 的原理是：动态为元素添加或移除 `display: none` 样式，来实现元素的显示和隐藏
   - 如果要`频繁的切换`元素的显示状态，用 v-show 性能会更好
2. `v-if` 的原理是：每次动态`创建`或`移除`元素，实现元素的显示和隐藏
   - 如果刚进入页面的时候，某些元素`默认不需要被展示`，而且后期这个元素很可能也不需要被展示出来，此时 v-if 性能更好

> 在实际开发中，绝大多数情况，不用考虑性能问题，直接使用 v-if 就好了！！！

#### v-if 指令在使用的时候，有两种方式：

1. 直接给定一个布尔值 true 或 false

   ```xml
   <p v-if="true">被 v-if 控制的元素</p>
   ```

2. 给 v-if 提供一个判断条件，根据判断的结果是 true 或 false，来控制元素的显示和隐藏

   ```xml
   <p v-if="type === 'A'">良好</p>
   ```

#### v-else 和 v-else-if

`v-if` 可以单独使用，或配合 `v-else` 指令一起使用：

```html
<div id="app">
  <!-- 多选一，满足条件显示 -->
  <div v-if="type === 'A'">优秀</div>
  <div v-else-if="type === 'B'">良好</div>
  <div v-else-if="type === 'C'">一般</div>
  <div v-else>差</div>
</div>
```

注意：

> v-else 指令`必须配合` v-if 指令一起使用，否则它将不会被识别！  
> v-else-if 指令`必须配合` v-if 指令一起使用，否则它将不会被识别！

### 6.列表渲染指令

#### 列表渲染指令

1. vue 提供了 `v-for` 列表渲染指令，用来辅助开发者`基于一个数组来循环渲染一个列表结构`。v-for 指令需要使用 `item in list` 形式的特殊语法，其中：

- list 是`待循环的数组`
- item 是`被循环的每一项`

#### v-for 中的索引

2. v-for 指令还支持一个`可选的`第二个参数，即`当前项的索引`。语法格式为 (`item`, `index`) `in items`，示例代码如下：

```html
<body>
  <!-- 希望 vue 能够控制下面的这个 div ,帮我们把数据填充到 div 内部-->
  <div id="app">
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <th>索引</th>
        <th>ID</th>
        <th>姓名</th>
      </thead>
      <tbody>
        <!-- index 需要再添加 v-for="item in list" -->
        <!-- 官方建议：只要用到了 v-for 指令，那么一定要绑定一个：key 属性 -->
        <!-- 而且，尽量把 id 作为 key 的值 -->
        <!-- 官方对 key 的值类型，是要求为：字符串或数字型 -->
        <!-- key 的值是绝对不能重复的，否则会终端报错：Duplicate keys detected -->
        <tr
          v-for="(item, index) in list"
          :key="item.id"
          :title="item.name + index"
        >
          <td>{{index}}</td>
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 导入 vue 的库文件，在 window 全局就有了 vue 这个构造函数 -->
  <script src="./lib/vue-2.6.12.js"></script>
  <script>
    // 创建 vue 的实例对象
    const vm = new Vue({
      // 配置项
      el: '#app',
      // data 对象就是要渲染到页面上的数据
      data: {
        list: [
          // 列表数据
          { id: 1, name: '张三' },
          { id: 2, name: '李四' },
          { id: 3, name: '王五' },
        ],
      },
    })
  </script>
</body>
```

> 注意：v-for 指令中的` item 项`和 `index 索引`都是形参，可以根据需要进行`重命名`。例如 (`user`, `i`) in userlist

#### 3. 使用 key 维护列表的状态

当`列表的数据变化`时，默认情况下，vue 会`尽可能的复用`已存在的 DOM 元素，从而`提升渲染的性能`。但这种默认的性能优化策略，会导致`有状态的列表无法被正确更新`。
为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证`有状态的列表被正确更新`的前提下，`提升渲染的性能`。此时，需要为每项提供一个`唯一的 key 属性`：

```html
<!-- 官方建议：只要用到了 v-for 指令，那么一定要绑定一个：key 属性 -->
<!-- 而且，尽量把 id 作为 key 的值 -->
<!-- 官方对 key 的值类型，是要求为：字符串或数字型 -->
<!-- key 的值是绝对不能重复的，否则会终端报错：Duplicate keys detected -->
<tr v-for="item in list" :key="item.id">
  <td>{{index}}</td>
  <td>{{item.id}}</td>
  <td>{{item.name}}</td>
</tr>
```

> 加 key 属性的`好处`：  
> ① 正确维护列表的状态  
> ② 复用现在的 DOM 元素，提升渲染的性能

#### 4. key 的注意事项

① key 的值只能是`字符串`或`数字`类型
② key 的值`必须具有唯一性`（即：key 的值不能重复）
③ 建议把`数据项 id 属性的值`作为 key 的值（因为 id 属性的值具有唯一性）
④ 使用 `index 的值`当作 key 的值`没有任何意义`（因为 index 的值`不具有唯一性`）
⑤ 建议使用 v-for 指令时`一定要指定 key` 的值（既提升性能、又防止列表状态紊乱）

#### key 的原理

```html
<!-- 
    面试题：react、vue中的key有什么作用？（key的内部原理）
        
        1. 虚拟DOM中key的作用：
            key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
            随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
                
        2.对比规则 diff算法：
          (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
                ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
                ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

          (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                创建新的真实DOM，随后渲染到到页面。
                
        3. 用index作为key可能会引发的问题：
          1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                  会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

          2. 如果结构中还包含输入类的DOM：
                  会产生错误DOM更新 ==> 界面有问题。

        4. 开发中如何选择key?:
          1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
          2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
            使用index作为key是没有问题的。
-->
```

## 过滤器(限 vue2 )

`过滤器（Filters）`是 vue 为开发者提供的功能，常用于`文本的格式化`。过滤器可以`用在`两个地方：`插值表达式`和` v-bind 属性绑定`。

```html
<!-- 
  过滤器：
    定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
    语法：
        1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
        2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
    备注：
        1.过滤器也可以接收额外参数、多个过滤器也可以串联
        2.并没有改变原本的数据, 是产生新的对应的数据
-->
```

### 私有过滤器

过滤器应该被添加在 JavaScript 表达式的`尾部`，由“`管道符`”进行调用，示例代码如下：

```html
<div id="app">
  <p>
    <!-- 过滤器管道符  | -->
    message的值是: {{ message | capitalize}}
  </p>
  <script>
    // 创建 vue 的实例对象
    const vm = new Vue({
      // 配置项
      el: '#app',
      data: {
        message: 'hello vue ',
      },
      // 过滤器函数，必须被定义到 filters 节点里面
      // 过滤器本质是一个函数
      filters: {
        // 注意： 过滤器函数形参中的 val ,永远都是 “管道符”  前面的那个值
        capitalize(val) {
          console.log(val) // hello vue
          // 字符串的 charAt 方法，这个方法接收索引值，表示从字符串中把索引对应的字符，获取出来
          const first = val.charAt(0).toUpperCase()
          // 字符串的 slice 方法，可以截取字符串，从指定索引的位置往后截取
          const other = val.slice(1)
          console.log(other) // ello vue
          // 注意：过滤器中一定要返回值
          return first + other
        },
      },
    })
  </script>
</div>
```

### 私有过滤器和全局过滤器

在 `filters` 节点下`定义的过滤器`，称为“`私有过滤器`”，因为它只能在当前 `vm 实例所控制的 el 区域内使用`。
如果希望在`多个 vue 实例`之间共享过滤器，则可以按照如下的格式定义`全局过滤器`：

```html
<script>
  // 全局过滤器 ==> 独立于每个 vm 实例之外
  // 使用 Vue.filter()定义全局过滤器
  // 参数1：是全局过滤器的‘名字’  参数2：是全局过滤器的“处理函数”
  Vue.filter('capitalize', (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })
</script>
```

### 过滤器的注意点

1. 要定义到 filters 节点下，**本质是一个函数**
2. 在过滤器函数中，**一定要有 return 值**
3. 在过滤器的形参中，可以获取到“`管道符`”前面待处理的那个值
4. 如果`全局过滤器`和私有过滤器名字一致，此时按照“**就近原则**”，调用的是”私有过滤器“

### 连续调用多个过滤器

过滤器可以`串联`地进行调用

```html
<!-- 把 message 的值，交给 filter1 进行处理的结果 => filter2 , 最终filter2的结果渲染页面 -->
{{ message | filter1 | filter2 }}
```

### 过滤器传参

过滤器的`本质`是 `JavaScript 函数`，因此可以接收参数，格式如下：

```html
<!-- arg1 和 arg2 是传递给 filterA 的参数 -->
<p>{{ message | filterA(arg1, arg2)}}</p>

<script>
  // 过滤器处理函数的形参列表中：
  //   参数1：永远是“ 管道符 ”前面待处理的值
  //   从第二个参数开始，才是调用过滤器时传递过来的 arg1 和 arg2 参数
  Vue.filter('filterA', (arg1, arg2) => {
    // 过滤器代码逻辑...
  })
</script>
```

## watch 侦听器

### 什么是 watch 侦听器

`watch 侦听器`允许开发者监视数据的变化，从而`针对数据的变化做特定的操作`。

#### 侦听器定义为函数形式

```html
<body>
  <div id="app">
    <input type="text" v-model="username" />
  </div>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        username: '张三',
      },
      // 所有的侦听器，都应该被定义到 watch 节点下
      watch: {
        // 侦听器本质是一个函数，要监听那个数据的变化，就把数据名作为方法名即可
        // 参数：新值在前，旧值在后
        username(newVal, oldVal) {
          if (!newVal) return
          // 用 axios发送 ajax 请求
          axios
            .get('https://www.escook.cn/api/finduser/' + newVal)
            .then((res) => {
              console.log(res) // 判断用户名是否被占用
            })
        },
      },
    })
  </script>
</body>
```

### immediate 选项

默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器`立即被调用`，则需要使用 `immediate` 选项。

#### 侦听器定义为对象形式

```js
const vm = new Vue({
  el: '#app',
  data: {
    username: 'admin',
  },
  // 所有的侦听器，都应该被定义到 watch 节点下
  watch: {
    // 1.定义对象形式的侦听器，监听 username 值的变化
    username: {
      // 2.handler 属性是固定写法：指定 侦听器的处理函数，当 username 变化时，调用 hander
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      // immediate 选项默认值： false
      // 3.immediate 的作用：表示组件加载完毕后立即调用一次当前的 watch 侦听器
      immediate: true,
    },
  },
})
```

### 侦听器 $watch

```js
// 侦听器
vm.$watch('isHost', {
  handler(newVal, oldVal) {
    console.log(newVal, oldVal)
  },
})

// 简写
vm.$watch('isHost', function (newVal, oldVal) {
  console.log(newVal, oldVal)
})

// 注意: 没有配置项才能简写
```

### watch 两种写法

```html
<!--
  监视属性watch：
    1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
    2.监视的属性必须存在，才能进行监视！！
    3.监视的两种写法：
        (1).new Vue时传入watch配置
        (2).通过vm.$watch监视
-->
```

1. 第一种:

```js
const vm = new Vue({
  el: '#root',
  data: {
    isHot: true,
  },
  // 侦听器
  /* watch: {
        isHot: {
          immediate: true, // 初始化时让 handler 调用一次
          // handler 调用: 当被监视的属性(data里面的属性/计算属性)发生改变的时候,触发 handler 函数
          handler(newValue, oldValue) {
            console.log('isHot 被修改了' + newValue + oldValue)
          }
        }
      } */
})
```

2. 第二种:

```js
// 侦听器第二种写法: 必须声明 vm 实例对象
// 对象里面的 key 'isHot'
vm.$watch('isHot', {
  deep: false, // 默认 false
  immediate: false, // 默认 false
  handler(newValue, oldValue) {
    console.log('isHot 被修改了' + newValue + oldValue)
  },
})

// 简写
// 不能配置 deep 和 immediate
vm.$watch('isHot', function (newValue, oldValue) {
  console.log('isHot 被修改了' + newValue + oldValue)
})
```

> 注意: `vue 所管理的函数`, 建议`不要写成箭头函数`,this 的指向会发生改变

### deep 选项

如果 `watch 侦听的是一个对象`，如果`对象中的**属性值**发生了变化`，则`无法被监听到`。此时需要使用 `deep 选项`

`deep` 深度监听

```js
const vm = new Vue({
  el: '#app',
  data: {
    //  用户的信息对象
    info: {
      username: 'admin',
    },
  },
  // 所有的侦听器，都应该被定义到 watch 节点下
  watch: {
    info: {
      handler(newVal) {
        console.log(newVal.username)
      },
      // 开启深度监听，只要对象中任何一个属性变化了，都会触发‘对象的侦听’
      // 默认 false
      deep: true,
    },

    // 简写形式
    // 函数当 handler 用
    /*  info(newVal, oldVal) {
      console.log(newVal.username)
    }, */
  },
})
```

> 注意:配置项里面`只有 handler` 的时候, 才可以`简写`

```html
<!-- 
  深度监视：
      (1).Vue中的watch默认不监测对象内部值的改变（一层）。
      (2).配置deep:true可以监测对象内部值改变（多层）。
  备注：
      (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
      (2).使用watch时根据数据的具体结构，决定是否采用深度监视。
-->
```

### 监听对象单个属性的变化

如果`只想监听对象中单个属性的变化`，则可以按照如下的方式定义 watch 侦听器：

```js
const vm = new Vue({
  el: '#app',
  data: {
    //  用户的信息对象
    info: {
      username: 'admin',
      age: 18,
    },
  },
  // 所有的侦听器，都应该被定义到 watch 节点下
  watch: {
    // 如果要侦听的是对象的子属性的变化，则必须包裹一层单引号
    // 通过属性链的方式去声明对应的 watch 监听器
    'info.username'(newVal) {
      console.log(newVal)
    },
  },
})
```

### 侦听器的格式

1. 方法格式的侦听器
   - 缺点 1：无法在刚进入页面的时候，自动触发！！！
   - 缺点 2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器！！！
2. 对象格式的侦听器
   - 好处 1：可以通过 **immediate** 选项，让侦听器自动触发！！！
   - 好处 2：可以通过 **deep** 选项，让侦听器深度监听对象中每个属性的变化！！！

### 计算属性 vs 侦听器

计算属性和侦听器`侧重的应用场景不同`：
计算属性侧重于监听`多个值`的变化，最终计算并 **`返回一个新值`**
侦听器侧重于监听`单个数据`的变化，最终`执行特定的业务处理`，**`不需要有任何返回值`**

```html
<!-- 
    computed和watch之间的区别：
        1.computed能完成的功能，watch都可以完成。
        2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
    两个重要的小原则：
          1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
          2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
            这样this的指向才是vm 或 组件实例对象。
-->
```

## Vue 监视数据的原理

```html
<!--
  Vue监视数据的原理：
    1. vue会监视data中所有层次的数据。

    2. 如何监测对象中的数据？
            通过setter实现监视，且要在new Vue时就传入要监测的数据。
              (1).对象中后追加的属性，Vue默认不做响应式处理
              (2).如需给后添加的属性做响应式，请使用如下API：
                      Vue.set(target(给那个对象添加)，propertyName(属性名)/index，value) 或 
                      vm.$set(target，propertyName/index，value)

    3. 如何监测数组中的数据？
              通过包裹数组更新元素的方法实现，本质就是做了两件事：
                (1).调用原生对应的方法对数组进行更新。
                (2).重新解析模板，进而更新页面。

    4.在Vue修改数组中的某个元素一定要用如下方法：
          1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
          2.Vue.set(target(给那个对象添加[索引]),索引值，要更新的值) 或 vm.$set(target(给那个对象添加[索引]),索引值，要更新的值)
    
    特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
-->
```

### 数据劫持

1. 数据劫持：把 data 里面的属性包装成\_data，带有 getter 和 setter 的形式
   把传入的 data 里面的每一个属性都遍历，变为带有 getter 和 setter 的形式，管这种变化，这种操作这种行为`数据的劫持`
   只要有人修改了 \_data 里面的属性或者属性值，都会被 setter 所劫持到，然后接收要改的数据，进行修改和重新解析模板

### 案例

```js
const vm = new Vue({
  el: '#root',
  data: {
    student: {
      name: 'tom',
      age: 18,
      hobby: ['抽烟', '喝酒', '烫头'],
      friends: [
        { name: '王五', age: 18 },
        { name: '张二', age: 18 },
      ],
    },
  },
  methods: {
    // 添加性别
    addGender() {
      // 参数1：给谁添加 参数2：要添加的对象(字符串形式) 参数3：要添加对象的值
      // this.$set(this.student, 'gender', '男') // 方法1：
      Vue.set(this.student, 'gender', '男') // 方法2：
    },
    // 添加一个朋友 Friend
    addFriend() {
      this.student.friends.unshift({ name: '张六', age: 18 })
    },
    changeFirstFriend() {
      this.student.friends[0].name = '张三'
    },
    // 添加一个爱好
    addHobby() {
      this.student.hobby.push('打豆豆')
    },
    // 修改第一个爱好
    changeFirstHobby() {
      // Array.splice(从第几个开始，删几个) // 两个参数
      // Array.splice(从第几个开始，跟换几个，'要跟换的值') // 三个参数
      // 修改数组方法1：
      // this.student.hobby.splice(0, 1, '开车')
      // 修改数组方法2：
      // Vue.set(this.student.hobby, 0, '开车')
      // 修改数组方法3：
      this.$set(this.student.hobby, 0, '开车')
    },
    // 移除抽烟的爱好
    removeSmoke() {
      this.student.hobby = this.student.hobby.filter((item) => item !== '抽烟')
    },
  },
})
```

## 计算属性

```html
<!-- 
  计算属性：
    1.定义：要用的属性不存在，要通过已有属性计算得来。
    2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
    3.get函数什么时候执行？
          (1).初次读取时会执行一次。以后再读不会调用,有缓存;
          (2).当 "依赖" 的数据发生 "改变" 时会被再次调用。
    4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
    5.备注：
        1.计算属性最终会出现在vm上，"直接读取"使用即可。
        2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
-->
```

### 计算属性完整写法和简写

```js
const vm = new Vue({
  el: '#root',
  data: {
    firstName: '张',
    lastName: '三',
  },
  // 计算属性
  computed: {
    // 完整写法
    /* fullName: {
        get() {
          console.log('调用 get')
          return this.firstName + '-' + this.lastName
        },
        set(value) {
          this.firstName = value.split('-')[0]
          this.lastName = value.split('-')[1]
        }
      } */

    // 简写
    // 注意: 计算属性不考虑修改,只考虑读取可以简写; 不定义 set 函数
    // 写成函数, 当 get() 用
    fullName() {
      return this.firstName + '-' + this.lastName
    },
  },
})
```

> 注意: 计算属性`不考虑修改`,`只考虑读取`可以`简写`; 不定义 set 函数

### 什么是计算属性

计算属性`本质上`就是一个 `function 函数`，它可以`实时监听` data 中数据的变化，并 `return 一个计算后的新值`，供组件渲染 DOM 时使用。

计算属性指的是`通过一系列运算`之后，最终得到一个`属性值`。`这个动态计算出来的属性值`可以被`模板结构(v-bind 或 {{}})`或 `methods` 方法使用。

```html
<div id="app">
  <!-- 专门用户呈现颜色的 div 盒子 -->
  <!-- 在属性身上，：代表 v-bind:  属性绑定 -->
  <!-- :style 代表动态绑定一个样式对象，它的值是一个 {} 样式对象 -->
  <!-- 当前的样式对象中，只包含 backgroundColor 背景颜色 -->

  <!-- 在 vue: v-bind的后面 和 插值({{}}) 里面 都是 JS 的表达式-->
  <div class="box" :style="{ backgroundColor: rgb }">
    <!-- 使用计算属性 -->
    {{ rgb }}
  </div>
  <button @click="show">按钮</button>
</div>
<script>
  let vm = new Vue({
    el: '#app',
    data: {
      r: 0,
      g: 0,
      b: 0,
    },
    methods: {
      show() {
        console.log(this.rgb) // 使用计算属性
      },
    },
    // 所有的计算属性，都要定义到 computed 节点之下
    // 计算属性在定义的时候，要定义成 '方法格式'，使用的时候是 属性
    computed: {
      // rgb 作为一个计算属性，被定义成了方法格式
      // 这个方法中,要返回一个生成好的 rgb(x,x,x)字符串
      rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
      },
    },
  })
</script>
```

> 注意: 在 `vue` 里, `v-bind的后面` 和 `插值({{}}) 里面` 都是 `JS` 的表达式

### 计算属性的特点：

1. `定义`的时候，要被定义为“`方法`”
2. 在`使用`计算属性的时候，当普通的`属性`使用即可

好处：

1. 实现了代码的`复用`
2. 只要计算属性中依赖的`数据源变化`了，则计算属性会`自动重新求值`！

### 计算属性的`使用注意点`

① 计算属性`必须定义在 computed 节点中`
② 计算属性`必须是一个 function 函数`
③ 计算属性`必须有返回值`
④ 计算属性`必须当做普通属性使用`

### 计算属性 vs 方法

相对于方法来说，`计算属性会缓存计算的结果`，只有计算属性的`依赖项发生变化`时，才会`重新进行运算`。因此计算属性的性能更好：

```html
<template>
  <div>
    <input type="text" v-model.number="count" />
    <p>{{ count }} 乘以 2 的值为：{{ result() }}</p>
    <p>{{ count }} 乘以 2 的值为：{{ result() }}</p>
    <p>{{ count }} 乘以 2 的值为：{{ result() }}</p>

    <p>{{ count }} 乘以 2 的值为：{{ result }}</p>
    <p>{{ count }} 乘以 2 的值为：{{ result }}</p>
    <p>{{ count }} 乘以 2 的值为：{{ result }}</p>
  </div>
</template>
<script>
  export default {
    // 计算属性：定义的时候是 方法，使用的时候是 属性
    computed: {
      result() {
        // 计算属性的计算结果会被缓存，性能更好
        console.log('计算属性被执行了') // 打印一次
        return this.count * 2
      },
    },
    methods: {
      result() {
        // 方法的计算结果无法被缓存，性能低
        console.log('方法被执行了') // 打印三次
        return this.count * 2
      },
    },
  }
</script>
```

## vue-cli

### 单页面应用程序

`单页面应用程序`（英文名：`S`ingle `P`age `A`pplication）简称 SPA，顾名思义，指的是`一个 Web 网站中只有唯一的一个 HTML 页面`，所有的功能与交互都在这唯一的一个页面内完成。

### vue-cli 的使用

`vue-cli 是 Vue.js 开发的标准工具`。它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程。

[中文官方](https://cli.vuejs.org/zh/)

#### 安装和使用

vue-cli 是 npm 上的一个`全局包`，使用 `npm install` 命令，即可方便的把它安装到自己的电脑上：

1. 安装包

```
npm i -g @vue/cli
```

2.  检查 vue-cli 版本

```
vue --version  简写 vue -V
```

4. 在终端下运行如下的命令，创建指定名称的项目：

```bash
vue cerate 项目的名称
```

3. vue 项目中 src 目录的构成：

```text
assets 文件夹：存放项目中用到的静态资源文件，例如：css 样式表、图片资源
components 文件夹：程序员封装的、可复用的组件，都要放到 components 目录下
main.js 是项目的入口文件。整个项目的运行，要先执行 main.js
App.vue 是项目的根组件。定义ui结构
```

#### vue-ui 可视化窗口创建

1. 命令行创建

```
vue-ui
```

#### vue 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 `main.js` 把 `App.vue` 渲染到 `index.html` 的指定区域中。

其中：
① `App.vue` 用来编写待`渲染`的`模板结构`, 根组件
② `index.html` 中需要预留一个 `el 区域`
③ `main.js` 把 App.vue 渲染到了 index.html 所预留的区域中

#### 脚手架文件结构

    ├── node_modules
    ├── public
    │   ├── favicon.ico: 页签图标
    │   └── index.html: 主页面
    ├── src
    │   ├── assets: 存放静态资源
    │   │   └── logo.png
    │   │── component: 存放组件
    │   │   └── HelloWorld.vue
    │   │── App.vue: 汇总所有组件
    │   │── main.js: 入口文件
    ├── .gitignore: git版本管制忽略的配置
    ├── babel.config.js: babel的配置文件
    ├── package.json: 应用包配置文件
    ├── README.md: 应用描述文件
    ├── package-lock.json：包版本控制文件

#### vue 入口文件 main.js

```js
// 导入 vue 这个包，得到 Vue 构造函数
import Vue from 'vue'
// 导入 App.vue 根组件, 将来要把 App.vue 中的模板结构,渲染到 HTML 页面中
import App from './App.vue'

// import Test from './Test.vue'

Vue.config.productionTip = false

// 创建 Vue 的实例对象
new Vue({
  // $mount('#app') 和 手动 el 指定控制区域一样
  // el: '#app',
  // 把 render 函数指定的组件,渲染到 HTML 页面中
  // render 函数中，渲染的是那个，.vue 组件，那么这个组件就叫做‘根组件’
  render: (h) => h(App),
}).$mount('#app')

// Vue 实例的 $mount() 方法,作用和 el 属性完全一样
```

#### render 函数

1. render 函数：vue 调用,传递一个 createElement 函数；createElement 函数作用是创建具体元素，编写具体的内容；且 render 函数必须要有返回值；返回要创建的元素和内容。

```js
// 创建Vue实例对象 vm
new Vue({
  // render: h => h(App)
  // render(createElement) {
  //   return createElement(App)
  // }
  render: (createElement) => createElement(App),
}).$mount('#app')
```

#### vue.config.js 配置文件

1. 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置。
2. 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

#### 关于不同版本的 Vue：

1. vue.js 与 vue.runtime.xxx.js 的区别：
   (1).vue.js 是完整版的 Vue，包含：核心功能+模板解析器。
   (2).vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。

2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用
   render 函数接收到的 createElement 函数去指定具体内容。

## vue 组件

### 什么是组件化开发

`组件化开发`指的是：根据`封装`的思想，把`页面上可重用的 UI 结构封装为组件`，从而方便项目的开发和维护。

### 非单文件组件

一个 html 文件里面，有 n 个组件

```html
<template>
  <div id="app"></div>
</template>

<script>
  export default {}
</script>

<style></style>
```

```html
<!-- 
  Vue中使用组件的三大步骤：
      一、定义组件(创建组件)
      二、注册组件
      三、使用组件(写组件标签)

  一、如何定义一个组件？
        使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
        区别如下：
            1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
            2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
        备注：使用template可以配置组件结构。

  二、如何注册组件？
          1.局部注册：靠new Vue的时候传入components选项
          2.全局注册：靠Vue.component('组件名',组件)

  三、编写组件标签：
          <school></school>
-->
```

```html
<body>
  <!-- 根组件容器 container -->
  <div id="root">
    <!-- 使用组件子组件 -->
    <school></school>
    <hr />
    <!-- 使用组件子组件 -->
    <student></student>
    <hr />
    <!-- 使用全局注册的子组件 -->
    <person></person>
  </div>
</body>
<script>
  // 定义子组件
  const school = Vue.extend({
    template: `<div>
                  <h1>学校</h1>
                  <h2>名称：{{name}}</h2>
                  <h2>地址：{{address}}</h2>
              </div>`,
    // 为什么写成函数形式：避免组件被复用时，数据存在引用关系
    data() {
      return {
        name: '前端',
        address: '重庆市',
      }
    },
  })

  // 定义子组件
  const student = Vue.extend({
    name: 'student',
    // el:'#root', // 子组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
    template: `<div>
                  <h1>学生</h1>
                  <h2>名称：{{name}}</h2>
                  <h2>地址：{{address}}</h2>
              </div>`,

    data() {
      return {
        name: '前端',
        address: '北京市',
      }
    },
  })

  // 定义子组件
  const person = Vue.extend({
    // 定义组件名，调试工具需要; 也可以不定于
    name: 'person',
    template: `<div>
                  <h1>人{{name}}---组件</h1>
               </div>`,
    data() {
      return {
        name: '祖宗',
      }
    },
  })

  // 全局注册组件
  Vue.component('person', person)

  // 根组件
  const vm = new Vue({
    el: '#root',
    // 注册局部组件
    components: {
      school,
      student,
    },
  })
</script>
```

#### 注意点

```html
<!-- 
  几个注意点：
      1.关于组件名:
            一个单词组成：
                  第一种写法(首字母小写)：school
                  第二种写法(首字母大写)：School
            多个单词组成：
                  第一种写法(kebab-case命名)：my-school
                  第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
            备注：
                (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
                (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

      2.关于组件标签:
            第一种写法：<school></school>
            第二种写法：<school/>
            备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

      3.一个简写方式：
            const school = Vue.extend(options) 可简写为：const school = options
-->
```

#### VueComponent 构造函数

```html
<!-- 
  关于VueComponent：
        1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

        2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
          即Vue帮我们执行的：new VueComponent(options)。

        3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

        4.关于this指向：
            (1).组件配置中：
                  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
            (2).new Vue(options)配置中：
                  data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

        5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
          Vue的实例对象，以后简称vm。
-->
```

### 单文件组件

一个文件中包含有一个组件

### vue 中的组件化开发

vue 是一个`支持组件化开发`的前端框架。
vue 中规定：`组件的后缀名是` `.vue`。之前接触到的 App.vue 文件本质上就是一个 vue 的组件。

### vue 组件的三个组成部分

每个 .vue 组件都由 3 部分构成，分别是：

- `template` -> 组件的`模板结构`
- `script` -> 组件的 `JavaScript 行为`
- `style` -> 组件的`样式`
  其中，`每个组件中必须包含 template 模板结构`，而 `script 行为`和 `style 样式`是`可选`的组成部分。

#### template

vue 规定：每个组件对应的`模板结构`，需要定义到 `<template> 节点`中。

```xml
<!-- template 定义 Ui 结构 -->
<!-- 注意：在 template 中只能有一个根节点 -->
<template>
  <div class="test-box">
    <h3>这是用户自定义的 Test.vue--{{ username }}</h3>
    <button @click="changeName">修改用户名</button>
  </div>
</template>
```

> 注意：
>
> - template 是 vue 提供的`容器标签`，只起到`包裹性质的作用`，它`不会被渲染`为真正的 DOM 元素
> - template 中`只能包含唯一的根节点`

#### script

vue 规定：开发者可以在 < script > 节点中`封装组件的 JavaScript 业务逻辑`。
< script > 节点的基本结构如下：

```html
<!-- script 定义当前组件的行为 -->
<script>
  // 默认导出; 固定写法
  export default {
    // data 数据源
    // 注意：.vue 组件中的 data 不能像之前一样，不能指向对象
    // 组件中的 data 必须是一个函数
    data() {
      // 这个 return 出去的 {} 中，可以定义数据
      return {
        username: 'admin',
      }
    },
    methods: {
      changeName() {
        // 在组件中，this 就表示当前组件的实例对象
        console.log(this)
        this.username = '李四'
      },
    },
    // 当前组件中的侦听器
    watch: {},
    // 当前组件中的计算属性
    computed: {},
    // 当前组件中的过滤器
    filters: {},
  }
</script>
```

> 注意：
> vue 规定：.vue 组件中的 data` 必须是一个函数`，`不能`直接`指向一个数据对象`。
> 会导致`多个组件实例`共用`同一份数据`的问题

#### style

vue 规定：组件内的 < style > 节点是`可选的`，开发者可以在 < style > 节点中`编写样式美化当前组件的 UI 结构`。

```html
<!-- style 美化当前组件的样式 -->
<!-- 在 <style> 标签上添加 lang="less" 属性 -->
<style lang="less">
  .test-box {
    background-color: pink;
    h3 {
      color: red;
    }
  }
</style>
```

### 组件之间的`父子关系`

1. 组件在被`封装好`之后，`彼此之间是相互独立的`，`不存`在父子关系
2. 在`使用组件`的时候，`根据彼此的嵌套关系`，形成了`父子关系`、`兄弟关系`

#### 使用组件的三个步骤

步骤 1：使用 import 语法`导入需要的组件`

App.vue 根组件

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr />

    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <!-- 3. 以标签形式, 使用注册好的组件 -->
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
  // 1.导入需要使用的 .vue 组件
  import Left from '@/components/Left.vue'
  import Right from '@/components/Right.vue'

  export default {
    data() {
      return {}
    },
    methods: {},
    components: {
      // 2.注册组件
      // Left 是 'Left': Left 简写
      Left,
      Right,
    },
    filter: {},
    watch: {},
  }
</script>

<style lang="less"></style>
```

> 注意：通过 `components` 注册的是`私有子组件`

例如：
在`组件 A` 的 components 节点下，注册了`组件 F`。
则组件 F `只能`用在组件 A 中；不能被用在`组件 C` 中。

#### 注册全局组件

在 vue 项目的 `main.js` 入口文件中，通过 `Vue.component()` 方法，可以注册全局组件。

```js
// 导入需要被全局注册的那个组件
import Count from '@/components/Count.vue'
// 参数1：字符串格式，表示组件的‘注册名称’； 参数2：需要被全局注册的那个组件
Vue.component('MyCount', Count)
```

### 组件的 props

props 是组件的`自定义属性`，在`封装通用组件`的时候，合理地使用 props 可以极大的`提高组件的复用性`！
它的语法格式如下：

#### props 配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：`<Demo name="xxx"/>`

3. 接收数据：

   1. 第一种方式（只接收）：`props:['name'] `

   2. 第二种方式（限制类型）：`props:{name:String}`

   3. 第三种方式（限制类型、限制必要性、指定默认值）：

> 备注：props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中一份，然后去修改 data 中的数据。

```js
export default {
  // 组件的自定义属性
  // props:['自定义属性1','自定义属性2','自定义属性3'],
  props: ['init'],
}
```

#### props 是只读的

vue 规定：组件中封装的自定义属性是`只读的`，程序员`不能直接修改` props 的值。否则会直接报错：
要想修改 props 的值，可以`把 props 的值转存到 data 中`，因为 data 中的数据都是可读可写的！

```js
export default {
  props: ['init'], // props 里面的优先级高于data里面的数据；props数据优先解析；而且是只读的
  data() {
    return {
      count: this.init, // 把 this.init 的值转存到 count
    }
  },
}
```

#### props 对象形式的配置选项

```js
export default {
  data() {
    return {
      count: this.init,
    }
  },
  // 组件的自定义属性, 允许使用者通过自定义属性，为当前组件指定初始值
  // props:['自定义属性1','自定义属性2','自定义属性3'],
  // 自定义属性的名字，是封装者自定义的（只要名称合法即可）
  // props 中的数据，可以直接在模板结构中被使用
  // 注意：props 是只读的，不要直接修改 props 的值 ，否则终端会报错
  // props:['init'],
  props: {
    // 自定义属性A ：{/* 配置选项 */}
    // 自定义属性B ：{/* 配置选项 */}
    // 自定义属性C ：{/* 配置选项 */}
    init: {
      // 如果外界使用 Count 组件的时候，没有传递 init 属性，则默认值生效
      default: 0,
      // init 的值类型必须是  Number 数字
      type: Number,
      // 必填项校验
      required: true,
    },
  },
  methods: {},
}
```

F

### mixin(混入/混合)

1. 功能：可以把` 多个组件``共用的配置 `提取成一个`混入对象`

2. 创建 src/mixin.js 文件

```js
// mixin 模块
// 多个组件公用的配置
export const mixin = {
  data() {
    return {
      name: '张三',
      age: 18,
    }
  },
  methods: {
    showName() {
      alert(this.name)
    },
  },
}
```

3. 使用 mixin

- 局部混入：

组件

```js
// 引入一个 混合
import { mixin } from '../mixin'

export default {
  name: 'MyStudent',
  data() {},
  // 使用 局部混合
  mixins: [mixin],
}
```

- 全局混入：

main.js

```js
// 引入 混合
import { mixin } from './mixin'

// 配置全局混合
Vue.mixin(mixin)
```

### 插件

1. 功能：用于增强 Vue

2. 本质：包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是`插件使用者传递的数据`。

3. 定义插件：

```js
对象.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
```

### 组件之间的样式冲突问题

默认情况下，`写在 .vue 组件中的样式会全局生效`，因此很容易造成多个组件之间的样式冲突问题。

导致组件之间样式冲突的根本原因是：
① `单页面应用程序`中，所有组件的 DOM 结构，都是基于`唯一的 index.html 页面`进行呈现的
② `每个组件`中的样式，都会`影响整个 index.html 页面`中的 DOM 元素

#### 解决组件`样式冲突`的问题

为每个组件分`配唯一的自定义属性`，在编写组件样式时，通过`属性选择器`来控制`样式的作用域`，示例代码如下：

```html
<template>
  <div class="left-container" data-v-001>
    <h3 data-v-001>Left 组件</h3>
  </div>
</template>

<style>
  /* 通过中括号“属性选择器”，来防止组件之间的“样式冲突问题”，
      因为每个组件分配的自定义属性是“唯一的” */
  h3[data-v-001] {
    color: red;
  }
</style>
```

#### style 节点的 scoped 属性

为了提高开发效率和开发体验，vue 为 `style 节点`提供了 `scoped` 属性，从而`防止组件之间的样式冲突`问题：

```html
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
  </div>
</template>

<style scoped>
  /* style 节点的 scoped 属性，用来自动为每个组件分配唯一的“自定义属性”，
    并自动为当前组件的 DOM 标签和 style 样式应用这个自定义属性，防止组件的样式冲突问题  */
  h3 {
    color: red;
  }
</style>
```

#### `/deep/` 样式穿透

如果给当前组件的 style 节点添加了 scoped 属性，则`当前组件的样式对其子组件是不生效的`。如果想让某些样式对子组件生效，可以使用 `/deep/ 深度选择器`。

```html
<style lang="less" scoped>
  .title {
    /* 属性选择器 */
    color: red; /* 不加 /deep/ 时，生成的选择器格式为 .title[data-v-3c83f0b7] */
  }
  /* 后代选择器 */
  /deep/ .title {
    color: red; /* 加上 /deep/ 时，生成的选择器格式为 [data-v-3c83f0b7] .title*/
  }
</style>
```

## 组件的生命周期

```html
<!-- 
    生命周期：
        1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
        2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
        3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
        4.生命周期函数中的this指向是vm 或 组件实例对象。
-->
```

### 生命周期 & 生命周期函数

`生命周期`（Life Cycle）是指一个组件从`创建` -> `运行` -> `销毁`的整个阶段，`强调的是一个时间段`。
`生命周期函数`：是由 vue 框架提供的`内置函数`，会伴随着组件的生命周期，`自动按次序执行`。

> 注意：`生命周期`强调的是`时间段`，`生命周期函数`强调的是`时间点`。

### 组件生命周期函数的分类

`组件创建阶段`(组件生命周期的第 1 个阶段) => `组件运行阶段`(组件生命周期的第 2 个阶段) => `组件销毁阶段`(组件生命周期的第 3 个阶段)

#### 组件创建阶段的`生命周期函数`(执行一次)

new Vue() => beforeCreate => created => beforeMount => mounted

##### 创建组件实例 new Vue() **在内存里面**

以标签的形式，去用这个组件，就代表在创建一个组件的实例

```html
<div class="box-container">
  <!-- 渲染 Left 组件和 Right 组件 -->
  <!-- 以标签形式, 使用注册好的组件 -->
  <Left></Left>
  <Right></Right>
</div>
```

> 注意：一个 vue 组件本质也是一个 vue 的实例

##### beforeCreate 组件生命周期函数

1. 当这个组件对应的`事件`和`生命周期函数`都被初始化(Init Events & Lifecycle)好以后，就会触发 `beforeCreate` 组件生命周期函数
2. 组件的` props`/`data`/`methods` 尚未被创建，都处于`不可用`状态

```js
export default {
  data() {
    return {
      username: '张三',
    }
  },
  // 创建阶段的第一个生命周期函数
  beforeCreate() {
    console.log(this.username) // undefined
  },
}
```

##### created 组件生命周期函数(重要)

1. 在(Init injections & reactivity)阶段，就会初始化 ` props`/`data`/`methods`
2. 当这个阶段结束以后，就会立即自动调 `created` 这个组件生命周期函数
3. 此时组件的 ` props`/`data`/`methods` 已创建好，都处于`可用`的状态，但是组件的`模板结构尚未生成`不能操作 DOM

> 注：在这个阶段我们会`发起 Ajax 请求`，去拿数据

```js
export default {
  data() {
    return {
      username: '张三',
      // 定义 books 数组，存储所有图书的列表数据, 默认为空数组
      books: [],
    }
  },
  // 使用 Ajax 请求图书列表的数据
  methods: {
    initBookList() {
      const xhr = new XMLHttpRequest()
      xhr.open('get', 'http://www.jian.api/getbooks')
      xhr.send()
      xhr.addEventListener('load', () => {
        // 这里需要使用箭头函数改变 this 指向 为 VueComponent
        const result = JSON.parse(xhr.responseText)
        // 给 data 里面的数据赋值，把数据存入 books 中，给页面结构渲染使用
        this.books = result.data
      })
    },
  },
  // 创建阶段的第一个生命周期函数
  beforeCreate() {
    console.log(this.username) // undefined
  },
  // 创建阶段的第二个生命周期函数
  // 1. 在 created 函数里面，调用 methods 中的方法，请求服务器的数据
  // 2. 并且,把请求到的数据,转存到 data 中,供 template 模板渲染的时候使用
  created() {
    console.log(this.username) // 张三
    this.initBookList() // 可以获取数据
  },
}
```

##### beforeMount 组件生命周期函数

1. (Has "template" option?) => `yes` => ( Compile template into render function), 之后基于`数据`和`模板`, 在`内存`中`编译生成` HTML 结构
2. (Has "template" option?) => `no` => ( Compile el is outerHTNL as template), 之后基于`数据`和`模板`, 在`内存`中`编译生成` HTML 结构
3. 当在`内存`中把`模板结构编译生成好`之后, 就会自动调用 `beforeMount` 生命周期函数
4. 当中执行到 beforeMount 函数的时候, `将要把内存`中编译好的 `HTML` 结构`渲染到`浏览器中, 此时浏览器中`还没有`当前组件的 `DOM` 结构

```js
export default {
  data() {
    return {
      username: '张三',
    }
  },
  methods: {},
  // 创建阶段的第一个生命周期函数
  beforeCreate() {},
  // 创建阶段的第二个生命周期函数
  created() {},

  // 创建阶段的第三个生命周期函数
  beforeMount() {
    console.log(document.querySelector('#books')) // null
  },
}
```

##### mounted 组件生命周期函数

1. (Create `vm.$el` and replace `"el"` with it), 用`内存中`编译生成的 HTML 结构,`替换掉 el 属性`指定的 DOM 元素
2. 以上执行完, 就会自动调用 `mounted` 函数, 此时已经把`内存`中的 HTML 结构, `成功的渲染`到了`浏览器`之中,并且浏览器中`已经包含`了当前组件的 `DOM 结构`

```js
export default {
  data() {
    return {
      username: '张三',
    }
  },
  methods: {},
  // 创建阶段的第三个生命周期函数
  beforeMount() {
    console.log(document.querySelector('#books')) // null
  },

  // 创建阶段的第四个生命周期函数
  // 如果要操作当前组件的 DOM , 最早,只能在 mounted 阶段执行
  mounted() {
    console.log(this.$el) // 页面结构元素  <div class="left-container">
    console.log(document.querySelector('#books')) // 成功打印页面元素
  },
}
```

> 注意: 当`执行到 mounted 函数`的时候, `组件创建阶段`就执行完了

#### 组件运行阶段的`生命周期函数`(执行 0 次或者 N 次)

beforeUpdate => updated

##### beforeUpdate 生命周期函数

1. (When data changes?)数据`data`发生了变化，触发 beforeUpdate 函数
2. 此时`将要`根据变化过后、最新的数据，`重新渲染`组件的模板结构

```html
<template>
  <div class="left-container">
    <h3>Left 组件</h3>

    <p>姓名：{{ username }}</p>
    <button @click="username += '!!'">按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "张三",
    }
  },

  // 运行阶段的第一个生命周期函数
  beforeUpdate() {
    // 数据 data 发生了变化，触发 beforeUpdate
    console.log('数据发生了改变！！') // 数据发生了改变！！
    console.log(this.username) // 张三!!
    console.log(document.querySelector('p').innerHTML) // 姓名：张三
    // 表示执行到 beforeUpdate 阶段 data 里面的数据是最新的， 而页面UI结构的内容却是旧的
  }
}
```

> 注意：表示执行到 `beforeUpdate` 阶段 `data` 里面的`数据是最新的`， 而页面`UI结构`的内容却是`旧的`；此时页面还没有来的及`重新渲染`页面

##### updated 生命周期函数

1. 当 beforeUpdate 函数执行完，就立即根据`最新的数据`，`重新渲染`组件的 DOM 结构(Virtual DOM re-render and patch)
2. (Virtual DOM re-render and patch) 执行完就代表，已经根据最新的数据，`完成了`组件 DOM 结构的`重新渲染`, 此时就会自动调用 `updated` 函数

```html
<template>
  <div class="left-container">
    <h3>Left 组件</h3>

    <p>姓名：{{ username }}</p>
    <button @click="username += '!!'">按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "张三",
    }
  },
  // 当数据变化之后，为了能够操作到最新的　DOM　结构，必须把代码写到 updated 生命周期函数中
updated() {
    console.log('数据发生了改变！！') // 数据发生了改变!!
    console.log(this.username) // 张三!!
    console.log(document.querySelector('p').innerHTML) // 姓名：张三!!
    // 证明执行到 updated 函数的时候，数据和UI结构，完成了同步
  }
}
```

> 注意：当下一次数据被修改，还会继续执行这样的过程；如果数据被创建从未发生改变，此时组件运行阶段的`生命周期函数`执行零次；

#### 组件销毁阶段的`生命周期函数`(执行一次)

beforeDestroy => destroyed

##### beforeDestroy 生命周期函数

beforeDestroy `将要销毁`此组件，此时`尚未销毁`，组件还处于`正常工作`的状态

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <!-- 利用 v-if 来创建和移除组件-->
    <button @click="flag = !flag">toggle flag</button>
    <Test v-if="flag"></Test>
  </div>
</template>

<script>
  // 导入需要使用的 .vue 组件
  import Test from '@/components/Test.vue'

  export default {
    // 注册组件
    components: {
      Test,
    },
    data() {
      return {
        flag: true,
      }
    },
    beforeDestroy() {
      console.log('被销毁了') // 组件被移除一次就打印 '被销毁了'
    },
  }
</script>
```

##### destroyed 生命周期函数

1. 当 beforeDestroy 函数执行完,立即执行(Teardown watchers,child components and event listeners)销毁当前组件的数据侦听器\子组件\事件监听...
2. `销毁完成后`, 立即执行 `destroyed` 函数; 当执行到 destroyed 的时候,代表组件已经被销毁,此组件在浏览器中对应的` DOM 结构`已被`完全移除`

### 生命周期总结

```html
<!-- 
    常用的生命周期钩子：
        1.created: 发送ajax请求
        2.mounted: 启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
        3.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

    关于销毁Vue实例
        1.销毁后借助Vue开发者工具看不到任何信息。
        2.销毁后自定义事件会失效，但原生DOM事件依然有效。
        3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
-->
```

## 组件之间的数据共享

### 组件之间的关系

在项目开发中，组件之间的`最常见的关系`分为如下两种：
`① 父子关系`
`② 兄弟关系`

### 父子组件之间的数据共享

父子组件之间的数据共享又分为：
① `父` `->` `子`共享数据
② `子` `->` `父`共享数据

#### 父组件向子组件共享数据

父组件向子组件共享数据需要使用`自定义属性`。

- 父组件

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <hr />
    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left :msg="message" :user="userinfo"></Left>
    </div>
  </div>
</template>
<script>
  import Left from '@/components/Left.vue'

  export default {
    data() {
      return {
        message: 'hello',
        userinfo: { name: '张三', age: 18 },
      }
    },
    components: {
      Left,
    },
  }
</script>
```

- 子组件

```html
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <p>msg的值是{{ msg }}</p>
    <p>user的值是{{ user }}</p>
  </div>
</template>

<script>
  export default {
    props: ['msg', 'user'], // 自定义属性里面的值，只能读不能直接修改
  }
</script>
```

#### 子组件向父组件共享数据

`子`组件`向父`组件共享数据使用`自定义事件`。

- 子组件

```js
export default {
  data() {
    return {
      // 子组件自己的数据，将来希望把 count 值传给父组件
      count: 0,
    }
  },
  methods: {
    add() {
      this.count += 1
      // 把自增的结果，传递给父组件
      // 修该数据时，通过 $emit() 触发自定义事件
      // 1. this.$emit('自定义事件名字', '要传递的参数')
      this.$emit('numchange', this.count)
    },
  },
}
```

- 父组件

```html
<!-- 2. 通过 v-on: 来绑定自定义事件，并提供一个处理函数，拿到传递过来的数据 -->
<Right @numchange="getNewCount"></Right>
<script>
  export default {
    data() {
      return {
        // 定义 countFromSon 来接收子组件传递过来的数据
        countFromSon: 0,
      }
    },
    methods: {
      // 获取子组件传递过来的数据
      // 3. 自定义属性的处理函数，通过形参拿到子组件传递过来的数据
      getNewCount(val) {
        // 转存给 countFromSon
        this.countFromSon = val
      },
    },
  }
</script>
```

#### 组件的自定义事件

1. 一种组件间通信的方式，适用于：**子组件 ===> 父组件**

2. 使用场景：A 是父组件，B 是子组件，B 想给 A 传数据，那么就要在 A 中给 B 绑定自定义事件（**事件的回调在 A 中**）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：`<Demo @changeNum="test"/>` 或 `<Demo v-on:changeNum="test"/>`

   2. 第二种方式，在父组件中：

      ```js
      <Demo ref="demo"/>
      ......
      mounted(){
        // 利用 ref ；this.$refs是所绑定的组件实例对象
         this.$refs.xxx.$on('changeNum',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。

4. 触发自定义事件：`this.$emit('changeNum',数据)`

5. 解绑自定义事件`this.$off('changeNum')`

6. 组件上也可以绑定原生 DOM 事件，需要使用`native`修饰符。

7. 注意：通过`this.$refs.xxx.$on('changeNum',回调)`绑定自定义事件时，回调**要么配置在 methods 中**，**要么用箭头函数**，否则 this 指向会出问题！

### 全局事件总线（GlobalEventBus）

1.  一种组件间通信的方式，适用于`**任意组件间通信**`

2.  安装全局事件总线：

    - main.js

    ```js
    new Vue({
    	......
    	beforeCreate() {
    		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    	},
        ......
    })
    ```

3.  使用事件总线：

    1.  接收数据：A 组件想接收数据，则在 A 组件中给$bus 绑定自定义事件，事件的`**回调留在 A 组件自身**`。

              ```js
              methods(){
                demo(data){......}
              }
              ......
              mounted() {
                <!-- 绑定自定义事件 -->
                this.$bus.$on('自定义事件名',this.demo)
              }
              ```

    2.  提供数据：`this.$bus.$emit('自定义事件名',数据)` 传递方调用$emit；

4.  最好在 beforeDestroy 钩子中，用$off 去解绑**当前组件所用到的**事件。

#### 消息订阅与发布（pubsub）

1.  一种组件间通信的方式，适用于**任意组件间通信**。

2.  使用步骤：

    1.  安装 pubsub：`npm i pubsub-js`

    2.  引入: `import pubsub from 'pubsub-js'`

    3.  接收数据：A 组件想接收数据，则在 A 组件中订阅消息，订阅的**回调留在 A 组件自身**

        ```js
        methods(){
          demo(data){......}
        }
        ......
        mounted() {
          this.pubId = pubsub.subscribe('xxx',this.demo) //订阅消息
        }
        ```

    4.  提供数据：`pubsub.publish('xxx',数据)`

    5.  最好在 beforeDestroy 钩子中，用`PubSub.unsubscribe(pubId)`去**取消订阅**

#### 兄弟组件之间的数据共享

在 `vue2.x` 中，兄弟组件之间数据共享的方案是 `EventBus`

EventBus 的使用步骤：
① 创建 `eventBus.js` 模块，并向外共享一个 `Vue 的实例对象`
② 在数据`发送方`，调用 `bus.$emit`('事件名称', 要发送的数据) 方法`触发自定义事件`
③ 在数据`接收方`，调用 `bus.$on`('事件名称', 事件处理函数) 方法`注册一个自定义事件`

步骤一：
创建 `eventBus.js` 模块

```js
import Vue from 'vue'

// 向外共享 Vue 的实例对象
export default new Vue()
```

步骤二：
确定发送方和接收方，`发送方`调用`bus.$emit`('事件名称', 要发送的数据) 方法

```js
// 1. 导入 eventBus.js 模块
import bus from './eventBus.js'

export default {
  data() {
    return {
      str: '这是发送数据',
    }
  },
  methods: {
    send() {
      // 2. 通过 eventBus 来发数据
      bus.$emit('share', this.str)
    },
  },
}
```

步骤三：
接收方，调用 `bus.$on`('事件名称', 事件处理函数) 方法

```js
// 1. 导入 eventBus.js 模块
import bus from './eventBus.js'

export default {
  data() {
    return {
      // 定义转存的接收数据
      msgFromLeft: '',
    }
  },
  // 在组件的 props/data/methods 已创建好，数据是可用的状态，去拿数据和存数据
  created() {
    // 2. 为 bus 绑定自定义属性, 自定义属性必须一致
    bus.$on('share', (val) => {
      console.log('在 Right 组件中定义的 share 被触发了', val)
      // 把 val 转存给 数据 data 里面的 msgFromLeft
      this.msgFromLeft = val
    })
  },
}
```

## ref 引用

1. 被用来给元素或子组件注册引用信息（id 的替代者）
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`
   2. 获取：`this.$refs.xxx`

### 什么是 ref 引用

ref 用来辅助开发者在`不依赖于 jQuery 的情况下`，获取 DOM 元素或组件的引用。
每个 vue 的组件实例上，都包含一个 `$refs 对象`，里面存储着对应的 DOM 元素或组件的引用。默认情况下，`组件的 $refs 指向一个空对象`。

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <button @click="getRef">打印 this</button>
  </div>
</template>

<script>
  export default {
    methods: {
      getRef() {
        // 当前 App 组件的实例对象
        // this 是当前组件的实例对象，this.$refs 默认指向空对象
        console.log(this)
      },
    },
  }
</script>
```

### 使用 ref 引用 DOM 元素

如果想要使用 ref `引用页面上的 DOM 元素`

```html
<template>
  <div class="app-container">
    <!-- 使用 ref 属性，为对应的 DOM 添加引用名称 -->
    <h1 ref="first_h1">App 根组件</h1>
    <button @click="showThis">打印 this</button>
  </div>
</template>

<script>
  export default {
    methods: {
      showThis() {
        // 当前 App 组件的实例对象
        // 通过 this.$refs.引用的名称，可以获取到 DOM 元素的引用
        console.log(this.$refs.first_h1)
        // 操作 DOM 元素，把文本颜色改为红色
        this.$refs.first_h1.style.color = 'red'
      },
    },
  }
</script>
```

### 使用 ref 引用组件实例

如果想要使用 ref `引用页面上的组件实例`

```html
<template>
  <div class="app-container">
    <h1 ref="first_h1">App 根组件</h1>

    <button @click="resetLeftCount">重置 Left 组件中的 count 值为 0</button>
    <!-- 使用 ref 属性，为对应的“组件”添加引用名称 -->
    <Left ref="getLeft"></Left>
  </div>
</template>

<script>
  import Left from '@/components/Left.vue'

  export default {
    methods: {
      // 点击按钮重置 Left 组件的count值
      resetLeftCount() {
        // 通过 this.$refs.引用的名称 可以引用组件的实例
        // 引用到组件的实例之后，就可以调用组件上的 methods 方法
        this.$refs.getLeft.resetCount()
        this.$refs.getLeft.count = 0
      },
    },
    components: {
      Left,
    },
  }
</script>

<!-- 被调用的组件 -->
<template>
  <div>Left 组件</div>
  <p>count 的值是：{{ count }}</p>
  <button @click="count += 1">+1</button>
</template>

<script>
  export default {
    name: 'MyLeft',
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      resetCount() {
        this.count = 0
      },
    },
  }
</script>
```

### 控制文本框和按钮的按需切换

通过布尔值 `inputVisible` 来控制组件中的文本框与按钮的按需切换。

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <input type="text" v-if="inputVisible" />
    <button v-else @click="showInput">展示输入框</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 控制输入框和按钮的按需切换
        // 默认 false 展示按钮
        inputVisible: false,
      }
    },
    methods: {
      // 点击按钮展示输入框
      showInput() {
        // 切换布尔值，显示文本框
        this.inputVisible = true
      },
    },
  }
</script>
```

### 让文本框自动获得焦点

当文本框展示出来之后，如果希望它立即获得焦点，则可以为其添加 ref 引用，并调用原生 DOM 对象的`.focus()` 方法即可。

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <!-- ref 获取 DOM  -->
    <input type="text" v-if="inputVisible" @blur="showBtn" ref="iptRef" />
    <button v-else @click="showInput">展示输入框</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 控制输入框和按钮的按需切换
        // 默认 false 展示按钮
        inputVisible: false,
      }
    },
    methods: {
      // 点击按钮展示输入框
      showInput() {
        this.inputVisible = true
        // 获取文本框 DOM 引用，并调用 .focus() 使其自动获得焦点
        this.$refs.iptRef.focus()
        // 报错："TypeError: Cannot read properties of undefined (reading 'focus')"；
        console.log(this.$refs.iptRef) // undefined
        // 是因为 JS 是单线程，当前数据更新，就立即执行获取页面元素代码，且只是页面数据更新了，而页面结构还没有时间来更新渲染，从而 this.$refs.iptRef 获取不到页面结构的ref引用是 undefined, undefined 无法调用 focus() 方法
      },
      showBtn() {
        this.inputVisible = false
      },
    },
  }
</script>
```

### `this.$nextTick(callback)` 方法

组件的 `$nextTick(callback)` 方法，会把 callbak 回调`推迟到下一个 DOM 更新周期之后执行`。通俗的理解是：等`组件的 DOM 异步的更新完成`之后，再执行 callbak 回调函数。从而能保证 callbak 回调函数可以操作到最新的 DOM 元素。

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <input type="text" v-if="inputVisible" @blur="showBtn" ref="iptRef" />
    <button v-else @click="showInput">展示输入框</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 控制输入框和按钮的按需切换
        // 默认 false 展示按钮
        inputVisible: false,
      }
    },
    methods: {
      // 点击按钮展示输入框
      showInput() {
        this.inputVisible = true
        // 使用 this.$nextTick(callback) 方法 推迟到下一个 DOM 更新周期之后执行；解决上述报错
        this.$nextTick(() => {
          this.$refs.iptRef.focus()
        })
      },
      showBtn() {
        this.inputVisible = false
      },
    },
  }
</script>
```

## Vuex

### 概念

​ 在 Vue 中实现`集中式状态state（数据）管理`的一个 Vue `插件`，对 vue 应用中`多个组件的共享状态(数据)`进行集中式的管理（`读/写`），也是一种组件间通信的方式，且适用于` 任意``组件间通信 `。

### 何时使用？

​ 多个组件需要共享数据时

### 搭建 vuex 环境

1. 创建文件：`src/store/index.js`或`vuex/store.js`

   ```js
   // 引入Vue核心库
   import Vue from 'vue'
   // 引入Vuex
   import Vuex from 'vuex'
   // 应用Vuex插件
   Vue.use(Vuex)
   // 1.应用完Vuex插件，创建vm就可以传入store这个配置项
   // 2.注意：应用Vuex插件，必须在store创建之前

   // 准备actions对象——响应组件中用户的动作
   const actions = {}
   // 准备mutations对象——修改state中的数据
   const mutations = {}
   // 准备state对象——保存具体的数据
   const state = {}

   // 创建并暴露store
   // 管理actions、mutations、state
   export default new Vuex.Store({
     actions,
     mutations,
     state,
   })
   ```

2. 在`main.js`中创建 vm 时传入`store`配置项

   ```js
   ......
   //引入store
   import store from './store/index'
   ......

   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
    // 配置store项
   	store
   })
   ```

### 基本使用

1. 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

```js
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// 准备actions ---- 用于响应组件里面的动作
const actions = {
  // actions里面的函数：参数1：小型的store；参数2：组件传递的值
  // 响应组件中加的动作
  add(context, value) {
    // ADD 大写与 add 是 actions 里面的做区分
    context.commit('ADD', value)
  },
}

// 注意：没有较多的逻辑可以越过 actions 对象（逻辑写在组件中）；直接  commit 提交到 mutations
/* add() { // 组件中
      this.$store.commit('ADD', this.num)
    }, */

// 准备mutations ---- 用于操作数据（state）
const mutations = {
  // 执行加；逻辑写在 actions 或者 组件
  // 参数1：数据；包装过的state 参数2：组件传递的值
  ADD(state, value) {
    state.sum += value
  },
}
// 准备state ---- 用于存储数据
// 初始化数据
const state = {
  sum: 0,
}

// 创建store并暴露
export default new Vuex.Store({
  actions,
  mutations,
  state,
})
```

2. 组件中读取 vuex 中的数据：`$store.state.sum`

3. 组件中修改 vuex 中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`

   > 备注：若没有网络请求或其他业务逻辑，组件中也可以越过 actions，即不写`dispatch`，直接编写`commit`

### getters 配置的使用

1. 概念：当 state 中的数据需要经过加工后再使用时，可以使用 getters 加工。
   注意：如果`逻辑复杂`，且需要多次`复用`才需要；它类似于组件的计算属性；需要依赖数据源和`需要 return 返回值`
2. 在`store.js`中追加`getters`配置

   ```js
   ......

   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }

   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：`$store.getters.bigSum`

### 四个 map 方法的使用

1. <strong>mapState 方法：</strong>用于帮助我们映射`state`中的数据为计算属性

   ```js
   computed: {
       // 借助mapState生成计算属性：sum、school、subject；从state中获取数据（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),

       // 借助mapState生成计算属性：sum、school、subject；从state中获取数据（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters 方法：</strong>用于帮助我们映射`getters`中的数据为计算属性

   ```js
   computed: {
       // 借助mapGetters生成计算属性：bigSum ；从getters中获取数据（对象写法）
       ...mapGetters({bigSum:'bigSum'}),

       // 借助mapGetters生成计算属性：bigSum ；从getters中获取数据（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions 方法：</strong>用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations 方法：</strong>用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),

       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions 与 mapMutations 使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改`store.js`

   ```js
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }

   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }

   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取 state 数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取 getters 数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用 dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用 commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

## Vue 封装的过度与动画

1. 作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。

2. 写法：

   1. 准备好样式：

      - 元素`进入`的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素`离开`的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用`<transition>`包裹要过度的元素，并配置 name 属性：

      ```vue
      <transition name="showTime">
      	<h1 v-show="isShow">来吧！展示</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

## 动态组件

### 什么是动态组件

动态组件指的是`动态切换组件的显示与隐藏`。

### 如何实现动态组件渲染

vue 提供了一个内置的 `<component>` 组件，`专门用来实现动态组件的渲染`。

```html
<script>
  data(){
    // 1. 当前要渲染的组件名称
    return {
      // comName 表示要展示的组件名字
      comName: 'Left'
    }
  }
</script>
<!-- 2.通过 is 属性，动态的指定要渲染的组件 -->
<!--  component 标签是 vue 内置的，作用：组件的占位符  -->
<!--  is 属性的值，表示指定要渲染的组件名 -->
<component :is="comName"></component>

<!-- 3.点击按钮，动态切换组件的名称 -->
<button @click="comName = 'Left'">展示 Left</button>
<button @click="comName = 'Right'">展示 Right</button>
```

### 使用 keep-alive 保持状态

默认情况下，切换动态组件时`无法保持组件的状态`。此时可以使用 vue 内置的 `<keep-alive>` 组件保持动态组件的状态。

```xml
<!-- keep-alive vue内置的,可用把内部的组件进行缓存(inactive)，保证组件被隐藏了，也不会被销毁 -->
<keep-alive>
  <component :is="comName"></component>
</keep-alive>
```

#### keep-alive 对应的生命周期函数

当组件`被缓存`时，会自动触发组件的 `deactivated` 生命周期函数。
当组件`被激活`时，会自动触发组件的 `activated` 生命周期函数。

```js
export default {
  created() {
    console.log('组件被创建了')
  },
  // vue3 是unmounted()生命周期函数
  destroyed() {
    console.log('组件被销毁了')
  },

  // 当组件第一次被创建的时候，既会执行  created 生命周期，也会执行 activated 生命周期
  // 当组件被激活的时候，指挥触发 activated 生命周期，不再触发 created 生命周期，因为没有被重新创建
  activated() {
    console.log('组件被激活了 activated')
  },
  deactivated() {
    console.log('组件被缓存了 deactivated')
  },
}
```

#### keep-alive 的 include 属性

`include` 属性用来指定：只有`名称匹配的组件`会被缓存。多个组件名之间使用`英文的逗号`分隔：

```xml
<!-- include 包含 ，代表 include 指定哪些组件需要被缓存 -->
<keep-alive include="Left,Right">
  <component :is="comName"></component>
</keep-alive>

<!-- exclude 指定那些组件不需要被缓存的 -->
<!-- include 和 exclude 二选一 不能同时用 -->
<keep-alive exclude="Left">
  <component :is="comName"></component>
</keep-alive>
```

#### 组件`注册名称`和`组件声明的名称`对比：

`组件注册名称`和`组件声明的名称`对比：

1. 组件的“`注册名称`”的主要应用场景是：以`标签的形式`，把注册好的组件，渲染和使用到页面结构中
2. 组件`声明时候`的“`name`”名称的应用场景是：结合 `<keep-alive>` 标签实现`组件缓存`功能；以及在`调试`的时候看见组件的 name 名称

```js
export default {
  // 组件声明的名称
  // name 属性，name 的值，就是组件的名称
  // 组件声明时候的名称“name”是，用在调试和缓存和不缓存的时候用到
  name: 'MyRight',

  // 组件注册名称
  components: {
    // 如果在“声明组件(写组件模板结构的时候)”的时候，没有为组件指定 name 名称，则组件的名称默认就是“注册时候的名称”
    // 注册时候的组件名称，是使用在用标签形式的时候
    Left,
    Right,
  },
}
```

## 插槽

### 什么是插槽

`插槽`（`slot`）是 vue 为`组件的封装者`提供的能力。允许开发者在封装组件时，把`不确定的`、`希望由用户指定的部分`定义为插槽。
可以把插槽认为是组件封装期间，为用户预留的`内容的占位符`。

### 插槽的基础用法

在封装组件时，可以通过 `<slot>` 元素`定义插槽`，从而`为用户预留内容占位符`

- 根组件

```xml
<template>
  <div class="app-container">
    <h1>根组件</h1>
    <!-- 使用组件 -->
    <Left>
      <!-- 在使用 Left 时，为插槽指定集体的内容 -->
      <p>这是在 Left 组件的内容区域</p>
    </Left>
  </div>
</template>
```

- 子组件

```xml
<template>
  <div class="left-container">
    <!-- 声明一个插槽区域 -->
    <!-- 通过 slot 标签，为用户预留内容占位符（插槽） -->
    <slot></slot>
  </div>
</template>
```

> 注意：如果在`封装组件时没有预留`任何` <slot>` `插槽`，则用户提供的任何`自定义内容都会被丢弃`。

### 后备内容(默认内容)

封装组件时，可以为预留的 `<slot>` 插槽提供`后备内容`（`默认内容`）。如果组件的使用者`没有`为插槽提`供任何内容`，则`后备内容会生效`。

```xml
<slot>这是后备（默认内容）内容</slot>
```

### 默认插槽 和 `v-slot:` 指令

`v-slot:` 指令的`简写`形式是 `#`

```xml
<template>
  <div class="app-container">
      <Left>
        <!-- 默认情况下，在使用组件的时候，提供的内容都会被填充到名字为 default 的插槽 之中 -->
        <!-- 1. v-slot：插槽的名称； 指定内容要渲染到那个插槽里面去  -->
        <!-- 2. 注意：v-slot: 只能用在 <template> 标签上 -->
        <!-- 3. template 这个标签，是一个虚拟的标签，只起到包裹性质的作用，但不会被渲染为实质性的 html 元素 -->
        <!-- 4. v-slot: 指令的简写形式是 # -->
        <!-- <template v-slot:default> -->
        <template #default>
          <p>这是在 Left 组件的内容区域</p>
        </template>
      </Left>
  </div>
</template>

<!-- 子组件 -->
<template>
  <div class="left-container">
    <h3>Left 组件</h3>

    <!-- 声明一个插槽区域 -->
    <!-- vue 规定：每一个 slot 插槽，都要有一个 name 名称 -->
    <!-- 如果省略 slot name 属性，则有一个默认名称 default -->
    <slot name="default"></slot>
  </div>
</template>
```

### 具名插槽

如果在封装组件时`需要预留多个插槽节点`，则需要为每个 < slot > 插槽指定`具体的 name 名称`。这种`带有具体名称的插槽`叫做“具名插槽”。

```xml
<!-- 根组件 -->
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <Article>
      <template #title>
        <h3>姜太公钓鱼</h3>
      </template>

      <template #content>
        <div>
          <p>姜太公钓鱼愿者上钩</p>
        </div>
      </template>

      <template #author>
        <div>
          王二名字
        </div>
      </template>
    </Article>
  </div>
</template>

<!-- 子组件 -->
<template>
  <div class="article-container">
    <!-- 文章的标题 -->
    <div class="header-box">
      <slot name="title"></slot>
    </div>

    <!-- 文章的内容 -->
    <div class="content-box">
      <slot name="content"></slot>
    </div>

    <!-- 文章的作者 -->
    <div class="footer-box">
      <slot name="author"></slot>
    </div>
  </div>
</template>
```

> 注意：`没有指定 name 名称`的插槽，会有隐含的名称叫做 “`default`”。

### 作用域插槽

在封装组件的过程中，可以为预留的 <slot> 插槽绑定 props 数据，这种`带有 props 数据的 <slot>` 叫做“`作用域插槽`”。

```xml
<!-- 子组件 -->
<template>
  <div class="article-container">

    <!-- 文章的内容 -->
    <div class="content-box">
      <!-- 在封装组件时，为预留的 <slot> 提供属性对应的值，这种用法，叫做“作用域插槽” -->
      <slot name="content" msg="hello"></slot>
    </div>

  </div>
</template>

<!-- 父组件 -->
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <Article>
    <!-- 1. 接收作用域插槽对外提供的数据 -->
    <!-- 作用域插槽 建议以 scope 命名接收 -->
      <template #content="scope">
        <div>
          <p>姜太公钓鱼愿者上钩</p>
          <!-- 2. 使用作用域插槽的数据 -->
          <p>{{ scope.msg }}</p>
        </div>
      </template>
    </Article>

  </div>
</template>
```

#### 解构插槽 Prop

作用域插槽对外提供的数据对象，可以使用`解构赋值`简化数据的接收过程。

```xml
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <Article>
      <!-- <template #content="scope"> -->
      <!-- 解构赋值 -->
      <template #content="{ msg, user }">
        <div>
          <p>姜太公钓鱼愿者上钩</p>
          <p>{{ user.age }}</p>
          <p>{{ msg }}</p>
        </div>
      </template>
    </Article>

  </div>
</template>
```

总结：

1. 默认情况下, 只提供名称，不提供其他属性，则是`具名插槽`; 如果为预留的 `<slot>` 提供`属性`对应的`值`, 则是`作用域插槽`;
2. 如果提供`属性`对应的`值`，则供父组件使用，父组件用`等号`来接收, 里面可用一次性自定义 `scope` 来接收，或者使用`解构赋值`的方式，解构需要的数据

### 插槽概括

1. 作用：让`父组件`可以向`子组件`指定位置插入 html 结构，也是一种组件间通信的方式，适用于 `父组件 ===> 子组件` 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
      <Category>
        <div>html结构1</div>
      </Category>
      子组件中：
      <template>
        <div>
          <!-- 定义插槽 -->
          <slot>插槽默认内容...</slot>
        </div>
      </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
      <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <!-- v-slot: 简写为 # -->
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
      <template>
        <div>
          <!-- 定义具名插槽 -->
          <slot name="center">插槽默认内容...</slot>
          <slot name="footer">插槽默认内容...</slot>
        </div>
      </template>
      ```

   3. 作用域插槽：

      1. 理解：`数据在组件的自身(插槽)，但根据数据生成的结构需要组件的使用者来决定。`（games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         <Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="(item, i) in games" :key="i">{{ item }}</li>
         				</ul>
         			</template>
          </Category>

         <Category>
              	<!-- 支持对象的解构 -->
         			<template slot-scope="{games}">
         				<!-- 生成的是h5标题 -->
         				<h5 v-for="(item, i) in games" :key="i">{{ item }}</h5>
         			</template>
         </Category>
         子组件中：
         <template>
           <div>
             <!-- 传递数据 -->
             <slot :games="games"></slot>
           </div>
         </template>

         <script>
         export default {
           name: 'Category',
           props: ['title'],
           //数据在子组件自身
           data() {
             return {
               games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
             }
           },
         }
         </script>
         ```

## 自定义指令

vue 官方提供了 v-text、v-for、v-model、v-if 等常用的指令。除此之外 vue 还允许开发者`自定义指令`。

### 自定义指令的分类

- `私有`自定义指令
- `全局`自定义指令

#### 私有自定义指令 `vue3 使用 mounted`

`在每个 vue 组件中，可以在`directives` 节点下声明`私有自定义指令`。

```js
export default {
  // 私有自定义指令的节点
  directives: {
    // 定义名为 color 的指令，指向一个配置对象
    color: {
      // 当指令第一次被绑定到元素上的时候，会立即触发 bind  函数
      // 形参 el 表示当前指令所绑定到的那个 DOM 对象
      // vue3 是使用 mounted
      bind(el) {
        console.log('触发了 v-color 的 bind 函数 ')
        el.style.color = 'red'
      },
    },
  },
}
```

> 注意：使用自定义指令，需要加 `v- 前缀`

### 为自定义指令`动态绑定参数值`

在 template 结构中`使用自定义指令`时，可以通过等号（`=`）的方式，为当前指令`动态绑定参数值`：

```html
<script>
  export default {
    data() {
      return {
        color: 'pink', // 定义 color 的颜色值
      }
    },
  }
</script>

<template>
  <div class="app-container">
    <!-- 在使用指令时，动态为当前指令绑定参数值 color  -->
    <h1 v-color="color">App 根组件</h1>
    <!-- 给 v-color 传了一个值是: 字面量字符串 'red' -->
    <p v-color="'red'">测试</p>
  </div>
</template>
```

### 通过 `binding` 获取指令的参数值

在声明自定义指令时，可以通过形参中的第`二个参数`，来接收指令的参数值：

```js
// 私有自定义指令的节点
  directives: {
    // 定义名为 color 的指令，指向一个配置对象
    color: {
      // 当指令被绑定到元素上的时候，会立即触发 bind  函数
      // 形参1： el 表示当前指令所绑定到的那个 DOM 对象
      // 形参2： binding 自定义，官方建议使用 binding ；其接收一个对象
      bind(el, binding) {
        console.log('触发了 v-color 的 bind 函数 ')
        el.style.color = binding.value
        console.log(binding)
      },
    },
  },
```

### update 函数 `vue3 是updated`

`bind `函数`只调用 1 次`：当指令第一次绑定到元素时调用，`当 DOM 更新时 bind 函数不会被触发`。 `update` 函数会在`每次 DOM 更新`时被调用。

```js
  directives: {
    color: {
      // 当指令第一次被绑定到元素上的时候，会立即触发 bind  函数
      bind(el, binding) {
        console.log('触发了 v-color 的 bind 函数 ')
        el.style.color = binding.value
      },
      // 在 DOM 更新的时候，会触发 update 函数
      update(el, binding) {
        console.log('触发了 v-color 的 update 函数 ')
        el.style.color = binding.value
      },
    },
  },
```

### 函数简写

如果 `bind`和`update`函数中的`逻辑完全相同`，则`对象格式`的自定义指令可以简写成`函数格式`

```js
// 私有自定义指令的节点
  directives: {
    color(el, binding) {
      el.style.color = binding.value
    },
  },
// 等同于写了 bind 和 update 函数
```

### 全局自定义指令

全局共享的自定义指令需要在`入口文件`(main.js)里面通过“`Vue.directive()`”进行声明

```js
// 简写形式
// 参数1：字符串，表示全局自定义指令的名字
// 参数2: 对象或者函数, 用来接收指令的参数值
Vue.directive('color', (el, binding) => {
  el.style.color = binding.value
})
// 全局自定义指令
/* Vue.directive('color', {
  bind(el, binding) {
    el.style.color = binding.value
  },
  update(el, binding) {
    el.style.color = binding.value
  }
}) */
```

### 自定义指令总结

```html
<!-- 
    自定义指令总结：
        一、定义语法：
              (1).局部指令：
                    new Vue({															new Vue({
                      directives:{指令名:配置对象}   或   		directives{指令名:回调函数}
                    }) 																		})
              (2).全局指令：
                      Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)

        二、配置对象中常用的3个回调：
              (1).bind：指令与元素成功绑定时调用。
              (2).inserted：指令所在元素被插入页面时调用。
              (3).update：指令所在模板结构被重新解析时调用。

        三、备注：
              1.指令定义时不加v-，但使用时要加v-；
              2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
-->
```

## axios

> axios 是一个专注于网络请求的库！

### axios 的基本使用

1. 发起 GET 请求：

```js
axios({
  // 请求方式
  method: 'GET',
  // 请求的地址
  url: 'http://www.liulongbin.top:3006/api/getbooks',
  // URL 中的查询参数
  params: {
    id: 1,
  },
}).then((result) => {
  console.log(result)
})

//  简易写法
document.querySelector('#btnGet').addEventListener('click', async () => {
  // 解构赋值的时候,使用 : 进行重命名; 重命名后只能使用重命名的变量名
  const { data: res } = await axios.get(
    'http://www.liulongbin.top:3006/api/getbooks',
    { params: { id: 1 } }
  )
  console.log(res.data)
})
```

2. 发起 POST 请求：

```js
document.querySelector('#btnPost').addEventListener('click', async () => {
  // 如果调用某个方法的返回值是 Promise 实例，则前面可以添加 await！
  // await 只能用在被 async “修饰”的方法中
  const { data: res } = await axios({
    method: 'POST',
    url: 'http://www.liulongbin.top:3006/api/post',
    data: {
      name: 'zs',
      age: 20,
    },
  })
  console.log(res)
})

//  简易写法
document.querySelector('#btnPost').addEventListener('click', async () => {
  // axios.post('url', { /* POST 请求体数据(直接在里面写数据) */} )
  const { data: res } = await axios.post(
    'http://www.liulongbin.top:3006/api/post',
    { name: '张三', gender: '女' }
  )
  console.log(res.body)
})
```

> 1.  如果调用某个方法的`返回值`是 `Promise 实例`，则前面可以添加 `await`！
> 2.  `await` `只能`用在被 `async “修饰”`的方法中

## 全局配置 axios

main.js 入口文件

```js
import Vue from 'vue'

// 设置基地址
// axios.defaults.baseURL = '请求URL'
// 全局配置 axios 的请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 把 axios 挂载到 Vue.prototype 上，供每个 .vue 组件的实例直接使用
Vue.prototype.$http = axios

// 今后，在每个 .vue 组件中要发起请求，直接调用 this.$http.get/post('url')
// 缺点：把 axios 挂载到 Vue 原型上，不利于实现 api 接口的复用

// 子组件使用
 methods: {
    async  postInfo() {
      // 直接调用 this.$http.get/post('url')
      const { data: res } = await this.$http.post('/api/post')
      console.log(res)
    }
  }

```

### axios 拦截器

`拦截器`（英文：Interceptors）会在`每次发起 ajax 请求`和`得到响应`的时候自动被触发

应用场景：
① Token 身份认证
② Loading 效果
③ etc…

#### 配置`请求拦截器`

通过 axios.interceptors.`request`.use(`成功的回调`, 失败的回调) 可以配置请求拦截器。

- main.js

```js
// 配置请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 固定写法
    // 在发送请求之前执行某些操作
    return config
  },
  (error) => {
    // 对请求错误执行某些操作
    return Promise.reject(error)
  }
)
```

> 注意：失败的回调函数可以被省略！

##### 请求拦截器 – `Token 认证`

```js
// 导入 axios
import axios from 'axios'
// 配置根路径
axios.defaults.baseURL = 'https://127.0.0.1'

// 配置请求拦截器
axios.interceptors.request.use((config) => {
  // 为当前请求配置 Token 认证字段
  config.headers.Authorization = 'Bearer xxx'
  // 固定写法
  return config
})

// 全局挂载 axios
Vue.prototype.$http = axios
```

##### 请求拦截器 – `展示 Loading 效果`

```js
// 1.导入 element-ui 模块
import { Loading } from 'element-ui'

// 2.声明变量存储 loading 组件的实例对象
let LoadingInstance = null

// 配置请求拦截器
axios.interceptors.request.use((config) => {
  // 3.调用 Loading 组件的 service() 方法， 展示 loading 效果 ；得到 loading 组件的实例
  LoadingInstance = Loading.service({ fullscreen: true })

  // 固定写法
  return config
})
```

#### 配置`响应拦截器`

通过 axios.interceptors.`response`.use(`成功的回调`, 失败的回调) 可以配置响应拦截器。

调用 `Loading 实例`提供的 `close()` 方法即可`关闭 Loading` 效果，

```js
// 导入 element-ui 模块
import { Loading } from 'element-ui'

// 导入 axios
import axios from 'axios'
// 配置根路径
axios.defaults.baseURL = 'http://127.0.0.1'

// 声明变量存储 loading 实例
let LoadingInstance = null

// 配置响应拦截器
// 监听数据是否拿到
axios.interceptors.response.use((response) => {
  // 拿到数据，关闭 loading 效果
  // 调用 Loading  实例的 close 方法即可关闭 loading 效果
  LoadingInstance.close()
  // 固定写法
  return response
})
```

> 注意：失败的回调函数可以被省略！

## proxy 跨域代理

### 通过`代理`解决接口的跨域问题

通过 vue-cli 创建的项目在遇到接口跨域问题时，可以通过`代理`的方式来解决：

1. 把 axios 的`请求根路径`设置为 `vue 项目的运行地址`（接口请求不再跨域）
2. vue 项目发现请求的接口不存在，把请求`转交给 proxy 代理`
3. 代理把请求根路径`替换为` devServer.proxy 属性的值，`发起真正的数据请求`
4. 代理把请求到的数据，`转发给 axios`

### 在项目中配置 proxy 代理

1. 步骤 1，在 `main.js` 入口文件中，把 `axios 的请求根路径`改造为`当前 web 项目的根路径`：

```js
// 配置根路径
// axios.defaults.baseURL = 'https://www.google.com'

// 配置根路径为项目的的根路径
axios.defaults.baseURL = 'http://localhost:8080/'
```

2. 步骤 2，在`项目根目录`下创建 `vue.config.js` 的配置文件，并声明如下的配置

```js
module.exports = {
  devServer: {
    // 当前项目在开发调试阶段
    // 会将任何未知请求( 没有匹配到静态文件的请求) 代理到  例子: https://www.google.com
    proxy: 'https://www.google.com',
  },
}
```

> 注意：
> ① `devServer.proxy` 提供的代理功能，`仅在开发调试阶段生效`
> ② 项目上线发布时，依旧需要 API 接口服务器`开启 CORS` 跨域资源共享

## vue 脚手架配置跨域代理

### 方法一

​ 在 vue.config.js 中添加如下配置：

```js
devServer: {
  proxy: 'http://localhost:5000'
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

​ 编写 vue.config.js 配置具体代理规则：

```js
module.exports = {
  devServer: {
    proxy: {
      '/api1': {
        // 匹配所有以 '/api1'开头的请求路径
        ws: true, // 用于支持 websocket
        target: 'http://localhost:5000', // 代理目标的基础路径
        changeOrigin: true, // 用于控制请求头中的host值；默认值是 true
        pathRewrite: { '^/api1': '' }, // 重写路径
      },
      '/api2': {
        // 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': '' },
      },
    },
  },
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 前端路由(重要)

路由（英文：router）就是`对应关系`。

1. 理解： 一个路由（route）就是一组`映射(对应)关系`（key - value），多个路由需要路由器（router）进行管理。
2. `前端路由`：`key` 是`路径`，`value` 是`组件`。

### SPA 与前端路由

SPA 指的是一个 web 网站只有唯一的一个 HTML 页面，`所有组件的展示与切换`都在这唯一的一个页面内完成。此时，`不同组件之间的切换`需要通过`前端路由`来实现。
结论：在 SPA 项目中，`不同功能之间的切换`，要`依赖于前端路由`来完成！

#### 什么是前端路由

通俗易懂的概念：`Hash 地址`与`组件`之间的`对应关系`。不同的 hash 地址展示不同的组件
Hash 地址: `url`地址里面 `#`号往后的部分(包含#号)

```js
location.hash
```

#### 前端路由的工作方式

① 用户`点击了`页面上的`路由链接`
② 导致了 `URL 地址栏`中的 `Hash 值`发生了变化
③ `前端路由监听了到 Hash 地址的变化`
④ 前端路由把当前 `Hash 地址对应的组件`渲染都浏览器中

> 结论：前端路由，指的是` Hash 地址`与`组件之间`的`对应关系`！

## vue-router

### 什么是 vue-router

`vue-router` 是 vue.js 官方给出的`路由解决方案`。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目中组件的切换。
[vue-router 的官方文档地址：](https://router.vuejs.org/zh/)

### vue-router 安装和配置的步骤

1. 安装 vue-router 包

```
npm i vue-router@3
```

> vue2 需要安装 3 的版本

2. `创建路由模块`
   在 `src` 源代码目录下，新建 `router/index.js` 路由模块

- 入口文件 main.js

```js
// src/router/index.js 路由模块
// 1.导入 Vue 和 VueRouter 的包
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2.把 VueRoter 安装为 Vue 项目插件 “入口文件应用也可以”
// Vue.use() 函数的作用，用来安装插件
Vue.use(VueRouter)

// 3.创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  // 路由规则
  routes: [
    {
      path: '/about',
      component: About,
    },
    {
      path: '/home',
      component: Home,
    },
  ],
})

// 4.向外共享路由的实例对象
export default router
```

3. 导入并挂载路由模块
   在 src/`main.js` 入口文件中，导入并挂载路由模块。

```js
import Vue from 'vue'
import App from './App.vue'

// 1. 导入路由模块， 拿到路由的实例对象
// import router from '@/router/index.js'
// 在进行模块化导入的时候，如果给定的是文件夹，则默认导入这个文件夹下的 index.js 文件
import router from '@/router'

new Vue({
  render: (h) => h(App),
  // 2. 在 Vue 项目中，要想把路由用起来，必须把路由实例对象，通过下面方式进行挂载
  // router: 路由的实例对象
  // router: router
  router,
}).$mount('#app')
```

4. 实现切换（active-class 可配置高亮样式）

   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着`自己的路由信息`。
4. 整个应用只有一个 router(路由器)，可以通过组件的`$router`属性获取到。

### 多级路由（嵌套路由）

1. 配置路由规则，使用 `children` 配置项：

   ```js
   // 路由规则
   routes: [
     {
       path: '/about',
       component: About,
     },
     {
       path: '/home',
       component: Home,
       children: [
         //通过children配置子级路由
         {
           path: 'news', //此处一定不要写：/news
           component: News,
         },
         {
           path: 'message', //此处一定不要写：/message
           component: Message,
         },
       ],
     },
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 路由的 query 参数

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>

   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link
     :to="{
       path: '/home/message/detail',
       query: {
         id: '007',
         title: '你好',
       },
     }"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

> 这种方式不影响，路由的配置规则

### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>

      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{ name: 'hello' }">跳转</router-link>

      <!--简化写法配合传递参数 -->
      <router-link
        :to="{
          name: 'hello',
          query: {
            id: '007',
            title: '你好',
          },
        }"
      >跳转</router-link>
      ```

### 路由的 params 参数

1. 配置路由，声明接收 params 参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'detail', //给路由命名
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>

   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link
     :to="{
       name: 'detail', //给路由命名
       params: {
         id: 666,
         title: '你好',
       },
     }"
   >跳转</router-link>
   ```

   > 特别注意：路由携带 params 参数时，若使用 to 的对象写法，则`不能使用 path 配置项`，`必须使用 name 配置`！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### `路由`的 `props` 配置

​ 作用：让路由组件更方便的收到参数

```js
{
	name:'detail',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	props: { a: '007', b: '对象' }

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	props:true

	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props($route){
		return {
			id:$route.query.id,
			title:$route.query.title
		}
	}
}
```

### `<router-link>`的 replace 属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式

2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是`替换当前记录`。路由跳转时候默认为`push`

3. 如何开启`replace`模式：`<router-link replace .......>News</router-link>`

### 编程式路由导航

1. 作用：不借助`<router-link> `实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   // $router的两个API
   // 记录历史记录
   this.$router.push({
     name: 'xiangqing',
     params: {
       id: xxx,
       title: xxx,
     },
   })
   // 不记录历史
   this.$router.replace({
     name: 'xiangqing',
     params: {
       id: xxx,
       title: xxx,
     },
   })
   this.$router.forward() // 前进
   this.$router.back() // 后退
   this.$router.go() // 可前进也可后退
   ```

### 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，`不被销毁`。

2. 具体编码：

   ```vue
   <!-- include 配置要缓存的 "组件名" -->
   <keep-alive include="News"> 
   
   <!-- 缓存多个用数组 -->
   <!-- <keep-alive :include=['News','Header']>  -->
       <router-view></router-view>
   </keep-alive>
   ```

> 注意：需要在展示的路由（`路由占位符 "<router-view>"`）`外面包裹` < `keep-alive` > 标签

### `路由`的生命周期`钩子`

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. `activated`路由组件被激活时触发。
   2. `deactivated`路由组件失活时触发。

### 路由守卫

1. 作用：对`路由`进行`权限控制`

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //  全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to, from, next) => {
     if (to.meta.isAuth) {
       // 判断当前路由是否需要进行权限控制
       if (localStorage.getItem('name') === 'jian') {
         // 权限控制的具体规则
         next() // 放行
       } else {
         alert('暂无权限查看')
       }
     } else {
       next() // 放行
     }
   })

   // 全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to, from) => {
     if (to.meta.title) {
       document.title = to.meta.title // 修改网页的title
     } else {
       document.title = 'vue_test'
     }
   })
   ```

4. 独享路由守卫:

   ```js
   // 独享路由守卫---查询路由规则之前调用
   beforeEnter(to,from,next){
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

### 13.路由器的两种工作模式

1. 对于一个 url 来说，什么是 hash 值？—— #及其后面的内容就是 hash 值。
2. hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
3. 如何设置 router/index.js：

   ```js
   new VueRouter({
   mode: 'history', // 路由工作模式 默认 hash
   // 路由规则
   routes: []
   })
   ```

4. hash 模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
5. history 模式：
   1. 地址干净，美观 。
   2. 兼容性和 hash 模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题。

### 声明`路由链接`和`占位符`

在 src/App.vue 根组件中，使用 vue-router 提供的 `<router-link>` 和 `<router-view>` 声明`路由链接`和`占位符`：

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <!-- 1.声明路由链接 -->
    <a href="#/home">首页</a>
    <a href="#/movie">电影</a>
    <a href="#/about">关于</a>

    <!-- 只要在项目中安装和配置了 vue-router ,就可以使用 router-view 这个组件 -->
    <!-- 作用：为组件占位，占位符 -->
    <!-- 2.声明占位符 -->
    <router-view></router-view>
  </div>
</template>
```

#### `<router-link>` 替换 a 链接

```html
<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <!-- 1.声明路由链接 -->
    <!-- 当安装和配置了 vue-router 后，就可以使用 router-link 来代替普通的 a 链接 -->
    <!-- <a href="#/home">首页</a> -->
    <!-- to 等同于 href ; "router-link to" 里面可用不用写 # 号 -->
    <!-- to 来指定 hash 值 -->
    <router-link to="/home">首页</router-link>

    <!-- <a href="#/movie">电影</a> -->
    <router-link to="/movie">电影</router-link>

    <!-- <a href="#/about">关于</a> -->
    <router-link to="/about">关于</router-link>

    <!-- 只要在项目中安装和配置了 vue-router ,就可以使用 router-view 这个组件 -->
    <!-- 作用：为组件占位，占位符; 渲染通过路由连接匹配到的组件 -->
    <router-view></router-view>
  </div>
</template>
```

### 声明路由的匹配规则

在 src/router/index.js 路由模块中，通过 `routes 数组`声明路由的匹配规则。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 导入需要使用路由切换展示的组件
import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter) / components / (02).start
// 2.创建路由的实例对象
const router = new VueRouter({
  // routes 数组，作用：定义 hash地址 和组件之间的对应关系
  routes: [
    // 路由规则
    // { path: 'hash地址名(省略#号)', component: 要展示的组件 }
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/About', component: About },
  ],
})

export default router
```

## vue-router 的常见用法

### 路由重定向

`路由重定向`指的是：用户在访问`地址 A `的时候，`强制用户跳转`到地址 C ，从而展示特定的组件页面。
通过路由规则的 `redirect` 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```js
const router = new VueRouter({
  // routes 数组，作用：定义 hash地址 和组件之间的对应关系
  routes: [
    // 重定向的路由规则
    // 当用户访问 / 的时候，通过 redirect 属性跳转找 /home 对应的路由规则上
    { path: '/', redirect: '/home' },
    // 路由规则
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/About', component: About },
  ],
})
```

### 嵌套路由

通过路由实现`组件的嵌套展示`，叫做嵌套路由。

1. 点击`父级路由链接`显示模板内容
2. 模板内容中又有`子级路由链接`
3. 点击`子级路由链接`显示`子级模板内容`

#### 声明`子路由链接`和`子路由占位符`

在 `About.vue` 组件中，声明 tab1 和 tab2 的`子路由链接`以及`子路由占位符`。

- About.vue 组件

```xml
<template>
  <div class="about-container">
    <h3>About 组件</h3>
    <!-- 1.子级路由链接 -->
    <router-link to="/about/tab1">tab1</router-link>
    <router-link to="/about/tab2">tab2</router-link>

    <hr />
    <!-- 2.子级路由占位符 -->
    <router-view></router-view>
  </div>
</template>
```

#### 通过 `children` 属性声明子路由规则

在 src/router/index.js `路由模块`中，导入需要的组件，并使用 `children 属性`声明子路由规则：

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2.导入子路由规则需要的组件
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 路由规则
    {
      // about 页面的路由规则(父级路由规则)
      path: '/about',
      component: About,
      redirect: '/about/tab1', // 子级重定向的路由规则
      children: [
        // 子路由规则
        // 1. 通过 children 属性，嵌套声明子级路由规则
        // 注意：children里面的子路由规则名字不加 / ，加了相当于访问根路径
        { path: 'tab1', component: Tab1 }, // 访问 /about/tab1 时，展示 Tab1 组件
        { path: 'tab2', component: Tab2 }, // 访问 /about/tab2 时，展示 Tab2 组件
      ],
    },
  ],
})
export default router
```

#### 默认子路由(权重高) 和 子级路由重定向

默认子路由，如果 children 数组中，某个路由规则的 path 值为`空字符串`，则这条路由规则，叫做默认子路由

```js
const router = new VueRouter({
  routes: [
    // 重定向的路由规则
    { path: '/', redirect: '/home' },
    // 路由规则
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    {
      path: '/about',
      component: About,
      // redirect: '/about/tab1', // 子级路由重定向
      children: [
        // 子路由规则
        // 默认子路由，如果 children 数组中，某个路由规则的 path 值为空字符串，则这条路由规则，叫做默认子路由；  如果设置子级重定向的路由规则，默认子路由的 权重高
        // 注意：children里面的子路由规则名字不加 /
        { path: '', component: Tab1 }, // 比 子级重定向的路由规则  权重高
        { path: 'tab2', component: Tab2 },
      ],
    },
  ],
})
```

> 注意：path 地址名和路由链接的 router-link 地址名要保持一致

### 动态路由

动态路由指的是：把 Hash 地址中`可变的部分`定义为`参数项`，从而`提高路由规则的复用性`。在 vue-router 中使用` 英文的冒号``（:） `来定义路由的参数项。

- router-index.js 路由模块

```js
// 在 Movie 组件中，希望根据 id 的值，展示对应的电影详情信息
// 路由中的动态参数以 : 进行声明，冒号后面的动态参数的名称
{ path: '/movie/:id', component: Movie }

// 将以下三个路由规则，合并成一个，提高路由规则的复用性
{ path: '/movie/1', component: Movie }
{ path: '/movie/2', component: Movie }
{ path: '/movie/3', component: Movie }

```

#### `$route.params` 参数对象 方式一：

在`动态路由`渲染出来的组件中，可以使用 this.`$route.params` 对象访问到`动态匹配的参数值`。

```xml
<template>
  <div class="movie-container">
    <!-- this.$route 是路由的参数对象 -->
    <!-- this.$router 是路由的导航对象 -->
    <!-- 访问动态参数的值 this.$route.params -->
    <h3>Movie 组件-- {{ $route.params.id }}</h3>
  </div>
</template>
```

#### props 接收路由参数 方式二：

`为了简化路由参数的获取形式`，vue-router 允许在`路由规则`中`开启 props 传参`。

```html
<script>
  // router-index.js 路由模块
  // 1.在定义路由规则时，声明  props: true 选项
  // 即可在Movie 组件中，以 props 的形式接收打到路由规则匹配的参数项
  { path: '/movie/:id', component: Movie, props: true }
</script>

// Movie.vue 组件
<template>
  <div class="movie-container">
    <!-- 3.直接使用 props 中接收的路由参数-->
    <h3>Movie 组件-- props 接收的参数是：{{ id }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'Movie',
    // 接收 props 数据
    props: ['id'],
  }
</script>
```

#### 查询参数 query 和 path / fullPath

```xml
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
    <!-- 声明路由链接 -->

    <!-- 注意1：在 hash 地址中，/ 后面的参数项，叫做路径参数 -->
    <!-- 在路由参数对象中，需要使用 this.$route.params 来访问路径参数 -->

    <!-- 注意2： 在 hash 地址中，? 后面的参数项，叫做查询参数 -->
    <!-- 在路由参数对象中，需要使用 this.$route.query 来访问查询参数 -->

    <!-- 注意3：在this.$route 中，path 只是路径部分；fullPath 是完整的地址 -->
    <!-- 例如： -->
    <!-- /movie/1  是 path 的值-->
    <!-- /movie/1?name=zs&age=18 是 fullPath 的值 -->
    <router-link to="/movie/1?name=zs&age=18">漫威</router-link>
    <router-link to="/movie/2">绿巨人</router-link>
    <router-link to="/movie/3">电影</router-link>
    <!-- 占位符 -->
    <router-view></router-view>
  </div>
</template>
```

### 声明式导航 & 编程式导航

在浏览器中，`点击链接`实现导航的方式，叫做`声明式导航`。例如：

- 普通网页中点击` <a> 链接`、vue 项目中点击 `<router-link>` 都属于声明式导航

在浏览器中，`调用 API 方法`实现导航的方式，叫做`编程式导航`。例如：

- 普通网页中调用 `location.href` 跳转到新页面的方式，属于编程式导航 location.href 不属于 vue

#### vue-router 中的编程式导航 API

vue-router 提供了许多编程式导航的 API，其中最常用的导航 API 分别是：

① this.$router.`push`('hash 地址')

- 跳转到指定 hash 地址，并增加一条历史记录

② this.$router.`replace`('hash 地址')

- 跳转到指定的 hash 地址，并替换掉当前的历史记录

③ this.$router.`go`(数值 n)

- 实现导航历史前进、后退

#### $router.push

调用 this.`$router.push`() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。

```html
<template>
  <div class="home-container">
    <button @click="goToMarvel">通过 push 跳转到 漫威</button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      goToMarvel() {
        // 通过编程式导航 API ，导航跳转到指定的页面
        this.$router.push('/Movie/1')
      },
    },
  }
</script>
```

#### $router.replace

调用 this.`$router.replace`() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。

```html
<template>
  <div class="home-container">
    <button @click="goToMarvel2">通过 replace 跳转到 漫威</button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      goToMarvel2() {
        this.$router.replace('/Movie/1')
      },
    },
  }
</script>
```

> push 和 replace 的区别：
>
> - push 会`增加一条历史记录`
> - replace 不会增加历史记录，而是`替换掉当前的历史记录`

#### $router.go

调用 this.`$router.go`() 方法，可以在浏览历史中前进和后退。

```html
<template>
  <div class="movie-container">
    <button @click="goBack">后退</button>
    <!-- 在行内使用编程式导航跳转的时候，this 必须省略不然会报错 -->
  </div>
</template>

<script>
  export default {
    name: 'Movie',
    methods: {
      goBack() {
        // go(-1) 表示后退一层
        // 如果后退的层数超过上限，则原地不动
        this.$router.go(-100)
      },
    },
  }
</script>
```

#### $router.`go` 的简化用法

在实际开发中，一般只会前进和后退一层页面。因此 vue-router 提供了如下两个便捷方法：

① $router.`back`()

- 在历史记录中，`后退`到上一个页面

② $router.`forward`()

- 在历史记录中，`前进`到下一个页面

```html
<template>
  <div class="movie-container">
    <!-- 在行内使用编程式导航跳转的时候，this 必须省略不然会报错 -->
    <button @click="$router.back()">back 后退</button>
    <button @click="$router.forward()">forward 前进</button>
  </div>
</template>
```

### 导航守卫

`导航守卫`可以`控制路由的访问权限`。

#### 全局前置守卫

每次发生路由的`导航跳转`时，都会触发`全局前置守卫`。因此，在全局前置守卫中，程序员可以对每个路由进行`访问权限`的控制

- router/index.js 路由模块

```js
// 创建路由实例对象
const router = new VueRouter({...})

// 调用路由实例对象的 beforeEach 方法，即可声明 全局前置导航守卫
// 全局前置导航守卫：前置(当要做什么事，但还没有做)
// 为 router 实例对象，声明全局前置导航守卫
// 只要发生了路由的跳转，必然会触发 beforeEach 指定的 function 回调函数
router.beforeEach(callback)
```

#### 守卫方法的 3 个形参

`全局前置守卫`的回调函数中接收 3 个形参

```js
// 创建路由实例对象
const router = new VueRouter({...})

// 全局前置导航守卫：前置(当要做什么事，但还没有做)
router.beforeEach((to, from, next) => {
  // to 表示将要访问的路由的信息对象
  // from 表示将要离开的路由的信息对象
  // next() 函数, 表示放行的意思,允许这次路由导航
})
```

#### next 函数的 3 种调用方式

1. 当前用户`拥有`后台主页的访问权限，直接放行：next()
2. 当前用户`没有`后台主页的访问权限，`强制其跳转到登录页面`：next('`/login`') // 提供一个 hash 地址
3. 当前用户`没有`后台主页的访问权限，`不允许跳转到后台主`页,`强制其停留在当前所处的页面`：next(`false`)

- router/index.js 路由模块

```js
// 创建路由实例对象
const router = new VueRouter({...})

router.beforeEach((to, from, next) => {
  // 1.要拿到用户将要访问的 hash 地址
  // 2.判断 hash 地址是否等于 /main
  // 2.1 如果等于 /main，证明需要登录之后，才能访问成功
  // 2.2 如果不等于 /main，则不需要登录，直接放行 next()
  // 3. 如果访问的地址是 /main, 则需要读取 localStorage 中的 token 值
  // 3.1 如果有 token 则放行
  // 3.2 如果没有 token 则强制跳转到 /login 登录页面
  if (to.path === '/main') {
    // 要访问后台主页，需要判断是否有 token
    const token = localStorage.getItem('token')
    if (token) {
      next() // 访问后台主页，且有 token
    } else {
      // 没有登录，强制跳转到登录页面
      next('/login')
    }
  } else {
    next() // 放问的不是后台主页，直接放行
  }
})
```

## 组件库 element-ui

### 按需引入

#### 借助 `babel-plugin-component`

借助 `babel-plugin-component`，我们可以只引入需要的组件，以达到`减小项目体积`的目的。

```
npm install babel-plugin-component -D
```

#### 按需引入的 babel.config.js 配置文件

修改根目录下的 `babel.config.js` 配置文件，新增 `plugins` 节点

```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],

  // 新增 `plugins`节点
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
```

### 把组件的导入和注册封装为独立的模块

在 `src` 目录下新建 `element-ui/index.js` 模块，

```js
import Vue from 'vue'

// 完整导入 ElementUI 组件
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 安装 ElementUI
// Vue.use(ElementUI)

-----------------------------

// 1.按需导入 ElementUI 组件
import { Button, Input } from 'element-ui'

// 2.注册需要的组件
// Vue.component(Button.name, Button)
// 简写
Vue.use(Button)
Vue.use(Input)
```
