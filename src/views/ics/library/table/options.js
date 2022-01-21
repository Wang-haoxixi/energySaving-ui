export const columnsMap = [
  {
    prop: "question",
    label: "标准问题",
  }, {
    prop: "type",
    label: "分类",
    type: "dict",
  }, {
    prop: "modifiedTime",
    label: "最后编辑时间",
  }, {
    prop: "goodReview",
    label: "反馈满意度",
  }, {
    prop: "isUsed",
    label: "状态",
    type: "dict",
  },
];

export const dictsMap = {
  isUsed: {
    1: "启用",
    0: "禁用",
  },
};

export function initSearchForm() {
  return {
    question: "",
  };
}
