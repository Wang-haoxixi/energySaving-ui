import { dictsMap, columnsCommon, columnsAfter, TicketDTO, toVoTransferNew } from '../options';

const rules = {
  ticketingType: [{ required: true, message: "不能为空", trigger: "change" }],
  ticketingName: [{ required: true, message: "不能为空", trigger: "blur" }],
  number: [{ required: true, message: "不能为空", trigger: "blur" }],
  // remarks: [{ required: true, message: "不能为空", trigger: "blur" }],
};
const columnsMap = [
  ...columnsCommon,
  {
    prop: "auditStatus",
    label: "审核状态",
    type: "slot",
    width: 100,
  },
  ...columnsAfter,
];
const ticketColumnsMap = [
  {
    prop: "tickName",
    label: "票务种类 / 名称",
    type: "slot",
  },
  {
    prop: "updateTime",
    label: "更新时间",
  },
  {
    prop: "money",
    label: "价格",
    type: "slot",
  },
  {
    prop: "number",
    label: "数量",
  },
  {
    prop: "remarks",
    label: "备注",
  },
];

const toDtoForm = (row: TicketDTO) => {
  row.money = 0;
  row.canMoney = 0;
  row.payMethodList = row.payMethodList.filter(m => {
    if (m.type === "OfflinePay") {
      row.money = m.typeBoolean ? m.amount : 0;
    }
    if (m.type === "WeCanPay") {
      row.canMoney = m.typeBoolean ? m.amount : 0;
    }
    return m.typeBoolean === true;
  });
  row.paymentMethod = row.money ? (row.canMoney ? 3 : 9) : 1;
  return row;
};

const toVoForm = (row: TicketDTO) => {
  row.payMethodList = toVoTransferNew(row);
  return row;
};

export {
  TicketDTO,
  dictsMap,
  columnsMap,
  ticketColumnsMap,
  rules,
  toDtoForm,
  toVoForm,
};
