import { dictsMap as commonDictsMap } from '@/util/common';
export const tabList = [
  {
    label: "职位申请",
    value: "position",
    type: '0',
  }, {
    label: "合伙人申请",
    value: "partner",
    type: '1',
  },
];

export const initSearchForm = () => {
  return {
    name: "",
  };
};

// 职位申请table
export const positionTableColumns = [
  {
    prop: "realName",
    label: "姓名",
    type: "slot",
  },
  {
    prop: "matchingDegree",
    label: "匹配度",
    type: "slot",
    width: "100px",
  },
  {
    prop: "redness",
    label: "红度等级",
    width: "100px",
  },
  {
    prop: "sex",
    label: "性别",
    type: "dict",
    width: "100px",
  },
  {
    prop: "name",
    label: "申请岗位",
    type: "slot",
  },
  {
    prop: "applyTime",
    label: "申请时间",
    type: "date",
    formatString: "YYYY-MM-DD HH:mm",
  },
  {
    prop: "isCheck",
    label: "状态",
    type: "slot",
    width: "100px",
  },
];

// 合伙人申请table
export const partnerTableColumns = [
  {
    prop: "realName",
    label: "姓名",
    type: "slot",
  },
  {
    prop: "redness",
    label: "红度等级",
    width: "100px",
  },
  {
    prop: "sex",
    label: "性别",
    type: "dict",
    width: "100px",
  },
  {
    prop: "name",
    label: "合伙项目名称",
  },
  {
    prop: "applyTime",
    label: "申请日期",
    type: "date",
    formatString: "YYYY-MM-DD HH:mm",
  },
  {
    prop: "isCheck",
    label: "状态",
    type: "slot",
    width: "100px",
  },
];

export const dictsMap = {
  isCheck: {
    0: "未查看",
    1: "已查看",
  },
  sex: commonDictsMap.sex,
};

export const initInfoForm = () => {
  return {
    type: "",
    name: "",
    industry: "",
    position: "",
    city: "",
    mobile: "",
    ability: "",
    describe: "",
  };
};
