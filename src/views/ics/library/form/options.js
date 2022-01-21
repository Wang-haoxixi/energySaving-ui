export const dictsMap = {

};

export const initFormData = () => {
  return {
    id: "",
    replyStr: "",
    colloquialReplyStr: "",
    tags: [],
    isUsed: 1,
    types: [],
    questionList: [{ key: "", id: "" }],
  };
};

export const rules = {
  question: [
    { required: true, message: "必填", trigger: "blur" },
  ],
  replyStr: [
    { required: true, message: "必填", trigger: "blur" },
  ],
  colloquialReplyStr: [
    { required: true, message: "必填", trigger: "blur" },
  ],
  types: [
    { required: true, message: "必填", trigger: "blur" },
  ],
  isUsed: [
    { required: true, message: "必填", trigger: "blur" },
  ],
};
