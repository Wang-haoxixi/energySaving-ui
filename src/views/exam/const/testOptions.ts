import { dictsMap as examDictsMap } from "@/views/exam/options";

const dictsMap = {
  level: {
    "1": "简单",
    "2": "较难",
    "3": "很难"
  },
  type: {
    "1": "单选题",
    "2": "多选题",
    "3": "判断题"
  },
  state: examDictsMap.state,
  audit: examDictsMap.audit,
  openScope: examDictsMap.openScope,
  beginStatus: {
    1: "进行中",
    2: "未开始",
    3: "已结束"
  },
  isRecommend: {
    "1": "已推荐",
    "0": "未推荐"
  }
};
const columnsManageMap = [
  {
    label: "姓名",
    prop: "username"
  },
  {
    label: "系统判分题得分",
    prop: "sysScore"
  },
  {
    label: "问答题得分",
    prop: "correctScore"
  },
  {
    label: "答题时间",
    prop: "createTime"
  },
  {
    label: "交卷时间",
    prop: "commitTime"
  },
  {
    label: "答题时长",
    prop: "alreadyAnswerTime"
  },
  {
    label: "分数",
    prop: "score"
  },
  {
    label: "成绩状态",
    prop: "result"
  }
];
const columnsMap = [
  {
    label: "考试名称",
    prop: "examName",
    width: 300
  },
  {
    label: "开始时间",
    prop: "beginTime",
    width: 170
  },
  {
    label: "结束时间",
    prop: "endTime",
    width: 170
  },
  {
    label: "已考人数",
    prop: "testNumber",
    width: 120
  },
  {
    label: "创建者",
    prop: "createByName",
    width: 120
  },
  {
    label: "创建时间",
    prop: "createTime",
    type: "slot",
    width: 150
  },
  {
    label: "考试状态",
    prop: "state",
    type: "slot"
  },
  {
    label: "审核状态",
    prop: "audit",
    type: "slot"
  }
];

const initForm = () => {
  return {
    testPaperId: "",
    choiceNum: "",
    score: "",
    kind: "",
    examName: "",
    level: "",
    answerTime: "",
    passScore: "",
    goodScore: "",
    examExplain: "",
    timeSelect: "1",
    beginTime: "",
    endTime: "",
    openScope: "1",
    releaseDirectory: "",
    chargeStatus: "1",
    consume: "",
    rewardStatus: "1",
    reward: 1,
    rewardScope: 100,
    rewardConsume: 100,
    state: "1"
  };
};

const columnsPracticeMap = [
  {
    label: "练习名称",
    prop: "examName",
    width: 300
  },
  {
    label: "开始时间",
    prop: "beginTime",
    type: "slot",
    width: 170
  },
  {
    label: "结束时间",
    prop: "endTime",
    type: "slot",
    width: 170
  },
  {
    label: "已考人数",
    prop: "testNumber",
    width: 120
  },
  {
    label: "创建者",
    prop: "createByName",
    width: 120
  },
  {
    label: "创建时间",
    prop: "createTime",
    type: "slot",
    width: 150
  },
  {
    label: "练习状态",
    prop: "state",
    type: "slot"
  },
  {
    label: "审核状态",
    prop: "audit",
    type: "slot"
  }
];

const columnsOperationMap = [
  {
    label: "考试名称",
    prop: "examName",
    width: 300
  },
  {
    label: "所属组织",
    prop: "orgName",
    width: 200
  },
  {
    label: "开放范围",
    prop: "openScope",
    width: 120,
    type: "slot"
  },
  {
    label: "考试状态",
    prop: "beginStatus",
    width: 120,
    type: "slot"
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 150,
    type: "slot"
  },
  {
    label: "创建者",
    prop: "createByName",
    width: 120
  },
  {
    label: "审核状态",
    prop: "audit",
    type: "slot"
  },
  {
    label: "推荐状态",
    prop: "isRecommend",
    type: "slot"
  }
];

const initSearchForm = () => {
  return {
    name: "",
    type: "",
    creatorName: "",
    certificationStatus: ""
  };
};

export {
  initSearchForm,
  columnsMap,
  initForm,
  dictsMap,
  columnsManageMap,
  columnsPracticeMap,
  columnsOperationMap
};
