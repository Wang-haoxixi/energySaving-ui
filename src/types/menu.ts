interface IepMenuItem {
  createTime: string // 创建时间
  updateTime: string
  icon: string // 图标
  menuId: number // 菜单ID
  name: string //名称
  parentId: number // 父ID
  path: string // 展示路径
  component: string // 组件
  permission: string // 授权标识 admin:user:edit 这里只需要填写 edit 表示可编辑
  sort: number
  type: string // 菜单类型 0 一级菜单 1 子菜单 2 按钮/权限
  redirect: string // 给一级菜单用的默认跳转菜单
  hasChildren: boolean // 是否有子菜单 false 无子菜单 true 有子菜单
  internalOrExternal: boolean // 打开方式 false 内部 true 外部
  hidden: boolean // 是否为隐藏菜单 false 不隐藏 true 隐藏
  keepAlive: boolean // 是否为缓存菜单 false 否 true 是
  alwaysShow: boolean // 是否为聚合菜单(如个人中心) false 否 true 是
}

interface IepMenuGroupItem {
  id: number,//唯一字段
  name: string,//菜单组名称
  path: string,//工作台路径
  menuIds: number[],//其下菜单ID组
  permission: number,//关联权限ID
}

class IepMenuGroupItemEntity implements IepMenuGroupItem {
  id = 0;
  name = "";
  path = "";
  menuIds = [];
  permission = 1;
}

class MenuItemEntity implements IepMenuItem {
  createTime = "";
  updateTime = "";
  icon = "";
  menuId = 0;
  name = "";
  parentId = -1;
  path = "";
  component = "";
  permission = "";
  sort = 0;
  type = "0";
  redirect = "";
  hasChildren = false;
  internalOrExternal = false;
  hidden = false;
  keepAlive = false;
  alwaysShow = false;
}



export { IepMenuItem, MenuItemEntity, IepMenuGroupItem, IepMenuGroupItemEntity };
