import { checkJsonTable, checkEmail } from "@/util/rules";

const initForm = () => {
  return {
    userId: 0,
    username: "",
    realName: "",
    createTime: "",
    updateTime: "",
    mobile: "",
    sex: "",
    avatar: "",
    workPlace: "",
    company: "",
    industry: "",
    position: "",
    sign: "",
    introduction: "",
    integrity: 0,
    abilityTag: [],
  };
};

const initBaseForm = () => {
  return {
    userId: 0,
    birthday: "",
    householdRegister: "",
    mobile: "",
    weiXin: "",
    qq: "",
    mail: "",
    workExperience: [],
    learningSituation: [],
    educationExperience: [],
  };
};

const workExperienceColumns = [
  {
    prop: "company",
    label: "公司",
  },
  {
    prop: "position",
    label: "职位",
  },
  {
    prop: "starTime",
    label: "开始日期",
    type: "date",
    dateType: "month",
  },
  {
    prop: "endTime",
    label: "到期日期",
    type: "date",
    dateType: "month",
  },
  {
    prop: "describe",
    label: "工作描述",
    type: "area",
  },
];

const learningSituationColumns = [
  {
    prop: "school",
    label: "学习(教育)单位",
  },
  {
    prop: "starTime",
    label: "开始日期",
    type: "date",
    dateType: "month",
  },
  {
    prop: "endTime",
    label: "到期日期",
    type: "date",
    dateType: "month",
  },
  {
    prop: "education",
    label: "学历",
  },
];

const educationExperienceColumns = [
  {
    prop: "certificate",
    label: "证书名称",
  },
  {
    prop: "number",
    label: "证书编号",
  },
  {
    prop: "unit",
    label: "颁发单位",
  },
];

const rules = {
  workExperience: [
    {
      required: true,
      type: "array",
      validator: checkJsonTable(workExperienceColumns, "工作经历"),
      trigger: "change",
    },
  ],
  learningSituation: [
    {
      required: true,
      type: "array",
      validator: checkJsonTable(learningSituationColumns, "学习情况"),
      trigger: "change",
    },
  ],
  educationExperience: [
    {
      required: true,
      type: "array",
      validator: checkJsonTable(educationExperienceColumns, "教育经历"),
      trigger: "change",
    },
  ],
  mail: [{ validator: checkEmail, trigger: "blur" }],
};

export {
  initForm,
  initBaseForm,
  workExperienceColumns,
  learningSituationColumns,
  educationExperienceColumns,
  rules,
};
