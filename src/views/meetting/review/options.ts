import { dictsMap } from '../options';

const columnsMap = [
  {
    prop: "name",
    label: "活动名称",
    type: "slot",
  },
  {
    prop: "createByName",
    label: "创建人",
    width: "100px",
  },
  {
    prop: "orgName",
    label: "所属组织",
  },
  {
    prop: "statusFlag",
    label: "活动状态",
    type: "dict",
    width: "100px",
  },
  {
    prop: "auditStatus",
    label: "审核状态",
    type: "dict",
    width: "100px",
  },
  {
    prop: "isRecommend",
    label: "推荐状态",
    type: "dict",
    width: "100px",
  },
  {
    prop: "tickerNumber",
    label: "报名人数",
    width: "120px",
  },
];

const initSearchForm = () => {
  return {
    name: "",
    statusFlag: "",//活动状态
    isRecommend: "",//是否推荐
    auditStatus: "",//审核状态
    headStartTime: "",//活动开始时间头
    offalStartTime: "",//活动结束时间尾
    headPublishTime: "",//活动发布时间头
    offalPublishTime: "",//活动发布时间尾
  };
};

export {
  dictsMap,
  columnsMap,
  initSearchForm,
};