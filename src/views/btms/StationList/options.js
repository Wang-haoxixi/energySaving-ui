const dictsMap = {
  type: {
    1: "一级",
    2: "二级",
    3: "三级",
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
    label: "岗位名称",
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
    label: "岗位名称",
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
      message: "请输入岗位名称",
      trigger: "blur",
    },
  ],
};

export { dictsMap, columnsSonMap, columnsMap, initForm, rules };
