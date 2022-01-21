export const initFormData = () => {
  return {
    partnersType: '',
    type: "user",
    name: '',
    mobile: "",
    industry: "",
    city: '',
    ability: "",
    describe: "",
    annexes: [],
    position: "",
  };
};

export const rules = {
  partnersType: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  type: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  orgName: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  name: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  mobile: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  industry: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  city: [{
    required: true,
    message: "必填",
    trigger: "change",
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


export const dictsMap = {};
