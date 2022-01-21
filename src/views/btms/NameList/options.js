import { mergeByFirst } from "@/util/util";
const dictsMap = {
  lockFlag: {
    0: "启用",
    1: "禁用",
  },
  sex: {
    0: "男",
    1: "女",
  },
};

const initForm = () => {
  return {
    name: "", //姓名
    idCard: "", //身份证号
    image: "", //头像
    sex: "", //性别
    politicsValue: "",
    marriageValue: "",
    birthValue: "",
    residentValue: "",
    educationValue: "",
    birthCityArr: [],
    cityArr: [],
    idCardFace: "", //身份证正面
    idCardEmblem: "", //身份证国徽面
    birthDate: "", //出生年月：
    nation: "", //民族
    politicsStatus: "", //政治面貌.
    marriageStatus: "", //婚姻状况.
    birthStatus: "", //生育状况.
    residentType: "", //户口类别.
    birthplaceProvince: "", //户籍所在省
    birthplaceCity: "", //户籍所在市
    residenceCities: "", //户籍地址
    residenceAddress: "",
    province: "", //家庭所在省
    residence: [],
    current: [],
    city: "", //家庭所在市
    currentCities: "", //家庭地址
    currentAddress: "",
    education: "", //最高学历
    university: "", //毕业学校
    qq: "",
    major: "",
    phone: "", //联系电话
    graduateTime: "", //毕业时间
    wechat: "", //微信
    email: "", //邮箱
    socialRela: "", //外部头衔
    agency: "", //任职机构
    job: "",
    introduction: "", //机构简介
  };
};
const columnsMap = [
  {
    prop: "name",
    label: "姓名",
    hidden: false,
    key: "name",
  },
  {
    prop: "idCard",
    label: "身份证号",
    hidden: true,
    key: "idCard",
  },
  {
    prop: "sex",
    label: "性别",
    type: "dict",
    hidden: false,
    key: "sex",
  },
  {
    prop: "politicsValue",
    label: "政治面貌",
    hidden: true,
    key: "politicsValue",
  },
  {
    prop: "marriageValue",
    label: "婚姻状况",
    hidden: true,
    key: "marriageValue",
  },
  {
    prop: "birthValue",
    label: "生育状况",
    hidden: true,
    key: "birthValue",
  },
  {
    prop: "residentValue",
    label: "户口类别",
    hidden: true,
    key: "residentValue",
  },
  {
    prop: "educationValue",
    label: "最高学历",
    hidden: true,
    key: "educationValue",
  },
  {
    prop: "nation",
    label: "民族",
    hidden: true,
    key: "nation",
  },
  {
    prop: "university",
    label: "毕业学校",
    hidden: true,
    key: "university",
  },
  {
    prop: "qq",
    label: "QQ",
    hidden: true,
    key: "qq",
  },
  {
    prop: "wechat",
    label: "微信",
    hidden: true,
    key: "wechat",
  },
  {
    prop: "email",
    label: "邮箱",
    hidden: true,
    key: "email",
  },
  {
    prop: "socialRela",
    label: "外部头衔",
    hidden: true,
    key: "socialRela",
  },
  {
    prop: "agency",
    label: "任职机构",
    hidden: true,
    key: "agency",
  },
  {
    prop: "phone",
    label: "联系电话",
    hidden: false,
    key: "phone",
  },
  {
    prop: "job",
    label: "职称/职务",
    hidden: false,
    key: "job",
  },
  {
    prop: "provinceName",
    label: "所属省(家庭)",
    hidden: false,
    key: "provinceName",
  },
  {
    prop: "lockFlag",
    label: "状态",
    type: "dict",
    hidden: false,
    key: "lockFlag",
  },
];
const columnsRecyclegMap = [
  {
    prop: "name",
    label: "姓名",
    hidden: false,
    key: "name",
  },
  {
    prop: "sex",
    label: "性别",
    type: "dict",
    hidden: false,
    key: "sex",
  },
  {
    prop: "phone",
    label: "联系电话",
    hidden: false,
    key: "phone",
  },
  {
    prop: "job",
    label: "职称/职务",
    hidden: false,
    key: "job",
  },
  {
    prop: "provinceName",
    label: "所属省(家庭)",
    hidden: false,
    key: "provinceName",
  },
  {
    prop: "lockFlag",
    label: "状态",
    type: "dict",
    hidden: false,
    key: "lockFlag",
  },
];
const initSearchForm = () => {
  return {
    name: "",
    sex: "",
    parmas: [],
    phone: "",
    university: "",
    lockFlag: "",
    province: "",
    city: null,
  };
};
const formToDto = row => {
  const newForm = mergeByFirst(initForm(), row);
  newForm.province = row.current[0];
  newForm.city = row.current[1];
  newForm.birthplaceProvince = row.residence[0];
  newForm.birthplaceCity = row.residence[1];
  // newForm.positionId = row.position[row.position.length - 1]
  // newForm.deptIds = row.dept.map(m => m.id)
  return newForm;
};
const rules = {
  name: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入",
      trigger: "blur",
    },
  ],
};

export {
  dictsMap,
  columnsRecyclegMap,
  columnsMap,
  initForm,
  initSearchForm,
  rules,
  formToDto,
};
