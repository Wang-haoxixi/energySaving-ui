const unitMap = {
  WeCanPay: "贝",
  OfflinePay: "元"
};

const dictsMap = {
  statusFlag: {
    1: "进行中",
    0: "草稿",
    2: "已结束",
    3: "被下架"
  },
  organizationInvited: {
    1: "是",
    0: "不是"
  },
  auditStatus: {
    0: "未提交",
    1: "审核中",
    2: "未通过",
    3: "已通过"
    // 4: "被下架",
  },
  isRecommend: {
    0: "否",
    1: "是"
  },
  orderStatus: {
    0: "待支付",
    1: "支付成功",
    2: "支付失败",
    3: "取消报名"
  }
};
const columnsCommon = [
  {
    prop: "poster",
    label: "活动封面",
    type: "slot",
    width: 175
  },
  {
    prop: "detail",
    label: "活动信息",
    type: "slot",
    minWidth: 330
  },
  {
    prop: "statusFlag",
    label: "活动状态",
    type: "slot",
    width: 100
  }
];

const columnsAfter = [
  {
    prop: "joinNumber",
    label: "参与人数",
    width: 100
  },
  {
    prop: "organizationInvited",
    label: "邀请成员进组织",
    width: 120,
    type: "dict",
    key: "organizationInvited"
  }
];

/**
 * 支付方式列表
 * amount 金额
 * type 支付类型(WeCanPay:宝贝, OfflinePay:人民币)
 */

class PayMethod {
  constructor(
    amount: number,
    name: string,
    type: string,
    typeBoolean: boolean
  ) {
    this.amount = amount;
    this.name = name;
    this.type = type;
    this.typeBoolean = typeBoolean;
  }
  amount = 1;
  name = "";
  type = "";
  typeBoolean = false;
}

const setWeCanPayValue = (v: number, t = true) => {
  return new PayMethod(v, "宝贝", "WeCanPay", t);
};
const setOfflinePayValue = (v: number, t = true) => {
  return new PayMethod(v, "人民币", "OfflinePay", t);
};

const toVoTicket = (payMethodList: PayMethod[]) => {
  if (payMethodList.length === 2) {
    return payMethodList.map(m => {
      if (m.type === "WeCanPay") {
        return setWeCanPayValue(m.amount);
      } else if (m.type === "OfflinePay") {
        return setOfflinePayValue(m.amount);
      } else {
        throw new Error("信息错误");
      }
    });
  } else if (payMethodList.length === 1) {
    if (payMethodList[0].type === "WeCanPay") {
      return [
        setWeCanPayValue(payMethodList[0].amount),
        setOfflinePayValue(1, false)
      ];
    } else if (payMethodList[0].type === "OfflinePay") {
      return [
        setOfflinePayValue(payMethodList[0].amount),
        setWeCanPayValue(1, false)
      ];
    } else {
      throw new Error("信息错误");
    }
  } else {
    return payMethodList;
  }
};

const toVoTicketNew = (row: TicketDTO) => {
  const payMethodList: PayMethod[] = [];
  if (row.canMoney) {
    payMethodList.push(new PayMethod(row.canMoney, "宝贝", "WeCanPay", true));
  }
  if (row.money) {
    payMethodList.push(new PayMethod(row.money, "人民币", "OfflinePay", true));
  }
  if (payMethodList.length === 2) {
    return payMethodList.map(m => {
      if (m.type === "WeCanPay") {
        return setWeCanPayValue(m.amount);
      } else if (m.type === "OfflinePay") {
        return setOfflinePayValue(m.amount);
      } else {
        throw new Error("信息错误");
      }
    });
  } else if (payMethodList.length === 1) {
    if (payMethodList[0].type === "WeCanPay") {
      return [
        setWeCanPayValue(payMethodList[0].amount),
        setOfflinePayValue(1, false)
      ];
    } else if (payMethodList[0].type === "OfflinePay") {
      return [
        setOfflinePayValue(payMethodList[0].amount),
        setWeCanPayValue(1, false)
      ];
    } else {
      throw new Error("信息错误");
    }
  } else {
    return payMethodList;
  }
};
class TicketDTO {
  id = 0;
  /**
   * 活动ID
   */
  conferenceId = 0;
  /**
   * 票务类型（1：免费票；2：付费票）
   */
  ticketingType = "1";
  /**
   * 票务名称
   */
  ticketingName = "免费票";
  /**
   * 数量
   */
  number = 1;
  /**
   * 备注
   */
  remarks = "";
  /**
   * 支付方式列表
   */
  payMethodList: PayMethod[] = [];
  /**
   * 余票
   */
  surplus = 1;
  /**
   * 宝贝
   */
  canMoney = 1;
  /**
   * 人民币
   */
  money = 1;
  /**
   * 支付方式
   */
  paymentMethod = 3;
  /**
   * 限购
   */
  limitTicket = 1;
  /**
   * 票种审核
   */
  needAudit = false;
  /**
   * 允许退票
   */
  allowedRefund = false;
}
class ActivityDTO {
  id = 0;
  /**
   * 活动标题
   */
  name = "";
  /**
   * 类型
   */
  type = "";
  /**
   * 所属城市
   */
  cityId = [];
  /**
   * 场地
   */
  field = "";
  /**
   * 城市场地
   */
  cityField = { cityId: [], filed: "" };
  /**
   * 活动时间
   */
  time = ["", ""];
  /**
   * 活动开始时间
   */
  startTime = "";
  /**
   * 活动结束时间
   */
  endTime = "";
  /**
   * 活动分类
   */
  classificationName = ["", ""];
  /**
   * 活动分类（父类）
   */
  classification = "";
  /**
   * 活动分类（子类）
   */
  subClassification = "";
  /**
   * 活动标签
   */
  label: string[] = [];
  /**
   * 活动亮点
   */
  spot = "";
  /**
   * 活动详情
   */
  details = "";
  /**
   * 活动-主办方
   */
  sponsor = "";
  /**
   * 活动-联系人
   */
  contacts = "";
  /**
   * 活动-联系电话
   */
  phone = "";
  /**
   * 活动海报
   */
  poster = "";
  /**
   * 活动海报缩略图
   */
  posterThumbnail = "";
  /**
   * 是否勾选邀请参会人加入组织（0未勾选、1勾选）
   */
  organizationInvited = "1";
  /**
   * 	是否发布到活动大厅（0：不发布；1：发布到大厅）
   */
  publishToLobby = "1";
  /**
   * 提交方式（0 发布草稿、1 发布活动）
   */
  submitType = "1";
  /**
   * 发布还是草稿状态做展示用
   */
  statusFlag = "0";
  /**
   * 移除
   */
  detailsImg =
    "//183.131.134.242:10031/upload/20200617/8cca7c0e-5d37-4491-a096-dc480a6455fc.jpg";
  /**
   * 票务信息
   */
  ticketingManagements: TicketDTO[] = [new TicketDTO()];
  /**
   * 附件
   */
  fileList: any[] = [];
  files: any[] = [];
  /**
   * 自定义表单
   */
  conferenceFormList: Array<any> = [];
  /**
   * 是否线上
   */
  onLine = false;
}

export {
  unitMap,
  dictsMap,
  columnsCommon,
  columnsAfter,
  ActivityDTO,
  TicketDTO,
  PayMethod,
  toVoTicket as toVoTransfer,
  setWeCanPayValue,
  setOfflinePayValue,
  toVoTicketNew as toVoTransferNew
};
