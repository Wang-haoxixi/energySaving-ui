const columnsMap = [
  {
    prop: "name",
    label: "问卷名称",
  },
  {
    prop: "userName",
    label: "创建人",
  },
];
const dictsMap = {
  type: {
    "1": "单选题",
    "2": "多选题",
    "3": "图片单选",
    "4": "图片多选",
    "5": "下拉题",
    "6": "填空题",
    "7": "多项填空",
    "8": "打分题",
    "9": "上传题",
    "10": "备注说明",
    "11": "结束语",
  },
};
const statusDic = [{
  value: "1",
  label: "进行中",
}, {
  value: "3",
  label: "已结束",
}];

export { columnsMap, dictsMap, statusDic };