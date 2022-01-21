export const columnsMap = [{
  prop: "title",
  label: "任务名称",
  type: "slot",
}, {
  prop: "isOfficial",
  label: "任务分类",
  width: "120",
  type: "dict",
}, {
  prop: "orgName",
  label: "所属组织",
  width: "150",
  type: "slot",
}, {
  prop: "state",
  label: "任务状态",
  width: "120",
  type: "dict",
}, {
  prop: "finishTime",
  label: "截止时间",
  width: "180",
  type: "slot",
  // }, {
  //   prop: "username",
  //   label: "创建人",
  //   width: "150",
}];

export const dictsMaps = {
  isOfficial: {
    0: '普通任务',
    1: '官方任务',
  },
  state: {
    0: "进行中",
    1: "已完成",
    2: "已关闭",
  },
};

export const initSearchForm = () => {
  return {
    name: "",
    realName: "",
    isOfficial: "",
  };
};

export const isOfficialList = [
  {
    label: "全部任务",
    value: "",
  }, {
    label: "官方任务",
    value: "1",
  }, {
    label: "普通任务",
    value: "0",
  },
];

export const initShelfFormData = () => {
  return {
    id: "",
    offTheShelf: 2,
    reason: "",
  };
};