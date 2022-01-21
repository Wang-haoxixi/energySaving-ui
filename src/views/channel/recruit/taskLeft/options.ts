export const initSearchData = () => {
  return {
    name: "",
  };
};

export const tabList = [
  {
    label: "正在招聘",
    value: "job",
  },
  {
    label: "合伙人招募",
    value: "partner",
  },
];

export const searchOptions = [
  {
    label: "薪资待遇",
    value: "salaryStr",
    type: "job",
    list: [
      { "value": "不限", "key": "0" },
      { "value": "3K以下", "key": "1" },
      { "value": "3-5K", "key": "2" },
      { "value": "5-10K", "key": "3" },
      { "value": "10-15K", "key": "4" },
      { "value": "15-20K", "key": "5" },
      { "value": "20-30K", "key": "6" },
      { "value": "30K以上", "key": "7" },
      { "value": "面议", "key": "8" }],
  }, {
    label: "工作经验",
    value: "experienceStr",
    type: "job",
    list: [
      { "value": "不限", "key": "不限" },
      { "value": "1年以内", "key": "1年以内" },
      { "value": "1-3年", "key": "1-3年" },
      { "value": "3-5年", "key": "3-5年" },
      { "value": "5-10年", "key": "5-10年" },
      { "value": "10年以上", "key": "10年以上" }],
  }, {
    label: "学历要求",
    value: "educationStr",
    type: "job",
    list: [
      { "value": "不限", "key": "不限" },
      { "value": "高中及以下", "key": "高中及以下" },
      { "value": "中专", "key": "中专" },
      { "value": "大专", "key": "大专" },
      { "value": "本科", "key": "本科" },
      { "value": "硕士", "key": "硕士" },
      { "value": "博士及以上", "key": "博士及以上" }],
  }, {
    label: "行业",
    value: "industryStr",
    type: "all",
    componentType: "popover",
    list: [
      { "value": "不限", "key": "0" },
      { "value": "能源/矿产/电力", "key": "能源/矿产/电力" },
      { "value": "学生", "key": "学生" },
      { "value": "政府/机构/组织", "key": "政府/机构/组织" },
      { "value": "农林牧渔", "key": "农林牧渔" },
      { "value": "交通/物流/仓储", "key": "交通/物流/仓储" },
      { "value": "教育/培训/科研", "key": "教育/培训/科研" },
      { "value": "医疗/医药", "key": "医疗/医药" },
      { "value": "贸易/批发/零售", "key": "贸易/批发/零售" },
      { "value": "通信/电子/半导体", "key": "通信/电子/半导体" },
      { "value": "汽车制造/维修/零配件", "key": "汽车制造/维修/零配件" },
      { "value": "制造业", "key": "制造业" },
      { "value": "耐用消费品", "key": "耐用消费品" },
      { "value": "快速消费品", "key": "快速消费品" },
      { "value": "文化传媒广告", "key": "文化传媒广告" },
      { "value": "生活服务业", "key": "生活服务业" },
      { "value": "商务服务业", "key": "商务服务业" },
      { "value": "房地产业/建筑业", "key": "房地产业/建筑业" },
      { "value": "IT/互联网", "key": "IT/互联网" },
      { "value": "金融业", "key": "金融业" }],
  },
];

export const initSearchFormData = () => {
  return {
    educationStr: "",
    experienceStr: "",
    industryStr: "",
    salaryStr: "",
  };
};

export const filterSpaceData = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};