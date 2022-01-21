import Layout from "@/layouts/channel.vue";
import AccountLayout from "./account/Layout.vue"; // 账户设置 layout
import IndexlLayout from "./layouts/Index/index.vue"; // 个人中心 layout
// import EmaillLayout from "./email/Layout.vue"; // 邮件 layout

import { indexRouter } from "./index/router";
import { accountRouter } from "./account/router";
// import { emailRouter } from './email/router';
export default [
  {
    path: "/my",
    component: Layout,
    redirect: "/my/index/index",
    children: [
      {
        path: "index",
        name: "个人中心-主页",
        component: IndexlLayout,
        redirect: "/my/index/index",
        children: indexRouter,
      },
      {
        path: "account",
        name: "个人设置",
        component: AccountLayout,
        redirect: "/my/account/base",
        children: accountRouter,
      },
      // {
      //   path: "email",
      //   name: "邮件",
      //   component: EmaillLayout,
      //   redirect: "/my/email/write",
      //   children: emailRouter,
      // },
      {
        path: "contacts",
        name: "通讯录",
        component: () =>
          import(/* webpackChunkName: "my" */ "@/views/my/hidden/Contacts/index.vue"),
      },
      {
        path: "help_center",
        name: "帮助中心",
        component: () => import(/* webpackChunkName: "my" */ "@/views/my/hidden/HelpCenter/index.vue"),
      },
      {
        path: "cyberstar",
        name: "网红",
        component: () => import(/* webpackChunkName: "my" */ "@/views/my/hidden/Cyberstar/index.vue"),
      },
      {
        path: "create_org",
        name: "创建组织",
        component: () =>
          import(/* webpackChunkName: "my" */ "@/views/my/hidden/CreateSo/index.vue"),
      },
      {
        path: "guide_org",
        name: "指引组织",
        component: () =>
          import(/* webpackChunkName: "my" */ "@/views/my/hidden/CreateSo/guide.vue"),
      },
      {
        path: "invite_org",
        name: "邀请组织",
        component: () =>
          import(/* webpackChunkName: "my" */ "@/views/my/hidden/CreateSo/invite.vue"),
      },
    ],
  },
];
