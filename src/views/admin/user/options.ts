const dictsMap = {
  status: {
    0: "正常",
    1: "待审核",
    2: "锁定",
    3: "待配置",
  },
};

const columnsMap = [
  {
    prop: "userId",
    label: "用户ID",
    width: "120px",
  },
  {
    prop: "username",
    label: "用户名",
    type: "slot",
  },
  {
    prop: "realName",
    label: "真实姓名",
  },
  {
    prop: "mobile",
    label: "手机",
  },
];

export { dictsMap, columnsMap };
