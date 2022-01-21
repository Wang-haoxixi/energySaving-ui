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
  classificationCode: [{
    required: true,
    message: "请输入分类代码",
    trigger: "blur",
  }],
  classificationName: [{
    required: true,
    message: "请输入分类名称",
    trigger: "blur",
  }],
  name: [{
    required: true,
    message: "请输入标准文件名称",
    trigger: "blur",
  }],
};
