export const formOptions = [{
  label: "投诉人",
  value: "realName",
}, {
  label: "投诉时间",
  value: "createTime",
}, {
  label: "分类内容",
  value: "tipOffType",
  type: "dict",
}, {
  label: "投诉类型",
  value: "tipOffReason",
  type: "dict",
}, {
  label: "详细说明",
  value: "tipOffReasonDetails",
}];

/**
 * type 1 = 去处理，跳转到相应的管理页面
 *      2 = 下架/屏蔽/锁定/解散，进行相应的请求
 *      3 = 其他类型
 */
export const detailTypeList = {
  // 说说
  0: {
    component: "ThoughtTpl",
    voName: "thoughtsVO",
    buttonList: [{
      type: 2,
      name: "下架",
      tips: "是否确认下架这条说说？",
      success: "下架说说成功！",
      requestFn: "lowerShelfById",
    }],
  },
  // 说说评论
  1: {
    component: "CommentTpl",
    voName: "thoughtsCommentVO",
    buttonList: [{
      type: 2,
      name: "屏蔽",
      tips: "是否确认屏蔽这条评论？",
      success: "屏蔽评论成功！",
      requestFn: "thoughtCommentShield",
    }],
  },
  // 说说评论的回复
  2: {
    component: "ReplyTpl",
    voName: "thoughtsReplyVO",
    buttonList: [{
      type: 2,
      name: "屏蔽",
      tips: "是否确认屏蔽这条回复？",
      success: "屏蔽回复成功！",
      requestFn: "thoughtReplyShield",
    }],
  },
  // 任务
  3: {
    component: "TaskTpl",
    voName: "cooperationTaskDetailsVO",
    buttonList: [{
      type: 3,
      name: "下架",
      fn: "OffTheShelfTask",
    }],
  },
  // SO
  4: {
    component: "SoTpl",
    voName: "sysOrg",
    buttonList: [{
      type: 1,
      name: "去处理",
      url: "/operate/org/detail/",
      params: "tipOffContentId",
      // }, {
      //   type: 2,
      //   name: "解散",
      //   tips: "是否确认解散这个so？",
      //   success: "解散so成功",
      //   requestFn: "materialReportHandling",
    }],
  },
  // 任务评论
  5: {
    component: "TaskComment",
    voName: "cooperationUserCommentVO",
    buttonList: [{
      type: 3,
      name: "下架",
      fn: "reportComment",
    }],
  },
  // 材料
  6: {
    component: "MaterialTpl",
    voName: "materialInfoVO",
    buttonList: [{
      type: 2,
      name: "下架",
      tips: "是否确认下架这条材料？",
      success: "下架材料成功！",
      requestFn: "materialReportHandling",
    }],
  },
  // 考试
  7: {
    component: "ExamTpl",
    voName: "examExaminationReportVO",
    buttonList: [{
      type: 2,
      name: "下架",
      tips: "是否确认下架这场考试？",
      success: "下架考试成功！",
      requestFn: "reportDealById",
    }],
  },
  8: {
    component: "noDataTpl",
    voName: "",
    buttonList: [],
  },
  9: {
    component: "noDataTpl",
    voName: "",
    buttonList: [],
  },
  // 用户
  10: {
    component: "UserTpl",
    voName: "userVO",
    buttonList: [{
      type: 1,
      name: "去处理",
      url: "/operate/user/detail/",
      params: "tipOffContentId",
    }, {
      type: 3,
      name: "锁定",
      fn: "lockUnlockUser",
    }],
  },
  // 活动
  11: {
    component: "ActivityTpl",
    voName: "conferenceActivityPublish",
    buttonList: [{
      type: 3,
      name: "下架",
      fn: "dismountPublish",
    }],
  },
  // 问卷
  12: {
    component: "QuestionTpl",
    voName: "quesQuestionnaireDTO",
    buttonList: [{
      type: 2,
      name: "下架",
      tips: "是否确认下架这篇问卷？",
      success: "下架问卷成功！",
      requestFn: "questionDismount",
    }],
  },
};
