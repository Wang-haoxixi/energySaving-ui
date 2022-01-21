export const initForm = () => {
  return {};
};

export const status = {
  is_not: [
    { label: "是", value: "1" },
    { label: "否", value: "0" },
  ],
  matter_status: [
    { label: "在用", value: "1" },
    { label: "暂停", value: "2" },
    { label: "取消", value: "3" },
  ],
  level: [
    { label: "省", value: "1" },
    { label: "省市", value: "2" },
    { label: "省市县", value: "3" },
    { label: "省县", value: "4" },
    { label: "市县", value: "5" },
    { label: "市", value: "6" },
    { label: "县", value: "7" },
  ],
};