export const status = {
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  dept: [
    { label: "发展改革委", value: "1" },
    { label: "法定机关", value: "2" },
    { label: "授权组织", value: "3" },
    { label: "受委托组织", value: "4" },
  ],
  level: [
    { label: "国家级", value: "1" },
    { label: "省级", value: "2" },
    { label: "地级", value: "3" },
    { label: "县级", value: "4" },
  ],
};
export const dictsMap = {
  val7: {
    "1": "是",
    "0": "否",
  },
  val3: {
    "1": "发展改革委",
    "2": "法定机关",
    "3": "授权组织",
    "4": "受委托组织",
  },
  val4: {
    "1": "国家级",
    "2": "省级",
    "3": "地级",
    "4": "县级",
  },
};

export const initForm = () => {
  return {
    val1: "",
    val2: "",
    val3: "",
    val4: "",
    val5: "",
    val6: "",
    val7: "",
    val8: "",
    val9: [],
    val10: "",
  };
};

export const rules = {
  val1: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val2: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val3: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  matter_status: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val5: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val8: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val9: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val10: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
};
