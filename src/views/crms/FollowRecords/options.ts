const columnsMap = [
  {
    prop: "contactName",
    label: "联系人",
    type: "slot",
  },
  {
    prop: "clientName",
    label: "所属客户",
  },
  {
    prop: "theme",
    label: "跟进主题",
  },
  {
    prop: "followStatus",
    label: "跟进状态",
    type: "slot",
  },
  {
    prop: "followTime",
    label: "跟进时间",
  },
];
const initForm = () => {
  return {
    clientId: 0,
    content: "",
    contactId: 0,
    createBy: 0,
    followStatus: "",
    followTime: 0,
    followWay: "",
    nextTime: "",
    orgId: 0,
    recordId: 0,
    theme: "",
    updateBy: 0,
    attachFileList: [],
  };
};
const columnsMeetingMap = [
  {
    prop: "rank",
    label: "已关联会议",
  },
  {
    prop: "bailSum",
    label: "会议时间",
  },
];
const rules = {
  theme: [{ required: true, message: "请输入", trigger: "blur" }],
  followTime: [{ required: true, message: "请输入", trigger: "blur" }],
  nextTime: [{ required: true, message: "请输入", trigger: "blur" }],
  clientId: [{ required: true, message: "请输入", trigger: "blur" }],
  recordId: [{ required: true, message: "请输入", trigger: "blur" }],
  followWay: [{ required: true, message: "请输入", trigger: "blur" }],
  followStatus: [{ required: true, message: "请输入", trigger: "blur" }],
};
const initSearchForm = () => {
  return {
    name: "",
    area: "",
  };
};

export { columnsMeetingMap, columnsMap, initForm, initSearchForm, rules };
