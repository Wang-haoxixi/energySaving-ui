import { dictsMap, columnsCommon, columnsAfter } from "../options";

const columnsListMap = [
  ...columnsCommon,
  {
    prop: "auditStatus",
    label: "审核状态",
    type: "slot",
    width: 100
  },
  ...columnsAfter
];
const rules = {
  name: [{ required: true, message: "不能为空", trigger: "blur" }],
  phone: [{ required: true, message: "不能为空", trigger: "blur" }],
  email: [{ required: true, message: "不能为空", trigger: "blur" }],
  company: [{ required: true, message: "不能为空", trigger: "blur" }],
  position: [{ required: true, message: "不能为空", trigger: "blur" }]
};
const personnelOptions = [
  {
    prop: "user",
    label: "用户",
    type: "slot",
    width: 200
  },
  {
    prop: "signUp",
    label: "报名信息",
    type: "slot",
    width: 100
  },
  {
    prop: "createTime",
    label: "报名时间",
    width: 180,
    type: "slot"
  },
  {
    prop: "ticketingName",
    label: "票名"
  },
  {
    prop: "orderNum",
    label: "购票数量"
  },
  {
    prop: "orderStatusName",
    label: "订单状态"
  },
  {
    prop: "applyStatusName",
    label: "报名状态"
  },
  {
    prop: "cancelNum",
    label: "核销状态"
  },
  {
    prop: "auditStatus",
    label: "审核状态",
    type: "dict"
  },
  {
    prop: "soRemarks",
    label: "批注",
    type: "slot"
  }
];

const dcitsMapPersonnel = {
  ...dictsMap,
  auditStatus: {
    0: "无需审核",
    1: "待审核",
    2: "通过",
    3: "未通过"
  }
};

export { dictsMap, dcitsMapPersonnel, personnelOptions, rules, columnsListMap };
