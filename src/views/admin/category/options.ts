const columnsMap = [
  {
    prop: "id",
    label: "ID",
    width: "200px",
  },
  {
    prop: "name",
    label: "类型名称",
  },
  {
    prop: "number",
    label: "类型编码",
  },
  {
    prop: "sort",
    label: "排序",
    width: "100px",
  },
];

const initForm = (parentId = -1) => {
  return {
    id: 0, // ID
    parentId, // 父ID
    categoryId: 0, // ID
    name: "", // 类型名称
    number: "", // 类型编码
    sort: 0, // 排序
  };
};

export { columnsMap, initForm };

