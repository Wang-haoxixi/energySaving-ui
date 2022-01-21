export const formInit = () => {
  return {
    id: "",
    tag: [], // 标签
    name: "", // 问卷名称
    remarks: "", // 问卷描述
    scope: 2, // 问卷范围
    openAward: 1, // 答卷宝贝奖励
    timeSetting: 2, // 时间设置
    startTime: "", // 开始时间
    endTime: "", // 结束时间
    awardNumber: 0, // 贝
    awardScope: 0, // 奖励范围
    // awardTotal: 0,
    timeRange: [],
    isLogic: 0,
    isMobile: 0,
    mobileList: [],
    mobileListText: ""
  };
};
