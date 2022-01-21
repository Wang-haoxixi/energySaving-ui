export const rules = {
  typeName: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
};

export const initFormData = () => {
  return {
    parentTypeId: 0,
    showUser: "1",
    typeName: "",
  };
};
