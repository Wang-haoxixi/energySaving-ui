const dictsMap = {
  status: {
    0: "禁用",
    1: "正常",
  },
};

const initForm = () => {
  return {
    id: "",
    title: "",
    createTime: "", //发布时间
    status: 1, //状态
    infoDescribe: "", //信息描述
    tagKeyWords: [],
    content: "",
    image: "",
    priority: 1, //优先级
    attributeId: 0,
    keyWords: "",
  };
};
const columnsMap = [
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
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: "blur",
    },
  ],
};

export { dictsMap, columnsMap, initForm, initSearchForm, rules };
