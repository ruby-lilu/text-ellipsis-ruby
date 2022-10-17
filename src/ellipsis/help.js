// const getLengthByCanvas = (ctx, font = {}) => {
//     const weight = font.fontWeight;
//     const size = font.fontSize;
//     const family = font.fontFamily;
//     ctx.font = `${weight} ${size} ${family}`;

//     return ctx.measureText(font.value).width;
// };

// 计算dom宽度
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
      index = i - 1;
      break;
    }
  }
  return index;
};

export default (font = {}, span) => {
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
