/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { checkContactUsers } from "@/util/rules";
import { commonDictsMap, ProductDTO } from "./util";
import _ from "lodash";
import store from "@/store";
const dictGroup = store.state.common!.dictGroup;
const productTypeList = dictGroup.get("dms_product_type")?.map(m => ({
  key: m.value,
  name: m.label,
}));
const productType = _(productTypeList)
  .keyBy("key")
  .mapValues("name")
  .value();
// {
//   'key':'name'
// }
const typesMap = [
  {
    key: 10,
    name: "高效节能产业",
    category: "dms_product_type_efficient",
  },
  {
    key: 11,
    name: "先进环保产业",
    category: "dms_product_type_advanced",
  },
  {
    key: 12,
    name: "绿色交通车船和设备制造产业",
    category: "dms_product_type_traffic",
  },
  {
    key: 13,
    name: "清洁生产原料制造业",
    category: "dms_product_type_cleanmaterial",
  },
  {
    key: 14,
    name: "清洁生产设备制造和设施建设业",
    category: "dms_product_type_cleanfacility",
  },
  {
    key: 15,
    name: "清洁生产技术服务业",
    category: "dms_product_type_cleanserve",
  },
  {
    key: 16,
    name: "核电产业",
    category: "dms_product_type_nuclearpower",
  },
  {
    key: 17,
    name: "资源循环利用产业",
    category: "dms_product_type_circulation",
  },
  {
    key: 18,
    name: "风能产业",
    category: "dms_product_type_wind",
  },
  {
    // key: 1,
    // name: "软件",
    key: 19,
    name: "太阳能产业",
    category: "dms_product_type_sun",
  },
  {
    // key: 2,
    // name: "报告",
    key: 20,
    name: "生物质能产业",
    category: "dms_product_type_biomass",
  },
  {
    // key: 3,
    // name: "数据",
    key: 21,
    name: "水力发电产业",
    category: "dms_product_type_waterpower",
  },
  {
    // key: 4,
    // name: "服务",
    key: 22,
    name: "智能电网产业",
    category: "dms_product_type_powergrid",
  },
  {
    // key: 5,
    // name: "实物",
    key: 23,
    name: "其他清洁能源产业",
    category: "dms_product_type_otherclean",
  },
  {
    key: 24,
    name: "传统能源清洁高效利用产业",
    category: "dms_product_type_tradition",
  },
];
const noPlanTypesMap =
  productTypeList && productTypeList.filter(m => m.key !== "0");
// {
//   1: 'category'
// }
const valueMapChild = {
  // 0: "dms_plan_type", // 方案类型
  // 1: "dms_product_type_software", // 软件类型
  // 2: "dms_product_type_report", //报告类型
  // 3: "dms_product_type_data", //数据类型
  // 4: "dms_product_type_serve", //服务类型
  // 5: "dms_product_type_commodity" //实物类型
  // 0: "dms_plan_type", // 方案类型
  // 1: "dms_product_type_software", // 市场分析
  // 2: "dms_product_type_report", //产品设计
  // 3: "dms_product_type_data", //UI设计
  // 4: "dms_product_type_serve", //软件开发"
  // 5: "dms_product_type_commodity", //软件测试
  // 6: "dms_product_type_deploy", //软件部署
  // 7: "dms_product_type_extension", //运营推广
  // 8: "dms_product_type_maintain", //软件维护

  18: 'dms_product_type_wind',
  19: 'dms_product_type_sun',
  20: 'dms_product_type_biomass',
  21: 'dms_product_type_waterpower',
  22: 'dms_product_type_powergrid',
  23: 'dms_product_type_otherclean',
  24: 'dms_product_type_tradition',
  10: 'dms_product_type_efficient',
  11: 'dms_product_type_advanced',
  17: 'dms_product_type_circulation',
  12: 'dms_product_type_traffic',
  13: 'dms_product_type_cleanmaterial',
  14: 'dms_product_type_cleanfacility',
  15: 'dms_product_type_cleanserve',
  16: 'dms_product_type_nuclearpower',
};
const categoryDictNameMap = valueMapChild;
// {
//   1: 'type'
// }
const typeDictsMap = _(typesMap)
  .keyBy("key")
  .mapValues("name")
  .value();
const dictsMap = {
  certificationStatus: commonDictsMap.certificationStatus,
  type: typeDictsMap,
};

export const calculateDict = (scope: any) => {
  const dictGroup = store.state.common!.dictGroup;
  if (scope.row.category && scope.row.type) {
    const dictName =
      valueMapChild[scope.row.type as keyof typeof valueMapChild];
    const isExist = _.keyBy(dictGroup.get(dictName), "value")[
      scope.row.category
    ];
    if (isExist) {
      return isExist.label;
    } else {
      return "暂无";
    }
  } else {
    return "暂无";
  }
};

const columnsMap = [
  {
    label: "ID",
    prop: "id",
    width: 75,
  },
  {
    label: "名称",
    prop: "name",
    type: "slot",
    minWidth: 300,
  },
  {
    label: "类型",
    prop: "type",
    type: "dict",
  },
  // {
  //   label: "类别",
  //   prop: "category",
  //   type: "slot",
  // },
  {
    label: "负责人",
    prop: "creatorName",
    width: "100px",
  },
  {
    label: "创建时间",
    prop: "createTime",
    type: "date",
    formatString: "YYYY-MM-DD",
    width: "100px",
  },
  {
    label: "审核状态",
    prop: "certificationStatus",
    type: "slot",
    width: "120px",
  },
];

const initForm = (type = "1") => {
  return {
    id: "", // ID
    type, // 软件type为1（String),报告类传参数type为2
    category: "",
    imageUrl: "", // logo
    number: "", // 编号
    name: "", // 名称
    website: "", // 网址
    onlineTime: "", //上线时间
    tagKeywords: [], // 标签
    tapeLibrary: 0, // 是否带库
    isCase: 1, // 是否带库
    belongTo: 0, // 0-组织，1-个人
    isOpen: 3, // 开放范围
    price: "", // 产品估值
    cash: "", //
    instructions: "", // 估值说明
    synopsis: "", // 产品简介
    description: "", // 产品介绍
    detailsImg: "", // 产品介绍图
    customerCase: "", // 客户案例
    attachs: [],
    attachList: [], //new
    attach: "", //old TODO: 移除
    attachName: "", //old TODO: 移除
    exam_address: "",
    isFree: "", //是否免费 1免费 0不免费
    previewImgUrl: [],
    version: "",
    versionTime: "",
  };
};

const toDtoForm = (row: ProductDTO) => {
  const newForm = { ...row };
  newForm.attachList = newForm.attachs.map(m => ({
    attachFile: m.url,
    original: m.name,
  }));
  newForm.productIds = newForm.productList.map(m => m.id);
  return newForm;
};

const toVoForm = (row: ProductDTO) => {
  const newForm = { ...row };
  newForm.attachs = newForm.attachList.map(m => ({
    url: m.attachFile,
    name: m.original,
  }));
  newForm.priceChecked = newForm.price !== 0;
  newForm.cashChecked = newForm.cash !== 0;
  return newForm;
};

const initSearchForm = () => {
  return {
    name: "",
    orgName: "",
    type: "",
    creatorName: "",
    certificationStatus: "",
  };
};

const rules = {
  imageUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
  category: [{ required: true, message: "请选择类别", trigger: "change" }],
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  onlineTime: [{ required: true, message: "请填写上线时间", trigger: "blur" }],
  tagKeywords: [
    {
      type: "array",
      min: 1,
      max: 5,
      message: "标签至少 1 个，最多 5 个",
      trigger: "change",
    },
    { type: "array", required: true, message: "请填写标签", trigger: "change" },
  ],
  // attachs: [{ type: "array", required: true, message: "请上传附件", trigger: "blur" }],
  valuation: [{ required: true, message: "请填写估值", trigger: "blur" }],
  instructions: [
    { required: true, message: "请填写估值说明", trigger: "blur" },
  ],
  synopsis: [{ required: true, message: "请填写简介", trigger: "blur" }],
  description: [{ required: true, message: "请填写详情", trigger: "blur" }],
  userRelationCharges: [
    { required: true, validator: checkContactUsers("负责人"), trigger: "blur" },
  ],
  attachs: [
    {
      required: true,
      message: "请上传附件",
      trigger: "blur",
    },
  ],
};

export {
  columnsMap,
  initForm,
  toDtoForm,
  rules,
  dictsMap,
  typesMap,
  categoryDictNameMap,
  initSearchForm,
  toVoForm,
  noPlanTypesMap,
  typeDictsMap,
  productType,
};
