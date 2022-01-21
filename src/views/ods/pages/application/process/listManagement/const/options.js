export const status = {
  status: [
    { label: "草稿", value: "1" },
    { label: "待提交", value: "2" },
    { label: "待审核", value: "3" },
    { label: "审核通过", value: "4" },
    { label: "审核拒绝", value: "5" },
    { label: "已发布", value: "6" },
  ],
  claim_status: [
    { label: "自建", value: "1" },
    { label: "认领", value: "2" },
  ],
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  // 事项状态
  matter_status: [
    { label: "在用", value: "1" },
    { label: "暂停", value: "2" },
    { label: "取消", value: "3" },
  ],
  matter_type: [
    { label: "行使权力", value: "1", children: [{ label: "行政许可", value: "10" }, { label: "行政处罚", value: "11" }, { label: "行政强制", value: "12" }] },
    { label: "公共服务", value: "2" },
  ],
  // 行使层级
  level: [
    { label: "国家级", value: "1" },
    { label: "省级", value: "2" },
    { label: "市级", value: "3" },
    { label: "县级", value: "4" },
    { label: "镇(乡、街道)级", value: "5" },
    { label: "分级管理", value: "6" },
  ],
  // 权力来源
  power: [
    { label: "法定本级行使", value: "1" },
    { label: "上级下放", value: "2" },
    { label: "上级授权", value: "3" },
    { label: "同级授权", value: "4" },
    { label: "上级委托", value: "5" },
    { label: "同级委托", value: "6" },
  ],
  // 实施主体性质
  nature_subject: [
    { label: "法定机关", value: "1" },
    { label: "授权组织", value: "2" },
    { label: "受委托组织", value: "3" },
  ],
  // 服务对象
  service: [
    { label: "自然人", value: "1" },
    { label: "企业法人", value: "2" },
    { label: "事业法人", value: "3" },
    { label: "社会组织法人", value: "4" },
    { label: "非法人企业", value: "5" },
    { label: "行政机关", value: "6" },
    { label: "其他组织", value: "7" },
  ],
  // 办件类型
  handling: [
    { label: "即办件", value: "1" },
    { label: "承诺件", value: "2" },
  ],
  // 办理形式
  handling_form: [
    { label: "窗口办理", value: "1" },
    { label: "网上办理", value: "2" },
    { label: "快递申请", value: "3" },
  ],
  // 咨询方式
  consultation_mode: [
    { label: "窗口咨询", value: "1" },
    { label: "网络咨询", value: "2" },
    { label: "电话咨询", value: "3" },
    { label: "信件咨询", value: "4" },
    { label: "邮件咨询", value: "5" },
  ],
  // 监督投诉方式
  supervision_complaint_mode: [
    { label: "窗口投诉", value: "1" },
    { label: "网络投诉", value: "2" },
    { label: "电话投诉", value: "3" },
    { label: "信件投诉", value: "4" },
    { label: "邮件投诉", value: "5" },
  ],
  // 通办范围
  range: [
    { label: "全国", value: "1" },
    { label: "全省", value: "2" },
    { label: "全市", value: "3" },
    { label: "全县", value: "4" },
    { label: "全镇(乡、街道)", value: "5" },
    { label: "跨村(社区)", value: "6" },
  ],
  // 办理结果类型
  handling_result_type: [
    { label: "证照", value: "1" },
    { label: "批文", value: "2" },
    { label: "其他", value: "3" },
    { label: "无", value: "4" },
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
    val9: "",
    val10: "",
    val11: "",
    val12: "",
    val13: "",
    val14: "",
    val15: [],
    val17: [],
    val24: [],
    val25: [],
  };
};

export const rules = {
  val1: [{
    required: true,
    message: "不能为空",
    trigger: "change",
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
  val4: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val5: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val6: [{
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
  val11: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val13: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val14: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val15: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val16: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val18: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val19: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val20: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val21: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val22: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val23: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val24: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val28: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val33: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val38: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val39: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val40: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val47: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val48: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  val49: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
};
