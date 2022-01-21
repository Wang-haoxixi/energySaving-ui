export default [
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "exception" */ "@/components/exception/404.vue"),
    name: "404",
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: "/403",
    component: () => import(/* webpackChunkName: "exception" */ "@/components/exception/403.vue"),
    name: "403",
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
];
