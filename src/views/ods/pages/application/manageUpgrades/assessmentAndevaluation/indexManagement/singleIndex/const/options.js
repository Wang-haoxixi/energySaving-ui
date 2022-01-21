export const status = {
  status: [
    { label: "人工采集", value: "1" },
    { label: "数据采集", value: "2" },
    { label: "问卷调查", value: "3" },
  ],
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  level: [
    { label: "省", value: "1" },
    { label: "省市", value: "2" },
    { label: "省市县", value: "3" },
    { label: "省县", value: "4" },
    { label: "市县", value: "5" },
    { label: "市", value: "6" },
    { label: "县", value: "7" },
  ],
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
    val9: "",
    val11: "",
    val12: "",
    val13: "",
    val14: "",
    val15: "",
    status: "",
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
};