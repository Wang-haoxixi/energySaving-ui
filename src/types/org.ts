import { CommonData } from "./common";

class OrgExponentEntity {
  creditWorth = 0; //信用
  assetsWorth = 0; //数据资产
  bellAssets = 0; //宝贝
  mightyOne = 0; //用户 成员数量
  taskCount = 0; //任务数量
}
class OrgEntity {
  orgId = 0;
  avatar = "";
  name = "";
  cost = 0;
  establishmentTime = "";
  industry = "";
  contactInformation = "";
  region = "";
  contactAddress = "";
  introduction = "";
  slogan = "";
  creator = "";
  createBy = 0;
  abilityTag: string[] = []; //卓越标签
  administrators: any[] = []; // 所有管理员包括负责人
  magistrates: any[] = []; // 知事
  owner = new CommonData(0, "", ""); //负责人
  memberNum = 0; //成员数量(重复)
  integrity = 0; //完善
  deptNum = 0; //部门数量
  rank = 0; //资产排名
  activity = 0; //活跃度
  attention = 0; //关注度
  isFollow = 0;
  isExempt = false; //是否免审
  allowJoin = true; //是否允许加入
  isOpen = true; //是否开放
  visible = true; // 对外开发, 但管理员始终可见
  isCharge = false; //是否收费
  exponent = new OrgExponentEntity();
  /**
   * 是否加入 1是 0否
   */
  isJoin = 0;
  /**
   * 安全策略 so宝贝可见范围（1公开，2so成员可见，3不公开）
   */
  visibleRange = 1;
  redness = 1;
}

class OrgCardEntity {
  abilityTag = [];
  avatar = "";
  cost = 0;
  contactAddress = "";
  contactInformation = "";
  exponent = new OrgExponentEntity();
  industry = "";
  introduction = "";
  isFollowed = 0;
  isCharge = false; //是否收费
  learningTag = [];
  orgId = 3;
  orgName = "";
  projectTag = [];
  realName = "";
  slogan = "";
  /**
   * 是否加入 1是 0否
   */
  isJoin = 0;
  /**
   * 是否开放
   */
  isOpen = false;
  redness = 1;
}

export { OrgEntity, OrgCardEntity, OrgExponentEntity };
