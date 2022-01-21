export const status = {
  classify: [
    { label: "证照类", value: "1" },
    { label: "表格类", value: "2" },
    { label: "证明类", value: "3" },
    { label: "批文类", value: "4" },
    { label: "其他类", value: "5" },
  ],
  type: [
    { label: "原件", value: "1" },
    { label: "复印件", value: "2" },
    { label: "原件和复印件", value: "3" },
  ],
  form: [
    { label: "纸质", value: "1" },
    { label: "电子", value: "2" },
  ],
};
export const dictsMap = {
  val2: {
    "1": "证照类",
    "2": "表格类",
    "3": "证明类",
    "4": "批文类",
    "5": "其他类",
  },
  val3: {
    "1": "原件",
    "2": "复印件",
    "3": "原件和复印件",
  },
  val4: {
    "1": "纸质",
    "2": "电子",
  },
};

export const initForm = () => {
  return {
    val1: "",
    val2: "",
    val3: "",
    val4: "",
    val5: [],
    val6: [],
    val7: "",
    val8: "",
    val9: "",
    val10: "",
    val11: "",
    val12: "",
    val13: "",
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
};
