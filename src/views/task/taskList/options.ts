export const columnsMap = [{
  prop: "urgency",
  label: "紧急度",
  type: 'slot',
  width: "150",
},
{
  prop: "finishTime",
  label: "截止时间",
  width: "230",
  type: 'slot',
},
{
  prop: "creater",
  label: "创建人",
  type: 'slot',
  width: "100",
}];

export const dictMaps = {
  stateTask: [
    {
      value: "0",
      label: "进行中",
    }, {
      value: "1",
      label: "已完成",
    }, {
      value: "2",
      label: "已关闭",
    },
  ],
  urgency: [
    {
      value: "0",
      label: "一般",
    }, {
      value: "1",
      label: "紧急",
    }, {
      value: "2",
      label: "非常紧急",
    },
  ],
  sort: [
    {
      value: "3",
      label: "按截止时间",
    }, {
      value: "1",
      label: "按创建时间",
    }, {
      value: "2",
      label: "按优先级",
    },
  ],
  isWorkshop: [
    {
      value: "0",
      label: "仅看未同步到工场",
    }, {
      value: "1",
      lable: "仅看同步到工场",
    },
  ],
};

export const urgency = {
  0: "一般",
  1: "紧急",
  2: "非常紧急",
};

export const initSearchForm = () => {
  return {
    publisherObj: {},
    rangtime: [],
  };
};