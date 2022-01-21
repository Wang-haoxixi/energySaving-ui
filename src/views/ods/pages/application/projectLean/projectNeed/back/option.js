export const dictsMap = {
  degree: { "1": "重要", "2": "关键", "3": "一般", "4": "其他" },
  status: { "1": "故障设备", "2": "库存备用", "3": "已停用", "4": "使用中" },
};

export function initSearchForm() {
  return {
    materialName: "",
  };
}

export const initForm = () => {
  return {
    commonDataMetaName: "",
    commonDataMetaNameEn: "",
  };
};

export const rules = {
  name: [{
    required: true,
    message: "请输入服务器名称",
    trigger: "blur",
  }],
  deptId: [{
    required: true,
    message: "请输入所属单位",
    trigger: "blur",
  }],
  code: [{
    required: true,
    message: "请输入资产编号",
    trigger: "blur",
  }],
  degree: [{
    required: true,
    message: "请输入重要程度",
    trigger: "change",
  }],
  upholdStart: [{
    required: true,
    message: "请输入维保开始时间",
    trigger: "change",
  }],
  upholdEnd: [{
    required: true,
    message: "请输入保到期时间",
    trigger: "change",
  }],
  status: [{
    required: true,
    message: "请输入资产使用状态",
    trigger: "change",
  }],
  entranceTime: [{
    required: true,
    message: "请输入入场时间",
    trigger: "change",
  }],
  supplier: [{
    required: true,
    message: "请输入厂商",
    trigger: "blur",
  }],
  operatingSystem: [{
    required: true,
    message: "请输入操作系统",
    trigger: "change",
  }],
  isDomestic: [{
    required: true,
    message: "请输入是否国产",
    trigger: "change",
  }],
};

export const rules2 = {
  wangluoanquan: [{
    required: true,
    message: "请输入项目建议资金(万)",
    trigger: "blur",
  }],
  shujuanquan: [{
    required: true,
    message: "请输入审核意见",
    trigger: "blur",
  }],
};
