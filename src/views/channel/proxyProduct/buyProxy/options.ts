export const initForm = (obj: any) => {
  const id = obj ? obj.userId : "";
  return {
    agentType: 1, // 传类型1-个人，2-组织
    payMode: 2, // 支付方式(1-宝贝支付,2-线下支付,3-支付宝,4-微信,5-对公账户)
    rankId: 1, // 等级id
    phone: "",
    objectId: id,
    payAmount: 0
  };
};

export const initRowForm = () => {
  return {
    bail: 0,
    createTime: "",
    delFlag: 0,
    discountRate: 0,
    quantity: 0,
    rank: "",
    rankId: 2,
    updateTime: "",
    userId: 0
  };
};

export const columnsMap = [
  {
    prop: "bail",
    label: "保证金"
  },
  {
    prop: "discountRate",
    label: "合伙人折扣"
  },
  {
    prop: "quantity",
    label: "赠予宝贝"
  }
];
