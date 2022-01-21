const columnsMap = [
  {
    prop: "name",
    label: "问卷名称",
  },
  {
    prop: "scope",
    label: "问卷范围",
    type: "slot",
    width: 120,
  },
  {
    prop: "status",
    label: "问卷状态",
    type: "slot",
    width: 120,
  },
  {
    prop: "userName",
    label: "创建人",
    width: 120,
  },
  {
    prop: "startTime",
    label: "开始时间",
    type: "slot",
    width: 150,
  },
  {
    prop: "endTime",
    label: "结束时间",
    type: "slot",
    width: 150,
  },
  {
    prop: "joinPeople",
    label: "填报人数",
    type: "slot",
    width: 120,
  },
];

export { columnsMap };
