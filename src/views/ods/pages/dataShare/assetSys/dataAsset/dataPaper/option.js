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
    message: "请输入其他数据名称",
    trigger: "blur",
  }],
  deptId: [{
    required: true,
    message: "请输入所属单位",
    trigger: "blur",
  }],
};
