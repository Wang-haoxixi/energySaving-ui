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
    commonDataMetaName: "",
    commonDataMetaNameEn: "",
  };
};

export const rules = {
  connectionType: [{
    required: true,
    message: "请输入数据库连接方式",
    trigger: "change",
  }],
  connectionUrl: [{
    required: true,
    message: "请输入内容",
    trigger: "blur",
  }],
  dataTableNameEn: [{
    required: true,
    message: "请输入内容",
    trigger: "blur",
  }],
  connectionName: [{
    required: true,
    message: "请输入账号",
    trigger: "blur",
  }],
  connectionPassword: [{
    required: true,
    message: "请输入密码",
    trigger: "blur",
  }],
  dataName: [{
    required: true,
    message: "请输入数据库名称",
    trigger: "blur",
  }],
  port: [{
    required: true,
    message: "请输入端口号",
    trigger: "blur",
  }],
};
