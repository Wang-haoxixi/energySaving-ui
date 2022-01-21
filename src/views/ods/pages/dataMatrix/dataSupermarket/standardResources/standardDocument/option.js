export const dictsMap = {
  isYes: [{
    value: 0,
    lable: "否",
  },
  {
    value: 1,
    label: "是",
  },
  ],
};

export function initSearchForm() {
  return {
    materialName: "",
  };
}

export const initForm = () => {
  return {
    name: "",
  };
};

export const rules = {
  name: [{
    required: true,
    message: "请输入标准文件名称",
    trigger: "blur",
  }],
  number: [{
    required: true,
    message: "请输入标准号",
    trigger: "blur",
  }],
  pubAgency: [{
    required: true,
    message: "请输入发布机构",
    trigger: "blur",
  }],
  classification: [{
    required: true,
    message: "请输入标准分类",
    trigger: "change",
  }],
  nature: [{
    required: true,
    message: "请输入标准性质",
    trigger: "change",
  }],
  icsCodeFirst: [{
    required: true,
    message: "请输入ICS编码1",
    trigger: "blur",
  }],
  ccsCodeFirst: [{
    required: true,
    message: "请输入CCS编码1",
    trigger: "blur",
  }],
  isMark: [{
    required: true,
    message: "请输入是否采标",
    trigger: "change",
  }],
  markWay: [{
    required: true,
    message: "请输入采标方式",
    trigger: "change",
  }],
  markCode: [{
    required: true,
    message: "请输入采标号",
    trigger: "blur",
  }],
  publishTime: [{
    required: true,
    message: "请输入发布时间",
    trigger: "change",
  }],
  implementationTime: [{
    required: true,
    message: "请输入实施时间",
    trigger: "change",
  }],
  version: [{
    required: true,
    message: "请输入版本(年代)号",
    trigger: "change",
  }],
};
