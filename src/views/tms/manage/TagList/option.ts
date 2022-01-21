

function initAddTagForm() {
  return {
    name: null,
    levelId: null,
    typeId: null,
    typeObjs: [],
    typeIds: [],
    tagList: [],
    tagsList: [],
    description: null,
    orderNum: 1,
  };
}
function initEditTagForm() {
  return {
    name: null,
    levelId: null,
    typeId: null,
    typeObjs: [],
    typeIds: [],
    tagList: [],
    tagsList: [],
    description: null,
    orderNum: 1,
  };
}
function initFormInline() {
  return {
    name: null,
    typeid: null,
    levelid: null,
    status: null,
  };
}
function initMergeForm() {
  return {
    mainId: null,
    mergeIds: [],
  };
}
function initTagFunction() {
  return {
    "tagReview": null, "tagNotes": null, "tagRelation": null,
  };
}
const dictMap = {
  status: {
    0: "废除",
    1: "启用",
  },
  isFree: {
    0: "游离词",
    1: "中心词",
    2: "卫星词",
  },
};
const columnsMap = [
  {
    prop: "tagId",
    label: "ID",
    width: "60",
  },
  {
    prop: "name",
    label: "标签名称",
    width: "120",
  },
];
export const rules = [

];
export const initForm = [

];

export const initSearchForm = () => {
  return {
    name: null,
    isFree: null,
    typeId: null,
    levelId: null,
    status: null,
  };
};
export { dictMap, columnsMap, initAddTagForm, initEditTagForm, initFormInline, initMergeForm, initTagFunction };