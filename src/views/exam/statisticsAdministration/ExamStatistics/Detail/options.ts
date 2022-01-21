export const initSearchForm = () => {
  return {
    realName: "", // 考生姓名
    result: "",
    sort: "1",
    isSo: ""
  };
};

export const resultOptions = [
  {
    label: "不及格",
    value: "1"
  },
  {
    label: "及格",
    value: "2"
  },
  {
    label: "优秀",
    value: "3"
  }
];

export const sortOptions = [
  {
    label: "分数从高到低",
    value: "1"
  },
  {
    label: "分数从低到高",
    value: "2"
  }
];

export const isSoOptions = [
  {
    label: "组织内成员",
    value: "1"
  },
  {
    label: "平台成员",
    value: "2"
  }
];
