import { isvalidateSpace } from "@/util/validate";

export const dictsMap = {
  isYes: [
    {
      value: 0,
      lable: "否"
    },
    {
      value: 1,
      label: "是"
    }
  ]
};

export const tableOption = [
  {
    label: "上传者",
    prop: "realName",
    width: "120"
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: "180"
  },
  {
    label: "浏览次数",
    prop: "views",
    width: "100"
  }
];

export const collectTableOption = [
  {
    label: "上传者",
    prop: "realName",
    width: "120"
  }
];

export function initSearchForm() {
  return {
    materialName: ""
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
    platformSource: "",
    isAllowSecondary: "0",
    materialLevelId: [],
    beenModifiedTwice: "0"
  };
};

const validateSpace = (rule, value, callback) => {
  if (isvalidateSpace(value)) {
    callback(new Error("必填"));
  } else {
    callback();
  }
};

export const rules = {
  materialName: [
    {
      required: true,
      message: "请输入材料名称",
      trigger: "blur"
    },
    {
      validator: validateSpace,
      trigger: "blur"
    }
  ],
  isOriginal: [
    {
      required: true,
      message: "必填",
      trigger: "change"
    }
  ],
  platformSource: [
    {
      required: true,
      message: "必填",
      trigger: "blur"
    }
  ],
  createUser: [
    {
      required: true,
      message: "请输入作者",
      trigger: "blur"
    },
    {
      validator: validateSpace,
      trigger: "blur"
    }
  ],
  materialIntro: [
    {
      required: true,
      message: "请输入介绍",
      trigger: "blur"
    },
    {
      validator: validateSpace,
      trigger: "blur"
    }
  ],
  materialContent: [
    {
      required: true,
      message: "请输入正文",
      trigger: "blur"
    },
    {
      validator: validateSpace,
      trigger: "blur"
    }
  ],
  materialType: [
    {
      required: true,
      message: "请选择类型",
      trigger: "change"
    }
  ],
  downloadCost: [
    {
      required: true,
      message: "请选择支付贝额",
      trigger: "change"
    }
  ],
  isOpen: [
    {
      required: true,
      message: "必填",
      trigger: "change"
    }
  ],
  materialLevelId: [
    {
      required: true,
      message: "请选择分类",
      trigger: "change"
    }
  ]
};

export const getLevelIds = (fileData, id) => {
  let levelIds = [];
  const fn = (list, ids) => {
    for (const item of list) {
      const idList = ids.concat([item.id]);
      if (item.id === id) {
        levelIds = idList;
      } else {
        if (item.childrens && item.childrens.length > 0) {
          fn(item.childrens, idList);
        }
      }
    }
  };
  fn(fileData, []);
  return levelIds;
};

export const tabList = [
  {
    label: "全部材料",
    value: "all",
    isOpen: 0
  },
  {
    label: "组织内开放",
    value: "inso",
    isOpen: 2
  },
  {
    label: "组织外开放",
    value: "outso",
    isOpen: 1
  },
  {
    label: "收藏",
    value: "collect",
    isOpen: -1
  }
];
