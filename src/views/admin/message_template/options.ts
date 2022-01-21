const columnsMap = [
  {
    prop: "id",
    label: "ID",
    width: "200px",
  },
  {
    prop: "name",
    label: "消息模板名称",
  },
  {
    prop: "number",
    label: "消息模板编码",
  },
];

const initForm = () => {
  return {
    id: 0, // 系统消息ID
    icon: "", // 系统消息模板图标
    title: "", // 系统消息模板标题
    template: "", // 系统消息模板内容
    categoryId: 0,// 分类ID
  };
};

export { columnsMap, initForm };

