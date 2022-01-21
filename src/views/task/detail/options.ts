export const urgency = {
  0: "一般",
  1: "紧急",
  2: "非常紧急"
};

// 重复任务
export const repeatList = {
  1: "每日重复",
  2: "每周重复",
  3: "每月重复",
  4: "自定义重复"
};

// 0：材料、1：问卷、2：活动、3：纪要
export const relationType = {
  0: "material",
  1: "questionnaire",
  2: "activity",
  3: "summary"
};

export const taskState = {
  0: {
    icon: "el-icon-woneng-gengduoshixin",
    color: "green",
    name: "进行中"
  },
  1: {
    icon: "el-icon-woneng-chenggong2shixin",
    color: "blue",
    name: "已完成"
  },
  2: {
    icon: "el-icon-woneng-guanbihuozheshibaishixin",
    color: "gray",
    name: "已关闭"
  }
};

export const routeList = {
  material: "/my/index/material/",
  summary: "/mlms/summary_detail/",
  questionnaire: "/questionnaire_edit/",
  activity: "/channel/activity/detail/"
};

export const rewardTips = {
  1: {
    name: "手动分配",
    tip:
      "由任务发布人在确认任务完成时，对符合任务要求的任务协作人进行手动分配，分配对象及贝额均由任务发布人自行决定。<br/>请注意：<br/>手动分配的奖励模式，可能存在任务协作人完成任务却没有收到奖励的情况，若您对此情况或对收到的奖励贝额存在异议，建议直接与任务发布人联系。"
  },
  2: {
    name: "自动分配",
    tip:
      "1.由任务发布人在确认任务完成时，将预先冻结的奖励宝贝，由系统自动平均分配给已完成任务的任务协作人；<br/>2.若经系统计算，人均可被分配的贝额<0.01贝，则任务协作人均无任务奖励。"
  }
};
