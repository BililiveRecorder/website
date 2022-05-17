# 用户脚本

!!! warning "暂未发布"
    本页面的内容是录播姬 1.4 的功能

录播姬的高级设置里可以写 javascript 脚本，实现一些比较特殊的功能。

在 [BililiveRecorder/recorder-scripting-template](https://github.com/BililiveRecorder/recorder-scripting-template) 里提供了 d.ts 类型文件，推荐 clone 这个仓库后用 VSCode 打开，新建一个 js 文件编写。VSCode 会提供基本的类型提醒以及错误检查。

这个仓库里也提供了能运行的脚本例子，可以参考。

## 录播姬事件

录播姬会在特定事件发生时调用脚本。

事件 handler 是定义在 `recorderEvents` 上的函数，比如在按下测试按钮时录播姬会调用 `recorderEvents.onTest()`。

目前提供了以下几个事件:

### onTest

**测试**

当按下软件界面上的测试按钮时触发。

### onDanmaku

**过滤弹幕消息**

弹幕和礼物等信息写入 XML 文件之前时会调用这个事件，如果返回 `false` 就不会写入 XML 文件。

### onFetchStreamUrl

**获取直播流地址**

可以使用这个事件来替录播姬获取直播流地址，录播姬会优先使用脚本给的地址。

如果脚本返回了 `null` 则会使用录播姬自己默认的逻辑。

### onTransformStreamUrl

**修改直播流地址**

在获取到直播流地址后，向该地址发送请求之前会调用这个事件，脚本可以修改请求的地址，还可以指定连接的服务器 IP。

如果直播服务器返回了 HTTP 302 等状态码跳转到了另一个地址，每次请求跳转的目标地址之前也会调用一次此事件。

## JS 语言功能

录播姬使用的运行环境不是 node （甚至不是 V8），有一些语言功能是不支持的，在编写脚本时需要注意避开不支持的功能。

一般来说建议直接编写最终在录播姬里运行的脚本而不是使用 Babel 等工具进行编译。因为运行时是支持大多数 JS 语言功能的，并且一般来说脚本逻辑也足够简单。

{% set y = ':fontawesome-solid-check:{ style="color:green" }' -%}
{% set x = ':fontawesome-solid-xmark:{ style="color:red" }' -%}

??? cite "语言支持情况"

    录播姬使用的 JS 引擎是 [Jint](https://github.com/sebastienros/jint)

    **ECMAScript 5.1 (ES5)**

    - 完全支持

    **ECMAScript 2015 (ES6)**

    - {{y}} ArrayBuffer
    - {{y}} Arrow function expression
    - {{y}} Binary and octal literals
    - {{y}} Class support
    - {{y}} DataView
    - {{y}} Destructuring
    - {{y}} Default, rest and spread
    - {{y}} Enhanced object literals
    - {{y}} `for...of`
    - {{x}} Generators
    - {{y}} Template strings
    - {{y}} Lexical scoping of variables (let and const)
    - {{y}} Map and Set
    - {{y}} Modules and module loaders
    - {{y}} Promises (Experimental, API is unstable)
    - {{y}} Reflect
    - {{y}} Proxies
    - {{y}} Symbols
    - {{x}} Tail calls
    - {{y}} Typed arrays
    - {{y}} Unicode
    - {{y}} Weakmap and Weakset

    **ECMAScript 2016**

    - {{y}} `Array.prototype.includes`
    - {{x}} `await`, `async`
    - {{y}} Block-scoping of variables and functions
    - {{y}} Exponentiation operator `**`
    - {{y}} Destructuring patterns (of variables)

    **ECMAScript 2017**

    - {{y}} `Object.values`, `Object.entries` and `Object.getOwnPropertyDescriptors`

    **ECMAScript 2018**

    - {{y}} `Promise.prototype.finally`
    - {{y}} Rest/spread operators for object literals (`...identifier`),

    **ECMAScript 2019**

    - {{y}} `Array.prototype.flat`, `Array.prototype.flatMap`
    - {{y}} `String.prototype.trimStart`, `String.prototype.trimEnd`
    - {{y}} `Object.fromEntries`
    - {{y}} `Symbol.description`
    - {{y}} Optional catch binding

    **ECMAScript 2020**

    - {{y}} `BigInt`
    - {{x}} `export * as ns from`
    - {{y}} `for-in` enhancements
    - {{y}} `globalThis` object
    - {{y}} `import`
    - {{x}} `import.meta`
    - {{y}} Nullish coalescing operator (`??`)
    - {{y}} Optional chaining
    - {{x}} `Promise.allSettled`
    - {{y}} `String.prototype.matchAll`

    **ECMAScript 2021**

    - {{y}} Logical Assignment Operators (`&&=` `||=` `??=`)
    - {{y}} Numeric Separators (`1_000`)
    - {{x}} `Promise.any` and `AggregateError`
    - {{y}} `String.prototype.replaceAll`
    - {{x}} `WeakRef` and `FinalizationRegistry`

    **ECMAScript 2022**

    - {{x}} Class Fields
    - {{x}} RegExp Match Indices
    - {{x}} Top-level await
    - {{x}} Ergonomic brand checks for Private Fields
    - {{y}} `.at()`
    - {{y}} Accessible `Object.prototype.hasOwnProperty` (`Object.hasOwn`)
    - {{x}} Class Static Block
    - {{y}} Error Cause

## 运行时 API

录播姬的 js 运行环境不是 node, 因此也没有 node 或浏览器里的 `fetch`, `URL`, `require` 等 API。

录播姬提供的运行时 API 请参考[这个 d.ts 文件](https://github.com/BililiveRecorder/recorder-scripting-template/blob/main/recorder.d.ts)中的定义。

总的来说录播姬提供了以下这些 API

### console

类似 node 和 浏览器 中的 `console`，不过少了一点功能。

### fetchSync

参考标准的 `fetch` 实现的一个 HTTP 请求接口，是同步而不是异步的。

### dns

`dns.lookup` 会返回一个含有解析到的 IP 的文本数组。

### dotnet

`dotnet` 里提供了一些 .NET API 的 binding。

比如可以使用下面的代码

```js
const builder = new dotnet.UriBuilder('https://example.com/path');
builder.path = '/newpath';
console.log(builder.uri.toString());
// https://example.com/newpath
```

来使用 .NET 的 [`UriBuilder`](https://docs.microsoft.com/en-us/dotnet/api/system.uribuilder) 对链接进行修改。

具体提供了哪些类型请参考 d.ts 文件中的定义。
如果需要使用其他类可以联系我添加。
