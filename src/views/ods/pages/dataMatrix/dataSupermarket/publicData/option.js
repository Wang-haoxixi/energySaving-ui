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
  categoryCode: [{
    required: true,
    message: "请输入分类代码",
    trigger: "blur",
  }],
  categoryName: [{
    required: true,
    message: "请输入分类名称",
    trigger: "blur",
  }],
};
