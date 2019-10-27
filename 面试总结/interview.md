- [diff算法](#diff算法)
- [防抖和节流](#防抖和节流)
-  [Set、Map、WeakSet 和 WeakMap](#Set-Map-WeakSet-WeakMap)
- [DFS和BFS](#DFS和BFS)
- [利用DFS和BFS深拷贝对象](#利用DFS和BFS深拷贝对象)
- [class](#class)
- [JS 基础之异步](#JS基础之异步)
- [setTimeout、Promise、Async/Await 的区别](#setTimeout-Promise-Async/Await的区别)
- [Promise原理](#Promise原理)
- [数组扁平化去重](#数组扁平化去重)
- [实现一个new](#实现一个new)
- [谈谈你对TCP三次握手和四次挥手的理解](#谈谈你对TCP三次握手和四次挥手的理解)
- [介绍 HTTPS 握手过程](#介绍HTTPS握手过程)
- [HTTPS 中间人攻击和验证证书的合法性](#HTTPS握手过程中，客户端如何验证证书的合法性)
- [你真的理解setState吗？](#你真的理解setState吗？)
- [npm install机制](#npm-install机制)
- [数据类型](#数据类型)
- [判断数组方法](#判断数组方法)
- [介绍下重绘和回流（Repaint & Reflow），以及如何进行优化](#Repaint&Reflow)
- [观察者模式和发布订阅模式的区别](#观察者模式和发布订阅模式的区别)
- [Redux 和 Vuex 的设计思想](#redux&vuex)
- [浏览器和Node 事件循环的区别](#浏览器和Node事件循环的区别)
- [前端中的模块化开发](#前端中的模块化开发)
- [const 和 let 的作用域](#const和let的作用域)
- [xss与csrf](#xss与csrf)
- [以vue为例，如何实现一个mvvm(基于defineProperty)](#mvvm)
- [实现一个mvvm(基于Proxy)](#mvvm-proxy)
- [react原理](#react原理)
- [<font color=orange>react原理的理解，与vue有什么区别？</font>](#react-principle)
- [数组的方法：forEach，map， filter，some， reduce](#array-method)
- [virtual dom vs mvvm vs 原生dom](#virtual-dom-vs-mvvm-vs-原生dom)
- [IIFE下函数名为不可变量](#iife下函数名为不可变量)
- [IIFE下的变量提升](#IIFE下的变量提升)
- [浏览器的缓存机制](#浏览器的缓存机制)
- [BFC(Block Formatting Contexts)](#BFC)
- [vue如何限制子组件不能直接修改props？](#vue-limit-props)
- [响应式原理：Object.defineProperty VS Proxy](#Object-defineProperty-VS-Proxy)
- [div水平垂直居中](#div水平垂直居中)
- [.优先级与对象赋值](#.优先级与对象赋值)
- [array like](#array-like)
- [为什么数据埋点时通常使用1x1 像素的透明 gif 图片？](#数据埋点)
- [实现LazyMan类](#实现LazyMan类)
- [箭头函数与普通函数的区别](#箭头函数与普通函数的区别)
- [如何实现token加密](#如何实现token加密)
- [如何设计实现无缝轮播](#如何设计实现无缝轮播)
- [requestAnimationFrame](#requestAnimationFrame)
- [ES6 代码转成 ES5 代码的实现思路](#ES6代码转成ES5代码的实现思路)
- [HMR原理](#HMR原理)
- [BFC、IFC、GFC 和 FFC](#BFC-IFC-GFC-FFC)
- [input处理中文输入](#input处理中文输入)
- [currying与累加器](#currying与累加器)
- [react-router 里的 \<Link> 标签和 \<a> 标签有什么区别](#<Link>&<a>)
- [<font color=orange>HTML5 history 和 hash模式</font>](#history&hash)
- [list转tree](#list转tree)
- [实现Promise相关类方法](#实现Promise相关类方法)
- [<font color=orange>时间复杂度为O(log(m+n))的取中位数算法</font>](#find-median)
- [vue的事件处理机制](#vue的事件处理机制)
- [返回整数逆序后的字符串](#返回整数逆序后的字符串)
- [vuex数据无法刷新](#vuex数据无法刷新)
- [vue mpa](#vue-mpa)
- [http协议](#http状态码)
### <div id="diff算法">diff算法</div>
参考
[写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)
[详解vue的diff算法](https://www.cnblogs.com/wind-lanyan/p/9061684.html)
[VueDiff算法的简单分析和一些个人思考](https://www.jianshu.com/p/cd39cf4bb61d)
[传统diff、react优化diff、vue优化diff](https://www.jianshu.com/p/398e63dc1969)

### <div id="防抖和节流">防抖和节流</div>
防抖：只要输入频率持续高于阈值，函数就不触发，当最后一次触发频率低于阈值时执行，将多次频繁执行合并为一次，函数固定时间执行次数与输入频率有关
```javascript
function debounce(fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, 500);
  };
}
function sayHi() {
  console.log('防抖成功');
}
var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖
```
节流：输入频率持续高于阈值时，函数转换为低频率执行，即将函数由高频执行降为低频，函数固定时间执行次数与输入频率无关
```js
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}
function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));
```
参考
[什么是防抖和节流？有什么区别？如何实现？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)
[前端面试查漏补缺--(一) 防抖和节流](https://juejin.im/post/5c6bab91f265da2dd94c9f9e)

### <div id="Set-Map-WeakSet-WeakMap">Set、Map、WeakSet 和 WeakMap</div>
1.Set为不含重复值的类数组结构
2.WeakSet为存储对象的类数组结构；且垃圾回收机制不考虑WeakSet成员
3.Map为Value-Value的Hash结构，键名不限于字符串
4.WeakMap键值只能为对象；且垃圾回收机制不考虑WeakMap键值

### <div id="DFS和BFS">DFS和BFS</div>
数据：
```js
let data = {
	a: {
		c: {
			g: {
				m: {
					r: true,
					s: true
				}
			},
			h: {
				n: {
					t: true
				},
				o: true
			}
		},
		d:{
			i: true
		}
	},
	b: {
		e: {
			j: true,
			k: {
				p: true,
				q: true
			}
		},
		f: {
			l: true
		}
	}
}
```
深度遍历：
```js
const depthFirstTraversing = (data)=>{
	let traversingRes = [];
	for(let key in data){
		// console.log(key);
		traversingRes.push(key);
		if(data[key] !== true){
			traversingRes = traversingRes.concat(depthFirstTraversing(data[key]))
		}
	}
	return traversingRes;
}
console.log(depthFirstTraversing(data));
```
广度遍历
```js
const breadthFirstTraversing = (data)=>{
	let traversingRes = [];
	let leveNodes = [];
	for(let key in data){
		leveNodes.push({key, data: data[key]});
	}
	while(leveNodes.length > 0){
		let item = leveNodes.shift();
		traversingRes.push(item.key);
		for(let childKey in item.data){
			leveNodes.push({key: childKey, data: item.data[childKey]})
		};
	}
	return traversingRes;
}
console.log(breadthFirstTraversing(data))
```
### <div id="利用DFS和BFS深拷贝对象">利用DFS和BFS深拷贝对象<div>
data同上题
利用DFS深拷贝对象
```js
const deepCopyThroughDFS = (data)=>{
	let copyRes = {};
	for(let key in data){
		// console.log(key);
		if(data[key] !== true){
			copyRes[key] = deepCopyThroughDFS(data[key]);
		}else{
			copyRes[key] = true;
		}
	}
	return copyRes;
}
```
利用BFS深拷贝对象
```js
const deepCopyThroughBFS = (data)=>{
	let copyRes = {};
	let leveNodes = [];
	for(let key in data){
		leveNodes.push({key, data: data[key], parentData: copyRes});
	}
	while(leveNodes.length > 0){
		let item = leveNodes.shift();
		if(item.data !== true){
			item.parentData[item.key] = {};
			for(let childKey in item.data){
				leveNodes.push({key: childKey, data: item.data[childKey], parentData: item.parentData[item.key]})
			};
		}else{
			item.parentData[item.key] = true;
		}
		
	}
	return copyRes;
}
```
### <div id="class">class</div>
es6 class的实例方法，实例属性，原型链方法，静态方法(static)支持实现
es6 class的原型链属性，静态属性不支持实现，暂时用es5方式实现

### <div id="JS基础之异步">JS基础之异步</div>
参考
[JS 基础之异步](https://github.com/sisterAn/blog/issues/11)

### <div id="setTimeout-Promise-Async/Await的区别">setTimeout、Promise、Async/Await 的区别</div>
js执行机制：
1.js任务分为同步任务和异步任务，异步任务进入任务队列，根据macrotasks和microtasks分别放入macroqueue和microqueue
2.macrotasks，每次执行栈执行的代码就是一个宏任务，主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)
3.microtasks，当前 task 执行结束后立即执行的任务，主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)
4.每个event loop执行一个macrotask后会清空当前产生的macrotask产生的microtasks，然后进入下个event loop
5.Promise构造函数是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作
6.async通过返回Promise来执行实现await，await通过返回一个Promise对象来实现同步的效果

参考:
[js event loop 事件循环](https://github.com/kangkai124/blog/issues/24)
[常见异步笔试题](https://github.com/sisterAn/blog/issues/21)
[浏览器的Tasks、microtasks、 queues 和 schedules](https://github.com/sisterAn/blog/issues/21)
[setTimeout、Promise、Async/Await 的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)
### <div id="Promise原理">Promise原理</div>
1. 在 then 函数执行时用一个属性this.callback保存回调函数 cb数组，然后在 resolve 执行时再将其执行
2. 添加一个属性 isResolved，用来记录是否调用过 resolve 函数，避免多次执行resolve
3. then返回Promise对象可支持链式调用

[Promise 源码：实现一个简单的 Promise](https://github.com/cobish/code-analysis/issues/10)
[Promise原理讲解 && 实现一个Promise对象 (遵循Promise/A+规范)](https://juejin.im/post/5aa7868b6fb9a028dd4de672#heading-0)
[面试精选之Promise](https://juejin.im/post/5b31a4b7f265da595725f322)
### <div id="数组扁平化去重">数组扁平化去重</div>
>已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
const flattenData  = (data)=>{
	var newData = [];
	data.forEach((item)=>{
		if(typeof item === 'object'){
			newData = newData.concat(flattenData(item))
		}else{
			newData.push(item)
		}
	})
	return newData;
}
const sortAndDeduplication = (data)=>{
	const sort = (a,b)=>{
		return a - b;
	}

	var newData = [];
	newData = data.sort(sort).reduce((acc, cVlue)=>{
		if(cVlue !== acc[acc.length - 1]){
			acc.push(cVlue);
		}
		return acc
	}, [])
	return newData;
}
const flatAndSortAndDeduplication = (data)=>{
	// let flatData = flattenData(data);
	let sortAndDeduplicatedData = sortAndDeduplication(flattenData(data));
	return sortAndDeduplicatedData
}
console.log(flatAndSortAndDeduplication(arr))
```
### <div id="实现一个new">实现一个new</div>
```js
const _new = function(){
	const [klass, ...args] = arguments;
	var newInstance = {};
	klass.apply(newInstance, args);
	newInstance.__proto__ = klass.prototype
	return newInstance;
}
let classA = function(a, b){
	this.a = a;
	this.b = b;
}
classA.prototype = {
	geta: function(){
		console.log(this.a)
	},
	setb: function(b){
		this.b = b
	}
}
// 实例化classA
let aa = _new(classA, 1, 2)
```
### <div id="谈谈你对TCP三次握手和四次挥手的理解">谈谈你对TCP三次握手和四次挥手的理解</div>
参考：
[作为前端的你了解多少tcp的内容](https://juejin.im/post/5c078058f265da611c26c235)
[TCP 请求头](https://blog.csdn.net/jijianshuai/article/details/80883091)
[网络分层TCP/IP 与HTTP](https://juejin.im/post/5a98e1f7f265da237410694e)
[谈谈你对 TCP 三次握手和四次挥手的理解](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)
### <div id="介绍HTTPS握手过程">介绍HTTPS握手过程</div>
![ssl/tsl](https://img-blog.csdnimg.cn/2019072118130236.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Vhc29uTXU=,size_16,color_FFFFFF,t_70)
参考：
[介绍 HTTPS 握手过程](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/71)
[SSL/TLS协议运行机制的概述](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
[HTTP和HTTPS协议，看一篇就够了](https://blog.csdn.net/xiaoming100001/article/details/81109617)
[https握手](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/73)
[介绍 HTTPS 握手过程](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/70)
### <div id="HTTPS握手过程中，客户端如何验证证书的合法性">HTTPS 中间人攻击和验证证书的合法性</div>
[介绍下 HTTPS 中间人攻击 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/142)
[HTTPS 握手过程中，客户端如何验证证书的合法性](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/74)
### <div id="你真的理解setState吗？">你真的理解setState吗？</div>
参考：
[你真的理解setState吗？](https://juejin.im/post/5b45c57c51882519790c7441#heading-7)

### <div id="npm-install机制">npm install机制</div>
关键点：扁平化安装，若存在多个不兼容版本则需嵌套安装
参考：
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22
[详解npm的模块安装机制](https://www.bbsmax.com/A/qVdemmnEdP/)

### <div id="数据类型">数据类型<div>
原始类型：boolean、undefined、string、number、symbol
对象类型：null ,Array、function、Object

### <div id="判断数组方法">判断数组方法</div>
1.Object.prototype.toString.call([])  // "[object Array]"
借用Object的toString方法，基本可以判断所有的数据类型
2.[] instanceof Array // true
判断[]原型链上是否能找到Array类型，<font color=red>仅对对象类型的数据有效，对原始类型无效</font>
3.Array.isArray([]) // true
判断是否为数组，与2方法比较，该方法可以判断出iframe数组
4.typeof [] // "object"
<font color=red>注意：该方法不能判断对象类型，对象类型输出均为object，只能判断原始类型</font>

### <div id="Repaint&Reflow">Repaint&Reflow</div>
参考：
[介绍下重绘和回流（Repaint & Reflow），以及如何进行优化](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)
### <div id="观察者模式和发布订阅模式的区别">观察者模式和发布订阅模式的区别</div>
![观察者模式和发布订阅模式的区别](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81MjYyNDg4LTI5MWRhMzlmNjZkYmMyOGEucG5n)
参考：
[观察者模式和发布订阅模式的区别](https://www.jianshu.com/p/594f018b68e7)
[介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/25)
### <div id="redux&vuex">Redux 和 Vuex 的设计思想</div>
参考：
[Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)

### <div id="浏览器和Node事件循环的区别">浏览器和Node事件循环的区别</div>
1.Nodejs v11以下：
执行完第一个阶段的所有任务（包含macrotask与对应产生的microtasks），再执行完nextTick macrotasks队列里面的内容， 然后执行完微任务队列的内容
2.Nodejs v11及以上：
执行完每一个macrotask，再执行macrotask对应产生的microtasks，如此循环
参考：
[浏览器和Node 事件循环的区别 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26)

### <div id="前端中的模块化开发">前端中的模块化开发</div>
参考：
[前端中的模块化开发](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/28)
### <div id="const和let的作用域">const 和 let 的作用域<div>
1.const和let会创造block作用域，只要在同一个block内都可以拿到变量
2.顶部var变量挂在window下
示例：
如下创造了2个Block，分别对应变量e和f；1个Script（也可以理解为顶级Block），对应变量a和b，剩下的c和d作为全局变量
![const和let的作用域](https://img-blog.csdnimg.cn/20190714183656661.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Vhc29uTXU=,size_16,color_FFFFFF,t_70)
### <div id="xss与csrf">xss与csrf<div>
1.xss：跨站脚本攻击，分为存储型 XSS，反射型 XSS和DOM 型 XSS。向被攻击网站注入恶意代码并执行
2.csrf：跨站请求伪造，利用用户在被攻击网站已经保存的信息，在第三方网站向被攻击网站发送请求，冒充用户执行操作
3.预防
xss：过滤用户输入；转义html
csrf：同源检测；添加csrf token
4.
遭受xss攻击的网站，cookie和token均可以被劫持
遭受csrf攻击的网站，cookie可以被劫持，token只要不放在cookie就不会被劫持，或者只要不直接使用cookie token作为键值，被劫持的token也为无效token
### <div id="mvvm">以vue为例，如何实现一个mvvm(基于defineProperty)</div>
一个mvvm包含：
1.编译器（compiler，基础模板引擎）
提取指令，data等，渲染真实dom
2.数据劫持（observer，利用defineProperty）
核心方法
```js
defineReactive(obj,key,value){
    // 在获取某个值的适合 想弹个框
    let that = this;
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get(){ // 当取值时调用的方法
            return value;
        },
        set(newValue){ // 当给data属性中设置值的适合 更改获取的属性的值
            if(newValue!=value){
                // 这里的this不是实例 
                that.observe(newValue);// 如果是设置的是对象继续劫持
                value = newValue;
            }
        }
    });
}
```
3.view观察者（watcher）
watcher在拥有data挂载的模板编译阶段实例化一次，确定回调更新函数，使view成为model更新的订阅者；watcher在内部的构造函数内将自身与dep关联并加入dep.subs队列
4.model发布主体（dep）
数据observer化时，在get方法内将关联watcher加入队列；在set方法发布订阅
5.数据代理（proxy）
将vm.data.foo代理到vm.foo
6.监听dom事件
在编译阶段查看是否涉及数据绑定事件监听，如v-model等，并设置回调函数更新vm.data
7.diff更新view（watcher执行订阅更新之后）
![mvvm](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxOC81LzcvMTYzMzllM2U0MTQ4OGQzNw)
以上参考：
https://juejin.im/post/5af8eb55f265da0b814ba766
### <div id="mvvm-proxy">实现一个mvvm(基于Proxy)</div>
参照vue2.x（上例）的响应式设计模式，将数据劫持部分的Obejct.defineProperty替换为Proxy即可，其他部分，如compile，watcher，dep，事件监听等基本保持不变，简单实现代码如下：
```js
class Watcher{
	constructor(cb){
		this.cb = cb;
	}
	update(){
		this.cb()
	}
}
class Dep{
	constructor(){
		this.subs = [];
	}
	publish(){
		this.subs.forEach((item)=>{
			item.update && item.update();
		})
	}
}
class MVVM{
	constructor(data){
		let that = this;
		this.dep = new Dep();
		this.data = new Proxy(data,{
			get(obj, key, prox){
				that.dep.target && that.dep.subs.push(that.dep.target);
				return obj[key]
			},
			set(obj, key, value, prox){
				obj[key] = value;
				that.dep.publish();
				return true;
			}
		})
		this.compile();
	}
	compile(){
		
		let divWatcher = new Watcher(()=>{
			this.compileUtils().div();
		})
		this.dep.target = divWatcher;
		this.compileUtils().div();
		this.dep.target = null;
		
		let inputWatcher = new Watcher(()=>{
			this.compileUtils().input();
		})
		this.dep.target = inputWatcher;
		this.compileUtils().input();
		this.compileUtils().addListener();
		this.dep.target = null;
	}
	compileUtils(){
		let that = this;
		return {
			div(){
				document.getElementById('foo').innerHTML = that.data.foo;
			},
			input(){
				document.getElementById('bar').value = that.data.bar;
			},
			addListener(){
				document.getElementById('bar').addEventListener('input', function(){
					that.data.bar = this.value;
				})
			}
		}
	}
}
let mvvm = new MVVM({foo: 'foo233', bar: 'bar233'})
```
通过```mvvm.data.foo```或者```mvvm.data.bar```可以操作数据，可以观察到view做出了反应；在输入框改变输入值，也可以通过```mvvm.data```观察到数据被触发改变
### <div id="react原理">react原理</div>
- 渲染机制及虚拟dom
![react](https://img-blog.csdnimg.cn/20190731000645625.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0Vhc29uTXU=,size_16,color_FFFFFF,t_70)
- 更新机制
```js
/**
 * 更新
 * @param {*} newState 新状态
 */
ReactClass.prototype.setState = function(newState) {
  // 拿到ReactCompositeComponent的实例
  // 在装载的时候保存
  // 代码：this._reactInternalInstance = this
  this._reactInternalInstance.receiveComponent(null, newState);
};
```
- 文本节点的 receiveComponent
文本节点的更新比较简单，拿到新的文本进行比较，不同则直接替换整个节点
- 自定义元素的 receiveComponent
1. 合并 state
2. 更新 state
3. 然后看业务代码中是否实现生命周期方法 shouldComponentUpdate 有则调用，如果返回值为 false 则停止往下执行
4. 然后是生命周期方法 componentWillUpdate
5. 然后通过拿到新 state 的 instance 调用 render 方法拿到新的 element 和之旧的 element 进行比较
6. 如果要更新就继续调用对应的 component 类对应的 receiveComponent 就好啦，其实就是直接当甩手掌柜，事情直接丢给手下去办了。当然还有种情况是，两次生成的 element 差别太大，就不是一个类型的，那好办直接重新生成一份新的代码重新渲染一次就 ok 了
- 基本元素的 receiveComponent

  基础元素的更新包括两方面

- 属性的更新，包括对特殊属性比如事件的处理
- 子节点的更新
子节点的更新比较复杂，是提升效率的关键，所以需要处理以下问题：
- diff - 拿新的子节点树跟以前老的子节点树对比，找出他们之间的差别。
- patch - 所有差别找出后，再一次性的去更新。


[React 源码分析](https://juejin.im/post/5bd132d6f265da0aa665033a)
[React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)
[[译] Virtual Dom 和 Diff 算法在 React 中是如何工作的？](https://juejin.im/post/5c504f736fb9a049ef26fcd3)
[了解react、vue的一大核心技术：虚拟DOM的实现原理](https://juejin.im/post/5b30446ef265da59bf7a0312)
[从Preact了解一个类React的框架是怎么实现的(一): 元素创建](https://juejin.im/post/59b69b6e5188257e6b6d7bfc)
[从Preact了解一个类React的框架是怎么实现的(二): 元素diff](https://juejin.im/post/59c76e515188254f584132af)
[从Preact了解一个类React的框架是怎么实现的(三): 组件](https://juejin.im/post/59ee07ed51882546d71e839d)
[ARV 渲染实现比较总结](http://blog.sprabbit.com/2016/03/08/Angular-React-Vue-Rendering-4/)
### <div id="array-method">数组的方法：forEach，map， filter，some， reduce</div>
1.reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
```js
arr.reduce(callback(accumulator, currentValue[, index[, sourceArray]])[, initialValue])
```
2.filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
```js
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```
3.some() 方法测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。
```js
arr.some(callback(element[, index[, array]])[, thisArg])
```
4.forEach() 方法对数组的每个元素执行一次提供的函数。没有办法中止或者跳出 forEach() 循环，除了抛出一个异常.
```js
arr.forEach(callback(element[, index[, array]])[, thisArg]);
```
5.map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```
### <div id="virtual-dom-vs-mvvm-vs-原生dom">virtual dom vs mvvm vs 原生dom</div>
参考：
[网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么](https://www.zhihu.com/question/31809713/answer/53544875)
[Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47)
### <div id="iife下函数名为不可变量">IIFE下函数名为不可变量<div>
以下代码输出b函数
```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
因为iife的函数表达式函数名为不可变量，在 strict 模式下会报错，非 strict 模式下静默失败
参考：
[js的作用域问题？](https://segmentfault.com/q/1010000009921427)
[下面的代码打印什么内容，为什么？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/48)
### <div id="IIFE下的变量提升">IIFE下的变量提升</div>
```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```
以上代码输出：
undefined -> 10 -> 20，因为IIFE作用域内a在后面声明时被提升了
如果去掉 var a = 20，则打印10->5->5，因为IIFE内部取到的是外部定义的变量a
### <div id="浏览器的缓存机制">浏览器的缓存机制</div>
1.强制缓存
强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。Cache-Control优先级高于Expires，Expires是http1.0的产物，Cache-Control是http1.1的产物
2.协商缓存
协商缓存可以在response header中添加 Last-Modified和Etag实现。Etag优先级高于 Last-Modified，Etag精度较好，Last-Modified性能较好
3.强缓存优先级高于协商缓存
4.用户行为对浏览器缓存的影响
- 地址栏输入url，检查是否有disk cache 可用
- 刷新页面，先检查memory cache，再检查disk cache
- 强制刷新 (Ctrl + F5)，发送的请求头部均带有 Cache-control: no-cache，不使用缓存
![cache](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8zMTc0NzAxLThlNzRiNjlhZDkzNzY3MTA)
参考：
[深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)
### <div id="BFC">BFC(Block Formatting Contexts</div>
BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响
1.触发BFC的条件
- html 根元素
- float 浮动
- 绝对定位
- overflow 不为 visible
- display 为表格布局或者弹性布局
2.BFC的作用
- 清除浮动
- 防止同一 BFC 容器中的相邻元素间的外边距重叠问题
- 实现文字环绕或左图右文的布局
参考：
[介绍下 BFC 及其应用](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59)
https://github.com/glitchboyl/blog/issues/6
### <div id="vue-limit-props">vue如何限制子组件不能直接修改props？</div>
参考：
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60
### <div id="Object-defineProperty-VS-Proxy">响应式原理：Object.defineProperty VS Proxy</div>
1.Object.defineProperty不能检测数组下标变动，而Proxy可以代理整个数据
2.Object.defineProperty代理对象时需要遍历对象的每个属性（嵌套对象需要递归遍历），Proxy可以直接代理整个对象
参考：
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/90
### <div id="div水平垂直居中">div水平垂直居中</div>
1.定宽高：
- 绝对定位+margin auto
- 绝对定位+transform

2.不定宽高：
- 绝对定位+transform 
### <div id=".优先级与对象赋值">.优先级与对象赋值</div>
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```
以上代码输出：
undefined->{n:2}
### <div id="array-like">array like</div>
```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```
以上代码输出:（push时array like对象length +1）
```js
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
```
判断类数组的方法
- 存在且是对象
- 对象上的splice 属性是函数类型
- 对象上有 length 属性且为正整数
### <div id="数据埋点">为什么数据埋点时通常使用1x1 像素的透明 gif 图片？</div>
- 能够完成整个 HTTP 请求+响应（尽管不需要响应内容）
- 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
- 跨域友好
- 执行过程无阻塞
- 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好
- GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）
参考：
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/87
### <div id="实现LazyMan类">实现LazyMan类</div>
实现以下类：
```js
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```
关键点：
- 类原型方法返回实例
- 维护任务队列
- 利用setTimeout 0，实现队列任务全部添加完之后再执行任务
代码：
```js
class LazyManClass{
	constructor(name){
		console.log(`Hi I am ${name}`)
		this.tasksQueue = [];
		setTimeout(()=>{
			this.next();
		})
	}
	eat(meal){
		let that = this;
		let fn = function(){
			(function(meal){
				console.log(`I am eating ${meal}`);
				that.next();
			})(meal);
		}
		this.tasksQueue.push(fn);
		return this;
	}
	sleep(time){
		let that = this;
		let fn = function(){
			(function(time){
				setTimeout(function(){
					console.log(`等待了 ${time}s`);
					that.next();
				}, time*1000)
			})(time);
		}
		this.tasksQueue.push(fn);
		return this;
	}
	sleepFirst(time){
		let that = this;
		let fn = function(){
			(function(time){
				setTimeout(function(){
					console.log(`等待了 ${time}s`);
					that.next();
				}, time*1000)
			})(time);
		}
		this.tasksQueue.unshift(fn);
		return this;
	}
	next(){
		let fn = this.tasksQueue.shift();
		fn&&fn();
	}
}
const LazyMan = (name)=>{
	return new LazyManClass(name)
}
```
参考：
[要求设计 LazyMan 类，实现以下功能](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/98)
### <div id="箭头函数与普通函数的区别">箭头函数与普通函数的区别</div>
箭头函数没有自己的this，没有arguments，没有prototype，因此不能作为构造函数使用
### <div id="如何实现token加密">如何实现token加密</div>
- 需要一个secret（随机数）
- 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
- 前端每次request在header中带上token
- 后端用同样的算法解密
参考：
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/106
### <div id="如何设计实现无缝轮播">如何设计实现无缝轮播</div>
1.关键点：
- 元素处理：轮播周期结束后，将第一个li元素clone到尾部，然后移除第一个元素
- 利用requestAnimationFrame实现动画效果，在动画循环中通过时间判断位移，在轮播周期内重置开始时间
2.代码实现
```js
const carousel = function(id, speed=1000){
	this.speed = speed;
	this.root = document.getElementById(id); 
	this.startTime = new Date();
	this.req = null;
	this.begin();
}
carousel.prototype = {
	begin(){
		this.render();
		let timer = setInterval(()=>{
			// cancelAnimationFrame(this.req);
			// clearInterval(timer);
			let lists = this.root.getElementsByTagName('li');
			let length = lists.length; 
			let first = lists[0];
			this.root.appendChild(first.cloneNode(true));
			this.root.removeChild(first);
			this.root.style.left = '0px';
			this.startTime = new Date();
			// this.render();
		}, this.speed)
	},
	render(){
		this.root.style.left = -(new Date() - this.startTime)/this.speed*100 + 'px'
		this.req = requestAnimationFrame(this.render.bind(this));
	}
}
let carouselIns = new carousel("carousel")
```
### <div id="requestAnimationFrame">requestAnimationFrame</div>
1.概念：
告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
2.兼容：
```js
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()
```
3.优势：
- 浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的动画效果
- 一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力
### <div id="ES6代码转成ES5代码的实现思路">ES6 代码转成 ES5 代码的实现思路</div>
1. 解析：解析代码字符串，生成 AST；
2. 转换：按一定的规则转换、修改 AST；
3. 生成：将修改后的 AST 转换成普通代码。
### <div id="HMR原理">HMR原理</div>
关键点
1. webpack watch文件更新
2. webpack-dev-server通过sockjs与浏览器建立长连接
3. HMR runtime接收到更新信息后通过ajax获取文件，并对比更新
![HMR](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9waWMxLnpoaW1nLmNvbS92Mi1mNzEzOWY4NzYzYjk5NmViZmEyODQ4NmUxNjBmNjM3OF9yLmpwZw)
参考：
[Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
[介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/118)
### <div id="BFC-IFC-GFC-FFC">BFC、IFC、GFC、FFC</div>
参考：
[介绍下 BFC、IFC、GFC 和 FFC](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/122)
### <div id="input处理中文输入">input处理中文输入</div>
使用compositionstart + compositionend判断，如过程不想触发input事件则加boolean值判断
### <div id="currying与累加器">currying与累加器</div>
```js
// 实现一个函数
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3)；// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
```
##### currying版本
关键点：
1. 判断待传入参数大于等于函数执行所需的参数长度，再触发执行
2. 利用递归接收所有参数，传入```fn.bind(this, ...args)```保存所有参数
```js
const originAdd = (x,y,z)=>{
	return x+y+z
}
const currying = function(fn, length){
	length = length || fn.length
	return function(...args){
		return args.length >= length ? fn.apply(this, args) : currying(fn.bind(this, ...args), length - args.length)
	}
}
const add = currying(originAdd)
```
##### 累加器版本
关键点
1. 维护闭包变量存储变量值
2. 利用打印函数值调用toString方法，重写toString将所有参数累加
```js
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}
```
参考：
[深入高阶函数应用之柯里化 ](https://github.com/yygmind/blog/issues/37)
[请实现一个 add 函数，满足以下功能](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134)
[详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71)
### <div id="<Link>&<a>">react-router 里的 \<Link> 标签和 \<a> 标签有什么区别</div>
- link由react-router代理了a的默认事件，用event.preventDefault()阻止默认事件
- link点击事件查找是否有to或者replace，使用history替换
- 其他渲染行为
### <div id="history&hash">HTML5 history 和 hash模式</div>
### <div id="list转tree">list转tree</div>
以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```js
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);
```
实现如下：
```js
const convert = (list)=>{
	let rs = [], listMap = {}, parent;
	for(let i=0;i<list.length;i++){
		let temp = list[i];
		listMap[temp.id] = temp;
	}
	list.forEach((temp)=>{
		if(temp.parentId === 0){
			rs.push(temp);
		}else{
			parent = listMap[temp.parentId];
			!parent.children && (parent.children = []);
			parent.children.push(temp)
		}
	})
	return rs;
}
let list = [
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4},
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
];
const result = convert(list);
console.log(result)
```
### <div id="实现Promise相关类方法">实现Promise相关类方法</div>
```js
// Promise.race
const _race = (p)=>{
	return new Promise((resolve, reject)=>{
		let status = false;
		p.forEach((item)=>{
			item.then(resolve, reject)
		})
	})
}
// Promise.all
all(list) {
    return new Promise((resolve, reject) => {
        let resValues = [];
        let counts = 0;
        for (let [i, p] of list) {
            resolve(p).then(res => {
                counts++;
                resValues[i] = res;
                if (counts === list.length) {
                    resolve(resValues)
                }
            }, err => {
                reject(err)
            })
        }
    })
}
// Promise.finally
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
### <div id="HTTPS 中间人攻击">HTTPS 中间人攻击</div>
参考：
[介绍下 HTTPS 中间人攻击](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/142)
### <div id="find-median">时间复杂度为O(log(m+n))的取中位数算法</div>
### <div id="vue的事件处理机制">vue的事件处理机制</div>
1. 普通html元素和在组件上挂了```.native```修饰符的事件。最终```EventTarget.addEventListener()```挂载事件
普通元素在compile阶段被解析为ast语法树，包含该元素监听的事件，事件在render阶段由add$1通过addEventListener挂载到真实元素上
2. 组件上的，vue组件实例上的自定义事件（不包括```.native```）会调用原型上的```$on,$emit```（包括一些其他api ```$off,$once```等等）
组件在编译阶段data.on被替换为.native事件，data.on与普通hml元素做一致处理；自定义事件被缓存为listener，利用实例```$on```方法放入观察者队列，子组件调用```$emit```方法可发布订阅
参考：
https://segmentfault.com/a/1190000009750348
### <div id="返回整数逆序后的字符串">返回整数逆序后的字符串</div>
关键点
转字符串，二分，前后部分交换，递归
```js
const reverseOrder = (num)=>{
	let numStr = num.toString();
	let length = numStr.length;
	if(length == 1){
		return numStr;
	}else{		 
		return length%2 === 0 ? 
		reverseOrder(numStr.slice(length/2,length)) + reverseOrder(numStr.slice(0,length/2)) :
		reverseOrder(numStr.slice((length+1)/2,length)) + numStr[(length-1)/2] + reverseOrder(numStr.slice(0,(length-1)/2))
	}
}
console.log(reverseOrder(12345678))
```
### <div id="vuex数据无法刷新">vuex数据无法刷新</div>
两个维度：
1.在生命周期钩子函数内将store.state.foo赋值给data，data无法刷新
解决：将store.state.foo绑定到计算属性
2.vuex无法持久化：
结合local/session storage，在set数据时写入缓存；在store.js读取缓存
### <div id="vue-mpa">vue mpa</div>
- entry配置为多属性对象(或数组)
- 配置HtmlWebpackPlugin 
参考:
[vue-cli配置多入口多出口，实现一个项目两个访问地址，区分不同上线环境](https://www.cnblogs.com/jasonwang2y60/p/9247283.html)
[搭建 vue2 vue-router2 webpack3 多入口工程](https://www.qinshenxue.com/article/20171102091836.html)
### <div id="http状态码">http协议</div>
1.格式
请求行（request line）、请求头部（header）、空行和请求数据
![ss](https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cucnVub29iLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8xMS8yMDEyMDcyODEwMzAxMTYxLnBuZw)
2.状态码
分类|分类描述
--|:--:
1**|信息，服务器收到请求，需要请求者继续执行操作
2**|成功，操作被成功接收并处理
3**|重定向，需要进一步的操作以完成请求
4**|客户端错误，请求包含语法错误或无法完成请求
5**|服务器错误，服务器在处理请求的过程中发生了错误
