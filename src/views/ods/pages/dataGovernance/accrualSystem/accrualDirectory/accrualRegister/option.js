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

  };
};

export const rules = {
  dutyName: [{
    required: true,
    message: "请输入权责名称",
    trigger: "blur",
  }],
  dutyCode: [{
    required: true,
    message: "请输入权责编码",
    trigger: "blur",
  }],
  orgName: [{
    required: true,
    message: "请输入实施主体",
    trigger: "blur",
  }],
  authLevel: [{
    required: true,
    message: "请输入行使层级",
    trigger: "change",
  }],
  dutyTypeArras: [{
    required: true,
    message: "类型",
    trigger: "change",
  }],
};
