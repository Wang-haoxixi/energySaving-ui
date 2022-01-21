import { publishRouter } from "./dynamic/router";
export const indexRouter = [
  {
    path: "index",
    name: "个人中心",
    icon: "el-icon-woneng-ren-dangan",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/index.vue")
  },
  {
    path: "cooperation",
    name: "任务清单",
    icon: "el-icon-woneng-renwu",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/task/index.vue")
  },
  {
    path: "dynamic",
    name: "我的发布",
    icon: "el-icon-woneng-pinglun",
    redirect: "/my/index/dynamic/professional_material",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/dynamic/index.vue"),
    children: publishRouter
  },
  {
    path: "participate",
    name: "参与活动",
    icon: "el-icon-woneng-kaipiao",
    component: () =>
      import(
        /* webpackChunkName: "my" */ "@/views/my/index/participate/index.vue"
      )
  },
  {
    path: "attention",
    name: "我的关注",
    icon: "el-icon-woneng-heart-guanzhu",
    component: () =>
      import(
        /* webpackChunkName: "my" */ "@/views/my/index/attention/index.vue"
      )
  },
  {
    path: "collection",
    name: "内容收藏",
    icon: "el-icon-woneng-qingdankushoucang",
    component: () =>
      import(
        /* webpackChunkName: "my" */ "@/views/my/index/collection/index.vue"
      )
  },
  {
    path: "nengbar",
    name: "宝贝",
    icon: "el-icon-woneng-caiwu1",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/nengbar.vue")
  },
  {
    path: "proxy",
    name: "合伙人 ",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/proxy/index.vue")
  },
  {
    path: "hongdu",
    name: "红度 ",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/hongdu/index.vue")
  },
  {
    path: "order",
    name: "订单",
    icon: "el-icon-woneng-zhangdan1",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/order/index.vue")
  },
  {
    path: "order/:id",
    name: "订单详情",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/order/detail.vue")
  },
  // {
  //   path: "activity",
  //   name: "我的活动",
  //   icon: "el-icon-woneng-huodong",
  //   component: () => import(/* webpackChunkName: "my" */ "@/views/my/index/activity/index.vue"),
  // },
  {
    path: "material/:id",
    name: "专栏详情",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/mlms/material/detail.vue")
  },
  {
    path: "data_summary",
    name: "数据资产总体分析",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/data/summary.vue")
  },
  {
    path: "data_week",
    name: "数据资产上周概要",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/data/week.vue")
  },
  {
    path: "my_credit",
    name: "我的信用值",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/index/credit/index.vue")
  },
  {
    path: "course_detail/:id",
    name: "我的学习进度详情",
    hidden: true,
    component: () =>
      import(
        /* webpackChunkName: "my" */ "@/views/my/index/participate/course/detail.vue"
      )
  }
];
