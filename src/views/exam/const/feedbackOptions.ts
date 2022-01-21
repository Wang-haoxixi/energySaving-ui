const dictsMap = {
  state: {
    "0": "未处理",
    "1": "已处理",
  },
  type: {
    "1": "错别字",
    "2": "答案错误",
    "3": "题目不完整",
    "4": "其他",
  },
  result: {
    "1": "采纳",
    "2": "未采纳",
  },
};

const columnsMap = [
  {
    label: "试题名称",
    prop: "title",
  },
  {
    label: "纠错类型",
    prop: "type",
    type: "slot",
  },
  {
    label: "内容说明",
    prop: "explanation",

  },
  {
    label: "反馈人",
    prop: "createName",
  },
  {
    label: "处理状态",
    prop: "state",
    type: "slot",
  },
  {
    label: "处理意见",
    prop: "result",
    type: "slot",
  },
];


export {
  columnsMap,
  dictsMap,
};
