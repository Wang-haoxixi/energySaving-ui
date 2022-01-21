// org config options
const dictsMap = {
  status: {
    0: "正常",
    1: "待审核",
    2: "锁定",
    3: "待配置"
  },
  isAdmin: {
    0: "成员",
    1: "知事",
    2: "负责人"
  }
};

const columnsMap = [
  {
    prop: "userId",
    label: "用户ID",
    width: 70
  },
  {
    prop: "realName",
    label: "真实姓名",
    type: "slot",
    width: 250
  },
  {
    prop: "isAdmin",
    label: "角色",
    type: "dict"
  },
  {
    prop: "mobile",
    label: "手机"
  },
  {
    prop: "status",
    label: "状态",
    type: "dict"
  }
];

const initForm = () => {
  return {
    userId: "",
    username: "",
    realName: "",
    avatar: "",
    isAdmin: 0,
    roleIds: []
  };
};
const initDeptForm = () => {
  return {
    id: 0,
    parentId: 0,
    name: "",
    charger: ""
  };
};

export { dictsMap, columnsMap, initForm, initDeptForm };
