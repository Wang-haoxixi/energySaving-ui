
export const dictMap = {
  signStatus: {
    0: "待提交",
    1: "待签订",
    2: "已签订",
    3: "签订失败",
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
    prop: "orgName",
    label: "签订组织",
  },
  {
    prop: "amount",
    label: "项目金额",
    width: "130",
  },
  {
    prop: "signingTime",
    label: "签订时间",
    type: "slot",
    width: "120",
  },
  {
    prop: "signStatus",
    label: "签订状态",
    type: "dict",
    width: "120",
  },
];
export const initSearchForm = () => {
  return {
    projectName: "",//项目名称
    signStatus: 0,//审批状态
  };
};
export function initFormData(obj: any) {
  const name = obj ? obj.realName : "";
  const id = obj ? obj.userId : "";
  const orgId = obj ? obj.orgId : "";
  return {
    projectId: "",
    projectName: "",
    orgId,//委托组织（甲方）
    partyAuserName: {
      id,
      name,
    },//甲方代表
    carryonOrg: "",//承接组织（乙方）
    partyBuserName: {},//乙方代表
    contents: "",//项目内容
    amount: "",//合同金额
    costItem: "",//费用项
    payment: "",//付款方式
    partyArate: "",//甲方利率
    partyBrate: "",//乙方利率
    footnote: "",//补充说明
  };
}

export const rules = {
  projectId: [
    { required: true, message: "请输入项目名称", trigger: "change" },
  ],
  orgId: [
    { required: true, message: "请输入委托组织（甲方）", trigger: "change" },
  ],
  partyAuser: [
    { required: true, message: "请输入甲方代表", trigger: "change" },
  ],
  carryonOrg: [
    { required: true, message: "请输入承接组织（乙方）", trigger: "change" },
  ],
  partyBuserName: [
    { required: true, message: "请输入乙方代表", trigger: "change" },
  ],
  contents: [
    { required: true, message: "请输入项目内容", trigger: "change" },
  ],
  amount: [
    { required: true, message: "请输入合同金额", trigger: "change" },
  ],
  costItem: [
    { required: true, message: "请输入费用项", trigger: "change" },
  ],
  payment: [
    { required: true, message: "请输入付款方式", trigger: "change" },
  ],
  partyArate: [
    { required: true, message: "请输入甲方利率", trigger: "change" },
  ],
  partyBrate: [
    { required: true, message: "请输入乙方利率", trigger: "change" },
  ],
  footnote: [
    { required: true, message: "请输入补充说明", trigger: "change" },
  ],
};