const dictsMap = {
  level: {
    1: "初级代理商",
    2: "中级代理商",
    3: "高级代理商"
  }
};
const attestColumnsMap = [
  {
    prop: "rank",
    label: "代理商等级"
  },
  {
    prop: "level",
    label: "代理级别",
    type: "dict"
  },
  {
    prop: "statusName",
    label: "认证状态"
  },
  {
    prop: "quantity",
    label: "奖励宝贝数量"
  },
  {
    prop: "rewardName",
    label: "是否奖励宝贝"
  },
  {
    prop: "certificationDate",
    label: "认证时间"
  }
];
const recognizanceColumnsMap = [
  {
    prop: "bail",
    label: "保证金"
  },
  {
    prop: "payModeName",
    label: "支付方式"
  },
  {
    prop: "payStatusName",
    label: "缴纳状态"
  },
  {
    prop: "payTime",
    label: "缴纳时间"
  }
];
const operationColumnsMap = [
  {
    prop: "operateMatters",
    label: "操作事项"
  },
  {
    prop: "operateMan",
    label: "操作员"
  },
  {
    prop: "operateTime",
    label: "操作时间"
  }
];
const examColumnsMap = [
  {
    prop: "examName",
    label: "考试名称"
  },
  {
    prop: "examTime",
    label: "考试时间"
  },
  {
    prop: "result",
    label: "成绩"
  }
];
const trainingColumnsMap = [
  {
    prop: "trainingName",
    label: "培训名称"
  },
  {
    prop: "trainingTime",
    label: "培训时间"
  }
];
const trackingColumnsMap = [
  {
    prop: "ordNum",
    label: "订单号"
  },
  {
    prop: "ordName",
    label: "产品名称"
  },
  {
    prop: "trainingState",
    label: "状态"
  },
  {
    prop: "ordSum",
    label: "订单金额"
  },
  {
    prop: "ordway",
    label: "支付方式"
  },
  {
    prop: "ordState",
    label: "支付状态"
  },
  {
    prop: "ordTime",
    label: "下单时间"
  }
];
const initForm = () => {
  return {};
};
export {
  attestColumnsMap,
  recognizanceColumnsMap,
  trackingColumnsMap,
  operationColumnsMap,
  examColumnsMap,
  trainingColumnsMap,
  initForm,
  dictsMap
};
