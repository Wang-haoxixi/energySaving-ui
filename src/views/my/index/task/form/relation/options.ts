export const tabList = [{
  name: "材料",
  value: "material",
  icon: "el-icon-woneng-file-eps",
  fn: 'loadMaterial',
}, {
  //   name: "纪要",
  //   value: "summary",
  //   icon: "el-icon-woneng-jiyao",
  //   fn: 'loadSummary',
  // }, {
  name: "活动",
  value: "activity",
  icon: "el-icon-woneng-huodong",
  fn: 'loadMaterial',
}, {
  name: "问卷",
  value: "questionnaire",
  icon: "el-icon-woneng-wenjuan",
  fn: 'loadMaterial',
}];

export const initParams = () => {
  return {
    material: {
      current: 1,
      size: 10,
    },
    summary: {
      current: 1,
      size: 10,
    },
    questionnaire: {
      current: 1,
      size: 10,
    },
    activity: {
      current: 1,
      size: 10,
      statusFlag: 1,
    },
  };
};

export const tabData = {
  material: [],
  summary: [],
  activity: [],
  questionnaire: [],
};

export const initList = () => {
  return {
    activity: [],
    material: [],
    summary: [],
    questionnaire: [],
  };
};

export const routeList = {
  material: "/my/index/material/",
  summary: "/mlms/summary_detail/",
  questionnaire: "/questionnaire_edit/",
  activity: "/channel/activity/detail/",
};