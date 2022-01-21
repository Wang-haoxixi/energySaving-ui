import Layout from "@/layouts/channel.vue";
import Blank from "@/layouts/blank.vue";
import MoFangRouter from "./MoFang/router";
import CourseRouter from "./Course/router";
import ExamRouter from "./Exam/router";
import ActivityRouter from "./Activity/router";
import GlobalSearchRouter from "./GlobalSearch/router";
import StylesRouter from "./styles/router";
import OrderRouter from "./Order/router";
export default [
  {
    path: "/channel",
    component: Layout,
    redirect: "/channel/thought_list",
    children: [
      {
        path: "thought_list",
        name: "关注",
        component: () => import("@/views/channel/thought/index.vue")
      },
      {
        path: "material",
        name: "文章",
        component: () => import("@/views/channel/Material/index.vue")
      },
      {
        path: "material/detail/:id",
        name: "文章详情",
        component: () => import("@/views/channel/Material/detail/index.vue")
      },
      {
        path: "task_hall",
        name: "工场",
        component: () => import("@/views/channel/taskHall/index.vue")
      },
      {
        path: "task_detail/:id",
        name: "任务详情",
        component: () => import("@/views/channel/taskHall/detail/index.vue")
      },
      {
        path: "mo_fang",
        name: "魔方",
        redirect: "/channel/mo_fang/index",
        component: Blank,
        children: MoFangRouter
      },
      {
        path: "course",
        name: "课程考试",
        redirect: "/channel/course/index",
        component: Blank,
        children: CourseRouter
      },
      {
        path: "questionnaire",
        name: "问卷 ",
        component: () => import("@/views/channel/questionnaire/index.vue")
      },
      {
        path: "exam",
        name: "考试 ",
        redirect: "/channel/exam/index",
        component: Blank,
        children: ExamRouter
      },
      {
        path: "app_store",
        name: "应用商店 ",
        component: () => import("@/views/channel/AppStore/index.vue")
      },
      {
        path: "app_store_detail/:id",
        name: "详情_应用商店 ",
        component: () => import("@/views/channel/AppStore/detail.vue")
      },
      {
        path: "valuation",
        name: "我要估值",
        component: () => import("@/views/channel/valuation/index.vue")
      },
      {
        path: "activity",
        name: "活动",
        redirect: "/channel/activity/index",
        component: Blank,
        children: ActivityRouter
      },
      {
        path: "global_search",
        name: "全局搜索",
        component: () => import("@/views/channel/GlobalSearch/index.vue"),
        redirect: "/channel/global_search/user",
        children: GlobalSearchRouter
      },
      {
        path: "about",
        name: "关于节能保",
        component: () => import("@/views/channel/About/index.vue")
      },
      {
        path: "nengbar",
        name: "宝贝激励",
        component: () => import("@/views/channel/NengBar/index.vue")
      },
      {
        path: "styles",
        name: "风采页",
        component: Blank,
        redirect: "/403",
        children: StylesRouter
      },
      {
        path: "order",
        name: "下订单",
        component: Blank,
        redirect: "/403",
        children: OrderRouter
      },
      {
        path: "recruit",
        name: "能聘库",
        component: () => import("@/views/channel/recruit/index.vue")
      },
      {
        path: "talent_pool",
        name: "人才库",
        component: () => import("@/views/channel/recruit/talentPool/index.vue")
      },
      {
        path: "recruit_detail/:id",
        name: "招聘详情",
        component: () => import("@/views/channel/recruit/detail/job/index.vue")
      },
      {
        path: "partner_detail/:id",
        name: "合伙人详情",
        component: () =>
          import("@/views/channel/recruit/detail/partner/index.vue")
      },
      {
        path: "progress_ladder",
        name: "进步阶梯",
        component: () =>
          import("@/views/channel/recruit/progressLadder/index.vue")
      },
      {
        path: "partner_introduce",
        name: "合伙人介绍",
        component: () =>
          import("@/views/channel/recruit/partnerIntroduce/index.vue")
      },
      {
        path: "partner_apply",
        name: "合伙人申请",
        component: () =>
          import("@/views/channel/recruit/partnerIntroduce/form/index.vue")
      }
    ]
  }
];
