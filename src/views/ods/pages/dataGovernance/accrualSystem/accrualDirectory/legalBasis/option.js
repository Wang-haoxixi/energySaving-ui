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
  name: [{
    required: true,
    message: "请输入法律名称",
    trigger: "blur",
  }],
  lawNumber: [{
    required: true,
    message: "请输入法律文号",
    trigger: "blur",
  }],
  lawType: [{
    required: true,
    message: "请输入文件种类",
    trigger: "blur",
  }],
  basisType: [{
    required: true,
    message: "请输入文件类型",
    trigger: "blur",
  }],
  lawTab: [{
    required: true,
    message: "请输入法律依据类型",
    trigger: "change",
  }],
};
