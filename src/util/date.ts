/**
 * 日期格式化
 */
export const dateFormat = (intDate: any, format = "yyyy-MM-dd") => {
  if (!intDate) return "";
  const date = new Date(intDate);
  // let format = 'yyyy-MM-dd hh:mm:ss'
  const o: any = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    "S": date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    const item = o[k];
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? item : ("00" + item).substr(("" + item).length));
    }
  }
  return format;
};


/**
 * 计算两个时间之间的差距
 * @param date 目标时间
 * @param cDate 比较的时间（）默认为当前时间
 * 返回值 state：true 目标时间为过去时 false 目标时间为未来时
 */
export const timeDifference = (date: any, cDate = new Date()) => {
  // 默认以当前时间为计算时间
  let time = +new Date(cDate) - +new Date(date);
  const state = time >= 0;
  const secondTime = 1 * 1000;
  const minuteTime = 60 * secondTime;
  const hourTime = 60 * minuteTime;
  const dayTime = 24 * hourTime;
  if (time < 0) time = time * -1;
  const day = ~~(time / dayTime);
  time = time - day * dayTime;
  const hour = ~~(time / hourTime);
  time = time - hour * hourTime;
  const minute = ~~(time / minuteTime);
  time = time - minute * minuteTime;
  const second = ~~(time / secondTime);
  return {
    state, day, hour, minute, second,
  };
};
/**
 * 中文周几计算
 */
export const countWeek = (date = new Date(), word = "星期") => {
  const myddy = new Date(date).getDay();
  const weekday = [word + "日", word + "一", word + "二", word + "三", word + "四", word + "五", word + "六"];
  return weekday[myddy];
};
/**
 * 工具时间
 * @param time 时间
 */
export const startDisabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};
export const startDisabledDateLessOne = (time: Date) => {
  return time.getTime() < (Date.now() - 1000 * 60 * 60 * 24);
};
export const endDisabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
/**
 * 开始时间 PickerOptions
 */
export const startPickerOptions = {
  disabledDate: (time: Date) => {
    return startDisabledDate(time);
  },
};
/**
 * 结束时间 PickerOptions
 */
export const endPickerOptions = {
  disabledDate: (time: Date) => {
    return endDisabledDate(time);
  },
};
/**
 * 开始时间 PickerOptions 减一天
 */
export const startPickerOptionsLessOne = {
  disabledDate: (time: Date) => {
    return startDisabledDateLessOne(time);
  },
};