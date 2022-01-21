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
  refuseReason: [{
    required: true,
    message: "请输入理由",
    trigger: "blur",
  }],
};

export const rules2 = {
  refuseReason: [{
    required: true,
    message: "请输入拒绝理由",
    trigger: "blur",
  }],
  deptId: [{
    required: true,
    message: "请输入推荐数源部门",
    trigger: "blur",
  }],
};
