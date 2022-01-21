export const dictsMap = {
  // 合同类型
  sortBy: {
    // "1": "按宝贝奖励金额从高到低排序",
    // "2": "按宝贝奖励金额从低到高排序",
    "3": "按截止日期从早到晚排序",
    "4": "按截止日期从晚到早排序"
  },
  status: {
    "1": "进行中",
    "2": "草稿",
    "3": "已结束",
    "4": "审核中",
    "5": "未通过",
    "6": "未开始"
  },
  status1: {
    "1": "进行中",
    "3": "已结束",
    "6": "未开始"
  },
  openAward: {
    "1": "否",
    "2": "是"
  },
  participate: {
    "1": "未参与",
    "2": "已参与"
  }
};
export function initSearchForm() {
  return {
    name: "",
    status: "",
    tagName: "",
    participate: "",
    openAward: "",
    sortBy: ""
  };
}
