
const columnsMap = [
  {
    prop: "id",
    label: "ID",
    width: "80px",
  },
  {
    prop: "type",
    label: "类型",
  },
  {
    prop: "remark",
    label: "描述",
    width: "240px",
  },
  {
    prop: "appId",
    label: "appId",
  },
  {
    prop: "appSecret",
    label: "appSecret",
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
    remark: "",
    appId: "",
    appSecret: "",
    redirectUrl: "",
    createTime: "",
    updateTime: "",
    delFlag: 0,
  };
};
const rules = {
  type: [{ required: true, message: "请输入", trigger: "blur" }],
  remark: [{ required: true, message: "请输入", trigger: "blur" }],
  appId: [{ required: true, message: "请输入", trigger: "blur" }],
  appSecret: [{ required: true, message: "请输入", trigger: "blur" }],
  redirectUrl: [{ required: true, message: "请输入", trigger: "blur" }],
};

export { rules, columnsMap, initForm };
