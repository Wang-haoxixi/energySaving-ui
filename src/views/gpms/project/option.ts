// import store from "@/store";
import { checkProjectName } from "@/api/gpms/index";
// const dictGroup: any = store.state.common;

export const dictMap = {
  projectStatus: {
    1: "待提交", 2: "待审核", 3: "已立项", 4: "审核未通过", 5: "锁定",
  },
  // projectStage: dictGroup.get("prms_project_stage"),
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
    prop: "projectAmount",
    label: "项目金额",
    type: "slot",
    width: "130",
  },
  {
    prop: "projectManagerName",
    label: "项目经理",
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
    label: "项目状态",
    type: "slot",
    width: "120",
  },
];

// const intValidate = (rule: any, value: any, callback: any) => {
//   if (/^[1-9]*[1-9][0-9]*$/.test(value) || value === "") {
//     callback();
//   } else {
//     callback(new Error());
//   }
// };
let timeout: any = null;
const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("项目名称不能为空"));
  }
  if (timeout !== null)
    clearTimeout(timeout);
  timeout = setTimeout(() => {
    checkProjectName({ projectName: value }).then((res: any) => {
      if (res.data === false) {
        return callback(new Error(res.message));
      }
      else {
        callback();
      }
    });
  }, 1000);
};

export const rules = {
  projectType: [
    { required: true, message: "请选择项目类型", trigger: "blur" },
  ],
  projectName: [
    { validator: checkName, required: true, trigger: "change" },
  ],
  // editProjectName: [
  //   { required: true, message: "请输入项目名称", trigger: "blur" },
  // ],
  projectTime: [
    { required: true, message: "请选择立项时间", trigger: "blur" },
  ],
  // relatedClient: [
  //   { required: true, message: "请输入相关客户", trigger: "change" },
  // ],
  // projectTagList: [
  //   { required: true, message: "请输入项目标签", trigger: "change" },
  // ],
  projectStage: [
    { required: true, message: "请选择项目阶段", trigger: "change" },
  ],
  projectBudgetRelationList: [
    { required: true, message: "请输入成本预算", trigger: "change" },
  ],
  // projectBudget: [
  //   { validator: intValidate, message: "请输入正整数", trigger: "change" },
  // ],
};

export function initFormData(obj: any) {
  const name = obj ? obj.realName : "";
  const id = obj ? obj.userId : "";
  return {
    projectTime: "",//立项时间
    projectStatus: "",//项目状态
    projectName: "", // 项目名称
    projectExplain: "",//项目说明
    projectType: "", // 项目类型
    projectLevel: "",//项目等级
    attendeeId: "",//委托组织
    relatedClient: 0, // 相关客户id
    clientName: "",//相关客户名称
    relatedClientList: {
      id: "",
      name: "",
    },
    contractList: [],//合同金额
    costTotal: 0, // 项目预算
    forecastProfits: 0, // 预估利润
    profit: 0,//利润率
    approvalTime: "",//立项时间
    applyTime: "",//审批时间
    endTime: "",
    projectManager: id,// 项目经理
    projectManagerName: name,// 项目经理
    projectManagerList: {
      id,
      name,
    },// 项目经理
    projectTagList: [], // 项目标签
    allTagList: [],//项目标签集合
    groupExternalCooperatePartner: "", // 集团外部合作伙伴
    groupExternalCooperatePartnerList: { id: "", name: "" },
    estimatedSignTime: "", // 预计签订时间
    projectBudgetRelationList: [
      { relationId: "", money: 0 },
    ],
    projectAmount: 0,
    projectStage: "",
    orgId: "",
    isClaim: 1,
    isOpen: 3,
    userType: [
      { dictId: "", teamUser: [] },
    ],
    recommendTagList: [],
  };
}

export const initSearchForm = () => {
  return {
    projectName: "",//项目名称
    orgId: "",//所属组织
    projectStage: [],//项目阶段
    projectLevel: [],//项目等级
    isRelevanceProduct: "",//是否项目关联
    manager: "",//项目经理
  };
};

export function initTransferForm() {
  return {
    name: "",
    projectManagerList: {
    },
    pubilsh: false,
  };
}
