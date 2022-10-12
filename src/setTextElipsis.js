/**
 * 过长显示...省略号工具
 * @param {*} str 需要截取的字符串
 * @param {*} lenNum 指定字符长度(中文算两个字符)
 * @returns 截取后的字符串（超出则带省略号）
 */
const setTextElipsis = (str, lenNum) => {
  let len = 0,
    newStr = "";
  for (var i = 0; i < str.length; i++) {
    if (/[\u4e00-\u9fa5]/g.test(str[i])) {
      len += 2;
    } else {
      len++;
    }
    if (len <= lenNum) {
      newStr += str[i];
    } else {
      newStr += "...";
    }
  }
  return newStr;
};
export default setTextElipsis;
