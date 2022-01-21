export const dictsMap = {
  isYes: [{
    value: 0,
    lable: "否",
  },
  {
    value: 1,
    label: "是",
  },
  ],
};

export function initSearchForm() {
  return {
    materialName: "",
  };
}

export const initForm = () => {
  return {

  };
};

export const rules = {
  tableCn: [{
    required: true,
    message: "请输入模型表中文名称",
    trigger: "blur",
  }],
  tableEn: [{
    required: true,
    message: "请输入模型表英文名称",
    trigger: "blur",
  }],
  tableType: [{
    required: true,
    message: "请输入模型表类型",
    trigger: "blur",
  }],
  modelBuildIds: [{
    required: true,
    message: "请输入所属模型库",
    trigger: "blur",
  }],
};

export const rules2 = {
  dataCn: [{
    required: true,
    message: "请输入字段中文名",
    trigger: "blur",
  }],
  dataEn: [{
    required: true,
    message: "请输入字段英文名",
    trigger: "blur",
  }],
  dataType: [{
    required: true,
    message: "请输入字段类型",
    trigger: "blur",
  }],
  isPrimaryKey: [{
    required: true,
    message: "请输入是否主键",
    trigger: "blur",
  }],
  isNull: [{
    required: true,
    message: "请输入是否为空",
    trigger: "blur",
  }],
};
