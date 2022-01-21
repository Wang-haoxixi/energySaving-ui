import moment from "moment";
import Nzh from "nzh";
import { validatenull } from '@/util/validate';
moment.locale('zh-cn');

const parseDate = (date: any, formatString: any) => {
  if (date === undefined) {
    return "暂无";
  }
  if (moment(date).isValid()) {
    return moment(date).format(formatString);
  } else {
    return "暂无";
  }
};

const parseToTimeSeconds = (time: any) => {
  return parseDate(time, "YYYY-MM-DD HH:mm:ss");
};
const parseToTimeMinutes = (time: any) => {
  return parseDate(time, "YYYY-MM-DD HH:mm");
};
const parseToDay = (time: any) => {
  return parseDate(time, "YYYY-MM-DD");
};
const parseToMonth = (time: any) => {
  return parseDate(time, "YYYY-MM");
};
const parseToYear = (time: any) => {
  return parseDate(time, "YYYY");
};
const parseToMonthDay = (time: any) => {
  return parseDate(time, "MM-DD");
};

const formatTime = (time: any) => {
  return moment(time).fromNow();
};


const parseToMoney = (money: any) => {
  return new Intl.NumberFormat().format(money);
};

const parseToHanZiMoney = (money: any) => {
  return Nzh.cn.encodeB(money);
};
const parseToSimple = (money: any) => {
  return Nzh.cn.encodeS(money);
};

const parseToM = (v: any) => {
  if (v === "-") {
    return v;
  } else {
    return parseToMoney(v);
  }
};

const parseToPercent = (v: any, n = 2) => {
  return (v * 100).toFixed(n) + "%";
};

/**
 * 文字暂无
 * @param value 文字
 */
const showText = (value: string) => {
  return value ? value : "暂无";
};

/**
 * 性别暂无
 * @param value 文字
 */
const showSex = (value: string) => {
  const sexMap = {
    '2': '女',
    '1': '男',
  };
  return !validatenull(value) ? sexMap[value as keyof typeof sexMap] : "暂无";
};

/**
 * 数字暂无
 * @param value 数字
 */
const showNumber = (value: number) => {
  return value ?? "暂无";
};

/**
 * 返回对应数量单位的数组
 * @param num 数字
 * @param point 小数位
 */
const showBigNumber = (num: number, point = 2) => {
  if (!num) {
    return [0, ""];
  }
  const numStr = num.toString().split(".")[0];
  if (numStr.length < 5) {
    return [num.toString(), ""];
  } else if (numStr.length >= 5 && numStr.length <= 8) {
    const n = +numStr.substring(numStr.length - 4, numStr.length - 4 + point + 1);
    const decimal = Math.round(n / 10);
    const w = num / 10000;
    return [parseFloat(parseInt(w + "") + "." + decimal), "万"];
  } else if (numStr.length > 8) {
    const n = +numStr.substring(numStr.length - 8, numStr.length - 8 + point + 1);
    const decimal = Math.round(n / 10);
    const y = num / 100000000;
    return [parseFloat(parseInt(y + "") + "." + decimal), "亿"];
  }
};

const arrJoin = (arr: any[], str = "") => {
  return arr.join(str);
};
/**
 * 显示最后一个工作
 * @param jobs 工作
 */
const lastJob = (jobs: string) => {
  if (!jobs) {
    return '暂无';
  }
  const arr = jobs.split('/');
  const lastIdx = arr.length - 1;
  return arr[lastIdx];
};
/**
 * 显示最后一个职位
 * @param jobs 职位
 */
const lastPosition = (positions: string) => {
  if (!positions) {
    return '暂无';
  }
  const arr = positions.split('-');
  const lastIdx = arr.length - 1;
  return arr[lastIdx];
};
/**
 * 出现省地址
 * @param addresses 地址
 */
const firstAddress = (addresses: string) => {
  if (!addresses) {
    return '暂无';
  }
  const arr = addresses.split('-');
  return arr[0];
};

// 空格符和换行符转义
const spaceWrapEscape = (str: string) => {
  if (str) return str.replace(/[\n]/g, '<br/>').replace(/[\s]/g, '&nbsp;');
  return str;
};

//千分位分隔符
const thousandBitSeparator = (num: [string, number]) => {
  return num && num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  }) || 0;
};
export {
  parseDate,
  parseToTimeSeconds,
  parseToTimeMinutes,
  parseToDay,
  parseToMonth,
  parseToYear,
  parseToMonthDay,
  formatTime,
  parseToMoney,
  parseToHanZiMoney,
  parseToSimple,
  parseToM,
  parseToPercent,
  showText,
  showNumber,
  showSex,
  showBigNumber,
  arrJoin,
  lastJob,
  lastPosition,
  firstAddress,
  spaceWrapEscape,
  thousandBitSeparator,
};
