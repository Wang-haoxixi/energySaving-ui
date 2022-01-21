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
  type: {
    1: "常见问题",
  },
  isUsed: {
    1: "启用",
    0: "禁用",
  },
};

export const initForm = () => {
  return {
    replyStr: "",
    colloquialReplyStr: "",
  };
};

export const rules = {
  question: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  replyStr: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  colloquialReplyStr: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
  type: [{
    required: true,
    message: "不能为空",
    trigger: "change",
  }],
  isUsed: [{
    required: true,
    message: "不能为空",
    trigger: "blur",
  }],
};
