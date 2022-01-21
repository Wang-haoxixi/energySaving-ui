import Layout from "@/layouts/channel.vue";
export default [
  {
    path: "/channel_proxyProduct",
    component: Layout,
    redirect: "/channel_proxyProduct/proxy_list",
    children: [
      {
        path: "buy_proxy",
        name: "成为代理",
        component: () => import("@/views/channel/proxyProduct/buyProxy/index.vue"),
      },
      {
        path: "processing",
        name: "代理结果",
        component: () => import("@/views/channel/proxyProduct/buyProxy/Processing.vue"),
      },
    ],
  },
];
