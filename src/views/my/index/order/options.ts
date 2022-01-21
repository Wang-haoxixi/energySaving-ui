import { dictsMap as fmsOrderDictsMap } from "@/views/fms/order/options";
const columnsMap = [
  {
    prop: "orderNumber",
    label: "订单号",
    width: 280
  },
  {
    prop: "goods",
    label: "商品名称",
    width: 150
  },
  {
    prop: "orderType",
    label: "类型",
    type: "dict"
  },
  {
    prop: "goodsAmount",
    label: "数量",
    width: 70
  },
  {
    prop: "price",
    label: "原价",
    type: "slot",
    width: 200
  },
  {
    prop: "shouldPay",
    label: "应付金额",
    type: "slot",
    width: 200
  },
  {
    prop: "discount",
    label: "实付款",
    type: "slot",
    width: 200
  },
  {
    prop: "paymentMethod",
    label: "支付方式",
    type: "dict",
    width: 100
  },
  {
    prop: "status",
    label: "订单状态",
    type: "dict"
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 180
  }
];
const dictsMap = {
  status: fmsOrderDictsMap.status,
  paymentMethod: fmsOrderDictsMap.paymentMethod,
  orderType: fmsOrderDictsMap.orderType,
  cancelType: {
    1: "用户关闭",
    2: "系统关闭",
    3: "运营关闭"
  }
};

const statusColor = {
  0: "#f74437",
  1: "#3cd489",
  2: "#919397",
  3: "#babec0",
  4: "#fe9b00"
};

const columnsMapProduct = [
  {
    prop: "goods",
    label: "商品名称",
    type: "slot",
    minWidth: 250
  },
  {
    prop: "orderType",
    label: "类型",
    type: "dict"
  },
  {
    prop: "goodsAmount",
    label: "数量",
    width: 70
  },
  {
    prop: "price",
    label: "原价",
    type: "slot",
    minWidth: 150
  },
  {
    prop: "discount",
    label: "合伙人优惠",
    type: "slot",
    minWidth: 150
  },
  {
    prop: "status",
    label: "状态",
    type: "slot"
  }
];

class OrderDetailDTO {
  consignee = "";
  contact = "";
  createTime = "";
  discountCash = 0;
  discountPrice = 0;
  mail = "";
  zipCode = "";
  address = "";
  cancelType = "";
  orderNumber = "";
  paymentMethod = "";
  status = "";
  attach = "";
  attachName = "";
  cashAmount = 0;
  createBy = 0;
  deductibleCash = 0;
  deductiblePrice = 0;
  discountGoodsCash = 0;
  discountGoodsPrice = 0;
  goods = "";
  goodsAmount = 0;
  goodsCash = 0;
  goodsId = 0;
  goodsImg = "";
  goodsNumber = "2";
  goodsPrice = 0;
  isFree = "0";
  logs = [];
  orderId = 0;
  orderType = "1";
  orgId = 0;
  orgImg = "";
  orgName = "";
  paymentNumber = "";
  priceAmount = 0;
  remarks = "";
  finishTime = "";
  activityId = 0;
  rechargeAmount = 0;
}

const initSearchForm = () => {
  return {
    orderNumber: "",
    status: null,
    goods: "",
    secondType: null,
    dateRange: []
  };
};

const jumpPath = {
  1: "/channel/mo_fang/detail/",
  2: "/channel/activity/detail/",
  3: "/channel/course/detail/"
};

const jumpId = {
  1: "goodsId",
  2: "activityId",
  3: "goodsId"
};
const paymentMethodUnit = {
  1: "贝", // 宝贝
  2: "元" // 现金
};

const thanksByOrderType = {
  1: "订单已经完成，感谢您在能力魔方购物，欢迎您对本次交易及所购物品进行评价。",
  2: "订单已经完成，感谢您在活动模块报名。",
  3: "订单已经完成，感谢您参与课程学习。"
};

/**
 * 打折后应付金额
 * @param row
 */
const _templateShouldPay = (row: any) => {
  // if (row.discountPrice && row.discountCash) {
  return `${row.discountPrice}贝/${row.discountCash}元`;
  // } else if (row.discountPrice) {
  //   return `${row.discountPrice}贝`;
  // } else {
  //   return `${row.discountCash}元`;
  // }
};
/**
 * 打折后实际支付
 * @param row
 */
const _templateDiscount = (row: any, isOrder = false) => {
  const paymentMethodMap = {
    1: "discountPrice", //宝贝
    2: "discountCash" // 现金
  };
  if (isOrder) {
    if (row.payCurrency === "9") {
      return (
        row[paymentMethodMap["1"]] +
        paymentMethodUnit["1"] +
        "/" +
        row[paymentMethodMap["2"]] +
        paymentMethodUnit["2"]
      );
    } else if (row.payCurrency === "2") {
      return row[paymentMethodMap["2"]] + paymentMethodUnit["2"];
    } else {
      return row[paymentMethodMap["1"]] + paymentMethodUnit["1"];
    }
  } else {
    // 如果已付款
    if (["1", "3"].includes(row.status)) {
      if (row.paymentMethod === "2") {
        return row[paymentMethodMap["2"]] + paymentMethodUnit["2"];
      } else {
        return row[paymentMethodMap["1"]] + paymentMethodUnit["1"];
      }
    } else {
      return `暂无`;
    }
  }
};
/**
 * 原价
 * @param row
 */
const _templatePrice = (row: any) => {
  // const paymentMethodMap = {
  //   1: "goodsPrice", //宝贝
  //   2: "goodsCash", // 现金
  // };
  // // 如果已付款
  // if (row.payCurrency !== "9") {
  //   if (row.paymentMethod === '2') {
  //     return row[paymentMethodMap['2']] +
  //       paymentMethodUnit['2'];
  //   } else {
  //     return row[paymentMethodMap['1']] +
  //       paymentMethodUnit['1'];
  //   }
  // } else {
  return `${row.goodsPrice}贝/${row.goodsCash}元`;
  // }
};

export {
  columnsMap,
  dictsMap,
  columnsMapProduct,
  OrderDetailDTO,
  initSearchForm,
  statusColor,
  jumpPath,
  jumpId,
  _templateDiscount,
  _templatePrice,
  _templateShouldPay,
  thanksByOrderType
};
