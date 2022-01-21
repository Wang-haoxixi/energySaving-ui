import { dictsMap as examDictsMap } from "@/views/exam/options";

const dictsMap = {
  openScope: examDictsMap.openScope,
  state: examDictsMap.state,
  audit: examDictsMap.audit,
  isRecommend: { 1: "已推荐", 0: "未推荐" },
};

const chargeStatusDictList = [
  {
    label: "免费",
    value: "1",
  },
  {
    label: "收费",
    value: "2",
  },
];

const completeTypeDictList = [
  {
    label: "达到课程学时：学员达到学习时长",
    value: "1",
  },
  {
    label: "通过课程考试：学员达到学习时长，并通过课程考试",
    value: "2",
  },
];

const openScopeDictList = [
  {
    label: "组织内开放",
    value: "1",
  },
  {
    label: "生态开放",
    value: "2",
  },
];

class CourseDTO {
  /**
   * 课程id
   */
  id = 0;
  /**
   * 课程名称
   */
  courseName = "";
  /**
   * 课程分类
   */
  kind = "";
  /**
   * 标签
   */
  tagKeyWords = [];
  /**
   * 难度
   */
  level = "";
  /**
   * 课程封面
   */
  cover = "";
  /**
   * 关联 讲师ID 姓名
   */
  lecturerId = null;
  lecturerName = "";
  /**
   * 收费状态（ 1 免费 2 收费 3 重复收费 ）
   */
  chargeStatus = "1";
  /**
   * 宝贝原价
   */
  priceAmount = 0;
  /**
   * 现金原价
   */
  cashAmount = 0;
  /**
   * 宝贝折扣价
   */
  discountPrice = 0;
  /**
   * 现金折扣价
   */
  discountCash = 0;
  /**
   * 课程介绍
   */
  courseExplain = "";
  /**
   * 学分
   */
  credit = 0;
  /**
   * 课程关联的考试
   */
  examId = 0;
  examName = "";
  /**
   * 完成状态 1 达到课程学时：学员达到学习时长 2 通过课程考试：学员达到学习时长，并通过课程考试
   */
  completeType = "1";
  /**
   * 开放范围 1 组织内开放 2 生态开放
   */
  openScope = "1";
  /**
   * 发布目录
   */
  releaseDirectoryList = [];
  /**
   * 学习顺序 0 禁用 1 开启
   */
  learnOrder = "1";
  /**
   * 课程状态 0 禁用 1 启用
   */
  state = "1";
}

const rules = {
  courseName: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
  kind: [{ required: true, message: "请输入课程分类", trigger: "change" }],

  tagKeyWords: [
    {
      type: "array",
      min: 1,
      max: 5,
      message: "标签至少 1 个，最多 5 个",
      trigger: "change",
    },
    { type: "array", required: true, message: "请填写标签", trigger: "change" },
  ],
  level: [{ required: true, message: "请填写课程难度", trigger: "change" }],
  cover: [{ required: true, message: "请填写课程封面", trigger: "change" }],
  lecturerId: [
    { required: true, message: "请填写课程讲师", trigger: "change" },
  ],
  courseExplain: [
    { required: true, message: "请填写课程介绍", trigger: "blur" },
  ],
  releaseDirectoryList: [
    { required: true, message: "请输入生态目录", trigger: "change" },
  ],
  priceAmount: [
    { required: true, message: "请填写宝贝原价", trigger: "blur" },
    { type: "number", min: 0.01, message: "宝贝原价不能为0", trigger: "blur" },
  ],
  cashAmount: [
    { required: true, message: "请填写现金原价", trigger: "blur" },
    { type: "number", min: 0.01, message: "现金原价不能为0", trigger: "blur" },
  ],
};

class InfoSectionDTO {
  constructor(sectionShow = false) {
    this.sectionShow = sectionShow;
  }
  /**
   * 课件id
   */
  coursewareId = 0;
  /**
   * 课件名称
   */
  wareName = "";
  createBy = 0;
  exerciseId = 0;
  exerciseName = "";
  id = 0;
  /**
   * 课程id
   */
  infoId = 0;
  /**
   * 学习时长（分钟）
   */
  learnTime = 0;
  /**
   * 如果点击新增章节, 就是 true 添加大章节与小章节
   */
  sectionShow = false;
  /**
   * 章节名称
   */
  sectionName = "";
  /**
   * 章节
   */
  sectionNumber = 0;
  /**
   * 小章节名称
   */
  smallSectionName = "";
  /**
   * 小章节
   */
  smallSectionNumber = 0;
}

interface CourseInfoSection {
  children: InfoSectionDTO[];
  sectionName: string;
  sectionNumber: number;
}

const initSearchForm = () => {
  return {
    // 学习状态 【1未开始、2学习中、3学习完成】 course_progress
    kind: [],
    // 排序标识 ：【(学习)进度高到低】 1
    state: null,
  };
};

const initStudySearchForm = () => {
  return {
    progress: "",
    sort: "",
  };
};

const sectionRules = {
  sectionName: [
    {
      type: "string",
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  smallSectionName: [
    {
      type: "string",
      required: true,
      message: "必填项",
      trigger: "blur",
    },
  ],
  learnTime: [
    {
      type: "number",
      min: 1,
      max: 3000,
      message: "学习时长必须在 1 到 3000 分钟之间",
      trigger: "blur",
      required: true,
    },
  ],
  coursewareId: [
    {
      type: "number",
      min: 1,
      message: "请选择一个关联课件",
      trigger: "change",
      required: true,
    },
  ],
};

export {
  dictsMap,
  CourseDTO,
  chargeStatusDictList,
  completeTypeDictList,
  openScopeDictList,
  rules,
  CourseInfoSection,
  InfoSectionDTO,
  initSearchForm,
  sectionRules,
  initStudySearchForm,
};
