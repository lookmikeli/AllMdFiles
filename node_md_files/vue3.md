## vite

### 创建 vite 的项目

1. 创建命令

```
npm init vite-app 项目名称
```

2. 安装依赖

```
npm i
```

3. 启动开发环境的项目

```
npm run dev
```

-

### vite 创建的项目结构

- node_modules 目录用来存放第三方依赖包
- public 是公共的静态资源目录
- `src` 是项目的源代码目录（程序员写的所有代码都要放在此目录下）
- .gitignore 是 Git 的忽略文件
- `index.html` 是 SPA 单页面应用程序中唯一的 HTML 页面
- package.json 是项目的包管理配置文件

#### src 梳理项目的结构

- `assets` 目录用来存放项目中所有的`静态资源文件`（css、fonts 等）
- `components` 目录用来存放项目中所有的`自定义组件`
- `App.vue` 是项目的`根组件`
- `index.css` 是项目的`全局样式表文件`
- `main.js` 是整个项目的`打包入口文件`

### vite 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 `main.js` 把 `App.vue` 渲染到 `index.html` 的指定区域中。

① `App.vue` 用来编写待渲染的`模板结构`
② `index.html` 中需要预留一个` el 区域`
③ `main.js` 把 App.vue 渲染到了 index.html 所预留的区域中

```js
// 1.从 vue 中按需导入 createApp 函数
// createApp 函数作用：创建 vue 的“单页面应用程序实例”
import { createApp } from 'vue'

// 2.导入待渲染的 App.vue 组件
import App from './App.vue'

// 3.调用 createApp() 函数，创建 SPA 应用的实例，返回值是“单页面应用程序的实例”，同时把 App 组件作为参数传给 createApp 函数，表示要把 App 渲染到 index.html 页面上
const app = createApp(App)

// 4.调用实例的 mount 方法，把 App 组件的模板结构，渲染到指定的 el 区域中，用来指定 vue 实际要控制的区域
app.mount('#app')
```

## vue3 组件的 template 节点

1. vue 规定：每个`组件对应的模板结构`，需要定义到 `<template>` 节点中。
   注意：`<template>` 是 vue 提供的`容器标签`，只起到`包裹性质的作用`，它不会被渲染为真正的 DOM 元素。

### 在 template 中定义根节点

1. 在 `vue 2.x` 的版本中，`<template>` 节点内的 DOM 结构`仅支持单个根节点`：

2. 但是，在 `vue 3.x` 的版本中，`<template>` 中`支持定义多个根节点`：

### `vite` 项目组件的 style 节点

1. vue 规定：组件内的 `< style > `节点是`可选的`，开发者可以在 < style > 节点中`编写样式美化当前组件的 UI 结构`。

2. 其中 < style > 标签上的 `lang="css"` 属性是`可选的`，它表示所使用的`样式语言`。默认只支持`普通的 css 语法`，可选值还有 less、scss 等。

### 让 style 中支持 less 语法

如果希望使用 less 语法编写组件的 style 样式，可以按照如下两个步骤进行配置：
① 运行 `npm install less -D` 命令安装依赖包，从而提供 less 语法的编译支持
② 在 < style > 标签上添加 `lang="less"` 属性，即可使用 less 语法编写组件的样式

## 组件的基本使用

### 组件的注册

组件之间可以进行`相互的引用`
vue 中组件的`引用`原则：`先注册后使用`。

vue 中注册组件的方式分为“`全局注册`”和“`局部注册`”两种:

- 被`全局`注册的组件，`可以在全局任何一个组件内使用`
- 被`局部`注册的组件，`只能在当前注册的范围内使用`

#### 全局注册

- 1. main.js 入口文件

```js
import { createApp } from 'vue'
import App from './App.vue'

// 1.导入需要被全局注册的组件
import Swiper from './components/globalReg/Swiper.vue'
import Test from './components/globalReg/Test.vue'

const app = createApp(App)

// 2.调用 app.component() 方法，在全局注册 my-swiper 和 my-test 两个组件
// 参数1: 全局注册之后的名称(建议名称中间带一个连字符)
// 参数2: 要被全局注册的组件
app.component('my-swiper', Swiper)
app.component('my-test', Test)
```

- 2. 使用全局注册组件

使用 app.component() 方法注册的全局组件，`直接以标签的形式进行使用`即可

```html
<!-- 使用 my-swiper 组件-->
<my-swiper></my-swiper>
<!-- 使用 my-test 组件-->
<my-test></my-test>
```

- 局部注册组件

```html
<template>
  <h1>app 根组件</h1>

  <!-- 局部注册组件 -->
  <my-search></my-search>
</template>

<script>
  import Search from './components/privateReg/Search.vue'

  export default {
    name: 'MyApp',
    // 通过 components 节点，为当前的组件注册私有子组件
    components: {
      'my-search': Search,
    },
  }
</script>
```

### 组件注册时名称的大小写

在进行组件的注册时，`定义组件注册名称的方式`有两种：
① 使用 `kebab-case` 命名法（俗称`短横线命名法`，例如 my-swiper 和 my-search）
② 使用 `PascalCase` 命名法（俗称`帕斯卡命名法`或`大驼峰命名法`，例如 MySwiper 和 MySearch）

短横线命名法的特点：

- 必须严格按照短横线名称进行使用
  帕斯卡命名法的特点：
- 既可以严格按照帕斯卡名称进行使用，又可以转化为`短横线名称`进行使

> 注意：在实际开发中，`推荐使用帕斯卡命名法`为组件注册名称，因为它的`适用性更强`。

### 通过 name 属性注册组件

在注册组件期间，除了可以`直接提供组件的注册名称`之外，还可以把`组件的 name 属性`作为注册后`组件的名称`

- Test 组件

```html
<template>
  <h1>Test 组件</h1>
</template>

<script>
  export default {
    // name 属性为当前组件的名字
    name: 'MyTest',
  }
</script>
```

- main.js

```js
import Test from './components/globalReg/Test.vue'

// 调用 app.component() 方法全局注册组件
console.log(Test.name) // MyTest
app.component(Test.name, Test)
```

## vue3 `:deep()` 样式穿透

如果给当前组件的 style 节点添加了 scoped 属性，则当`前组件的样式对其子组件是不生效的`。如果想让某些样式对子组件生效，可以使用 `:deep() 深度选择器`。

```html
<style lang="less" scoped>
  .title {
    /* 不加  :deep 时，生成的选择器格式为 .title[data-v-7ac74a55] */
    color: yellow;
  }
  /* 加上  :deep 时，生成的选择器格式为 [data-v-7ac74a55] .title */
  :deep(.title) {
    color: yellow;
  }
</style>
```

> 注意：`/deep/` 是 vue2.x 中实现样式穿透的方案。在 vue3.x 中推荐使用 `:deep()` 替代 /deep/。

## props 的大小写命名

组件中如果使用“`camelCase (驼峰命名法)`”声明了 props 属性的名称，则有两种方式为其绑定属性的值：

```html
<template>
  <!-- 使用必须和命名一致 -->
  <h6>发布时间：{{ pubTime }}</h6>
</template>

<script>
  export default {
    props: {
      // 采用“驼峰命名法”为当前的组件声明了 pubTime 属性
      pubTime: {
        type: String,
        default: '',
      },
    },
  }
</script>

<!-- 父组件传递值 -->
<template>
  <!-- 既可以直接使用 “ 驼峰命名 ”的形式为组件绑定属性的值 -->
  <my-article :pubTime="1989"></my-article>
  <!-- 也可以使用其等价的 “短横线分隔命名” 的形式为组件绑定属性的值 -->
  <my-article :pub-time="1989"></my-article>
</template>
```

## Class 与 Style 绑定 vue2

在实际开发中经常会遇到`动态操作元素样式`的需求。因此，vue 允许开发者通过 `v-bind`属性绑定指令，为元素动态绑定 `class 属性的值`和`行内的 style 样式`。

### `动态绑定` HTML 的 `class`

可以通过`三元表达式`，`动态的为元素绑定 class 的类名`。

```html
<template>
  <h3 class="thin" :class="isItalic">MyStyle 组件</h3>
  <h3 class="thin" :class="isItalic ? 'italic' : ''">MyStyle 组件</h3>
  <button @click="isItalic = !isItalic">Toggle Italic</button>
</template>

<script>
  export default {
    name: 'MyStyle',
    data() {
      return {
        // 字体是否斜梯
        isItalic: true,
      }
    },
  }
</script>

<style lang="less">
  // 字体变细
  .thin {
    font-weight: 200;
  }

  // 倾斜字体
  .italic {
    font-style: italic;
  }
</style>
```

### 以`数组语法`绑定 HTML 的 `class

`
如果元素需要动态`绑定多个` class 的类名，此时可以使用`数组的语法格式`：

```html
<template>
  <h3
    class="thin"
    :class="[isItalic ? 'italic' : '', isDelete ? 'delete' : '']"
  >
    MyStyle 组件
  </h3>
  <button @click="isItalic = !isItalic">Toggle Italic</button>
  <button @click="isDelete = !isDelete">Toggle Delete</button>
</template>

<script>
  export default {
    name: 'MyStyle',
    data() {
      return {
        // 字体是否斜梯
        isItalic: true,
        isDelete: false,
      }
    },
  }
</script>

<style lang="less">
  // 字体变细
  .thin {
    font-weight: 200;
  }

  // 倾斜字体
  .italic {
    font-style: italic;
  }

  .delete {
    text-decoration: line-through;
  }
</style>
```

### 以`对象语法`绑定 HTML 的 `class`

使用数`组语法动态`绑定 class 会导致`模板结构臃肿`的问题。此时可以使用`对象语法`进行`简化`：

```html
<template>
  <!-- 以对象形式绑定class -->
  <h3 class="thin" :class="classObj">MyStyle 组件</h3>
  <button @click="classObj.italic = !classObj.italic">Toggle Italic</button>
  <button @click="classObj.delete = !classObj.delete">Toggle Delete</button>
</template>

<script>
  export default {
    name: 'MyStyle',
    data() {
      return {
        classObj: {
          // 对象中,属性名是 class 类名,值是布尔值
          italic: false,
          delete: false,
        },
      }
    },
  }
</script>
```

### 以`对象语法`绑定内联的 `style`

`:style` 的`对象语法`十分直观——看着非常像 CSS，但其实是一个 `JavaScript对象`。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<template>
  <div class="container">
    <!--方式1. background-color  需要写成 小驼峰形式  backgroundColor-->
    <!--方式2. background-color  需要写成 字符串的形式  'background-color'-->
    <div
      :style="{ color: active, fontSize: fSize + 'px', 'background-color': bgColor }"
    >
      前端编程
    </div>
    <button @click="fSize += 1">字号 +1</button>
    <button @click="fSize -= 1">字号 -1</button>
  </div>
</template>
<script>
  export default {
    name: 'MyStyle',
    data() {
      return {
        // 高亮时的文本颜色
        active: 'red',
        // 文字的大小
        fSize: 30,
        // 背景颜色
        bgColor: 'pink',
      }
    },
  }
</script>
```

```html
<!-- 
  绑定样式：
      1. class样式
            写法:class="xxx" xxx可以是字符串、对象、数组。
                字符串写法适用于：类名不确定，要动态获取。
                对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
                数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
      2. style样式
            :style="{fontSize: xxx}"其中xxx是动态值。
            :style="[a,b]"其中a、b是样式对象。
-->
```

## props 验证

### 自定义验证函数

在封装组件时，可以为 prop 属性指定`自定义的验证函数`，从而`对 prop 属性的值进行更加精确的控制`：

```js
export default {
  props: {
    // 通过“配置对象”的形式，来定义 type 属性的“验证规则”
    type: {
      // 通过 validator 函数，对 type 属性的值进行校验，“属性的值”可以通过形参  value 进行接收
      validator(value) {
        // type 属性的值，必须匹配下列字符串中的一个
        // validator 函数的返回值为 true 表示验证通过，false 表示验证失败
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      },
    },
  },
}
```

## 自定义事件

### 什么是自定义事件

在封装组件时，为了让`组件的使用者`可以`监听到组件内状态的变化`，此时需要用到`组件的自定义事件`。

1. 组件的使用者：通过 `v-on` 的形式`监听`自定义事件

```xml
<my-counter @countChange="getCount"/>
```

2. 组件的封装者：数据发生变化，立即通过 `自定义事件` 的形式，把最新的值发送给组件的使用者

### 自定义事件的 3 个使用步骤

- 在封装组件时：
  ① `声明`自定义事件
  ② `触发`自定义事件

- 在使用组件时：
  ③ `监听`自定义事件

#### 声明自定义事件

开发者为自定义组件封装的`自定义事件`，必须事先在 `emits` 节点中声明

- 子组件

```js
export default {
  name: 'MyCounter',
  data() {
    return {
      count: 0
    }
  }
  // 1.声明 emits 自定义事件名
  emits: ['countChange']
}
```

#### 触发自定义事件

在 `emits` 节点下声明的自定义事件，可以通过 `this.$emit`('`自定义事件的名称`') 方法进行触发

- 子组件

```js
methods: {
    add() {
      this.count++
      // 2. this.$emit() 触发自定义事件
      // 参数：需要触发的那个自定义事件名；
      // 注意：这个自定义事件名，必须在 emits 数组中事先声明
      this.$emit('countChange')
    }
  }
```

#### 监听自定义事件

在使用自定义的组件时，可以通过 `v-on` 的形式`监听自定义事件`

- 父组件

```html
<template>
  <div>
    <h1>app 根组件</h1>
    <hr />

    <!-- 3. 通过 v-on 监听组件的自定义事件 -->
    <my-count @count-change="getCount"></my-count>
  </div>
</template>

<script>
  export default {
    name: 'MyApp',
    components: {
      MyCount,
    },
    methods: {
      // 4.声明自定义事件的处理函数
      getCount() {
        console.log('触发了 count-change 自定义事件')
      },
    },
  }
</script>
```

### 自定义事件传参

在调用 `this.$emit()` 方法触发自定义事件时，可以通过`第 2 个参数`为自定义事件传参

- 子组件

```js
  emits: ['countChange'],
  methods: {
    add() {
      this.count++
      // 1. this.$emit() 触发自定义事件
      // 参数1：需要触发的那个自定义事件名；
      // 参数2：需要向外传递的参数
      // 注意：这个自定义事件名，必须在 emits 数组中事先声明
      this.$emit('countChange', this.count)
    }
  }
```

- 父组件通过自定义处理函数的`形参直接接收`

```js
export default {
  name: 'MyApp',
  components: {
    MyCount,
  },
  methods: {
    // 2.声明自定义事件的处理函数, val形参 接收自定义事件传递的值
    getCount(val) {
      console.log('触发了 count-change 自定义事件', val)
    },
  },
}
```

## 组件上的 v-model

⚫ 应用场景：`实现组件内外的数据同步`
⚫ `v-model:props名称(双向数据绑定)`、`emits(自定义事件)`、`$emit('update:props名称')触发自定义事件，传递数据`

### 为什么需要在组件上使用 v-model

v-model 是双向数据绑定指令，当`需要维护组件内外数据的同步`时，可以在组件上使用 v-model 指令。

#### `父`向`子`同步数据(`通过自定义属性`)

1. `外界数据的变化(父)`会`自动同步`到 `子` 组件中

2. `子` 组件中数据的变化，也会`自动同步到外界(父)`

> 同步过程：
> ① 父组件通过 `v-bind:` 属性绑定的形式，把数据传递给子组件
> ② 子组件中，通过 `props` 接收父组件传递过来的数据,`只读的`

- 父组件

```html
<template>
  <div>
    <h1>App 根组件---{{ count }}</h1>
    <button @click="add">+1</button>
    <hr />
    <!-- 1. 父组件通过 v-bind: 属性绑定的形式，把数据传递给子组件  -->
    <my-counter :number="count"></my-counter>
  </div>
</template>

<script>
  import MyCounter from './Counter.vue'

  export default {
    name: 'MyApp',
    data() {
      return {
        count: 0,
      }
    },
    components: {
      MyCounter,
    },
    methods: {
      add() {
        this.count++
      },
    },
  }
</script>
```

- 子组件

```html
<template>
  <div>
    <p>count 的值是：{{ number }}</p>
  </div>
</template>

<script>
  export default {
    name: 'MyCounter',
    // 2.子组件中，通过 props 接收父组件传递过来的数据
    // props 是只读的
    props: ['number'],
  }
</script>
```

#### `子`向`父`同步数据(`通过自定义事件`)

> 同步过程：
> ① 在 v-bind: 指令之前添加 `v-model` 指令
> ② 在子组件中声明 `emits` 自定义事件，格式为 `update:xxx`
> ③ 调用 `$emit()` 触发自定义事件，更新父组件中的数据

- 父组件

```xml
<template>
  <div>
    <h1>App 根组件---{{ count }}</h1>
    <button @click="add">+1</button>
    <hr />
    <!-- 1.在通过 v-bind 向子组件传递，自定义属性的时候 加上 v-model 表示同步数据-->
    <my-counter v-model:number="count"></my-counter>
    <!-- 只要父组件的 update:number 自定义事件触发了，子组件中通过 v-model 绑定的 count 值就会自动更新 -->
  </div>
</template>
```

- 子组件

```html
<template>
  <div>
    <p>count 的值是：{{ number }}</p>
    <!-- 3.点击按钮触发 自定义事件 更新 父组件传递过来的 count 值 -->
    <button @click="add">+1</button>
  </div>
</template>

<script>
  export default {
    name: 'MyCounter',

    // props 是只读的
    props: ['number'],
    // 2.通过 emits 声明 update: 前缀的自定义事件
    // 更新数据，需要添加固定 update: 的前缀，后面跟要更新的数据名
    emits: ['update:number'],
    methods: {
      // 4.声明事件的处理函数
      add() {
        // 调用 $emit() 触发自定义事件
        // 参数1：需要触发的自定义事件名
        // 参数2：新值 同步到父组件中
        this.$emit('update:number', this.number + 1)
        // this.number + 1 之后，通过 update:number 自定义事件更新到父组件中
      },
    },
  }
</script>
```

## vue3 组件的生命周期

### 组件`运行的过程`

`组件的生命周期`指的是：组件从`创建` -> `运行`（渲染） -> `销毁`的整个过程，强调的是一个`时间段`。

### 如何`监听`组件的`不同时刻`

`vue 框架`为组件`内置了`不同时刻的`生命周期函数`，生命周期函数会`伴随着`组件的运行而`自动调用`。
① 当组件在`内存中被创建完毕`之后，会自动调用 `created` 函数
② 当组件被成功的`渲染到页面上`之后，会自动调用 `mounted` 函数
③ 当组件`被销毁完毕`之后，会自动调用 `unmounted` 函数

```js
// 默认打印 created => mounted
export default {
  // created 组件在内存中被创建完毕了
  created() {
    console.log('created: 组件在内存中被创建完毕了')
  },
  // mounted 组件第一次被渲染到了页面上
  mounted() {
    console.log('mounted: 组件第一次被渲染到了页面上')
  },
  // unmounted 组件被销毁完毕了
  unmounted() {
    console.log('unmounted: 组件被销毁完毕了')
  },
}
```

### 如何`监听`组件的`更新`

当组件的 `data 数据更新`之后，vue 会`自动重新渲染组件`的 DOM 结构，从而保证 `View 视图`展示的数据和`Model 数据源`保持一致。
当组件被`重新渲染完毕`之后，会`自动调用` `updated` 生命周期函数。

```html
<template>
  <div>
    <h3>{{ count }}</h3>
    <button @click="count += 1">+1</button>
  </div>
</template>

<script>
  export default {
    name: 'LifeCycle',
    data() {
      return {
        count: 0,
      }
    },
    // data 里面的数据发生变化, 组件会重新渲染, 完毕之后，会`自动调用` `updated` 生命周期函数。
    // 组件被重新渲染完毕了
    updated() {
      console.log('updated: 组件被重新渲染完毕了')
    },
  }
</script>
```

### 组件中`主要的`生命周期函数

| 生命周期函数 | 执行时机                     | 所属阶段   | 执行次数      | 应用场景         |
| ------------ | ---------------------------- | ---------- | ------------- | ---------------- |
| `created`    | 组件在内存中创建完毕后       | `创建阶段` | 唯一 `1`次    | 发 ajax 请求数据 |
| `mounted`    | 组件初次在页面中渲染完毕后   | `创建阶段` | 唯一`1`次     | 操作 DOM 元素    |
| `updated`    | 组件在页面中被重新渲染完毕后 | `运行阶段` | `0` 或 `多次` |                  |
| `unmounted`  | 组件被销毁后（页面和内存）   | `销毁阶段` | 唯一`1`次     |                  |

> 注意：在实际开发中，`created `是`最常用的`生命周期函数！

### 组件中`全部的`生命周期函数

| 生命周期函数  | 执行时机                     | 所属阶段     | 执行次数  | 应用场景             | 弊端                                                                                                |
| ------------- | ---------------------------- | ------------ | --------- | -------------------- | --------------------------------------------------------------------------------------------------- |
| beforeCreate  | 在内存中开始创建组件之前     | `创建阶段`   | 唯一 1 次 |                      | 组件的 `props/data/methods`尚未被创建，都处于不可用状态                                             |
| `created`     | 组件在内存中创建完毕后       | `创建阶段`   | 唯一 1 次 | 发 ajax 请求初始数据 | 组件的 `porps/data/methods`已`创建好`，都处于`可用`的状态。但是组件的`模板结构尚未生成`!            |
| beforeMount   | 在把组件初次渲染到页面之前   | `创建阶段 `  | 唯一 1 次 |                      | `将要把`内存中编译好的 `HTML` 结构`渲染到`浏览器中。此时浏览器中`还没有`当前组件的 DOM 结构         |
| `mounted `    | 组件初次在页面中渲染完毕后   | `创建阶段`   | 唯一 1 次 | 操作 DOM 元素        | 已经把内存中的 HTML 结构，成功的渲染到了浏览器之中。此时浏览器中`已然包含`了当前组件的 `DOM 结构`。 |
| beforeUpdate  | 在组件被重新渲染之前         | 运行阶段     | 0 或 多次 |                      | `将要`根据变化过后、最新的数据，`重新渲染`组件的模板结构                                            |
| `updated`     | 组件在页面中被重新渲染完毕后 | 运行阶段     | 0 或 多次 |                      | 已经根据最新的数据，`完成了`组件 DOM 结构的`重新渲染`                                               |
| beforeUnmount | 在组件被销毁之前             | **销毁阶段** | 唯一 1 次 |                      | `将要销毁`此组件，此时`尚未销毁`，组件还处于`正常工作`的状态                                        |
| `unmounted`   | 组件被销毁后（页面和内存）   | **销毁阶段** | 唯一 1 次 |                      |                                                                                                     |

## 组件之间的数据共享

### `父` ==> `子`共享数据

父组件通过 `v-bind` 属性绑定, 子组件使用自定义属性 `props`

### `子` ==> `父`共享数据

使用`自定义`事件

1. 子组件中: `emits: ['自定义事件名']` => `this.$emit('自定义事件名', 要传递的数据)`
2. 父组件中: `v-on:` 监听子组件的`自定义事件`, `声明`自定义事件的`处理函数`, 通过`形参`获取数据

### 父子组件之间数据的`双向同步` `父` <==> `子`

父组件在使用子组件期间，可以使用 `v-model 指令`维护组件内外数据的`双向同步`：

1. 父组件中 `v-model` + `属性绑定`

```html
<template>
  <div>App 根组件</div>

  <!-- 父子组件数据的双向同步 -->
  <!-- 1.父组件通过 属性绑定 的方式，向子组件中传递 props 数据；其中添加 v-model 表示要维护组件内外数据的双向同步-->
  <my-son v-model:count="count"></my-son>
</template>
```

2. 子组件中 `props 接收数据`+ `emits: ['update:要更新的属性'] 声明自定义事件` + `this.$emit('自定义事件', 需要传递的参数)`

```html
<template>
  <div>Son 组件</div>
  <p>数量是:{{ count }}</p>
  <button @click="addCount">+1</button>
</template>

<script>
  export default {
    name: 'MySon',
    data() {
      return {
        count: 0,
      }
    },
    // 父子组件数据的双向同步
    // 3. props 接收父组件传递过来的数据
    props: ['count'],
    // 4.1需要更新那个属性对应的值,就声明对应的自定义事件
    // 4.2子组件中声明 emits 自定义事件，需要以固定 update: 为前缀，和需要更新的数据名
    emits: ['update:count'],
    methods: {
      addCount() {
        // 5.在合适的时机调用 $emit() 方法触发 自定义事件，和需要传递的数据
        this.$emit('update:count', this.count + 1)
        // 之后父组件中，就不在需要监听自定义事件，会通过 v-model 把子组件中传递过来的数据，自动更新对应的值上
      },
    },
  }
</script>
```

### `兄弟组件`之间的数据共享

`兄弟组件之间`实现数据共享的方案是 `EventBus`。可以借助于第三方的包 `mitt` 来创建 `eventBus 对象`，从而实现兄弟组件之间的数据共享。

- eventBus.js

```js
// npm i mitt
// eventBus.js

// 导入 mitt 包
import mitt from 'mitt'

// 创建 EventBus 的实例对象
const bus = mitt()

// 将 EventBus 的实例对象共享出去
export default bus
```

- 接收方

```js
// 导入 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'
export default {
  name: 'MyRight',
  data() {
    return {
      num: 0,
    }
  },
  // created 生命周期函数
  created() {
    // 调用 bus.on() 方法注册一个自定义事件，通过事件处理函数的形参接收数据
    // count 接收外界传递的值
    bus.on('countChange', (count) => {
      this.num = count
    })
  },
}
```

- 发送方

```html
<template>
  <div class="left-container">
    <h3>数据发送方 ---count 的值为：{{ count }}</h3>
    <button @click="add">+1</button>
  </div>
</template>

<script>
  // 导入 eventBus.js 模块，得到共享的 bus 对象
  import bus from './eventBus.js'

  export default {
    name: 'MyLeft',
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      add() {
        this.count++
        // 调用 bus.emit() 方法触发自定义事件，并发送数据
        bus.emit('countChange', this.count)
      },
    },
  }
</script>
```

### `后代关系组件`之间的数据共享

后代关系组件之间共享数据，指的是`父节点的组件`向其`子孙组件`共享数据。此时组件之间的嵌套关系比较复杂，可以使用 `provide` 和 `inject` 实现后代关系组件之间的数据共享。

> 注意：两个组件之间`没有直接或间接的嵌套关系`，是没有办法使用 `provide` 和 `inject`，来实现数据的共享

#### `父节点`通过 `provide` 共享数据

父节点的组件可以通过 `provide 方法`，对其`子孙组件`共享数据：

```js
export default {
  name: 'MyApp',
  data() {
    return {
      // 1.定义“父组件”要向“子孙组件”共享的数据
      color: 'red',
      age: 18,
    }
  },
  // 2.provide 函数 return 的对象中，包含了“要向子孙组件共享的数据”
  provide() {
    // 返回要共享的数据对象
    return {
      // 要共享的数据的键 : 值
      color: this.color,
      age: this.age,
    }
  },
}
```

#### `子孙节点`通过 `inject` 接收数据

子孙节点可以使用 `inject` 数组，接收父级节点`向下共享的数据`。

```html
<template>
  <div>
    <!-- 使用父组件传递过来的数据 -->
    <h5>Level Three 三级组件 ---{{ color }} ---{{ age }}</h5>
  </div>
</template>

<script>
  export default {
    name: 'LevelThree',
    // 子孙组件，使用 inject 接收父节点向下共享的 color 和 age 数据，并在页面上使用
    inject: ['color', 'age'],
  }
</script>
```

### 父节点对外共享`响应式的数据`

父节点使用 provide 向下共享数据时，可以结合 `computed 函数`向下共享`响应式的数据`。

1.  父节组件对外共享响应式的数据

```js
// 1.导入 computed 模块
import { computed } from 'vue'

export default {
  name: 'MyApp',
  data() {
    return {
      color: 'red',
      age: 18,
    }
  },
  provide() {
    // 返回要共享的数据对象
    return {
      // 对外共享响应式的数据
      // 2.使用 computed 函数，可用把要共享的数据“包装为”响应式的数据
      color: computed(() => this.color),
      // 不是 响应式的数据
      age: this.age,
    }
  },
}
```

2. 子孙组件`使用`响应式的数据

```js
export default {
  // 接收父组件向下共享的数据
  inject: ['color', 'age'],
}
```

### Vuex

vuex 是`终极的`组件之间的数据共享方案。在企业级的 vue 项目开发中，vuex 可以让组件之间的数据共享变得`高效`、`清晰`、且`易于维护`。

> Vuex 把需要大范围共享数据的数据保存起来，是项目的结构清晰，需要共享就往 store 里面存，取数据就向 store 里面取, 不在需要组件之间的共享

## vue 3.x 中全局配置 axios

### 全局配置 axios

在 `main.js` 入口文件中，通过 `app.config.globalProperties` 全局挂载 axios

1. 全局挂载 axios

```js
import { createApp } from 'vue'

import App from './App.vue'

// 1.导入 axios 模块
import axios from 'axios'

const app = createApp(App)

// 2.为 axios 配置请求的根路径
// 固定写法
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 3.将 axios 挂载为 app 的全局自定义属性之后，每一个组件可用通过 this 直接访问到全局挂载的自定义属性
// config.globalProperties 固定写法， $http 自定义
//  config.globalProperties 一个用于注册能够被应用内所有组件实例访问到的全局属性的对象
app.config.globalProperties.$http = axios

app.mount('#app')
```

2. 使用 axios

```js
export default {
  name: 'GetInfo',
  methods: {
    async getInfo() {
      // 通过 this 组件的实例对象，访问全局挂载的 $http 属性
      const { data: res } = await this.$http.get('/api/get')
      console.log(res)
    },
  },
}
```

## 自定义指令

### 自定义指令的分类

- `私有`自定义指令
- `全局`自定义指令

#### 声明`私有`自定义指令

在每个 vue 组件中，可以在 `directives` 节点下声明`私有自定义指令`

```html
<template>
  <div class="home-container">
    <h3>MyHome 组件 --- {{ count }}</h3>
    <hr />

    <!-- 注意： 自定义指令在使用的使用 必须以 v- 的前缀开头；声明自定义指令的时候不需要加 v- 的前缀 -->
    <input type="text" v-focus />
    <button>+1</button>
  </div>
</template>

<script>
  export default {
    name: 'MyHome',
    data() {
      return {
        count: 0,
      }
    },
    // 声明私有自定义指令
    directives: {
      // 自定义一个私有指令 名为 focus
      focus: {
        // 当被绑定的元素被渲染到 DOM 上之后，就自动触发 mounted 函数
        // 形参 el 表示自定义指定被绑定的 原生DOM 元素对象
        mounted(el) {
          el.focus() // 这里的 focus() 是原生 DOM 对象的方法; 让被绑定的元素自动获得焦点
        },
      },
    },
  }
</script>
```

> 注意： 自定义指令在使用的使用 `必须`以 `v- 的前缀开头`；`声明`自定义指令的时候`不需要加 v- 的前缀`

#### 声明`全局自定义指令`的语法

`全局共享的自定义指令`在入口文件(`main.js`)，需要通过“单页面应用程序的实例对象”进行声明

- main.js

```js
import { createApp } from 'vue'

const app = createApp(App)

// 声明全局自定义指令
// 参数1：自定义全局指令的名称
// 参数2：配置对象
app.directive('focus', {
  // 只要这个 mounted 函数被触发了，就可以拿到被绑定的 DOM 元素，用形参接收
  mounted(el) {
    el.focus() // DOM 对象原生方法 focus()
  },
})

app.mount('#app')
```

#### `updated` 函数

`mounted 函数`只在元素`第一次插入 DOM 时被调用`，当 DOM `更新`时 mounted 函数`不会被触发`。 `updated函数`会在`每次 DOM 更新完成后`被调用。

```js
// 应用场景: 当页面第一次渲染, 输入框获得焦点; 此时其他元素被触发,焦点发生变化, 想让输入框也获得焦点 调用updated 函数

import { createApp } from 'vue'
const app = createApp(App)

app.directive('focus', {
  // 第一次渲染 DOM 时触发这个函数
  mounted(el) {
    el.focus()
  },
  // 每次 DOM 更新时都会触发 updated 函数
  updated(el) {
    el.focus()
  },
})
```

> 注意：在 `vue2` 的项目中使用自定义指令时，【 mounted -> `bind` 】【 updated -> `update`】

#### 自定义指令里函数简写

如果 `mounted` 和 `updated` 函数中的`逻辑完全相同`

- main.js

```js
// 全局声明自定义指令 简写形式
// 参数1: 自定义指令名称
// 参数2: 执行函数
app.directive('focus', (el) => {
  // 在 mounted 和 updated 时都会触发相同的业务处理
  el.focus()
})
```

### 自定义指令的参数值

在绑定指令时，可以通过“`等号`”的形式为指令绑定`具体的参数值`

- main.js 声明全局自定义指令, 且`接收参数`

```js
// el 这个指令所绑定到的 DOM 元素
// binding 如果自定义指令通过 = 号传递了参数, 可以用形参 binding 接收
app.directive('color', (el, binding) => {
  // 为绑定的 el 元素设置, 需要处理的逻辑
  // binding.value 使用传递的参数值
  el.style.color = binding.value
})
```

- 组件使用

```xml
<template>
    <!-- 在绑定自定义指令时, 通过 = 号的形式指定绑定的具体参数值 -->
    <h3 v-color="'red'">MyHome 组件</h3>
    <hr />

    <!-- 注意： 自定义指令在使用的使用 必须以 v- 的前缀开头；声明自定义指令的时候不需要加 v- 的前缀 -->
    <input type="text" v-focus v-color="'pink'" />
</template>
```

## 路由 Router

路由（英文：router）就是`对应关系`。路由分为`两大类`：

- `后端`路由
- `前端`路由

### 后端路由

后端路由指的是：`请求方式`、`请求地址`与 f`unction 处理函数`之间的对应`关系`。

- 例如：node.js 里的后端路由

```js
const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
  // 路由的处理函数
})
router.post('/adduser', (req, res) => {
  // 路由的处理函数
})

module.exports = router
```

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

## vue-router 基础使用

### 什么是 vue-router

`vue-router` 是 vue.js 官方给出的`路由解决方案`。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目中组件的切换。

### vue-router 的版本

vue-router 目前有 `3.x` 的版本和 `4.x` 的版本。其中：

- vue-router 3.x 只能结合 `vue2` 进行使用
- vue-router 4.x 只能结合 `vue3` 进行使用

[vue-router 3.x 的官方文档地址](https://v3.router.vuejs.org/zh/)
[vue-router 4.x 的官方文档地址](https://next.router.vuejs.org/)

### vue-router `4.x` 的基本使用步骤

① 在项目中安装 vue-router
② 定义路由组件
③ 声明`路由链接`和`占位符`
④ 创建`路由模块`
`⑤` `导入并挂载`路由模块

#### 项目中安装 vue-router

在 vue3 的项目中，`只能`安装并使用 vue-router 4.x。

```
mpm i vue-router@next -S
```

#### 定义路由组件

在项目中定义 `MyHome.vue`、`MyMovie.vue`、`MyAbout.vue` 三个组件，将来要使用 `vue-router` 来控制它们的`展示与切换`

#### 声明路由链接和占位符

可以使用 `<router-link>` 标签来`声明路由链接`，并使用 `<router-view>` 标签来声明`路由占位符`。

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

    <!-- 2.生命路由占位符 -->
    <!-- 只要在项目中安装和配置了 vue-router ,就可以使用 router-view 这个组件 -->
    <!-- 作用：为组件占位，占位符; 渲染通过路由连接匹配到的组件 -->
    <router-view></router-view>
  </div>
</template>
```

> 注意： < router-view > 和 < router-link > 都是 `vue-router` 这个`包提供的内置组件`

#### 创建路由模块

在项目中`创建src/router/router.js` 路由模块，在其中按照如下 `4 个步骤`创建并得到路由的实例对象：
① 从 vue-router 中按需导入两个方法
② 导入需要使用路由控制的组件
③ 创建路由实例对象
④ 向外共享路由实例对象
⑤ 在 main.js 中导入并挂载路由模块

##### 创建路由模块

1. 在 `router.js` 从 vue-router 中按需导入两个方法:

```js
// 创建路由模块

// 1.从 vue-router 中按需导入两个方法
//   createRouter 方法应用创建路由的实例对象
//   createWebHashHistory 用于指定路由的工作模式（hash 模式）
import { createRouter, createWebHashHistory } from 'vue-router'
```

2. 导入需要使用路由控制的组件

```js
// 2. 导入需要使用路由进行切换的组件
import Home from './MyHome.vue'
import Movie from './Mymovie.vue'
import About from './Myabout.vue'
```

3. 创建路由实例对象

```js
// 3.创建路由实例对象；传递两个配置属性
const router = createRouter({
  // 3.1 通过 history 指定路由的工作模式（Hash）
  history: createWebHashHistory(),
  // 3.2 通过 routes 数组，指定路由的匹配规则
  routes: [
    // 路由规则
    // { path: 'hash地址名(省略#号)', component: 要展示的组件 }
    // 注意：path 路径需要根据 to 属性来指定
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

4. 向外共享路由实例对象

```js
// 4. 向外共享路由实例对象；供其它模块导入并使用
export default router
```

##### 在 `main.js` 中导入并挂载路由模块

```js
import { createApp } from 'vue'

import App from './App.vue'

// 1.导入路由模块
import router from './components/router/router.js'

const app = createApp(App)

// 2. app.use() 挂载路由模块 固定写法
// app.use() 方法用来挂载“第三方的插件模块”
app.use(router)

app.mount('#app')
```

## vue-router 的高级用法

### 路由重定向

`路由重定向`指的是：用户在访问`地址 A` 的时候，`强制用户跳转`到地址 C ，从而展示特定的组件页面。
通过路由规则的 `redirect` 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 重定向的路由规则
    // path 表示需要被重定向的“原地址”，redirect 表示将要被重定向到的“新地址”
    { path: '/', redirect: '/home' },

    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

### 路由高亮

可以通过如下的两种方式，将`激活的路由链接`进行高亮显示：

- 使用`默认的`高亮 class 类
- `自定义`路由高亮的 class 类

#### 默认的高亮 class 类

被激活的路由链接，默认会应用一个叫做 `router-link-active` 的类名。开发者可以使用此`类名选择器`，为`激活的路由链接`设置高亮的样式：

```css
/* 在 index.css 全局样式表中，重新定义 router-link-active 的样式 */
.router-link-active {
  background-color: red;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
}
```

#### 自定义路由高亮的 class 类

在创建路由的实例对象时，开发者可以基于 `linkActiveClass` 属性，自定义路由链接被激活时所应用的类名：

```js
// main.js 中设置
const router = createRouter({
  history: createWebHashHistory(),

  // 默认的 router-link-active 类名会被覆盖掉
  linkActiveClass: 'active-router',

  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

### 嵌套路由

通过路由实现`组件的嵌套展示`，叫做嵌套路由。

- 1. 声明`子路由链接`和`子路由占位符`
- 2. 在父路由规则中，通过 `children` 属性`嵌套声明`子路由规则

#### 声明`子路由链接`和`子路由占位符`

在 About.vue 组件中，声明 tab1 和 tab2 的`子路由链接`以及`子路由占位符`。

```xml
<template>
  <div>
    <h3>MyAbout 组件</h3>

    <!-- 1.声明子路由链接 -->
    <router-link to="/about/tab1">Tab1</router-link>&nbsp;
    <router-link to="/about/tab2">Tab2</router-link>

    <!-- 2.声明子路由占位符 -->
    <router-view></router-view>
  </div>
</template>
```

#### 通过 `children` 属性声明`子路由规则` 和子路由重定向

在 `router.js` 路由模块中，导入需要的组件，并使用 `children 属性`声明子路由规则。
redirect 可以实现父组件的重定向,也可以实现子级组件的重定向(注意 hash 地址)

```js
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active-router',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    // 路由规则
    {
      // about 页面的路由规则(父级路由规则)
      path: '/about',
      component: About,
      redirect: '/about/tab1', // 子级重定向的路由规则
      children: [
        // 子路由规则
        // 1. 通过 children 属性，嵌套声明子级路由规则
        // 注意：children里面的子路由规则名字不加 / ，加了相当于访问 "根路径"
        { path: 'tab1', component: Tab1 }, // 访问 /about/tab1 时，展示 Tab1 组件
        { path: 'tab2', component: Tab2 }, // 访问 /about/tab2 时，展示 Tab2 组件
      ],
    },
  ],
})
```

### 动态路由匹配

动态路由指的是：把 Hash 地址中`可变的部分`定义为`参数项`，从而`提高路由规则的复用性`。在 vue-router 中
使用`英文的冒号`（`:`）来定义路由的参数项。

- router.js 路由模块

```js
// 在 Movie 组件中，希望根据 id 的值，展示对应的电影详情信息
// 路由中的动态参数以 : 进行声明，冒号后面的动态参数的名称
{ path: '/movie/:id', component: Movie }

// 等价于将以下三个路由规则，合并成一个，提高路由规则的复用性
{ path: '/movie/1', component: Movie }
{ path: '/movie/2', component: Movie }
{ path: '/movie/3', component: Movie }

```

- 组件使用

```xml
<template>
    <!-- 声明路由链接 -->
    <router-link to="/home">首页</router-link>&nbsp;
    <router-link to="/movie/1">电影1</router-link>&nbsp;
    <router-link to="/movie/2">电影2</router-link>&nbsp;
    <router-link to="/movie/3">电影3</router-link>&nbsp;
    <router-link to="/about">关于</router-link>
</template>
```

#### (方式一)`$route.params` 参数对象 获取动态参数

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

#### (方式二)`props` 接收路由参数

`为了简化路由参数的获取形式`，vue-router 允许在`路由规则`中`开启 props 传参`。

```html
<script>
  // router.js 路由模块
  // 1.在定义路由规则时，声明  props: true 选项
  // 即可在Movie 组件中，以 props 的形式接收到路由规则匹配的参数项
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
    // props 数组里面的属性 必须 和 路由规则里面的名称一致
    props: ['id'],
  }
</script>
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

② this.$router.`go`(数值 n)

- 实现导航历史前进、后退

#### $router.push

调用 this.`$router.push`() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。

```html
<template>
  <h3>MyHome 组件</h3>
  <button @click="goToMovie(3)">导航到 Movie 页面</button>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      goToMarvel(id) {
        // 通过编程式导航 API ，导航跳转到指定的页面
        this.$router.push('/movie/' + id)
      },
    },
  }
</script>
```

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

### 命名路由

通过 `name 属性`为路由规则`定义名称`的方式，叫做`命名路由`。

```js
routes: [
  // 使用 name 属性为当前的路由规则定义一个“名称”
  { name: 'mov', path: '/movie/:id', component: Movie, props: true },
]
```

> 注意：命名路由的 `name 值不能重复`，`必须保证唯一性`！

#### 使用命名路由实现`声明式导航`

为 < router-link > 标签动态绑定 to 属性的值，并通过 `name 属性`指定要跳转到的路由规则。期间还可以用 `params 属性`指定跳转期间要携带的路由参数。

```xml
<template>
  <div>
    <h3>MyHome 组件</h3>
    <!-- 属性需要与 路由规则匹配  -->
    <router-link :to="{ name: 'mov', params: { id: 3 } }">go to movie</router-link>
  </div>
</template>
```

#### 使用命名路由实现`编程式导航`

调用 `push 函数`期间指定一个`配置对象`，`name` 是要跳转到的路由规则、`params` 是携带的路由参数：

```html
<template>
  <div>
    <h3>MyHome 组件</h3>
    <button @click="goToMovie(1)">go to movie</button>
  </div>
</template>

<script>
  export default {
    name: 'MyHome',
    methods: {
      goToMovie(m_id) {
        // 传递一个配置对象；通过 name 属性，指定要跳转到那个，“命名”路由中
        this.$router.push({
          name: 'mov',
          // params 是携带的路由参数
          params: {
            id: m_id,
          },
        })
      },
    },
  }
</script>
```

### 导航守卫

`导航守卫`可以`控制路由的访问权限`。

#### 全局前置守卫

每次发生路由的`导航跳转`时，都会触发`全局前置守卫`。因此，在全局前置守卫中，程序员可以对每个路由进行`访问权限`的控制

`全局前置守卫`会`拦截每个路由规则`，从而对每个路由进行`访问权限`的控制。

- router.js 路由模块

```js
// 创建路由实例对象
const router = createRouter({...})

// 调用路由实例对象的 beforeEach 方法，即可声明 全局前置导航守卫
// 全局前置导航守卫：前置(当要做什么事，但还没有做)
// 为 router 实例对象，声明全局前置导航守卫
// 只要发生了路由的跳转，必然会触发 beforeEach 指定的 function 回调函数 callback “守卫方法”
router.beforeEach(callback)
```

#### 守卫方法的 3 个形参

`全局前置守卫`的回调函数中接收 3 个形参

```js
// 创建路由实例对象
const router = createRouter({...})

// 全局前置导航守卫：前置(当要做什么事，但还没有做)
// 三个参数都是可选的
router.beforeEach((to, from, next) => {
  // to 表示将要"访问"的路由的信息对象
  // from 表示将要"离开"的路由的信息对象
  // next() 函数, 表示"放行"的意思,允许这次路由导航
})
```

> 注意：
> ① 在守卫方法中如果`不声明 next 形参`，则默认`允许用户访问每一个路由`！
> ② 在守卫方法中如果`声明了 next 形参`，则`必须调用 next() 函数`，否则不允许用户访问任何一个路由！

#### next 函数的 3 种调用方式

1. 当前用户`拥有`后台主页的访问权限，直接放行：next()
2. 当前用户`没有`后台主页的访问权限，`强制其跳转到登录页面`：next('`/login`') // 提供一个 hash 地址
3. 当前用户`没有`后台主页的访问权限，`不允许跳转到后台主`页,`强制其停留在当前所处的页面`：next(`false`)

#### `结合 token` 控制后台主页的访问权限

- router.js 路由模块

```js
// 创建路由实例对象
const router = createRouter({...})

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
