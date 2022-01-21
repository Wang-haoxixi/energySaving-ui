const dictsMap = {
  recommend: {
    0: "是",
    1: "否",
  },
  status: {
    0: "已审核",
    1: "未审核",
  },
};

const initForm = () => {
  return {
    friendlinkId: "",
    typeId: "", //分类管理
    name: "", // 网站名称
    url: "", //网站地址
    logo: "", //图片logo
    email: "", //站长email
    description: "", //网站描述,
    recommend: 0, //是否推荐
    status: 0,
  };
};
const initTypeForm = () => {
  return {
    friendlinktypeId: "",
    typeName: "", //分类名称
    typeNumber: "", // 分类编码
  };
};
const columnTypeMap = [
  {
    prop: "friendlinktypeId",
    label: "ID",
  },
  {
    prop: "typeName",
    label: "分类名称",
  },
  {
    prop: "typeNumber",
    label: "分类编码",
  },
];
const columnsMap = [
  {
    prop: "typeId",
    label: "分类管理",
  },
  {
    prop: "name",
    label: "网站名称",
  },
  {
    prop: "url",
    label: "网站地址",
  },
  {
    prop: "withLogo",
    label: "图片logo",
  },
  {
    prop: "recommend",
    label: "推荐",
    type: "dict",
  },
  {
    prop: "status",
    label: "状态",
    type: "dict",
  },
];

const initSearchForm = () => {
  return {};
};

const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  typeId: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  typeName: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  typeNumber: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
};

const selfRules = {
  ...rules,
};

export {
  dictsMap,
  columnsMap,
  initForm,
  initSearchForm,
  rules,
  selfRules,
  columnTypeMap,
  initTypeForm,
};
