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
    width: 80,
  },
  {
    prop: "roleName",
    label: "角色名称",
  },
  {
    prop: "applyName",
    label: "来源应用",
  },
  {
    prop: "roleDesc",
    label: "角色描述",
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
    type: "",
  };
};

export { dictsMap, columnsMap, initForm, dsType, orgDsType, initSearchForm };
