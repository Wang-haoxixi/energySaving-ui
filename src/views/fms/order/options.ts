import _ from "lodash";
import store from "@/store";

const valueMapChild = {
  1: "dms_product_type", // 魔方类型
  2: "qms_activity_type", //活动类型
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dictGroup = store.state.common!.dictGroup;
const orderType = _(dictGroup.get("fms_order_type"))
  .keyBy("value")
  .mapValues("label")
  .value();
// {
//   [value]: [label]
// }

const dictsMap = {
  orderType,
  paymentMethod: {
    "0": "暂无",
    "1": "宝贝",
    "2": "微信支付",
    "9": "线下支付",
  },
  status: {
    0: "待付款",
    1: "已付款",
    2: "已取消",
    3: "已评价",
    4: "待联系",
    5: "退款中",
    6: "退款完成",
    7: "退款失败",
  },
  searchStatus: {
    0: "待付款",
    1: "已付款",
    2: "已取消",
  },
  payStatus: {
    0: "待支付",
    1: "支付成功",
    2: "交易关闭",
    3: "支付失败",
  },
};

const typeMap = {
  1: "org",
  2: "operate",
};

const calculateDict = (scope: any) => {
  if (scope.row.secondType && scope.row.orderType) {
    const dictName =
      valueMapChild[scope.row.orderType as keyof typeof valueMapChild];
    const isExist = _.keyBy(dictGroup.get(dictName), "value")[
      scope.row.secondType
    ];
    if (isExist) {
      return isExist.label;
    } else {
      return "暂无";
    }
  } else {
    return "暂无";
  }
};

const mulColumnsMap = (isPlatform = false) => {
  const first = [
    {
      prop: "orderType",
      label: "订单来源",
      type: "dictGroup",
      dictName: "fms_order_type",
    },
    {
      prop: "orderNumber",
      label: "订单号",
      width: 280,
    },
    {
      prop: "goods",
      label: "商品名称",
      width: 200,
    },
    {
      prop: "source",
      label: "终端",
      type: "dictGroup",
      dictName: "fms_source_type",
    },
    {
      prop: "secondType",
      label: "类型",
      type: "slot",
    },
  ];
  const so = isPlatform
    ? [
        {
          prop: "orgName",
          label: "所属组织",
        },
      ]
    : [];
  const second = [
    {
      prop: "goodsAmount",
      label: "数量",
    },

    {
      prop: "price",
      label: "原价",
      type: "slot",
      width: 200,
    },
    {
      prop: "shouldPay",
      label: "应付金额",
      type: "slot",
      width: 200,
    },
    {
      prop: "discount",
      label: "实付款",
      type: "slot",
      width: 200,
    },
    {
      prop: "paymentMethod",
      label: "支付方式", // 0-暂无1-宝贝9-线下支付
      type: "dict",
      width: 100,
    },
    {
      prop: "paymentNumber",
      label: "流水单号", // 微信支付成功返回的微信流水单号
      width: 150,
    },
    {
      prop: "status",
      label: "订单状态", //（0-待付款，1-已付款，2-已取消，3-已评价）
      type: "dict",
      width: 100,
    },
    {
      prop: "createUser",
      label: "购买者",
      width: 120,
    },
    {
      prop: "contact",
      label: "联系方式",
    },
    {
      prop: "createTime",
      label: "创建时间",
      width: 170,
    },
  ];
  return [...first, ...so, ...second];
};
class OrderDetailDTO {
  consignee = "";
  contact = "";
  createBy = 0;
  createTime = "";
  mail = "";
  orderId = 0;
  orderNumber = "";
  orderType = "1";
  orgId = 0;
  paymentMethod = "0";
  remarks = "";
  soRemarks = "";
  status = "1";
  wxTransactionId = "";
  zipCode = "";
  address = "";
  finishTime = "";
  paymentNumber = "";
  paymentTime = "";
  payStatus = "0";
  // 有关商品
  goodsId = "";
  goods = "";
  goodsImg = "";
  secondType = "";
  goodsAmount = 0;
  // 实付现金
  discountCash = 0;
  // 实付宝贝
  discountPrice = 0;
  // 原价宝贝
  priceAmount = 0;
  // 原价现金
  cashAmount = 0;
  // 优惠了宝贝
  deductiblePrice = 0;
  // 优惠了现金
  deductibleCash = 0;
  // 操作日志
  logs = [];
  payCurrency = 9;
}

class RemarksFormDTO {
  remarks = "";
}

const initSearchForm = () => {
  return {
    orderNumber: "",
    status: null,
    goods: "",
    secondType: null,
    createUser: "",
    paymentMethod: null,
    source: null,
    dateRange: [],
    orgName: "",
  };
};
export {
  dictsMap,
  mulColumnsMap,
  typeMap,
  OrderDetailDTO,
  RemarksFormDTO,
  calculateDict,
  initSearchForm,
  valueMapChild,
};
