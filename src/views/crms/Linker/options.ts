const columnsMap = [
  {
    prop: "name",
    label: "联系人姓名",
    type: "slot",
  },
  {
    prop: "dept",
    label: "处室/部门",
  },
  {
    prop: "position",
    label: "职务",
  },
  {
    prop: "cityCode",
    label: "住址",
    type: "slot",
  },
];
const initForm = () => {
  return {
    birthday: "",
    cityCode: [],
    clientId: "",
    contactId: 0,
    contactName: "",
    contractIds: [],
    dept: "",
    fax: "",
    mail: "",
    materialIds: [],
    mobile: "",
    position: "",
    productIds: [],
    projectIds: [],
    qq: "",
    remark: "",
    resourceFrom: "",
    sex: "",
    summaryIds: [],
    tagKeywords: [],
    telephone: "",
    weiXin: "",
    address: "",
  };
};
const rules = {
  clientId: [{ required: true, message: "请输入", trigger: "blur" }],
  contactName: [{ required: true, message: "请输入", trigger: "blur" }],
  mobile: [{ required: true, message: "请输入", trigger: "blur" }],
  dept: [{ required: true, message: "请输入", trigger: "blur" }],
  position: [{ required: true, message: "请输入", trigger: "blur" }],
  tagKeywords: [{ required: true, message: "请输入", trigger: "blur" }],
};
const initSearchForm = () => {
  return {
    name: "",
    area: "",
  };
};

export { columnsMap, initForm, initSearchForm, rules };
