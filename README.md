# text-ellipsis-ruby

a text-ellipsis plugin with common js use.

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
