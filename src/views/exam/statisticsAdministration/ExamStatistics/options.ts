export const initSearchForm = () => {
  return {
    examName: "",
    kind: "",
    openScope: null,
    qTypeString: "",
    sort: "1"
  };
};

export const sortOptions = [
  {
    label: "及格率倒序",
    value: "1"
  },
  {
    label: "参加考试人数倒序",
    value: "2"
  },
  {
    label: "及格人数倒序",
    value: "3"
  },
  {
    label: "平均分率倒序",
    value: "4"
  }
];

export const openScopeOptions = [
  {
    label: "组织内开放",
    value: "1"
  },
  {
    label: "生态开放",
    value: "2"
  }
];
