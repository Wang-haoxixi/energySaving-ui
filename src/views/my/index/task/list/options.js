export const stateTask = [{
    value: "for",
    name: "进行中",
  },
  {
    value: "complete",
    name: "已完成",
  },
  {
    value: "close",
    name: "已关闭",
  },
];

export const statusTask = [{
    value: 0,
    name: "全部",
  },
  {
    value: 1,
    name: "我发布的",
  },
  {
    value: 2,
    name: "我收到的",
  },
];

export const initSearchData = () => {
  return {
    orgId: "all",
    status: "",
    expires: "",
    state: "for",
    sort: 0,
  };
};

export const urgencyObj = {
  0: {
    name: '一般',
    color: "block",
  },
  1: {
    name: '紧急',
    color: "blue",
  },
  2: {
    name: '非常紧急',
    color: "red",
  },
};

export const sortList = [{
    label: '默认',
    value: 0,
  },
  {
    label: '按最近创建时间',
    value: 1,
  },
  {
    label: '按最近截止时间',
    value: 2,
  },
  {
    label: '按最近更新时间',
    value: 3,
  },
];
