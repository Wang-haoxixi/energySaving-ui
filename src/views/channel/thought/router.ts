import Layout from "@/layouts/channel.vue";
export default [
  {
    path: "/thought",
    component: Layout,
    redirect: "/thought/subject_list",
    children: [
      {
        path: "subject_list",
        name: "话题列表",
        component: () => import("@/views/channel/thought/subjectList/index.vue"),
      },
      {
        path: "thought_detail/:id",
        name: "说说详情",
        component: () => import("@/views/channel/thought/thoughtDetail/index.vue"),
      },
    ],
  },
];
