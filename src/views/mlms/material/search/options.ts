export function initSearchForm() {
  return {
    materialName: "",
    tag: [],
    tagName: "",
  };
}

export const tableOption = [
  {
    label: "材料名称",
    prop: "materialName",
  },
  {
    label: "上传者",
    prop: "realName",
    width: "180",
  },
  {
    label: "价格",
    prop: "downloadCost",
    type: "slot",
    width: "100",
  },
];
