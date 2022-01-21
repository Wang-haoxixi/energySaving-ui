export default [
  {
    path: "user",
    name: "用户搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/User.vue"),
  },
  {
    path: "org",
    name: "组织搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Org.vue"),
  },
  {
    path: "topic",
    name: "话题搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Topic.vue"),
  },
  {
    path: "article",
    name: "专栏搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Article.vue"),
  },
  {
    path: "task",
    name: "任务搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Task.vue"),
  },
  {
    path: "product",
    name: "魔方搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Product.vue"),
  },
  {
    path: "activity",
    name: "活动搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Activity.vue"),
  },
  {
    path: "questionnaire",
    name: "问卷搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Questionnaire.vue"),
  },
  {
    path: "recruit",
    name: "能聘搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Recruit.vue"),
  },
  {
    path: "exam",
    name: "考试搜索",
    component: () => import("@/views/channel/GlobalSearch/Components/Exam.vue"),
  },
];
