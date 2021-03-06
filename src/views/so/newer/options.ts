export const taskList = [
  {
    id: 1,
    name: "创建组织",
    status: 2, //1:未完成 2:已完成 3:已领取
    desc: "恭喜你成功创建智慧组织",
    worth: 2,
    unit: "贝",
    cusomTodoBtnText: "去创建",
    isContent: false,
    content: "",
    isMultiCount: false,
    multiCount: null,
    code: "create_so"
  },
  {
    id: 2,
    name: "添加成员",
    status: 1,
    desc: "邀请10位用户进组织,共同构建未来组织",
    worth: 0.1,
    unit: "贝/位",
    cusomTodoBtnText: "去邀请",
    isContent: false,
    content: "",
    isMultiCount: true,
    multiCount: 10,
    code: "add_member"
  },
  {
    id: 3,
    name: "新建通知",
    status: 1,
    desc: "发布一条通知，明确告知组织规则、服务与其他重要信息",
    worth: 0.5,
    unit: "贝",
    cusomTodoBtnText: "去发布",
    isContent: false,
    content: "",
    isMultiCount: false,
    multiCount: null,
    code: "create_notice"
  },
  {
    id: 4,
    name: "新增知事",
    status: 1,
    desc: "设置一位用户为知事共建组织",
    worth: 0.5,
    unit: "贝",
    cusomTodoBtnText: "去设置",
    isContent: true,
    content: "设置一位用户为知事共建组织",
    isMultiCount: false,
    multiCount: null,
    code: "add_admin"
  },
  {
    id: 5,
    name: "开启应用",
    status: 1,
    desc: "开启所需应用，赋能组织运营",
    worth: 0.5,
    unit: "贝",
    cusomTodoBtnText: "去开启",
    isContent: false,
    content: "",
    isMultiCount: false,
    multiCount: null,
    code: "open_app"
  },
  {
    id: 6,
    name: "角色授权",
    status: 1,
    desc: "前往用户管理角色功能，赋予用户职责范围的权限",
    worth: 0.5,
    unit: "贝",
    cusomTodoBtnText: "去授权",
    isContent: true,
    content: "前往用户管理角色功能，赋予用户职责范围的权限",
    isMultiCount: false,
    multiCount: null,
    code: "give_role"
  },
  {
    id: 7,
    name: "文档资产",
    status: 1,
    desc: "发布一篇材料，开始积累数据资产",
    worth: 1,
    unit: "贝",
    cusomTodoBtnText: "去发布",
    isContent: true,
    content: "发布一篇材料，开始积累数据资产",
    isMultiCount: false,
    multiCount: null,
    code: "doc_worth"
  },
  {
    id: 8,
    name: "创建任务",
    status: 1,
    desc: "发布一条任务，携团队共创价值",
    worth: 0.5,
    unit: "贝",
    cusomTodoBtnText: "去发布",
    isContent: true,
    content: "发布一条任务，携团队共创价值",
    isMultiCount: false,
    multiCount: null,
    code: "create_task"
  },
  {
    id: 9,
    name: "发布问卷",
    status: 1,
    desc: "发布一篇关于组织需求的问卷",
    worth: 0.5,
    unit: "贝",
    cusomTodoBtnText: "去发布",
    isContent: true,
    content: "发布一篇关于组织需求的问卷",
    isMultiCount: false,
    multiCount: null,
    code: "publish_ques"
  }
];
