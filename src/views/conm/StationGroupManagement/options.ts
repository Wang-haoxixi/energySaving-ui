const dictsMap = {
  status: {
    0: "禁用",
    1: "正常",
  },
};

const initForm = () => {
  return {
    parentId: "", //上级站点
    // orgId: '',//组织
    siteName: "", //名称
    url: "", //域名
    manageList: [], //管理员
    // manageVoList: [],
    mobileUrl: "", //手机端域名
    status: 1, //状态
  };
};
const columnsMap = [
  {
    prop: "id",
    label: "ID",
    width: "80px",
  },
  {
    prop: "siteName",
    label: "站名",
  },
  {
    prop: "url",
    label: "域名",
  },
  // {
  //   prop: 'orgId',
  //   label: '组织',
  // },
  {
    prop: "mobileUrl",
    label: "手机端域名",
  },
  {
    prop: "status",
    label: "状态",
    type: "dict",
    width: "120px",
  },
];

const initSearchForm = () => {
  return {};
};

const rules = {
  siteName: [
    {
      required: true,
      message: "请输入站点名称",
      trigger: "blur",
    },
  ],
};

const selfRules = {
  ...rules,
};

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules };
