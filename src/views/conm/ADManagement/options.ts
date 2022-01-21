import { getPcTaskWorkPage } from "@/api/qms/cooperation_list";
import { getActivitiePage } from "@/api/meetting/publish";
import { getProductListPage } from "@/api/dms/product";
import { getChannelPage } from "@/api/qms/questionnaire";
import { fetchAllPage } from "@/api/dms/material";
import { getExamexaminationAppPage } from "@/api/qms/exam_examination";

const dictsMap = {
  status: {
    0: "禁用",
    1: "正常",
  },
  adslotId: {},
};
const initForm = () => {
  return {
    adId: "", //广告id
    adslotId: "",
    name: "", // 广告名称
    beginDate: "", //开始时间
    endDate: "", //结束时间
    type: "products",//广告类型
    jumpType: "1",//跳转类型
    relationId: "",//关联id
    url: "", //广告url
    keyWords: "",//关键字标签名称
    text: "", //广告文字
    imageUrl: "", //广告图片
    seq: "", //排序,
  };
};
const columnsMap = [
  {
    prop: "seq",
    label: "广告排序",
    width: "80px",
  },
  {
    prop: "imageUrl",
    label: "广告缩略图",
    type: "slot",
    width: "180px",
  },
  {
    prop: "name",
    label: "广告名称",
  },
  {
    prop: "adslotId",
    label: "广告位",
    type: "dict",
  },
  {
    prop: "beginDate",
    label: "开始时间",
    type: "slot",
    width: "160px",
  },
  {
    prop: "endDate",
    label: "结束时间",
    type: "slot",
    width: "160px",
  },
];

const rules = {
  name: [
    {
      required: true,
      message: "广告名称不能为空",
      trigger: "change",
    },
  ],
  adslotId: [{
    required: true,
    message: "广告位不能为空",
    trigger: "change",
  }],
  seq: [{
    required: true,
    message: "排序不能为空",
    trigger: "blur",
  }],
  imageUrl: [{
    required: true,
    message: "广告图片不能为空",
    trigger: "change",
  }],
  type: [{
    required: true,
    message: "广告类型不能为空",
    trigger: "change",
  }],
  // relationId: [{
  //   required: true,
  //   message: "跳转对象不能为空",
  //   trigger: "change",
  // }],
  // url: [{
  //   required: true,
  //   message: "请输入URL",
  //   trigger: ["change", 'blur'],
  // }],
  // keyWords: [{
  //   required: true,
  //   message: "标签不能为空",
  //   trigger: "change",
  // }],
};



const selectDict = {
  "task": {//任务
    selectLabelName: "title",
    searchName: "name",
    methods: getPcTaskWorkPage,
  },
  "activity": {//活动
    selectLabelName: "name",
    searchName: "name",
    methods: getActivitiePage,
  },
  "products": {//魔方
    selectLabelName: "name",
    searchName: "name",
    methods: getProductListPage,
  },
  "questionnaire": {//问卷
    selectLabelName: "name",
    searchName: "name",
    methods: getChannelPage,
  },
  "material": {//材料专栏
    selectLabelName: "materialName",
    searchName: "materialName",
    methods: fetchAllPage,
  },
  "exam": {
    selectLabelName: "examName",
    searchName: "examName",
    methods: getExamexaminationAppPage,
  },
};

export { dictsMap, columnsMap, initForm, rules, selectDict };
