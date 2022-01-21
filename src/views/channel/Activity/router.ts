export default [
  {
    path: "index",
    name: "活动大厅",
    component: () => import("@/views/channel/Activity/index.vue"),
  },
  {
    path: "list",
    name: "活动列表",
    component: () => import("@/views/channel/Activity/List.vue"),
  },
  {
    path: "detail/:id",
    name: "活动详情",
    component: () => import("@/views/channel/Activity/Detail.vue"),
  },
  // {
  //   path: "order/:id",
  //   name: "活动订单信息",
  //   component: () => import("@/views/channel/Activity/Order.vue"),
  // },
  {
    path: "tag",
    name: "活动标签",
    component: () => import("@/views/channel/Activity/Tag.vue"),
  },
];
