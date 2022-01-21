export const initFormData = () => {
  return {
    theme: "",
    content: "",
    type: 0,
  };
};

export const rules = {
  theme: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  content: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  invitationTime: [{
    required: true,
    message: "面试时间必填",
    trigger: "change",
  }],
};