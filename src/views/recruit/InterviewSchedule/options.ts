export const tableOption = [{
  label: "日期",
  prop: "invitation",
  type: "slot",
}, {
  label: "时间",
  prop: "time",
  type: "slot",
}, {
  label: "姓名",
  prop: "receiveName",
}, {
  label: "面试职位",
  prop: "recruitName",
  type: "slot",
}, {
  label: "状态",
  prop: "state",
  type: "dict",
}];

// 状态（0:待处理;1:已接受;2:已拒绝）
export const dictsMap = {
  state: {
    0: "待处理", 1: "已接受", 2: "已拒绝",
  },
};

export const searchOptions = {
  state: [
    {
      label: "待处理",
      value: 0,
    }, {
      label: "已接受",
      value: 1,
    }, {
      label: "已拒绝",
      value: 2,
    },
  ],
  name: [],
};

export const initSearchForm = () => {
  return {
    recruitName: "",
    state: "",
  };
};