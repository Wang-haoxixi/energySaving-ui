const dictsMap = {
  relationState: {
    "0": "否",
    "1": "是",
  },
};

const personColumnsMap = [
  {
    label: "证书名称",
    prop: "title",
  },
  {
    label: "关联考试",
    prop: "examName",
  },
  {
    label: "姓名",
    prop: "username",
  },
  {
    label: "获证时间",
    prop: "validTime",
  },
  {
    label: "证书编号",
    prop: "number",
  },
];

const columnsMap = [
  {
    label: "证书名称",
    prop: "title",
    width: 300,
  },
  {
    label: "证书级别",
    prop: "level",
    type: "dictGroup",
    dictName: "exam_certificate_level",
    width: 120,
  },
  {
    label: "有效期",
    prop: "validityPeriod",
    type: "dictGroup",
    dictName: "exam_validity_period",
    width: 120,
  },
  {
    label: "颁发机构",
    prop: "awardingOrg",
    width: 150,
  },
  {
    label: "关联考试",
    prop: "relationState",
    type: "slot",
  },
  {
    label: "获证人数",
    prop: "holders",
  },
  {
    label: "证书预览图",
    prop: "previewPic",
    type: "slot",
    width: "180px",
  },
  {
    label: "是否生成预览图",
    prop: "isPreview",
    type: "slot",
    width: "150px",
  },
];


export {
  columnsMap,
  dictsMap,
  personColumnsMap,
};
