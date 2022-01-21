export const accountRouter = [
  {
    path: "base",
    name: "基本信息",
    icon: "el-icon-woneng-ren-dangan",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/account/Base.vue")
  },
  {
    path: "more",
    name: "更多信息",
    icon: "el-icon-woneng-gengduo1",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/account/BaseMore.vue")
  },
  // {
  //   path: "certification",
  //   name: "个人认证",
  //   icon: "el-icon-woneng-approve1",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "my" */ "@/views/my/account/Certification.vue"),
  // },
  {
    path: "security",
    name: "账号安全",
    icon: "el-icon-woneng-caiwu11",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/account/Security.vue")
  },
  {
    path: "org",
    name: "已加入组织",
    icon: "el-icon-woneng-so",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/account/Org.vue")
  },
  {
    path: "privacy",
    name: "隐私设置",
    icon: "el-icon-woneng-set1",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/views/my/account/Privacy.vue")
  }
];
