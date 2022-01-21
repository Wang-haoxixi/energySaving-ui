
const dictMap = {
  enable: {
    0: "不启用",
    1: "启用",
  },
};
const columnsMap = [
  {
    prop: "id",
    label: "序号",
    width: "80px",
  },
  {
    prop: "name",
    label: "配置名称",
  },
  {
    prop: "appId",
    label: "appID",
  },
  {
    prop: "type",
    label: "支付类型",
  },
  {
    prop: "mchId",
    label: "商户号",
  },
  {
    prop: "enable",
    label: "渠道状态",
    type: "slot",
  },
  {
    prop: "createTime",
    label: "创建时间",
  },
];

const initForm = () => {
  return {
    id: 1,
    type: "",
    enable: "1",
    appId: "",
    appSecret: "",
    createTime: "",
    updateTime: "",
    delFlag: 0,
    mchId: "",
    name: "",
    notifyUrl: "",
    secret: "",
  };
};
const rules = {
  type: [{ required: true, message: "请输入", trigger: "blur" }],
  name: [{ required: true, message: "请输入", trigger: "blur" }],
  appId: [{ required: true, message: "请输入", trigger: "blur" }],
  mchId: [{ required: true, message: "请输入", trigger: "blur" }],
  notifyUrl: [{ required: true, message: "请输入", trigger: "blur" }],
};

export { rules, columnsMap, initForm, dictMap };
