import { mergeByFirst } from "@/util/util";
const dictsMap = {
  isForbidden: {
    0: "启用",
    1: "禁用",
  },
  claimStatus: {
    0: "未认证",
    1: "认证",
  },
  type: {
    1: "政府",
    2: "园区",
    3: "协会",
    4: "企业",
    5: "学术机构",
    6: "培训机构",
    7: "会议场所",
    8: "非政府组织",
    9: "媒体",
    10: "其它",
  },
  level: {
    1: "国家级",
    2: "省级",
    3: "市级",
    4: "区级（县级）",
  },
};

const initForm = () => {
  return {
    current: "",
    address: "",
    applyTime: "",
    applyUserId: 0,
    city: "",
    claimStatus: "",
    createTime: "",
    creditCode: "",
    delFlag: "",
    email: "",
    establishedTime: "",
    fax: "",
    firstSpell: "",
    introduction: "",
    isForbidden: "",
    level: "",
    licence: "",
    line: "",
    link: "",
    logo: "",
    orgAbrName: "",
    orgId: 0,
    orgName: "",
    orgUrl: "",
    phone: "",
    province: "",
    type: "",
    updateTime: "",
  };
};
const columnsMap = [
  {
    prop: "provinceName",
    label: "所属省",
    width: "100px",
  },
  {
    prop: "isForbidden",
    label: "状态",
    type: "dict",
  },
];
const columnsPendingMap = [
  {
    prop: "orgName",
    label: "机构名称",
  },
  {
    prop: "type",
    label: "机构分类",
  },
  {
    prop: "line",
    label: "行业",
  },
  {
    prop: "applyUserName",
    label: "申请对象",
  },
  {
    prop: "applyTime",
    label: "申请时间",
  },
  {
    prop: "provinceName",
    label: "所属省",
    width: "100px",
  },
];
const formToDto = row => {
  const newForm = mergeByFirst(initForm(), row);
  newForm.province = row.current[0];
  newForm.city = row.current[1];
  return newForm;
};
const initSearchForm = () => {
  return {
    type: "",
    province: "",
    city: null,
    line: "",
    claimStatus: "",
    isForbidden: "",
    applyUserId: "",
    currentParmas: "",
  };
};

const rules = {
  orgName: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
};

export {
  dictsMap,
  formToDto,
  columnsPendingMap,
  columnsMap,
  initForm,
  initSearchForm,
  rules,
};
