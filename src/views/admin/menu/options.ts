const dictsMap = {
  type: {
    "0": "一级菜单", "1": "子菜单", "2": "按钮/权限",
  },
};

const columnsMap = [
  {
    prop: "menuId",
    label: "菜单ID",
  },
  {
    prop: "name",
    label: "菜单名称",
  },
  {
    prop: "type",
    label: "菜单类型",
    type: "dict",
  },
  {
    prop: "code",
    label: "权限名称",
  },
  {
    prop: "path",
    label: "路径",
  },
  {
    prop: "component",
    label: "组件",
  },
  {
    prop: "sort",
    label: "排序",
    width: "80px",
  },
  {
    prop: "icon",
    label: "图标",
  },
];

const menuTypeList = [
  {
    label: "一级菜单",
    value: "0",
  },
  {
    label: "子菜单",
    value: "1",
  },
  {
    label: "按钮/权限",
    value: "2",
  },
];


export { columnsMap, menuTypeList, dictsMap };
