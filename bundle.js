'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const userConfig = {
  // width: '50px',
  lineNum: 1, // 默认行数
  fontFamily: "MicrosoftYahei", // 默认字体
  fontWeight: "normal",
  fontSize: "14px", // 默认字号14px
  left: "...",
  tagName: "p",
  resize: true,
};

const config = (conf) => {
  Object.assign(userConfig, conf);
};

const isHTMLArr = dom => Object.prototype.toString.call(dom) === '[object NodeList]';

const isHTML = dom => Object.prototype.toString.call(dom) === '[object HTMLDivElement]';

// const getLengthByCanvas = (ctx, font = {}) => {
//     const weight = font.fontWeight;
//     const size = font.fontSize;
//     const family = font.fontFamily;
//     ctx.font = `${weight} ${size} ${family}`;

//     return ctx.measureText(font.value).width;
// };
const getLengthByDom = (span, font = {}) => {
  span.innerText = font.value;
  // 因为offsetWidth存在四舍五入 降低精度
  return span.offsetWidth + 0.5;
};

const getSpliceIndex = (font = {}, span, str) => {
  let index = 0;
  let newStr = "";
  for (let i = str.length - 1; i > 0; i--) {
    newStr = str.slice(i);
    let len1 = getLengthByDom(span, Object.assign({ value: newStr }, font)),
      len2 = getLengthByDom(span, Object.assign({ value: font.left }, font));
    if (len1 > len2) {
      index = i;
      break;
    }
  }
  return index - 1;
};

var help = (font = {}, span) => {
  let beginLine = 1;
  let index = 0;
  const line = [];

  for (let i = 0; i <= font.text.length; i++) {
    if (beginLine > font.lineNum) break;
    const left = beginLine === parseInt(font.lineNum, 10) ? font.left : "";
    let str = font.text.substr(index, i - index);
    let len = getLengthByDom(span, Object.assign({ value: str }, font));
    if (beginLine === parseInt(font.lineNum, 10)) {
      if (len >= parseFloat(font.width, 10)) {
        const subIndex = getSpliceIndex(font, span, str);
        str = str.substring(0, subIndex);
        str += left;
        len = getLengthByDom(span, Object.assign({ value: str }, font));
      }
    }

    if (len <= parseFloat(font.width, 10)) {
      line[beginLine - 1] = str;
    } else {
      i--;
      beginLine++;
      index = i;
    }
  }

  return line;
};

const getConfig = (dom) => {
  const conf = Object.assign({}, userConfig);
  conf.text = dom.getAttribute("text");
  conf.left = dom.getAttribute("left") || conf.left;
  conf.tagName = dom.getAttribute("tagName") || conf.tagName;
  conf.lineNum = dom.getAttribute("lineNum") || conf.lineNum;
  conf.fontFamily =
    dom.getAttribute("fontFamily") ||
    getComputedStyle(dom)["font-family"] ||
    conf.fontFamily;
  conf.fontSize =
    dom.getAttribute("fontSize") ||
    getComputedStyle(dom)["font-size"] ||
    conf.fontSize;
  conf.fontWeight =
    dom.getAttribute("fontWeight") ||
    getComputedStyle(dom)["font-weight"] ||
    conf.fontWeight;
  conf.width =
    dom.getAttribute("width") || getComputedStyle(dom.parentElement).width;
  conf.resize = dom.getAttribute("resize") || conf.resize;
  return conf;
};

const init = (conf) => {
  const span = document.createElement("span");
  span.style.opacity = 1;
  span.style["white-space"] = "nowrap";
  span.style["font-weight"] = conf.fontWeight;
  span.style["font-family"] = conf.fontFamily;
  span.style["font-size"] = conf.fontSize;
  document.body.append(span);
  return span;
};

const destory = (span) => {
  span.remove();
};

const appendDom = (dom, textArr, conf) => {
  const div = document.createElement("div");
  for (let i = 0; i < textArr.length; i++) {
    const tag = document.createElement(conf.tagName);
    tag.innerText = textArr[i];
    div.appendChild(tag);
  }
  dom.innerHTML = div.innerHTML;
};

const lint = (dom) => {
  const text = dom.getAttribute("text");
  if (text === null) {
    throw new Error("The text missed!");
  }
};

const format = (dom) => {
  lint(dom);
  const conf = getConfig(dom);
  const span = init(conf);
  const textArr = help(conf, span);
  appendDom(dom, textArr, conf);
  destory(span);
  return conf;
};

const ellipsisCore = (dom) => {
  const conf = format(dom);
  if (conf.resize === true || conf.resize === "true") {
    window.addEventListener("resize", () => {
      format(dom);
    });
  }
};

const ellipsis = {
    config,
    init(dom) {
        if (isHTMLArr(dom)) {
            for (let i = 0; i < dom.length; i++) {
                ellipsisCore(dom[i]);
            }
        } else if (isHTML(dom)) {
            ellipsisCore(dom);
        } else {
            throw new Error(`The ${dom} is not a HTMLElement`);
        }
    },
    watch(dom) {
        const arr = [];
        if (isHTMLArr(dom)) {
            for (let i = 0; i < dom.length; i++) {
                arr.push(dom[i]);
            }
        } else if (isHTML(dom)) {
            arr.push(dom);
        } else {
            throw new Error(`The ${dom} is not a HTMLElement`);
        }
        for (let i = 0; i < arr.length; i++) {
            ellipsisCore(arr[i]);
            const MutationObserver = window.MutationObserver
                || window.WebKitMutationObserver
                || window.MozMutationObserver;
            if (MutationObserver) {
                const observer = new MutationObserver((() => {
                    ellipsisCore(arr[i]);
                }));
                const conf = { attributes: true };
                observer.observe(arr[i], conf);
            } else {
                // IE 9 10
                arr[i].addEventListener('DOMAttrModified', () => {
                    ellipsisCore(arr[i]);
                });
            }
        }
    },
};

exports.ellipsis = ellipsis;
