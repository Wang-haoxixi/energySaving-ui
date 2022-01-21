export const dictsMap = {
  type: {
    0: "面试通知",
    1: "其他通知",
  },
};

export const initSearchForm = () => {
  return {
    name: "",
  };
};

export const initFormData = () => {
  return {
    name: "",
    type: '0',
  };
};

export const ColumnsMaps = [
  {
    prop: "type",
    label: "类型",
    type: "dict",
  },
  {
    prop: "name",
    label: "名称",
  },
  {
    prop: "theme",
    label: "标题",
  },
  {
    prop: "content",
    label: "正文",
  },
];

export const rules = {
  name: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  theme: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  content: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
};