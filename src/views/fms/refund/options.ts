const dictsMap = {
  paymentMethod: {
    "0": "暂无",
    "1": "宝贝",
    "2": "微信支付",
    "9": "线下支付"
  },
  status: {
    0: "待付款",
    1: "已付款",
    2: "已取消",
    3: "已评价",
    4: "待联系",
    5: "退款中",
    6: "退款完成",
    7: "退款失败"
  },
  searchStatus: {
    0: "待付款",
    1: "已付款",
    2: "已取消"
  },
  payStatus: {
    0: "待支付",
    1: "支付成功",
    2: "交易关闭",
    3: "支付失败"
  }
};

const typeMap = {
  1: "org",
  2: "operate"
};

const mulColumnsMap = (isPlatform = false) => {
  const first = [
    {
      prop: "orderNumber",
      label: "订单号",
      width: 240
    },
    {
      prop: "orderType",
      label: "订单来源",
      type: "dictGroup",
      dictName: "fms_order_type"
    },
    {
      prop: "refundItem",
      label: "商品名称",
      width: 200
    }
  ];
  const so = isPlatform
    ? [
        {
          prop: "orgName",
          label: "所属组织",
          width: 120
        }
      ]
    : [];
  const second = [
    {
      prop: "itemAmount",
      label: "数量"
    },

    {
      prop: "originalPrice",
      label: "原价",
      type: "slot"
    },
    // {
    //   prop: "shouldPay",
    //   label: "应付金额",
    //   type: "slot",
    //   width: 200,
    // },
    {
      prop: "finalPrice",
      label: "实付款",
      type: "slot"
    },
    {
      prop: "consignee",
      label: "购买者",
      width: 120
    },
    {
      prop: "contact",
      label: "联系方式",
      width: 120
    },
    {
      prop: "status",
      label: "订单状态", //（0-待付款，1-已付款，2-已取消，3-已评价）
      type: "dict",
      width: 100
    },
    {
      prop: "applyTime",
      label: "申请退款时间",
      width: 200
    },
    {
      prop: "deductedAmount",
      label: "扣取手续费",
      width: 100,
      type: "slot"
    },
    {
      prop: "refundAmount",
      label: "退款金额",
      type: "slot"
    }
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
    orgName: ""
  };
};
export {
  dictsMap,
  mulColumnsMap,
  typeMap,
  OrderDetailDTO,
  RemarksFormDTO,
  initSearchForm
};
