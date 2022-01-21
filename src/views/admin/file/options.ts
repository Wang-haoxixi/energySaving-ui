const columnsMap = [
  {
    label: "编号",
    prop: "id",
    hide: true,
  },
  {
    label: "空间",
    prop: "bucketName",
  },
  {
    label: "文件名",
    prop: "fileName",
  },
  {
    label: "原文件名",
    prop: "original",
  },
  {
    label: "文件类型",
    prop: "type",
  },
  {
    label: "文件大小",
    prop: "fileSize",
  },
  {
    label: "上传人",
    prop: "createUser",
  },
  {
    width: 180,
    label: "创建时间",
    prop: "createTime",
    type: "datetime",
    format: "yyyy-MM-dd HH:mm",
    valueFormat: "yyyy-MM-dd HH:mm:ss",
    editDisabled: true,
    addDisplay: false,
    span: 24,
  },
];
export { columnsMap };
