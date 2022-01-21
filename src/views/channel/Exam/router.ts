export default [
  {
    path: "index",
    name: "考试首页",
    component: () => import("@/views/channel/Exam/index.vue"),
  },
  {
    path: "list/:type",
    name: "考试列表",
    component: () => import("@/views/channel/Exam/list.vue"),
  },
  {
    path: "study/:id",
    name: "学习资料_考试",
    component: () => import("@/views/channel/Exam/study.vue"),
    props: true,
  },
];
