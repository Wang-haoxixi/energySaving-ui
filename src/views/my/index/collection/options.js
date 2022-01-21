import {
  getCollectGetPage,
} from "@/api/dms/recruit";

export const tableOption = [{
  label: "主体",
  prop: "name",
  type: "slot",
}, {
  label: "收藏时间",
  prop: "createTime",
  width: "150",
  type: "slot",
}];

export const recruitColumns = [{
  label: "职位名称",
  prop: "recruitName",
  type: "slot",
}, {
  label: "地点",
  prop: "workplace",
}, {
  label: "状态",
  prop: "state",
  type: "dict",
  width: "120px",
}];

export const tabList = [
  {
    label: "任务",
    value: "3",
    type: "task",
    columnsName: "任务主题",
  },
  {
    label: "材料",
    value: "0",
    type: "material",
    columnsName: "材料名称",
  },
  {
    label: "文章",
    value: "1",
    type: "material",
    columnsName: "文章名称",
  },
  {
    label: "说说",
    value: "2",
    type: "thought",
    columnsName: "说说内容",
  },
  {
    label: "纪要",
    value: "4",
    type: "summary",
    columnsName: "纪要标题",
  },
  {
    label: "活动",
    value: "5",
    type: "activity",
    columnsName: "活动标题",
  },
  {
    label: "魔方",
    value: "6",
    type: "product",
    columnsName: "魔方名称",
  },
  {
    label: "能聘",
    value: "7",
    type: "recruit",
    columnsMaps: recruitColumns,
    requestFn: getCollectGetPage,
  },
  {
    label: "课程",
    value: "9",
    type: "course",
    columnsName: "课程名称",
  },
];

const typeDetailList = {};
for (const item of tabList) {
  typeDetailList[item.value] = item;
}

export {
  typeDetailList,
};

export const dictsMap = {
  state: {
    0: '招聘中',
    1: '停止招聘',
  },
};
