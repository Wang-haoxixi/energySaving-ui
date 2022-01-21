import { commonDictsMap } from "../util";
import { typeDictsMap } from "../options";
const dictsMap = {
  certificationStatus: commonDictsMap.certificationStatus,
  type: typeDictsMap
};

const columnsMap = [
  {
    label: "ID",
    prop: "id",
    width: 75
  },
  {
    label: "名称",
    prop: "name",
    type: "slot",
    minWidth: 200
  },
  {
    label: "所属组织",
    prop: "orgName"
  },
  {
    label: "类型",
    prop: "type",
    type: "dict"
  },
  {
    label: "类别",
    prop: "category",
    type: "slot"
  },
  {
    label: "负责人",
    prop: "creatorName"
  },
  {
    label: "状态",
    prop: "certificationStatus",
    type: "dict"
  }
];

export { dictsMap, columnsMap };
