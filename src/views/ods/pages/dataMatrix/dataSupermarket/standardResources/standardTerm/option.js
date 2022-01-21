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
  indexFirst: [{
    required: true,
    message: "请输入1级序号",
    trigger: "blur",
  }],
  classificationFirst: [{
    required: true,
    message: "请输入1级分类",
    trigger: "blur",
  }],
  orderNumber: [{
    required: true,
    message: "请输入序号",
    trigger: "blur",
  }],
  terminology: [{
    required: true,
    message: "请输入术语",
    trigger: "blur",
  }],
  terminologyEn: [{
    required: true,
    message: "请输入术语(英文)",
    trigger: "blur",
  }],
  define: [{
    required: true,
    message: "请输入定义",
    trigger: "blur",
  }],
  govStandardDocumentsId: [{
    required: true,
    message: "请输入标准文件名称",
    trigger: "blur",
  }],
};
