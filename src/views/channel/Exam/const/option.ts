export const dictsMap = {
  level: {
    SIMPLE: "简单",
    GENERAL: '较难',
    DIFFICULT: "很难",
  },
  testStatus: {
    "1": "可参加",
    "2": "未开始",
    "3": "已参加",
  },
  chargeStatus: {
    "1": "免费",
    "2": "只收一次",
    "3": "重复收费",
  }, beginStatus: {
    1: "可参加 ",
    2: '未开始',
    3: "已参与",
  },
};
export function initSearchForm() {
  return {
    qType: "",
    examName: "",
    type: null,//分类(练习分类)
    level: null,//难度级别(1：简单2：较难：3：很难)
    testStatus: null,//练习状态 (1：可参加2：未开始3：已参加)
    chargeStatus: null,//收费状态 (1：免费2：收费)
  };
};
