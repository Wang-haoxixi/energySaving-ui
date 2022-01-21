export const initSearchForm = () => {
  return {
    name: "",
  };
};

export const ColumnsMaps = [
  {
    prop: "realName",
    label: "姓名",
    type: "slot",
  },
  {
    prop: "sex",
    label: "性别",
    type: "dictGroup",
    dictName: "gender",
    width: "100px",
  },
  {
    prop: "redness",
    label: "红度等级",
    width: "100px",
  },
  {
    prop: "industry",
    label: "行业",
  },
  {
    prop: "birthday",
    label: "出生年月",
  },
  {
    prop: "isMark",
    label: "状态",
    type: "dict",
    width: "100px",
  },
];

export const markList = [{
  name: "全部人才",
  value: 2,
}, {
  name: "已标记",
  value: 1,
}, {
  name: "未标记",
  value: 0,
}];

export const dictsMap = {
  isMark: {
    0: '未标记',
    1: '已标记',
  },
};
