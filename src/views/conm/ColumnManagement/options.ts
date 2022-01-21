import { mergeByFirst } from "@/util/util";
const dictsMap = {
  status: {
    0: "停用",
    1: "启用",
  },
};

const initForm = () => {
  return {
    parentId: "",
    nodeDescribe: "",
    // modelId: '',
    nodeNumber: "",
    nodeName: "",
    status: 1,
    tagKeyWords: [],
    parentName: '',
  };
};
const toNewParentForm = (row: any) => {
  return mergeByFirst(initForm(), {
    parentId: row.id || 0,
    parentName: row.name || "无",
  });
};
const toDtoForm = (row: any) => {
  const newForm = { ...row };
  newForm.type = newForm.type[1];
  newForm.parentType = newForm.type[0];
  return newForm;
};
const initMergeForm = () => {
  return {
    delete: "",
    oldOrNew: "",
  };
};
const columnsMap = [
  {
    prop: "nodeName",
    label: "栏目名称",
  },
  {
    prop: "nodeNumber",
    label: "栏目编码",
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
  nodeName: [
    {
      required: true,
      message: "请输入栏目名称",
      trigger: "blur",
    },
  ],
  nodeNumber: [
    {
      required: true,
      message: "请输入栏目名称",
      trigger: "blur",
    },
  ],
};

export {
  dictsMap,
  columnsMap,
  initForm,
  initMergeForm,
  toNewParentForm,
  toDtoForm,
  initSearchForm,
  rules,
};
