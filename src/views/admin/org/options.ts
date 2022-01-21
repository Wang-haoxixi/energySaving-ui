const initForm = () => {
  return {
    avatar: "",
    name: "",
  };
};
const columnsMap = [
  {
    prop: "orgId",
    label: "ID",
    width: "100px",
  },
  {
    prop: "name",
    label: "组织",
    type: "slot",
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
export { columnsMap, initForm };
