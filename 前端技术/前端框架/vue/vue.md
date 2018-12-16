# vue
- [对象赋值](#对象赋值)

## 对象赋值
- 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新
- vue不能检测到对象属性的添加或删除，vue会在初始化实例时对属性执行getter/setter转化过程
- 添加响应属性到对象需使用vm.$set方法
```js
vm.$set(this.someObjectData, 'newKey', newValue)
```