export const dictsMap = {
  payObject: {
    0: "超级账户",
    1: "平台",
    2: "联盟",
    3: "组织",
    4: "个人",
  },
  isFirstReward: {
    0: "否",
    1: "是",
  },
};

export class RuleDTO {
  ruleId = 0;
  ruleName = "";
  number = "";// 编码
  score = 0;
  dailyLimit = 0;
  type = "1";
  action = "1";
  remarks = "";
  payObject = "0"; // 支付对象 0超级账户，1平台，2联盟，3组织，4个人
  isFirstReward = "0"; // 是否首次奖励 0 = 否
}
export const rules = {
  ruleName: [
    { required: true, message: "请输入规则名称", trigger: "blur" },
  ],
  number: [
    { required: true, message: "请输入规则编码", trigger: "blur" },
  ],
};
