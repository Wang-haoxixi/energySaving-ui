const columnsMap = [
  {
    prop: "orgId",
    label: "组织ID"
  },
  {
    prop: "orgName",
    label: "组织名称",
    type: "slot",
    width: "250px"
  },
  {
    prop: "realName",
    label: "负责人",
    width: "120px"
  },
  {
    prop: "createTime",
    label: "创建时间",
    type: "slot",
    width: "120px"
  },
  {
    prop: "updateTime",
    label: "更新时间",
    type: "slot",
    width: "120px"
  },
  {
    prop: "establishedTime",
    label: "成立时间",
    type: "slot",
    width: "120px"
  },
  {
    prop: "industry",
    label: "行业"
  },
  {
    prop: "region",
    label: "所在地"
  },
  {
    prop: "redness",
    label: "红度"
  },
  {
    prop: "credit",
    label: "信用值"
  },
  {
    prop: "assets",
    label: "数据资产"
  }
];
const dataList = [
  {
    label: "知事"
  },
  {
    label: "粉丝"
  },
  {
    label: "信用值"
  },
  {
    label: "用户"
  },
  {
    label: "宝贝"
  },
  {
    label: "数据资产"
  },
  {
    label: "红度"
  }
];
// const columnsMapReport = [{
//   label: "日期",
//   prop: "createTime",
//   type: "slot",
// }, {
//   label: "举报人",
//   prop: "realName",
// }, {
//   label: "类型",
//   prop: "tipOffReason",
//   type: "dictGroup",
//   dictName: "dms_report_type",
// }, {
//   label: "原因",
//   prop: "tipOffReasonDetailsPart",
// }];

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
const soDataType = {
  1: "user",
  2: "nengbar",
  3: "thought",
  4: "task",
  5: "product",
  6: "questionnaire"
};

const soDataTypeList = [
  {
    label: "组织说说",
    value: "thought",
    icon: "el-icon-woneng-duihuakuang1"
  },
  {
    label: "组织任务",
    value: "task",
    icon: "el-icon-woneng-renwu"
  },
  {
    label: "组织产品",
    value: "product",
    icon: "el-icon-woneng-chanpin"
  },
  {
    label: "组织问卷",
    value: "questionnaire",
    icon: "el-icon-woneng-wenjuan"
  }
];
const timeTypeList = [
  {
    label: "总量",
    value: "count"
  },
  {
    label: "昨日新增",
    value: "yesterdayNew"
  },
  {
    label: "7日新增",
    value: "weekNew"
  },
  {
    label: "30日新增",
    value: "thirtyDayNew"
  }
];
const visitTypeList = [
  {
    label: "昨日访问",
    value: "yesterday",
    opacity: "1"
  },
  {
    label: "7日访问",
    value: "weekNew",
    opacity: "0.55"
  },
  {
    label: "30日访问",
    value: "thirtyDayNew",
    opacity: "0.1"
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
    label: "问卷分",
    prop: "quesScore"
  },
  {
    label: "活动分",
    prop: "activityScore"
  },
  {
    label: "产品分",
    prop: "productScore"
  },
  {
    label: "粉丝数",
    prop: "fanScore"
  },
  {
    label: "纪要分",
    prop: "summaryScore"
  },
  {
    label: "用户分",
    prop: "canerScore"
  }
];
export {
  columnsMap,
  dataList,
  columnsMapReport,
  soDataType,
  soDataTypeList,
  timeTypeList,
  visitTypeList,
  columnsMapRedness
};
