export const columnsMap = [
  { width: 85, label: "序号", prop: "publicId" },
  { width: 160, label: "名称", prop: "publicName" },
  { width: 300, label: "键", prop: "publicKey" },
  { width: 300, label: "值", prop: "publicValue" },
  { width: 300, label: "编码", prop: "validateCode" },
  { width: 100, label: "作用", prop: "system", type: "dict" },
  { width: 100, label: "状态", prop: "status", type: "dict" },
  { width: 100, label: "类型", prop: "publicType", type: "dict" },
];

export const dictsMap = {
  system: {
    0: "业务类",
    1: "系统类",
  },
  status: {
    1: "使用中",
    2: "已停用",
  },
  publicType: {
    0: "默认",
    1: "检索",
    2: "原文",
    3: "报表",
    4: "安全",
    5: "文档",
    6: "消息",
    9: "其他",
  },
};


export const initForm = () => {
  return {
    publicName: "",// 参数名称
    publicKey: "",// 键
    publicValue: "",// 值
    validateCode: "",// 编码
    system: "",// 作用
    status: "",// 状态
    publicType: "",// 类型
  };
};

export const initSearchForm = () => {
  return {
    publicName: "",// 参数名称
    system: "",// 作用
  };
};
