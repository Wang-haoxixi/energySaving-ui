
export const dictsMap = {
  projectStatus: {
    "1": "待提交",
    "2": "待审核",
    "3": "已立项",
    "4": "审核未通过",
    "5": "锁定",
  },
  projectStage: [
    { value: 1, label: "阶段一" },
    { value: 2, label: "阶段二" },
  ],
};

export const columnsMap = [
  {
    prop: "projectName",
    label: "项目名称",
    type: "slot",
  },
  {
    prop: "projectBudget",
    label: "成本预算",
    width: "130",
  },
  {
    prop: "applicantName",
    label: "申请人",
    width: "120",
  },
  {
    prop: "approverName",
    label: "审批人",
    width: "120",
  },
  {
    prop: "projectTime",
    label: "立项时间",
    type: "slot",
    width: "120",
  },
  {
    prop: "projectStatus",
    label: "审批状态",
    type: "dict",
    width: "120",
  },
];
export const initSearchForm = () => {
  return {
    projectName: "",//项目名称
    projectStatus: "",//审批状态
  };
};
