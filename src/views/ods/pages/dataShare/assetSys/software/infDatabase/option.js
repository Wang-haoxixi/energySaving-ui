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
    commonDataMetaName: "",
    commonDataMetaNameEn: "",
  };
};

export const rules = {
  name: [{
    required: true,
    message: "请输入数据库名称",
    trigger: "blur",
  }],
  deptId: [{
    required: true,
    message: "请输入所属单位",
    trigger: "blur",
  }],
  upholdStart: [{
    required: true,
    message: "请输入维保开始时间",
    trigger: "change",
  }],
  upholdEnd: [{
    required: true,
    message: "请输入维保到期时间",
    trigger: "change",
  }],
  status: [{
    required: true,
    message: "请输入资产使用状态",
    trigger: "change",
  }],
  degree: [{
    required: true,
    message: "请输入重要程度",
    trigger: "change",
  }],
  purchaseTime: [{
    required: true,
    message: "请输入采购时间",
    trigger: "change",
  }],
  isDomestic: [{
    required: true,
    message: "请输入是否国产",
    trigger: "change",
  }],
  databaseMold: [{
    required: true,
    message: "请输入数据库类型",
    trigger: "change",
  }],
};
