import _ from "lodash";
import store from "@/store";

class CourseInfoVO {
  /**
   * 课程id
   */
  id = 0;
  /**
   * 课程名称
   */
  courseName = "";
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
  /**
   * 课程是否有练习
   */
  haveExercise = 0;
  /**
   * 关联的课程
   */
  relatedCourseList = [];
  /**
   * 学时
   */
  classCount = 0;
  /**
   * 学习人数
   */
  studyNumber = 0;
  /**
   * 如果有参与学习报名就有值
   */
  situationId = 0;
  /**
   * 当前负责人等级
   */
  rank = "1";
  /**
   * 已完成课时
   */
  studyClassCount = 0;
  /**
   * 总课时
   */
  allClassCount = 0;
  /**
   * 是否收藏
   */
  collect = false;
}

class LecturerCard {
  /**
   * 头像
   */
  avatar = "";
  /**
   * 职称
   */
  diplomacyTitle = "";
  /**
   * ID
   */
  id = 1;
  /**
   * 讲师姓名
   */
  lecturerName = "";
}

class CourseStudyInfoVO {
  courseName = "";
  lecturerId = 0;
  state = "";
  audit = "";
  situationId = 0;
  lecturerName = "";
}

const getDictGroupLevel = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dictGroup = store.state.common!.dictGroup;
  const level = _(dictGroup.get("course_level"))
    .keyBy("value")
    .mapValues("label")
    .value();
  return level;
};

const stateMap = {
  "0": {
    text: "未练习",
    value: 0
  },
  "1": {
    text: "练习中",
    value: 50
  },
  "2": {
    text: "已练习",
    value: 100
  }
};

const progressMap = {
  "1": {
    text: "未学习",
    value: 0
  },
  "2": {
    text: "学习中",
    value: 50
  },
  "3": {
    text: "已学习",
    value: 100
  }
};

export {
  CourseInfoVO,
  LecturerCard,
  CourseStudyInfoVO,
  stateMap,
  progressMap,
  getDictGroupLevel
};
