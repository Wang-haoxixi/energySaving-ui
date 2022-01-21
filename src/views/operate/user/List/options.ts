const dictsMap = {
  status: {
    0: "正常",
    1: "待审核",
    2: "锁定",
    3: "待配置"
  },
  lockFlag: {
    "0": "正常",
    "9": "锁定",
    "": "暂无"
  }
};

const columnsMap = [
  {
    prop: "userId",
    label: "用户ID"
  },
  {
    prop: "username",
    label: "用户名",
    type: "slot",
    width: "200px"
  },
  {
    prop: "realName",
    label: "真实姓名",
    width: "100px"
  },
  {
    prop: "createTime",
    label: "注册时间",
    type: "slot",
    width: "120px"
  },
  {
    prop: "lockFlag",
    label: "状态",
    type: "dict"
  },
  {
    prop: "mobile",
    label: "手机号",
    width: "120px"
  },
  {
    prop: "sex",
    label: "性别",
    type: "slot"
  },
  {
    prop: "area",
    label: "地区",
    width: "180px"
  },
  {
    prop: "birthday",
    label: "生日",
    type: "slot",
    width: "120px"
  },
  {
    prop: "assets",
    label: "数据资产"
  },
  {
    prop: "credit",
    label: "信用值"
  },
  {
    prop: "redness",
    label: "红度"
  }
];

const columnsMapReport = [
  {
    label: "日期",
    prop: "createTime",
    type: "slot",
    width: "200px"
  },
  {
    label: "原因",
    prop: "tipOffReason",
    type: "dictGroup",
    dictName: "dms_report_type"
  },
  {
    prop: "tipOffType",
    label: "类型",
    type: "dictGroup",
    dictName: "dms_report_content_type"
  },
  {
    label: "举报理由",
    prop: "tipOffReasonDetails"
  }
];

const columnsMapHistory = [
  {
    label: "操作",
    prop: "operate"
  },
  {
    label: "时间",
    prop: "createTime",
    width: "250px"
  },
  {
    label: "操作IP",
    prop: "operateIP",
    width: "250px"
  }
];
const columnsMapRedness = [
  {
    label: "时间",
    prop: "dayTime"
  },
  {
    label: "当天值",
    prop: "dayScore"
  },
  {
    label: "90天合计",
    prop: "ninetyScore"
  },
  {
    label: "材料",
    prop: "materialScore"
  },
  {
    label: "任务",
    prop: "taskScore"
  },
  {
    label: "说说",
    prop: "thoughtsScore"
  },
  {
    label: "分享",
    prop: "shareScore"
  },
  {
    label: "拉新",
    prop: "pullNewScore"
  },
  {
    label: "新增组织分",
    prop: "newSoScore"
  },
  {
    label: "订单",
    prop: "orderScore"
  }
];

const lockText = (row: any) => {
  if (row.lockFlag === "0") {
    return "锁定";
  }
  if (row.lockFlag === "9") {
    return "解锁";
  } else {
    return "待定";
  }
};

export {
  dictsMap,
  columnsMap,
  columnsMapReport,
  columnsMapHistory,
  columnsMapRedness,
  lockText
};
