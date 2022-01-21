const dictsMap = {
  level: {
    "1": "简单",
    "2": "较难",
    "3": "很难",
  },
  type: {
    "1": "单选题",
    "2": "多选题",
    "3": "判断题",
  },
};
const columnsMap = [
  {
    label: "ID",
    prop: "id",
    width: 75,
  },
  {
    label: "试题名称",
    prop: "title",
    width: 300,
    type: "slot",
  },
  {
    label: "试题分类",
    prop: "kind",
    type: "slot",
    width: 200,
  },
  {
    label: "题型",
    prop: "type",
    type: "dictGroup",
    dictName: "exam_question_type",
  },
  {
    label: "创建者",
    prop: "createByName",
    width: 120,
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 180,
  },
];

const initForm = () => {
  return {
  };
};


const initSearchForm = () => {
  return {
    type: '',
    level: "",
  };
};

const rules = {
};


export {
  initSearchForm,
  columnsMap,
  initForm,
  rules,
  dictsMap,
};
