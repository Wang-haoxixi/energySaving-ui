export const tableOption = [{
  label: "合伙人类型",
  prop: "partnersType",
  type: "dictGroup",
  dictName: "recruit_partners_type",
}, {
  label: "合伙主体",
  prop: "type",
  type: "dict",
}, {
  label: "姓名/组织",
  prop: "orgName",
}, {
  label: "联系方式",
  prop: "mobile",
}, {
  label: "所属地区",
  prop: "city",
}, {
  label: "所属行业",
  prop: "industry",
}, {
  label: "提交人",
  prop: "createByName",
}];

// 状态（0:待处理;1:已接受;2:已拒绝）
export const dictsMap = {
  type: {
    "user": "个人",
    "so": "组织",
  },
};

export const initSearchForm = () => {
  return {
    recruitName: "",
    state: "",
  };
};
