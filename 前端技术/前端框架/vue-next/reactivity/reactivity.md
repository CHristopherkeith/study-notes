## reactivity

- [reactive](#reactive)
- [ref](#ref)
- [effect](#effect)
- [computed](#computed)

### <div id="reactive">reactive</div>
传入对象数据，通过Proxy返回代理后的响应式数据，实现数据劫持

### <div id="ref">ref</div>
可以理解为对reactive的增强，实现对非对象数据的劫持

### <div id="effect">effect</div>
传入函数，实现对响应式数据（通过```reactive```或```ref```）的监听

### <div id="computed">computed</div>
计算数据，接受getter懒加载返回响应式数据

参考  
[Vue3响应式系统源码解析-单测篇](https://juejin.im/post/5d9c9a135188252e097569bd)