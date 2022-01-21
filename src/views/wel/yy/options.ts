const _color = (percent: string) => {
  return +percent >= 0 ? "red" : "blue";
};

const _icon = (percent: string) => {
  return +percent >= 0 ? "el-icon-caret-top" : "el-icon-caret-bottom";
};

const genOptions = (x: any[], y: any[], name: string) => {
  return {
    grid: {
      x: 10,
      y: 30,
      x2: 10,
      y2: 0,
      containLabel: true
    },
    color: ["#ff6c40"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: [
      {
        type: "category",
        data: x,
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          show: false
        },
        axisLine: {
          //y轴
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        axisLine: {
          //y轴
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#f0f0f0"],
            width: 1,
            type: "solid"
          }
        }
      }
    ],
    series: [
      {
        name,
        type: "bar",
        barWidth: "15%",
        data: y,
        itemStyle: {
          //柱形图圆角，鼠标移上去效果
          emphasis: {
            barBorderRadius: [10, 10, 10, 10]
          },
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: [10, 10, 10, 10]
          }
        }
      }
    ]
  };
};

const genBoxList = (chart: any, name: string) => {
  return [
    {
      num: chart.dayNew,
      name: `今日新增${name}数`,
      grade: chart.dayPercent,
      color: _color(chart.dayPercent),
      icon: _icon(chart.dayPercent)
    },
    {
      num: chart.weekNew,
      name: `本周新增${name}数`,
      grade: chart.weekPercent,
      color: _color(chart.weekPercent),
      icon: _icon(chart.weekPercent)
    }
  ];
};

const columnsMapReport = [
  {
    prop: "tipOffReasonDetails",
    label: "举报理由"
  },
  {
    prop: "realName",
    label: "举报人"
  },
  {
    prop: "tipOffReason",
    label: "举报类型",
    type: "dictGroup",
    dictName: "dms_report_type"
  },
  {
    prop: "tipOffType",
    label: "内容分类",
    type: "dictGroup",
    dictName: "dms_report_content_type"
  },
  {
    prop: "createTime",
    label: "举报时间",
    type: "slot"
  }
];
const columnsMapSuggest = [
  {
    prop: "creatorName",
    label: "建议人"
  },
  {
    prop: "title",
    label: "主题"
  },
  {
    prop: "createTime",
    label: "建议时间",
    type: "slot"
  }
];
const columnsMapProduct = [
  {
    prop: "name",
    label: "产品名称"
  },
  {
    prop: "type",
    label: "类型",
    type: "dictGroup",
    dictName: "dms_product_type"
  },
  {
    prop: "category",
    label: "类别",
    type: "slot"
  },
  {
    prop: "creatorName",
    label: "负责人"
  }
];

const columnsMapActivity = [
  {
    prop: "name",
    label: "活动名称"
  },
  {
    prop: "createByName",
    label: "创建人"
  },
  {
    prop: "orgName",
    label: "所属组织"
  }
];
const columnsMapQuestionnaire = [
  {
    prop: "name",
    label: "问卷名称"
  },
  {
    prop: "userName",
    label: "创建人"
  },
  {
    prop: "orgName",
    label: "所属组织"
  }
];
const dealTabList = [
  {
    label: "举报管理",
    value: "reportManage"
  },
  {
    label: "建议处理",
    value: "suggestManage"
  },
  {
    label: "产品认证",
    value: "productManage"
  },
  {
    label: "活动审核",
    value: "activityManage"
  },
  {
    label: "问卷审核",
    value: "questionnaireManage"
  }
];
const dataList = [
  {
    label: "专栏",
    value: "specialColumn",
    color: "#2F80FF",
    unit: "个"
  },
  {
    label: "组织",
    value: "so",
    color: "#3CD489",
    unit: "个"
  },
  {
    label: "任务",
    value: "task",
    color: "#E4796D",
    unit: "个"
  },
  {
    label: "材料",
    value: "material",
    color: "#FFB154",
    unit: "个"
  },
  {
    label: "订单",
    value: "order",
    color: "#36C7EB",
    unit: "个"
  },
  {
    label: "问卷",
    value: "questionnaire",
    color: "#2F80FF",
    unit: "个"
  },
  {
    label: "活动",
    value: "activity",
    color: "#3CD489",
    unit: "个"
  },
  {
    label: "产品",
    value: "product",
    color: "#E4796D",
    unit: "个"
  },
  {
    label: "说说",
    value: "thought",
    color: "#FFB154",
    unit: "个"
  },
  {
    label: "订单额",
    value: "orderAmount",
    color: "#36C7EB",
    unit: "宝贝"
  }
];

const columnsMapAccess = [
  {
    prop: "name",
    label: "页面名称"
  },
  {
    prop: "yestoday",
    label: "昨日访问量"
  },
  {
    prop: "lastWeek",
    label: "过去七日访问量"
  },
  {
    prop: "lastMonth",
    label: "过去30日访问量"
  }
];
export {
  _color,
  _icon,
  genOptions,
  genBoxList,
  columnsMapReport,
  columnsMapSuggest,
  columnsMapProduct,
  columnsMapActivity,
  columnsMapQuestionnaire,
  dealTabList,
  dataList,
  columnsMapAccess
};
