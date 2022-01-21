import {
  isvalidateSpace,
} from "@/util/validate";

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

export const tableOption = [{
  label: "创建时间",
  prop: "createTime",
  width: "250",
}, {
  label: "浏览次数",
  prop: "views",
  width: "150",
}];

export function initSearchForm() {
  return {
    materialName: "",
  };
}

export const initForm = () => {
  return {
    materialName: "",
    createUser: "",
    materialIntro: "",
    materialContent: "",
    materialType: "",
    downloadCost: "",
    isOpen: 1,
    isCertified: 0,
    tag: [],
    attachFile: "",
    attachMultiFileList: [],
    isOriginal: "0",
  };
};

const validateSpace = (rule, value, callback) => {
  if (isvalidateSpace(value)) {
    callback(new Error('必填'));
  } else {
    callback();
  }
};

export const rules = {
  materialName: [{
      required: true,
      message: "请输入标题",
      trigger: "blur",
    },
    {
      validator: validateSpace,
      trigger: 'blur',
    },
  ],
  isOriginal: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
  createUser: [{
      required: true,
      message: "请输入作者",
      trigger: "blur",
    },
    {
      validator: validateSpace,
      trigger: 'blur',
    },
  ],
  platformSource: [{
    required: true,
    message: "必填",
    trigger: "blur",
  }],
  materialIntro: [{
      required: true,
      message: "请输入介绍",
      trigger: "blur",
    },
    {
      validator: validateSpace,
      trigger: 'blur',
    },
  ],
  materialContent: [{
      required: true,
      message: "请输入正文",
      trigger: "blur",
    },
    {
      validator: validateSpace,
      trigger: 'blur',
    },
  ],
  materialType: [{
    required: true,
    message: "请选择类型",
    trigger: "change",
  }],
  downloadCost: [{
    required: true,
    message: "请选择支付贝额",
    trigger: "change",
  }],
  isOpen: [{
    required: true,
    message: "必填",
    trigger: "change",
  }],
};
