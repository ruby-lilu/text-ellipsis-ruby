export const userConfig = {
  lineNum: 1, // 默认行数
  fontFamily: "MicrosoftYahei", // 默认字体
  fontWeight: "normal",
  fontSize: "14px", // 默认字号14px
  left: "...",
  tagName: "p",
  resize: true,
};

export const config = (conf) => {
  Object.assign(userConfig, conf);
};
