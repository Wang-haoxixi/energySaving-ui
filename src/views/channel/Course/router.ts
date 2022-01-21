export default [
  {
    path: "index",
    name: "课程考试首页",
    component: () => import("@/views/channel/Course/index.vue"),
  },
  {
    path: "list",
    name: "课程考试列表",
    component: () => import("@/views/channel/Course/list.vue"),
  },
  {
    path: "detail/:id",
    name: "课程详情",
    component: () => import("@/views/channel/Course/detail.vue"),
    props: true,
  },
  {
    path: "study/:id",
    name: "学习详情",
    component: () => import("@/views/channel/Course/study.vue"),
    props: true,
  },
];
