const dictsMap = {
  level: {
    "1": "简单",
    "2": "较难",
    "3": "很难",
  },
  type: {
    "1": "单选题",
    "2": "多选题",
    "3": "判断题",
  },
  state: {
    "0": "关闭",
    "1": "开启",
  },
  generateType: {
    "1": "固定试卷",
    "2": "随机试卷",
  },
};
const columnsMap = [
  {
    label: "ID",
    prop: "id",
    width: 75,
  },
  {
    label: "试卷名称",
    prop: "title",
  },
  {
    label: "生成类型",
    prop: "generateType",
    type: 'dict',
  },
  {
    label: "试卷分类",
    prop: "kind",
    type: "slot",
    width: 200,
  },
  {
    label: "题数",
    prop: "choiceNum",
    width: 100,
  },
  {
    label: "总分",
    prop: "score",
    width: 100,
  },
  {
    label: "创建者",
    prop: "createByName",
    width: 120,
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 180,
  },
];
const columnsMapCertificate = [
  {
    label: "ID",
    prop: "id",
    width: 75,
  },
  {
    label: "证书名称",
    prop: "title",
    width: 300,
  },
  {
    label: "证书级别",
    prop: "level",
    type: "dictGroup",
    dictName: "exam_certificate_level",
    width: 120,
  },
  {
    label: "颁发机构",
    prop: "awardingOrg",
  },
  {
    label: "有效期",
    prop: "validityPeriod",
    type: "dictGroup",
    dictName: "exam_validity_period",
  },
];

const columnsMapExercise = [
  {
    label: "练习名称",
    prop: "examName",
    width: 200,
  },
  {
    label: "开始时间",
    prop: "beginTime",
    type: "slot",
  },
  {
    label: "结束时间",
    prop: "endTime",
    type: "slot",
  },
  {
    label: "已考人数",
    prop: "testNumber",
  },
  {
    label: "练习状态",
    prop: "state",
    type: "slot",
  },
];

const initForm = () => {
  return {
    name: '', //试卷名称
    qType: '', //试卷分类
    iepQstnRuleList: [], //试题集合
    difficulty: '', //试卷难度
    choiceNum: 0, //题目总数
    score: 0, //试卷总分
    generateType: '1',
  };
};


const initSearchForm = () => {
  return {
    name: '',
    kind: '',
    creatorName: "",
    certificationStatus: "",
  };
};

const rules = {
  name: [{ required: true, message: "请输入试卷名称" }],
  qType: [
    { required: true, message: "请选择试卷类型", trigger: "change" },
  ],
};

export {
  initSearchForm,
  columnsMap,
  initForm,
  rules,
  dictsMap,
  columnsMapCertificate,
  columnsMapExercise,
};
