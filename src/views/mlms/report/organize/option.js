export const summaryTable = [{
    prop: "title",
    label: "标题",
  },
  {
    prop: "meetingTime",
    label: "会议时间",
  },
  {
    prop: "meetingType",
    label: "会议类型",
  },
];

export const productTable = [{
    prop: "name",
    label: "产品名称",
  },
  {
    prop: "onlineTime",
    label: "上线时间",
  },
];

export const projectTable = [{
    prop: "projectName",
    label: "项目名称",
  },
  {
    prop: "publisherName",
    label: "项目经理",
  },
  {
    prop: "publishTime",
    label: "发布时间",
  },
];


export const rules = {
  workPlan: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  workSummary: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
};
