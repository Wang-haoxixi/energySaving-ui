export const initFormData = () => {
  return {
    name: "",
    tags: [],
    welfareList: [],
    describe: "",
  };
};

export const infomationList = [
  {
    name: "所属行业",
    value: "industry",
  },
  {
    name: "提供支持",
    value: "welfareList",
  },
];

export const initInfoForm = () => {
  return {
    type: "",
    name: "",
    industry: "",
    position: "",
    city: "",
    mobile: "",
    ability: "",
    describe: "",
  };
};

export const rules = {
  type: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  name: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  industry: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  position: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  city: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  mobile: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  ability: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  describe: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
};