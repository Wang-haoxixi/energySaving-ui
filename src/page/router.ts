import website from "@/const/website";
// import VueRouter, { Route } from "vue-router";
/**
 * 基础路由
 * @type { *[] }
 */
const noAuthMeta = {
  keepAlive: false,
  isAuth: false,
};
const hadAuthMeta = {
  keepAlive: false,
  isAuth: true,
};
export default [
  {
    path: "/",
    name: website.fistPage.label,
    redirect: website.fistPage.value,
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/page/Login/index.vue"),
    meta: noAuthMeta,
  },
  {
    path: "/wechat",
    name: "微信登陆",
    component: () => import("@/page/Wechat/index.vue"),
    meta: noAuthMeta,
  },
  {
    path: "/register",
    name: "注册",
    component: () => import("@/page/Register/index.vue"),
    meta: noAuthMeta,
  },
  {
    path: "/authorizations",
    name: "鉴权",
    component: () => import("@/page/authorizations/index.vue"),
    meta: noAuthMeta,
  },
  {
    path: "/protocol",
    name: "协议",
    component: () => import("@/components/IepProtocol/index.vue"),
    meta: noAuthMeta,
    children: [
      {
        //  /protocol/service_agreement
        path: "service_agreement",
        name: "节能宝平台用户服务协议",
        meta: noAuthMeta,
        component: () => import("@/page/protocol/service_agreement.vue"),
      },
      {
        //  /protocol/master_rule
        path: "master_rule",
        name: "节能宝平台负责人规则",
        meta: noAuthMeta,
        component: () => import("@/page/protocol/master_rule.vue"),
      },
      {
        //  /protocol/privacy_policy
        path: "privacy_policy",
        name: "《节能宝隐私条款》",
        meta: noAuthMeta,
        component: () => import("@/page/protocol/privacy_policy.vue"),
      },
    ],
  },
  {
    path: "/questionnaire_edit/:id",
    name: "问卷填报",
    meta: noAuthMeta,
    component: () => import("@/page/questionnaire/index.vue"),
  },
  {
    path: "/questionnaire_edit/:id/pe",
    name: "问卷填报PE",
    meta: noAuthMeta,
    component: () => import("@/page/questionnaire/pe.vue"),
    props: true,
  },
  {
    // state 用于区分是否首次考试,"create"为首次,"continue"为非首次
    path: "/exam_edit/:id/:state",
    name: "考试填报",
    meta: hadAuthMeta,
    component: () => import("@/page/Exam/index.vue"),
    props: true,
  },
  {
    // state 用于区分是否首次Exercise,"create"为首次,"continue"为非首次
    path: "/exercise_edit/:id/:state",
    name: "练习填报",
    meta: hadAuthMeta,
    component: () => import("@/page/Exercise/index.vue"),
    props: true,
  },
  {
    // state 用于区分是否首次考试,"create"为首次,"continue"为非首次
    path: "/exam_show/:id/",
    name: "考试查看",
    meta: hadAuthMeta,
    component: () => import("@/page/Exam/show/index.vue"),
    props: true,
  },
  {
    // state 用于区分是否首次考试,"create"为首次,"continue"为非首次
    path: "/exercise_show/:id/:state",
    name: "练习查看",
    meta: hadAuthMeta,
    component: () => import("@/page/Exercise/show/index.vue"),
    props: true,
  },
  {
    path: "/questionnaire_edit/:id/h5",
    name: "问卷填报H5",
    meta: noAuthMeta,
    component: () => import("@/page/questionnaire/h5.vue"),
  },
  // 此页面用来查看一些不需要token的组件, 显示样例
  {
    path: "/example",
    name: "简单组件库",
    meta: noAuthMeta,
    component: () => import("@/page/example/index.vue"),
  },
];
