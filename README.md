# text-ellipsis-ruby

处理单行或多行文本过长时省略号显示

## Install

```
npm install --save-dev text-ellipsis-ruby
```

## Usage

```js
import { ellipsis } from "text-ellipsis-ruby";

ellipsis.config({
  lineNum: 1, // 默认行数
  fontFamily: "MicrosoftYahei", // 默认字体
  fontWeight: "normal",
  fontSize: "14px", // 默认字号14px
  left: "...",
  tagName: "p",
  resize: true,
});

const ells = document.querySelectorAll(".ell");
ellipsis.init(ells);
```

```html
<div class="par">
    <div class="ell" lineNum="1" text="这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下"></div>
    </br>
    <div class="ell" lineNum="2" text="这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下"></div>
</div>
```

## Config

You can add config when `ellipsis.config` to set global-config or use the attribute on vue elempent.

## Property

| Props      | Type            | Default                              | Effect                                                             |
| ---------- | --------------- | ------------------------------------ | ------------------------------------------------------------------ |
| lineNum    | Number          | 1 (from global config)               | The max line.                                                      |
| fontFamily | String          | microsoft yahei (from global config) | The fontFamily to calculate the width.                             |
| fontSize   | String\| Number | 14px (from global config)            | The fontSize to calculate the width.                               |
| tagName    | String          | p (from global config)               | The tag to show the text.                                          |
| left       | String          | '…' (from global config)             | The String add on the end of the last line.                        |
| resize     | Boolean         | true (from global config)            | Add the eventListener resize to window to watch the window change. |

## Methods

| Method | Args                               | Effect                                                         |
| ------ | ---------------------------------- | -------------------------------------------------------------- |
| config | Object: obj                        | Update the global config.                                      |
| init   | NodeList: doms \| HTMLElement: dom | Init the ellipsis dom by the config global and attribute both. |
| watch  | NodeList: doms \| HTMLElement: dom | init the ellipsis dom and watch the change of attribute.       |

# 2022/10/12 新增:根据字符长度截取显示省略号的 js 工具方法

## 参数

| 参数名 | 意义                         | 类型   | 默认值 |
| ------ | ---------------------------- | ------ | ------ |
| str    | 需要截取的字符串             | Str    | -      |
| lenNum | 指定字符长度(中文算两个字符) | Number | -      |

---

下面是一个简单的在 vue2 中使用例子:

```vue
<template>
  <div style="text-align: right;">{{ realStr }}</div>
</template>
<script>
import { setTextElipsis } from "text-ellipsis-ruby";
export default {
  data() {
    return {
      str: "这是一句很长很长的话，到底有多长呢这是一句很长很长的话，到底有多长呢这是一句很长很长的话",
      realStr: "",
    };
  },
  mounted() {
    this.realStr = setTextElipsis(this.str, 6);
  },
};
</script>
```

谢谢你的使用~
