class Basic {
  id = null;
  /**
   * 类型1魔方,2活动,3课程
   */
  type = null;
}

class BasicDTO extends Basic {
  source = null;
}

class OrderInfo extends Basic {
  avatar = null;
  name = "";
  orgName = "";
  amount = null;
  price = null;
  cash = null;
  category = null;
  discountPrice = null;
  discountCash = null;
  goodsPrice = null;
  goodsCash = null;
  payCurrency = null;
  paymentMethod = null;
}

class OrderDTO extends BasicDTO {
  amount = 1;
  contactId = null;
}

class ActivityOrderDTO {
  name = ""; //  报名人姓名
  phone = ""; //  报名人手机号
  email = ""; //  报名人邮箱
  company = ""; //  报名人公司
  position = ""; // 报名人职位
  remarks = ""; //  报名人备注
  conferenceId = null; //  活动id
  amount = null; //  购票数量
  orderNum = null; //  购票数量
  ticketingId = null; //  票务id
  source = null; //  来源
  infoFormConfigList: any[] = []; //  联系人自定义表单
}

class ActivityOrderInfo extends ActivityOrderDTO {
  type = null; // 订单类型
  discountRate = null; // 折扣率
  activityName = ""; // 活动名称
  rank = null; // 合伙人等级
  ticketingType = null; // 票务类型 1 免费票 2 付费票
  ticketName = null; // 票务名称
  activityId = null; // 活动id
  ticketId = null; // 票务id
  startTime = null; // 开始时间
  endTime = null; // 结束时间
  city = null; // 城市
  field = null; // 地区
  ticketingRemarks = null; // 票种备注
  money = null; // 人民币价格
  canMoney = null; // 原宝贝价格
  discountMoney = null; // 人民币折扣价
  discountCanMoney = null; // 宝贝折扣价
  totalMoney = null; // 人民币总价
  totalCanMoney = null; // 宝贝总价
}

class CourseOrderInfo extends Basic {
  courseName = "";
  cover = "";
  chargeStatus = "";
  priceAmount = 0;
  cashAmount = 0;
  discountPrice = 0;
  discountCash = 0;
}

class CourseOrderDTO extends BasicDTO {}

export {
  OrderInfo,
  OrderDTO,
  ActivityOrderInfo,
  ActivityOrderDTO,
  CourseOrderInfo,
  CourseOrderDTO
};
