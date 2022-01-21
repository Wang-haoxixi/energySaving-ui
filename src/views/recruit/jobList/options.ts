export const columnsMap = [{
  prop: "name",
  label: "职位名称",
  type: "slot",
},
{
  prop: "createTime",
  label: "发布时间",
},
{
  prop: "deliveryNum",
  label: "收到申请",
  type: "slot",
},
{
  prop: "state",
  label: "发布状态",
  type: "dict",
  width: "120px",
},
{
  prop: "rednessDemand",
  label: "红度等级",
  width: "120px",
}];

export const initJobForm = () => {
  return {
    name: "",
    industry: "",
    workplace: "",
    jobType: "",
    education: "",
    major: "",
    experience: "",
    language: "",
    salaryStart: '',
    salaryEnd: '',
    welfareSupportList: [],
    tagKeyWords: [],
    redness: "",
    reward: "",
    examIds: [],
    examList: [],
  };
};

export const initPartnerForm = () => {
  return {
    name: "",
    industry: "",
    workplace: "",
    welfareSupportList: [],
    tagKeyWords: [],
    redness: "",
    reward: "",
    examIds: [],
    examList: [],
  };
};

export const rules = {
  materialName: [{
    required: true,
    message: "请输入材料名称",
    trigger: "blur",
  }],
};

// 红度 1-5
const rednessMinMax = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback();
  } else if (value < 1 || value > 5) {
    callback(new Error('请输入1-5范围内的正整数'));
  } else {
    callback();
  }
};

// 正整数验证
const integerValidate = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback();
  } else if (Number(value) < 0) {
    callback(new Error('请输入正整数'));
  } else if (String(value).indexOf(".") >= 0) {
    callback(new Error('请输入正整数'));
  } else {
    callback();
  }
};

// 1-999的正整数
const maxValidate = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback();
  } else if (Number(value) > 999 || Number(value) < 0) {
    callback(new Error('请输入1 ~ 999的正整数'));
  } else {
    callback();
  }
};

// 福利个数8个以内
const maxWelfare = (rule: any, value: any, callback: any) => {
  if (value.length > 8) {
    callback(new Error('最多只可选择8个选项'));
  } else {
    callback();
  }
};

// 文字、数字、英文
const validateName = (rule: any, value: any, callback: any) => {
  if (/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value)) {
    callback();
  } else {
    callback("请勿输入特殊字符");
  }
};

export const jobRules = {
  name: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  industry: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  workplace: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  detailedAddress: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  jobType: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  education: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  experience: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  major: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  language: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  welfareSupportList: [{
    required: true,
    message: "必填",
    trigger: "change",
  }, {
    validator: maxWelfare,
    trigger: 'change',
  }],
  describe: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  tagKeyWords: [{
    required: true,
    message: "必填",
    trigger: "change",
  }, {
    validator: maxWelfare,
    trigger: 'change',
  }],
  redness: [{
    validator: rednessMinMax,
    trigger: 'blur',
  }, {
    validator: integerValidate,
    trigger: 'blur',
  }],
  reward: [{
    validator: integerValidate,
    trigger: 'blur',
  }, {
    validator: maxValidate,
    trigger: 'blur',
  }],
};

export const partnerRules = {
  name: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }, { validator: validateName, trigger: 'blur' }],
  industry: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  workplace: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  welfareSupportList: [{
    required: true,
    message: "必填",
    trigger: "change",
  }, {
    validator: maxWelfare,
    trigger: 'change',
  }],
  tagKeyWords: [{
    required: true,
    message: "必填",
    trigger: "change",
  }, {
    validator: maxWelfare,
    trigger: 'change',
  }],
  describe: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  redness: [{
    validator: rednessMinMax,
    trigger: 'blur',
  }, {
    validator: integerValidate,
    trigger: 'blur',
  }],
  reward: [{
    validator: integerValidate,
    trigger: 'blur',
  }, {
    validator: maxValidate,
    trigger: 'blur',
  }],
};

export const dictsMap = {
  state: {
    0: '招聘中',
    1: '停止招聘',
  },
};

export const initSearchForm = () => {
  return {
    name: "",
    type: "",
    state: "0",
  };
};

export const searchDictMaps = {
  type: [{
    value: "",
    label: "全部",
  }, {
    value: "0",
    label: "职位",
  }, {
    value: "1",
    label: "合伙人",
  }],
  state: [{
    value: "",
    label: "全部",
  }, {
    value: "0",
    label: "招聘中",
  }, {
    value: "1",
    label: "已停止",
  }],
};