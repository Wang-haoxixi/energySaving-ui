export class AppStoreEntity {
  id = 0;
  name = "";//应用超市名称
  icon = "";//应用图标
  introduction = "";//应用简介
  classification = "";//应用分类
  type = "1";//应用类型 1免费，2收费
  amount = 0;//应用价格（贝）
  cash = 0;//应用价格（元）
  developer = "";//应用开发者
  help = "";//应用帮助文档
  file = [];//应用预览
  tags = [];// 标签
  status = "";//应用状态 1待发布，2已发布

}

export const dictsMap = {
  type: {
    1: "免费", 2: "付费", 3: '默认',
  },
  status: {
    1: "待发布", 2: "已发布",
  },
};

export const rules = {
  name: [{ required: true, message: "请填写应用超市名称", trigger: "blur" }],
  icon: [{ required: true, message: "请上传应用图标", trigger: "change" }],
  introduction: [{ required: true, message: "请填写应用简介", trigger: "blur" }],
};
export const initForm = (appId: number) => {
  return {
    relationId: 0,
    appId,
    versionNumber: "",
    description: "",
  };
};
export const initRoleForm = (applyId: number) => {
  return {
    id: 0,
    applyId,
    roleName: "",
    roleDesc: "",
  };
};
