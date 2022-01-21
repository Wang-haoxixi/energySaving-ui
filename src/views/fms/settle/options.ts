import { dictsMap as fmsOrderDictsMap } from "@/views/fms/order/options";
const dictsMap = {
  orderType: fmsOrderDictsMap.orderType,
  paymentMethod: fmsOrderDictsMap.paymentMethod,
  status: fmsOrderDictsMap.status
};
const typeMap = {
  1: "org",
  2: "operate"
};

const mulColumnsMap = (isPlatform = false, type = "1") => {
  const first = [
    {
      prop: "orderType",
      label: "订单来源",
      type: "dictGroup",
      dictName: "fms_order_type"
    },
    {
      prop: "orderNumber",
      label: "订单号",
      width: 240
    },
    {
      prop: "paymentNumber",
      label: "流水单号", // 微信支付成功返回的微信流水单号
      width: 240
    }
  ];
  const second = [
    {
      prop: "price",
      label: "交易金额"
    },
    {
      prop: "platformExtraction",
      label: "平台抽成"
    },
    {
      prop: "actualIncome",
      label: "实际收益"
    },
    {
      prop: "transactionTime",
      label: "交易日期",
      width: 170
    },
    {
      prop: "issueTime",
      label: type === "1" ? "发放日期" : "可提现日期", // 宝贝
      width: 170
    }
  ];
  const so = isPlatform
    ? [
        {
          prop: "orgName",
          label: "所属组织",
          width: 150
        }
      ]
    : [];
  return [...first, ...so, ...second];
};

const initParamForm = () => {
  return {
    1: 0,
    2: 0
  };
};

const initStatisticsForm = () => {
  return {
    pendingAmount: 0, //总交易数
    platformAmount: 0, //已转入SO账户数
    receivedAmount: 0, //待转入SO账户数
    totalAmount: 0, //平台收取数
    freezeAmount: 0 //冻结金额
  };
};
const initSearchForm = () => {
  return {
    orderNumber: "",
    paymentNumber: "",
    orgName: "",
    订单交易时间: [],
    发放时间: []
  };
};
export {
  dictsMap,
  mulColumnsMap,
  typeMap,
  initParamForm,
  initStatisticsForm,
  initSearchForm
};
