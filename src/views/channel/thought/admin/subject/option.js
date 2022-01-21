export const tableOption = [{
  label: "话题主题",
  prop: "content",
}, {
  label: "话题分类",
  prop: "topicType",
  type: "dict",
}, {
  label: "创建时间",
  prop: "createTime",
}, {
  label: "创建人",
  prop: "creatorName",
}, {
  label: "讨论",
  prop: "hot",
}, {
  label: "是否置顶",
  prop: "status",
  width: "100",
  type: "slot",
}];

export const dictsMap = {
  topicType: {
    "1": "普通话题",
    "2": "专项话题",
    "3": "官方话题",
  },
  status: {
    "1": "否",
    "2": "是",
  },
};

export const initForm = () => {
  return {
    content: "",
    topicType: 1,
    introduction: "",
    imageUrl: "",
  };
};

export const rules = {
  content: [{
    required: true,
    message: "请输入话题名称",
    trigger: "blur",
  }],
  topicType: [{
    required: true,
    message: "选择话题类型",
    trigger: "change",
  }],
  introduction: [{
    required: true,
    message: "请输入话题内容",
    trigger: "blur",
  }],
  imageUrl: [{
    required: true,
    message: "官方话题必填上传图片",
    trigger: "change",
  }],
};
