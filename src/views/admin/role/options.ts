// org config options
//import { mergeByFirst } from '@/util/util'
const dictsMap = {
  dsType: {
    0: "全部",
    3: "本级",
  },
  type: {
    1: "通用",
    2: "组织",
    3: "联盟",
  },
  searchType: {
    1: "通用",
    2: "运营",
    3: "应用",
  },
};

const dsType = [
  {
    label: "全部",
    value: 0,
    disabled: false,
  },
  {
    label: "本级",
    value: 3,
    disabled: false,
  },
];
const orgDsType = [
  {
    label: "全部",
    value: 0,
    disabled: true,
  },
  {
    label: "本级",
    value: 3,
    disabled: false,
  },
];

const columnsMap = [
  {
    prop: "roleId",
    label: "ID",
    width: "80px",
  },
  {
    prop: "roleName",
    label: "角色名称",
  },
  {
    prop: "roleCode",
    label: "角色编码",
  },
  {
    prop: "roleDesc",
    label: "角色备注",
  },
  {
    prop: "dsType",
    label: "数据权限",
    type: "dict",
    width: "100px",
  },
  {
    prop: "createTime",
    label: "创建时间",
  },
  {
    prop: "updateTime",
    label: "更新时间",
  },
];

const initForm = () => {
  return {
    roleId: "",
    dsType: 3,
    roleCode: "",
    roleDesc: "",
    roleName: "",
    isCommon: 1,
    orgId: "",
  };
};

const initSearchForm = () => {
  return {
    searchType: "",
  };
};

export { dictsMap, columnsMap, initForm, dsType, orgDsType, initSearchForm };
