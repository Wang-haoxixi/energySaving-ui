export const initFormData = () => {
  return {
    name: "",
    tags: [],
    welfareList: [],
    describe: "",
  };
};

export const infomationList = [
  {
    name: "工作类型",
    value: "jobType",
  },
  {
    name: "工作城市",
    value: "workplace",
  },
  {
    name: "工作经验",
    value: "experience",
  },
  {
    name: "学历要求",
    value: "education",
  },
  {
    name: "外语要求",
    value: "language",
  },
  {
    name: "专业要求",
    value: "major",
    type: "cut",
  },
];

export const initInfoForm = () => {
  return {
    workPlace: "",
    company: "",
    sign: "",
    birthday: "",
    householdRegister: "",
    mail: "",
    // workExperience: "",
    // learningSituation: "",
  };
};

export const rules = {};