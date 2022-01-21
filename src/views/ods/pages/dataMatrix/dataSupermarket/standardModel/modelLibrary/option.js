export const dictsMap = {


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
  dbCn: [{
    required: true,
    message: "请输入模型库中文名称",
    trigger: "blur",
  }],
  dbEn: [{
    required: true,
    message: "请输入模型库英文名称",
    trigger: "blur",
  }],
  dbType: [{
    required: true,
    message: "请输入模型库类型",
    trigger: "blur",
  }],
};
