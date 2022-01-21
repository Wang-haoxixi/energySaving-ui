import { ActivityDTO } from "../options";
import {
  toDtoForm as toDtoTicketForm,
  toVoForm as toVoTicketForm
} from "../ticket/options";

const toDtoForm = (row: ActivityDTO) => {
  row.startTime = row.time[0];
  row.endTime = row.time[1];
  row.classification = row.classificationName[0];
  row.subClassification = row.classificationName[1] || "";
  row.ticketingManagements = row.ticketingManagements.map(m =>
    toDtoTicketForm(m)
  );
  row.fileList = row.files.map(m => ({
    attachFile: m.url,
    original: m.name
  }));
  row.conferenceFormList = row.conferenceFormList.slice(2);
  return row;
};
const toVoForm = (row: ActivityDTO) => {
  row.time = [row.startTime, row.endTime];
  row.classificationName = row.subClassification
    ? [row.classification, row.subClassification]
    : [row.classification];
  row.ticketingManagements = row.ticketingManagements.map(m =>
    toVoTicketForm(m)
  );
  row.files = row.fileList.map(m => ({
    url: m.attachFile,
    name: m.original
  }));
  row.cityField = { cityId: row.cityId, filed: row.field };
  return row;
};

const publishToLobbyDict = [
  {
    value: "1",
    label: "公开发布，希望节能保平台协助推广，需审核"
  },
  {
    value: "0",
    label: "私密活动，仅在组织内查看报名"
  }
];
const organizationInvitedDict = [
  {
    value: "1",
    label: "参会者报名后加入会议所在组织"
  },
  {
    value: "0",
    label: "不需要"
  }
];

const defaultFormList = [
  {
    label: "姓名",
    must: true,
    type: "input",
    value: "",
    placeholder: "请输入姓名",
    fixedItem: true,
    code: "user_name"
  },
  {
    label: "手机号",
    must: true,
    type: "input",
    value: "",
    placeholder: "请输入手机号",
    fixedItem: true,
    code: "phone_number"
  },
  {
    label: "邮箱",
    must: false,
    type: "input",
    value: "",
    placeholder: "请输入邮箱",
    fixedItem: true,
    code: "email"
  },
  {
    label: "单位",
    must: false,
    type: "input",
    value: "",
    placeholder: "请输入单位",
    fixedItem: true,
    code: "company"
  },
  {
    label: "职务",
    must: false,
    type: "input",
    value: "",
    placeholder: "请输入职务",
    fixedItem: true,
    code: "position"
  },
  {
    label: "备注",
    must: false,
    type: "textarea",
    value: "",
    placeholder: "请输入备注",
    fixedItem: true
  }
];

const customFormMap = {
  input: () => {
    return {
      label: "",
      value: "",
      type: "input",
      must: false,
      fixedItem: false,
      placeholder: ""
    };
  },
  radio: () => {
    return {
      label: "",
      value: "",
      type: "radio",
      must: false,
      fixedItem: false,
      placeholder: "",
      optionsList: []
    };
  },
  checkbox: () => {
    return {
      label: "",
      value: "",
      type: "checkbox",
      must: false,
      fixedItem: false,
      placeholder: "",
      optionsList: []
    };
  },
  textarea: () => {
    return {
      label: "",
      value: "",
      type: "textarea",
      must: false,
      fixedItem: false,
      placeholder: ""
    };
  }
};
const formType = {
  input: "input",
  radio: "radio",
  checkbox: "checkbox",
  textarea: "textarea"
};
export {
  toDtoForm,
  toVoForm,
  toVoTicketForm,
  publishToLobbyDict,
  organizationInvitedDict,
  defaultFormList,
  customFormMap,
  formType
};
