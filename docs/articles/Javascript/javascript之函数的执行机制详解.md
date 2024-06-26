---
title: javascript之函数的执行机制详解
date: '2020-01-14'
type: 技术
tags: javascript
note: 越是学习js越是觉得js基础理论知识是多么的重要，所以最近花了比较多的时间去学习，并把学习所得之感悟记录下来，以加深自己的理解，同时也供将来自己复习所用。写的不对的地方还烦请各位大神指出，非常乐意跟各位同道中人交流。
---
&#8195;&#8195;越是学习`js`越是觉得`js`基础理论知识是多么的重要，所以最近花了比较多的时间去学习，并把学习所得之感悟记录下来，以加深自己的理解，同时也供将来自己复习所用。写的不对的地方还烦请各位大神指出，非常乐意跟各位同道中人交流。

## 1、执行环境
&#8195;&#8195;执行环境是指函数或变量在js运行起来时所处的环境。执行环境定义了变量或函数有权访问的其他数据，决定了他们各自的行为，决定了它们的生命周期。执行环境可分为函数执行环境和全局执行环境。

> **函数执行环境：** 每当调用函数时，都会在内存中创建该函数的执行环境,函数环境会被推入一个环境栈中。当函数执行完之后，栈将其环境弹出，并将其销毁，把控制权返回给之前的执行环境。 

> **全局执行环境：** 是最外围的一个执行环境。在web浏览器中，window对象那个被认为是全局执行环境。所有的全局变量和函数都是window对象的属性和方法。全局执行环境在应用程序退出（网页/浏览器关闭）时被销毁。

## 2、作用域

**作用域：** 表示变量或函数能够被访问到的区域，控制着变量和参数的可见性和生命周期（或者说是根据名称查找变量的一套规则）。  一般分为局部作用域（函数作用域）和全局作用域。函数作用域保证函数内的参数和变量在函数外部是不可见的，并且在函数中任何位置定义的变量在函数任意位置都是可见的（变量声明提升）。    

**词法作用域：** 定义在词法阶段（将字符组成的字符串分解成有意义的代码块，这些代码块被称为词法单元）的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里决定的。

&#8195;&#8195;**优点：**  
+ 1、减少了命名冲突，并且提供了自动内存管理。     
+ 2、内部函数可以访问定义他们的外部函数的参数和变量（除了`this` 和 `arguments` ）。  

**作用域链：** 当代码在一个环境中执行时，会创建变量对象的作用域链，它的用途是保证对执行环境中有权访问的所有变量和函数的有序访问。作用域链的本质其实是一个指向变量对象的指针列表，只引用但不实际包含变量对象。作用域的最顶端在浏览器环境中是window，在node环境中是global。而作用域的最前端始终是当前执行的代码所在环境的变量对象。

**变量的赋值** 操作会执行两个动作，首先编译器会在当前作用域中声明一个变量（如果之前声明过，编译器会忽略该声明，继续进行编译），然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。

## 3、变量对象

**变量对象：** 每个执行环境中都会有一个与之关联的变量对象，它包括执行环境中定义的所有变量和函数。如果执行环境是函数，那么则将其**活动对象**作为变量对象。活动对象在最开始时只有一个变量————`anguments`(在全局环境中不存在)。作用域链中的下一个变量对象那个来自包含环境，这样一直延续到全局执行环境中的变量对象。而创建变量对象就是将各种变量和函数进行提升的环节。    

**活动对象**：当前函数执行环境中的变量对象。只是它需要在函数被调用时才被激活，而且初始化`arguments`。 

&#8195;&#8195;活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在`JavaScript`环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 `activation object`，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。 

&#8195;&#8195;**活动对象**是在进入函数上下文时刻被创建的，它通过函数的 `arguments` 属性初始化。`arguments` 属性值是 `Arguments` 对象。  

当进入执行上下文时，还未执行代码的时候，变量对象包括这几个对象：
#### **1、函数的所有形参 (如果是函数上下文)**

&#8195;&#8195;a、由名称和对应值组成的一个变量对象的属性被创建。     
&#8195;&#8195;b、没有实参时，属性值设为 `undefined`
#### **2、函数声明**

&#8195;&#8195;a、由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建    
&#8195;&#8195;b、如果变量对象已经存在相同名称的属性，则完全替换这个属性
#### **3、变量声明**

&#8195;&#8195;a、由名称和对应值（undefined）组成一个变量对象的属性被创建；  
&#8195;&#8195;b、如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

下面来看一个例子：

```javascript          
function compare(value1,value2){
    if(value1<value){
        return -1;
    }else if(value1>value2){
        return 1;
    }else{
        return 0;
    }
}
var result=compare(5,10)
```

下图展示了上面代码的执行环境及作用域链及变量对象的关系（截图于书上，人比较懒）
![](https://user-gold-cdn.xitu.io/2019/4/10/16a07b01f8c55341?w=1044&h=425&f=png&s=64730)

**图片分析：** 全局环境的变量对象有两个——`compare` 和 `result` (根据变量声明提升，`result` 提升其所在作用域的顶端时还没初始化，所以为 `undefined` )。在`compare()` 函数执行过程中，会创建一个函数执行环境，执行环境的变量对象由函数内部活动对象和全局变量对象组成，并创建一个预先包含全局变量对象的作用域链。
## 4、函数的执行机制
**函数执行时是按照以下步骤来运行的：**
+ 1、形成一个全新的私有上下文，声明私有变量的空间 `AO`。
    + `AO`是`VO`的一种。
    + 把上下文进栈执行
+ 2、代码执行前的预处理
    + 初始化作用域链
    + 初始化 `this` 指向
    + 初始化`argument`
    + 形参赋值
    + 变量提升
+ 3、代码执行
+ 4、一般情况下，函数执行完后，为了优化栈内存，会把形成的私有上下文，出栈释放掉 "GC浏览器垃圾回收机制"。
参考链接：

## 5、`arguments`及形参的映射机制
&#8195;&#8195;在非严格模式下，在初始化`arguments`和形参赋值(调用函数时)步骤之间会把初始的 `arguments` 和形参建立一个 "映射机制"。该映射机制是在函数执行之前完成的，一旦建立该映射就不会改变。不论是否设置形参，只要传递实参，`arguments`中就会有结果。
```js
var a = 4;
function b (x, y, a) {
    /**
     * EC(B)
     *  x=1
     *  y=2
     *  a=3
     * 作用域链:<EC(B),EC(G)>
     * 初始化THIS:window
     * 初始化arguments:[1,2,3] =>{0:1,1:2,2:3,length:3}
     * 形成赋值:x=1,y=2,a=3
     * 变量提升:——
     */
    console.log(a);//3
    arguments[2] = 10;
    console.log(a);//10
}
a = b(1, 2, 3);
console.log(a);//undefined
//如果c=b(1,2),此时函数b中的arguments为{0:1,1:2,length:2}
```

<Valine></Valine>