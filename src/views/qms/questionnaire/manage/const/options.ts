// org config options
const dictsMap = {
  status: {
    "1": "进行中",
    "2": "草稿",
    "3": "已结束",
    "4": "审核中",
    "5": "未通过",
    "6": "未开始"
  },
  scope: {
    1: "生态开放",
    2: "组织内开放"
  }
};

const columnsMap = [
  {
    prop: "name",
    label: "问卷名称"
  },
  {
    prop: "userName",
    label: "创建人",
    width: 120
  },
  {
    prop: "orgName",
    label: "所属组织",
    width: 120
  },
  {
    prop: "status",
    label: "问卷状态",
    type: "slot",
    width: 120
  },
  {
    prop: "startTime",
    label: "开始时间",
    type: "slot",
    width: 140
  },
  {
    prop: "endTime",
    label: "结束时间",
    type: "slot",
    width: 140
  },
  {
    prop: "joinPeople",
    label: "填报人数",
    type: "slot",
    width: 120
  },
  {
    prop: "address",
    label: "地址",
    type: "slot"
  },
  {
    prop: "qrCode",
    label: "二维码",
    type: "slot",
    width: 90
  }
];

export { dictsMap, columnsMap };
