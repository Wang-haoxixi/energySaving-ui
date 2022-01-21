/**
 * 根据code分割字符，并返回最后一位
 * val 目标字符串
 * code 分隔符，默认-
 */
export const transformString = (val = "", code = "-") => {
  const list = val.split(code);
  return list[list.length - 1];
};