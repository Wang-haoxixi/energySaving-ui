const initNoticeForm = () => {
  return {
    id: 0, // ID
    title: "", // 标题
    text: "", // 公告内容
    isTop: false,
  };
};

const initInviteSettingForm = () => {
  return {
    allowNonAdInEm: false,
    joinDepType: "1",
    dept: null,
    invitExpireTime: "",
    welcomeWord: "",
  };
};

const initOrgChargeForm = () => {
  return {
    cost: 99,
  };
};

const suggestTypeOptions = [
  {
    value: "1",
    label: "功能建议",
  },
  {
    value: "2",
    label: "产品缺陷",
  },
];

class PrizeSuggestDTO {
  id = 0;
  title = "";
  type = "1";
  content = "";
  files: any[] = [];
  file = "";
  creatorName = "";
  createTime = "";
  status = 1;
  message = "";
  amount = 0;
}

const toRequestObj = (that: PrizeSuggestDTO) => {
  return {
    title: that.title,
    type: that.type,
    content: that.content,
    file: that.files[0]?.url ?? "",
  };
};

const toDealRequestObj = (that: PrizeSuggestDTO) => {
  return {
    status: that.status,
    message: that.message,
    amount: that.amount,
    id: that.id,
  };
};
export { initNoticeForm, initInviteSettingForm, initOrgChargeForm, suggestTypeOptions, PrizeSuggestDTO, toRequestObj, toDealRequestObj };
