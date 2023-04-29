// 封装类
class Promise {
  // 构造方法
  /**
   * 
   * @param {*} executor 执行器函数，同步调用
   */
  constructor(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    // 声明属性
    this.callbacks = []
    // 保存实例对象 this 的值
    let _this = this

    // resolve 函数
    function resolve(data) {
      // 判断状态
      if (_this.PromiseState !== 'pending') return
      // 1.修改对象的状态 (promiseState)
      _this.PromiseState = 'fulfilled' // resolved
      // 2.设置对象结果值 (promiseResult)
      _this.PromiseResult = data
      // 调用成功的回调函数 改变状态之后才能执行回调
      setTimeout(() => {
        _this.callbacks.forEach(item => {
          item.onResolved(data)
        })
      })
    }
    // reject 函数
    function reject(data) {
      // 判断状态
      if (_this.PromiseState !== 'pending') return
      // 1.修改对象的状态 (promiseState)
      _this.PromiseState = 'rejected'
      // 2.设置对象结果值 (promiseResult)
      _this.PromiseResult = data
      // 执行失败的回调 改变状态之后才能执行回调
      setTimeout(() => {
        _this.callbacks.forEach(item => {
          item.onRejected(data)
        })
      })
    }

    try {
      // 同步调用
      executor(resolve, reject)
    } catch (err) {
      // 修改 promise 的状态为 失败
      reject(err)
    }
  }

  // then 方法封装
  /**
 * 
 * @param {*} onResolved  接收成功的callback  'value'
 * @param {*} onRejected  接收失败的callback  'reason'
 * @returns {*} promise 对象
 */
  then(onResolved, onRejected) {
    const _this = this
    // 判断回调函数参数 
    // 设置失败默认值
    if (typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }
    if (typeof onResolved !== 'function') {
      onResolved = value => value
    }

    return new Promise((resolve, reject) => {
      // 封装函数
      function callback(type) {
        try {
          // 获取回调函数执行的结果
          let result = type(_this.PromiseResult)
          // 判断
          if (result instanceof Promise) {
            // 如果是 Promise 类型的对象
            result.then(value => {
              resolve(value)
            }, reason => {
              reject(reason)
            })
          } else {
            // 结果的对象状态为成功 fulfilled
            resolve(result)
          }
          // 捕获处理错误的状态
        } catch (err) {
          reject(err)
        }
      }
      // 调用回调函数  PromiseState
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onResolved)
        })
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
      }
      // 判断 pending 状态
      if (this.PromiseState === 'pending') {
        // 保存回调函数 
        this.callbacks.push({
          onResolved: function () {
            callback(onResolved)
          },
          onRejected: function () {
            callback(onRejected)
          }
        })
      }
    })
  }

  // catch 方法
  /**
 * 
 * @param {*} onRejected 失败的 callback
 * @returns {*} promise 对象
 */
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // 添加 resolve 方法 静态成员
  static resolve(value) {
    // 返回 promise 对象
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      } else {
        // 状态设置为成功
        resolve(value)
      }
    })
  }

  // 添加 reject 方法 静态成员
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  // 添加 all 方法 静态成员
  static all(promises) {
    // 返回结果为 promise 对象
    return new Promise((resolve, reject) => {
      // 声明计数器变量
      let count = 0
      let arr = []
      // 遍历
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => {
          // 得知对象的状态是成功
          // 每个 promise 对象都成功
          count++
          // 将当前 promise 对象成功的结果，存入到数组中
          arr[i] = value
          // 判断
          if (count === promises.length) {
            // 修改状态
            resolve(arr)
          }
        }, reason => {
          reject(reason)
        })
      }
    })
  }

  // 添加 race 方法 静态成员 
  // 谁先改变状态，返回的就是谁
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(value => {
          // 修改返回对象的状态为 成功
          resolve(value)
        }, reason => {
          // 修改返回对象的状态为 失败
          reject(reason)
        })
      }
    })
  }
}









