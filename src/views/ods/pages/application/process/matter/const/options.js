export const status = {
  status: [
    { label: "待提交", value: "1" },
    { label: "待审核", value: "2" },
    { label: "审核通过", value: "3" },
    { label: "审核驳回", value: "4" },
    { label: "已发布", value: "5" },
  ],
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  matter_status: [
    { label: "在用", value: "1" },
    { label: "暂停", value: "2" },
    { label: "取消", value: "3" },
  ],
  matter_type: [
    { label: "行使权力", value: "1", children: [{ label: "行政许可", value: "10" }, { label: "行政处罚", value: "11" }, { label: "行政强制", value: "12" }] },
    { label: "公共服务", value: "2" },
  ],
  level: [
    { label: "国家级", value: "1" },
    { label: "省级", value: "2" },
    { label: "地市级", value: "3" },
    { label: "区县级", value: "4" },
    { label: "乡镇级", value: "5" },
    { label: "村（社区）级", value: "6" },
  ],
};
export const dictsMap = {
  val4: {
    "1": "在用",
    "2": "暂停",
    "3": "取消",
  },
  status: {
    "1": "待提交",
    "2": "待审核",
    "3": "审核通过",
    "4": "审核驳回",
    "5": "已发布",
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
