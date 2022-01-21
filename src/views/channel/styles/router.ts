export default [
  {
    path: "so/:id",
    name: "组织 风采页",
    redirect: "/channel/styles/so/:id/index",
    component: () => import("@/views/channel/styles/so/layout.vue"),
    children: [
      {
        path: "index",
        name: "主页-组织 风采页",
        component: () => import("@/views/channel/styles/so/index.vue")
      },
      {
        path: "member",
        name: "用户-组织 风采页",
        component: () => import("@/views/channel/styles/so/member.vue")
      },
      {
        path: "task",
        name: "任务-组织 风采页",
        component: () => import("@/views/channel/styles/so/tasks.vue")
      },
      {
        path: "ques",
        name: "问卷-组织 风采页",
        component: () => import("@/views/channel/styles/so/questionnaires.vue")
      },
      {
        path: "meeting",
        name: "活动-组织 风采页",
        component: () => import("@/views/channel/styles/so/meetings.vue")
      },
      {
        path: "products",
        name: "产品与服务-组织 风采页",
        component: () => import("@/views/channel/styles/so/products.vue")
      }
    ]
  },
  {
    path: "user/:id",
    name: "个人风采页",
    redirect: "/channel/styles/user/:id/index",
    component: () => import("@/views/channel/styles/user/layout.vue"),
    children: [
      {
        path: "index",
        name: "主页-个人风采页",
        component: () => import("@/views/channel/styles/user/index.vue")
      },
      {
        path: "fans",
        name: "粉丝-个人风采页",
        component: () => import("@/views/channel/styles/user/fans.vue")
      },
      {
        path: "attentions",
        name: "关注-个人风采页",
        component: () => import("@/views/channel/styles/user/attentions.vue")
      },
      {
        path: "thoughts",
        name: "说说-个人风采页",
        component: () => import("@/views/channel/styles/user/thoughts.vue")
      },
      {
        path: "material",
        name: "材料-个人风采页",
        component: () => import("@/views/channel/styles/user/material.vue")
      }
    ]
  }
];
