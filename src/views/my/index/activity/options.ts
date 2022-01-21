const orderStatus = [
  {
    label: "待支付",
    value: "0",
  },
  {
    label: "支付成功",
    value: "1",
  },
  {
    label: "支付失败",
    value: "2",
  }
  , {
    label: "取消报名",
    value: "3",
  },
];

const columnsMap = [
  {
    label: "活动信息",
    prop: "info",
    type: "slot",
    width: "600",
  },
  {
    label: "开始时间",
    prop: "startTime",
    type: "slot",
  },
  // {
  //   label: "订单状态",
  //   prop: "orderStatus",
  //   type: "slot",
  // },
  {
    label: "操作",
    prop: "operate",
    type: "slot",
    width: "120",
  },
];
const initSearchForm = () => {
  return {
    name: "",
    orderStatus: "",
  };
};
export { orderStatus, columnsMap, initSearchForm };