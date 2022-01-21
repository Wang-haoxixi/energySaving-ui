const dictsMap = {
  status: {
    0: "禁用",
    1: "正常",
  },
};

const initForm = () => {
  return {
    title: "", //专题名称
    specialId: "",
    description: "", //描述
    relations: "",
    articleIds: [], //选择文章
  };
};
const columnsMap = [
  {
    prop: "specialId",
    label: "专题id",
  },
  {
    prop: "title",
    label: "专题名称",
  },
];

const initSearchForm = () => {
  return {};
};

const rules = {
  title: [
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

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules };
