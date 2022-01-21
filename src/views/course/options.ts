// 1 是课件 2 是课程
enum CourseCategory {
  COURSEWARE = 1,
  INFO = 2
}

const courseCategoryTextMap = {
  [CourseCategory.INFO]: '课程',
  [CourseCategory.COURSEWARE]: '课件',
};

export { CourseCategory, courseCategoryTextMap };
