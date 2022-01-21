export const dictsMap = {
  materialKind: {
    "1": "表格类",
    "2": "证明类",
    "3": "批文类",
    "4": "证照类",
    "5": "其他类",
  },
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
  commonDataMetaName: [{
    required: true,
    message: "请输入数据元中文名称",
    trigger: "blur",
  }],
  commonDataMetaNameEn: [{
    required: true,
    message: "请输入数据元英文名称",
    trigger: "blur",
  }],
  commonDataMetaNumber: [{
    required: true,
    message: "请输入数据元标识符",
    trigger: "blur",
  }],
  commonDataMetaValue: [{
    required: true,
    message: "请输入表示",
    trigger: "blur",
  }],
  commonDataMetaDescription: [{
    required: true,
    message: "请输入说明",
    trigger: "blur",
  }],
  govStandardDocumentsId: [{
    required: true,
    message: "请输入标准文件名称",
    trigger: "blur",
  }],
};
