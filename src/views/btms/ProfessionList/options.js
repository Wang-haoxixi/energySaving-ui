const dictsMap = {
  type: {
    1: "一级",
    2: "二级",
  },
};

const initForm = () => {
  return {
    name: "",
    type: "1",
    introduction: "",
    parentId: "",
    spell: "",
    sort: "",
    rep: "",
  };
};
const columnsMap = [
  {
    prop: "id",
    label: "ID",
  },
  {
    prop: "name",
    label: "专业名称",
  },
  {
    prop: "type",
    label: "等级",
    type: "dict",
  },
];
const columnsSonMap = [
  {
    prop: "id",
    label: "ID",
  },
  {
    prop: "name",
    label: "专业名称",
  },
  {
    prop: "type",
    label: "等级",
    type: "dict",
  },
];

const rules = {
  name: [
    {
      required: true,
      message: "请输入专业名称",
      trigger: "blur",
    },
  ],
};

export { dictsMap, columnsSonMap, columnsMap, initForm, rules };
