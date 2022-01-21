export const columnsMap = [
  {
    prop: "rank",
    label: "合伙人等级",
  },
  {
    prop: "bail",
    label: "等级余额",
  },
  {
    prop: "discountRate",
    label: "产品折扣率",
  },
];
export const initMemberForm = () => {
  return {
    rank: "",
    bail: "",
    discountRate: "",
  };
};
export const initForm = () => {
  return {
    rank: "",
    bail: "",
    discountRate: "",
  };
};

const intValidateInt = (rule: any, value: any, callback: any) => {
  if (/(^[0-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/.test(value) || value === "") {
    callback();
  } else {
    callback(new Error());
  }
};//正数 小数后两位

const intValidateDiscount = (rule: any, value: any, callback: any) => {
  if (/^[0-9]{1}([.]([0-9]){1,2})?$/.test(value) || value === "") {
    callback();
  } else {
    callback(new Error());
  }
};//0-10 小数后两位

export const rules = {
  rank: [
    { required: true, message: "请输入 0 及以上的数字", trigger: "change" },
  ],
  bail: [
    { required: true, validator: intValidateInt, message: "请输入 0 及以上的数字，保留两位小数", trigger: "change" },
  ],
  discountRate: [
    { required: true, validator: intValidateDiscount, message: "请输入0-10以内的折扣率例如9.9", trigger: "change" },
  ],
};
