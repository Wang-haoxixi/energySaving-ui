export const tabList = [{
    label: "关注",
    value: "followThought",
  },
  {
    label: "热门",
    value: "hotThought",
  },
  {
    label: "最新",
    value: "allThought",
  },
  {
    label: "话题",
    value: "subject",
  },
  {
    label: "文章",
    value: "material",
  },
];

export const statistic = [{
  value: "followWorth",
  name: '关注',
  path: "/channel/styles/user/*/attentions",
}, {
  value: "fanWorth",
  name: '粉丝',
  path: "/channel/styles/user/*/fans",
}, {
  value: "chatWorth",
  name: '说说',
  path: "/my/index/dynamic?type=thought",
}, {
  value: "materialWorth",
  name: '文章',
  path: "/my/index/dynamic?type=material",
}];
