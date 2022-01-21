import { dictsMap, ActivityDTO } from '@/views/meetting/options.ts';

const columnsMap = [
  {
    prop: "detail",
    label: "活动信息",
    type: "slot",
    minWidth: 275,
  },
  {
    prop: "ticketName",
    label: "票务名称",
  },
  {
    prop: "ticketingRemarks",
    label: "票种备注",
  },
  // {
  //   prop: "money",
  //   label: "票价",
  //   type: "slot",
  // },
  {
    prop: "count",
    label: "购票数量",
    type: "slot",
  },

  {
    prop: "total",
    label: "商品原价",
    type: "slot",
  },
  {
    prop: "rate",
    label: "优惠后实际支付",
    type: "slot",
    width: "140",
  },
  // {
  // prop: "orderStatusName",
  // label: "状态",
  // type: "dict",
  // },
];

class ActivityDetailDTO extends ActivityDTO {
  /**
   * 限额，总票数
   */
  limit = 0;
  /**
   * so名称
   */
  orgName = "";
  /**
   * 组织头像地址
   */
  orgAvatar = "";
  /**
   * 浏览数
   */
  browseNum = 0;
  /**
   * 城市
   */
  city = "";
  /**
   * 收藏
   */
  favoriteStatus = "2";
  /**
   * 能否购票
   */
  isTicket = "1";
  /**
   * 组织id
   */
  orgId = 0;
  /**
   * 是否收藏
   */
  collect = false;
}
const dictsMaps = {
  ...dictsMap, ticketingType: {
    1: "免费票",
    2: "待支付",
  },
};
export {
  dictsMaps,
  columnsMap,
  ActivityDetailDTO,
};
