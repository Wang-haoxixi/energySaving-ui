// 月份日期前一位补0
export function formatDig(num) {
  return num > 9 ? "" + num : "0" + num;
}

// 根据传入的时间，返回YYYY-MM-DD
export function formatYear(mill) {
  const y = new Date(mill);
  const raws = [
    y.getFullYear(),
    formatDig(y.getMonth() + 1),
    formatDig(y.getDate()),
    // y.getDay() || 7,
  ];
  const format = ["-", "-", "-"];
  return String.raw({ raw: raws }, ...format);
}

