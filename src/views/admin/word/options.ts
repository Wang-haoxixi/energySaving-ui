// org config options
//import { mergeByFirst } from '@/util/util'


const columnsMap = [
  {
    prop: "wordId",
    label: "ID",
    width: "80px",
  },
  {
    prop: "name",
    label: "敏感词",
  },
  {
    prop: "replacement",
    label: "替换词",
    width: "100px",
  },
  {
    prop: "createTime",
    label: "创建时间",
  },
  {
    prop: "updateTime",
    label: "更新时间",
  },
];

const initForm = () => {
  return {
    wordId: "",
    name: "",
    replacement: "",
    isCommon: 1,
    orgId: "",
  };
};

const initSearchForm = () => {
  return {
    type: "",
  };
};

export { columnsMap, initForm, initSearchForm };
