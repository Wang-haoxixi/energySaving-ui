
import Blank from "@/layouts/blank.vue";
export default [
  {
    path: ":id",
    name: "订单信息",
    redirect: "/channel/order/:id/confirm",
    component: Blank,
    children: [
      {
        path: 'confirm',
        name: "订单确认",
        component: () => import("@/views/channel/Order/confirm.vue"),
      },
      {
        path: 'pay',
        name: "订单支付",
        component: () => import("@/views/channel/Order/pay.vue"),
      },
      {
        path: 'result',
        name: "订单结果",
        component: () => import("@/views/channel/Order/result.vue"),
      },
    ],
  },
];
