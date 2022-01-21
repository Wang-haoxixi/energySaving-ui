export const tableOption = [{
  label: "举报内容",
  prop: "tipOffReasonDetails",
}, {
  label: "举报人",
  prop: "realName",
  width: "120px",
}, {
  label: "内容分类",
  prop: "tipOffType",
  type: "dictGroup",
  dictName: "dms_report_content_type",
  width: "100px",
}, {
  label: "举报类型",
  prop: "tipOffReason",
  type: "dictGroup",
  dictName: "dms_report_type",
}, {
  label: "举报时间",
  prop: "createTime",
}, {
  label: "处理状态",
  prop: "handleStatus",
  width: "100",
  type: "slot",
}];

export const dictsMap = {
  handleStatus: {
    0: "待处理",
    1: "已处理",
    2: "已关闭",
  },
};

export const initSearchForm = () => {
  return {
    tipOffReasonDetailsPartKey: "",
    realName: "",
    tipOffType: "",
    tipOffReason: "",
  };
};
