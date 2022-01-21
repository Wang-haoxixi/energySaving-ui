const columnsMap = [
  {
    prop: "name",
    label: "客户名称",
    type: "slot",
    minWidth: 180,
  },
  {
    prop: "area",
    label: "区域类型",
    type: "slot",
  },
  {
    prop: "linkName",
    label: "联系人",
  },
  {
    prop: "job",
    label: "职位",
  },
  {
    prop: "followUpStatus",
    label: "跟进状态",
  },
  {
    prop: "followUpTime",
    label: "跟进时间",
    type: "date",
    formatString: "YYYY-MM-DD",
    width: "180px",
  },
];
const columnsAllMap = [
  {
    prop: "name",
    label: "客户名称",
    type: "slot",
  },
  {
    prop: "area",
    label: "区域类型",
    type: "slot",
  },
  {
    prop: "cityCodes",
    label: "地址",
    type: "slot",
  },
  {
    prop: "manager",
    label: "市场经理",
  },
];
const initForm = () => {
  return {
    clientId: "",
    orgId: "",
    name: "", //客户名称
    simpleName: "", //客户简称
    elderOrgName: "", //机构原名
    clientTypeKey: [], //客户类型
    function: "", //职能
    area: "", // 区域类型
    relation: "", //客户关系
    website: "", //客户官网
    address: "", //单位地址
    remark: "", //其他说明
    tags: [],
    tagKeywords: [], //标签集合
    clientAbrName: "", //客户简称
    industryCode: [],
    type: "",
    cityCode: [],
    resourceFrom: "",
  };
};
const rules = {
  name: [{ required: true, message: "请输入", trigger: "blur" }],
};
const initSearchForm = () => {
  return {
    name: "",
    area: "",
  };
};

export { columnsMap, columnsAllMap, initForm, initSearchForm, rules };
