const dictsMap = {
  status: {
    0: "禁用",
    1: "正常",
  },
};

const initForm = () => {
  return {
    adslotId: "",
    name: "",
    adslotNumber: "",
    adslotDescription: "",
    type: 1,
  };
};
const columnsMap = [
  {
    prop: "adslotId",
    label: "广告位id",
  },
  {
    prop: "name",
    label: "广告位名称",
  },
  {
    prop: "adslotDescription",
    label: "广告位描述",
  },
  {
    prop: "adslotNumber",
    label: "广告位编码",
  },
];

const initSearchForm = () => {
  return {};
};

const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  adslotNumber: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
};

const selfRules = {
  ...rules,
};

export { dictsMap, columnsMap, initForm, initSearchForm, rules, selfRules };
