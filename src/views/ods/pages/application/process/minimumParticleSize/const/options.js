export const status = {
  status: [
    { label: "待提交", value: "1" },
    { label: "待审核", value: "2" },
    { label: "审核通过", value: "3" },
    { label: "审核拒绝", value: "4" },
  ],
  kinds: [
    { label: "单选", value: "1" },
    { label: "多选", value: "2" },
    { label: "填空", value: "3" },
    { label: "数字", value: "4" },
    { label: "日期点", value: "5" },
    { label: "日期段", value: "6" },
    { label: "邮箱", value: "7" },
    { label: "邮编", value: "8" },
    { label: "固定电话", value: "9" },
    { label: "移动电话", value: "10" },
    { label: "身份证", value: "11" },
    { label: "下拉框", value: "12" },
    { label: "联动下拉框", value: "13" },
    { label: "香港身份证", value: "14" },
    { label: "澳门身份证", value: "15" },
    { label: "台湾身份证", value: "16" },
    { label: "外国护照", value: "17" },
    { label: "其他护照", value: "18" },
    { label: "联动证件类型", value: "19" },
  ],
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  combination: [
    { label: "无", value: "1" },
    { label: "普通组合框", value: "2" },
    { label: "可添加组合框", value: "3" },
  ],
  share: [
    { label: "无条件共享", value: "1" },
    { label: "有条件共享", value: "2" },
    { label: "不予共享", value: "3" },
  ],
};
export const dictsMap = {
  val2: {
    "1": "单选",
    "2": "多选",
    "3": "填空",
    "4": "数字",
    "5": "日期点",
    "6": "日期段",
    "7": "邮箱",
    "8": "邮编",
    "9": "固定电话",
    "10": "移动电话",
    "11": "身份证",
    "12": "下拉框",
    "13": "联动下拉框",
    "14": "香港身份证",
    "15": "澳门身份证",
    "16": "台湾身份证",
    "17": "外国护照",
    "18": "其他护照",
    "19": "联动证件类型",
  },
  status: {
    "1": "待提交",
    "2": "待审核",
    "3": "审核通过",
    "4": "审核驳回",
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
