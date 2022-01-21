import { dictsMap, columnsCommon, columnsAfter } from '../options';


const columnsListMap = [
  ...columnsCommon,
  ...columnsAfter,
];

const columnsAdminListMap = [
  ...columnsCommon,
  {
    prop: "auditStatus",
    label: "审核状态",
    type: "slot",
    width: 100,
  },
  ...columnsAfter,
];



const initSearchForm = () => {
  return {
    name: "",
    statusFlag: "",//活动状态
    auditStatus: "",//审核状态
    headStartTime: "",//活动开始时间头
    offalStartTime: "",//活动结束时间尾
    headPublishTime: "",//活动发布时间头
    offalPublishTime: "",//活动发布时间尾
    signUp: "0",//已报名
  };
};

export {
  dictsMap,
  columnsListMap,
  columnsAdminListMap,
  initSearchForm,
};
