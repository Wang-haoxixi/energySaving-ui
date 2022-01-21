const columnsMap = [
  {
    prop: "id",
    label: "序号",
    width: "80px",
  },
  {
    prop: "code",
    label: "字典编码",
  },
  {
    prop: "name",
    label: "字典名称",
  },
  {
    prop: "createTime",
    label: "创建时间",
  },
  {
    prop: "updateTime",
    label: "更新时间",
  },
];

const _initRow = (id: any) => {
  return {
    dictId: id,
    parentId: null,
    id: null,
    sort: 1,
    label: "",
    value: "",
  };
};

const initForm = () => {
  return {
    code: "",
    createTime: "",
    id: "",
    name: "",
    updateTime: "",
  };
};

const initSearchForm = () => {
  return {
    code: "",
    name: "",
    system: "",
  };
};

export { columnsMap, initForm, _initRow, initSearchForm };
