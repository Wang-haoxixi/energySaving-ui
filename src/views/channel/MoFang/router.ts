export default [
  {
    path: "index",
    name: "魔方首页",
    component: () => import("@/views/channel/MoFang/index.vue"),
  },
  {
    path: "list",
    name: "魔方列表",
    component: () => import("@/views/channel/MoFang/list.vue"),
  },
  {
    path: "detail/:id",
    name: "魔方详情",
    component: () => import("@/views/channel/MoFang/detail.vue"),
    props: true,
  },
];
