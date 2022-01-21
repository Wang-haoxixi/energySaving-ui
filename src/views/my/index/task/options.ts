export const dictsMap = {
  type: {
    A: "转入",
    L: "转出"
  },
  transactionAccountType: {
    "0": "超级账户",
    "1": "平台",
    "2": "联盟",
    "3": "组织",
    "4": "个人",
    "5": "红包"
  }
};

export const columnsMap = [
  {
    prop: "category",
    label: "交易类型",
    type: "dictGroup",
    dictName: "fms_block_chain_flow"
  },
  {
    prop: "type",
    label: "类型",
    type: "dict"
  },
  {
    prop: "amount",
    label: "宝贝数量"
  },
  {
    prop: "transactionName",
    label: "交易对象"
  },
  {
    prop: "transactionAccountType",
    label: "账户类型",
    type: "dict"
  },
  {
    prop: "currentAmount",
    label: "当前账户余额"
  },
  {
    prop: "realName",
    label: "操作人"
  },
  {
    prop: "createTime",
    label: "交易日期"
  }
];

export const initSearchForm = () => {
  return {
    remarks: "",
    category: ""
  };
};
