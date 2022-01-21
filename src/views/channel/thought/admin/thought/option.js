export const tableOption = [{
  label: "说说内容",
  prop: "content",
}, {
  label: "创建人",
  prop: "userName",
  width: "120",
}, {
  label: "创建时间",
  prop: "createTime",
  width: "180",
}, {
  label: "所属组织",
  prop: "orgName",
  width: "120",
}, {
  label: "是否置顶",
  prop: "isTop",
  width: "100",
  type: "slot",
}];

export const dictsMap = {
  topicType: {
    "1": "普通话题",
    "2": "专项话题",
  },
  isTop: {
    "1": "否",
    "2": "是",
  },
};
