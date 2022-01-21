export const status = {
  status: [
    { label: "行政权力", value: "1" },
    { label: "公告服务", value: "2" },
  ],
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  matter_type: [
    { label: "行使权力", value: "1", children: [{ label: "行政许可", value: "10" }, { label: "行政处罚", value: "11" }, { label: "行政强制", value: "12" }] },
    { label: "公共服务", value: "2" },
  ],
  // 服务对象
  server: [
    { label: "自然人", value: "1" },
    { label: "机关", value: "2" },
    { label: "事业单位", value: "3" },
    { label: "企业", value: "4" },
    { label: "社会团体", value: "5" },
    { label: "其他组织", value: "6" },
  ],
  // 办件类型
  certificates: [
    { label: "承诺件", value: "1" },
    { label: "即办件", value: "2" },
    { label: "联办件", value: "3" },
    { label: "初审件", value: "4" },
    { label: "转报件", value: "5" },
  ],
  // 通办范围
  range: [
    { label: "承诺件", value: "1" },
    { label: "即办件", value: "2" },
    { label: "联办件", value: "3" },
    { label: "初审件", value: "4" },
    { label: "转报件", value: "5" },
  ],
  // 实施机构名称
  deptName: [
    { label: "卫生局", value: "1" },
    { label: "环保局", value: "2" },
    { label: "教育局", value: "3" },
    { label: "工商局", value: "4" },
    { label: "税务局", value: "5" },
    { label: "公安局", value: "6" },
  ],
  // 实施主体性质
  subject: [
    { label: "法定机关", value: "1" },
    { label: "授权组织", value: "2" },
    { label: "受委托组织", value: "3" },
  ],
  // 行使类型
  exercise_type: [
    { label: "本级保留", value: "1" },
    { label: "上级委托", value: "2" },
    { label: "审核转报", value: "3" },
  ],
  // 行使层级
  level: [
    { label: "国家级", value: "1" },
    { label: "省级", value: "2" },
    { label: "市级", value: "3" },
    { label: "县级（市、区）", value: "4" },
    { label: "乡级（镇、街道）", value: "5" },
    { label: "村级（社区）", value: "6" },
  ],
  // 运行系统
  operating_system: [
    { label: "垂直系统", value: "1" },
    { label: "国家级", value: "2" },
    { label: "省级", value: "3" },
    { label: "市级", value: "4" },
    { label: "县级", value: "5" },
    { label: "乡级", value: "6" },
    { label: "村级", value: "7" },
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
