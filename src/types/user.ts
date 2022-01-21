class UserExponentEntity {
  /**
   * 数据资产
   */
  assets = 0;
  /**
   * 宝贝资产
   */
  bellAssets = 0;
  /**
   * 信用值
   */
  credit = 0; //信用值
  /**
   * 粉丝数
   */
  fan = 0;
  /**
   * 好友
   */
  friend = 0;

  soCount = 0;
  /**
   * 任务数量
   */
  taskCount = 0;
  /**
   * 关注
   */
  follow = 0;
}

/**
 * 用户传递字段DTO
 */
interface UserDTO {
  userId: number;
  username: string;
  realName: string;
  /**
   * 脱敏
   */
  mobile: string;
  /**
   * 无脱敏
   */
  phone: string;
  avatar: string;
  orgId: number;
  sex: string;
  workPlace: string;
  company: string;
  industry: string;
  position: string;
  sign: string;
  introduction: string;
  birthday: string;
  householdRegister: string;
  weiXin: string;
  qq: string;
  mail: string;
  integrity: number;
  abilityTag: string[];
  workExperience: any[];
  learningSituation: any[];
  educationExperience: any[];
  /**
   * 是否设置了保护 true: 显示，false：不显示
   */
  isPrivacy: number;
  /**
   * 是否已经进入过SO引导页了
   */
  isGuided: boolean;
  /**
   * 红度
   */
  redness: number;
}
/**
 * 用户展示字段VO
 */
interface UserVO extends UserDTO {
  isFriend: number;
  isMaster: number;
  isApprentice: number;
  isFollowed: number;
  isBlock: number;
  exponent?: UserExponentEntity;
  // 0 否 1 可以查看
  canSee: number;
}
/**
 * 用户登陆全部信息
 */
interface UserInfo extends UserDTO {
  orgName: string;
  password: string;
  wxUnionid: string;
  createTime: string;
  updateTime: string;
  tenantId: number;
  orgVOS: any[];
  currentUserOrg: any[];
  lockFlag: string;
  isRead: boolean;
  roleList: any[];
  roleIds: any[];
  style: number;
}
class UserDTOEntity implements UserDTO {
  userId = 0;
  username = "";
  realName = "";
  mobile = "";
  phone = "";
  avatar = "";
  orgId = 0;
  sex = "";
  workPlace = "";
  company = "";
  industry = "";
  position = "";
  /**
   * 外语能力
   */
  languageAbilityList = [];
  sign = "";
  introduction = "";
  birthday = "";
  householdRegister = "";
  weiXin = "";
  qq = "";
  mail = "";
  integrity = 0;
  abilityTag: string[] = [];
  workExperience: any[] = [];
  learningSituation: any[] = [];
  educationExperience: any[] = [];
  isPrivacy = 1;
  redness = 0;
  isGuided = false;
}
class UserEntity implements UserInfo {
  userId = 0;
  username = "";
  realName = "";
  password = "";
  wxUnionid = "";
  createTime = "";
  updateTime = "";
  lockFlag = "";
  mobile = "";
  phone = "";
  avatar = "";
  isPrivacy = 1;
  /**
   * 是否开启举荐通道
   */
  isRecommend = false;
  isRead = true;
  orgId = 0;
  orgName = "";
  tenantId = 0;
  roleList = [];
  roleIds = [];
  sex = "";
  workPlace = "";
  company = "";
  industry = "";
  position = "";
  sign = "";
  introduction = "";
  birthday = "";
  householdRegister = "";
  weiXin = "";
  qq = "";
  mail = "";
  integrity = 0; //资料完善度
  abilityTag = []; //卓越标签
  workExperience = [];
  learningSituation = [];
  educationExperience = [];
  currentUserOrg = []; //自己所在的组织
  orgVOS = []; //所在组织
  isFriend = 0;
  isMaster = 0;
  isApprentice = 0;
  isFollowed = 0;
  isBlock = 0;
  exponent = new UserExponentEntity();
  style = 1;
  /**
   * 红度
   */
  redness = 0;
  isGuided = false;
}
class UserCardEntity implements UserVO {
  constructor(userId = 1) {
    this.userId = userId;
  }
  sex = "0";
  orgId = 0;
  userId = 1;
  integrity = 0; //资料完善度
  username = "";
  realName = "";
  avatar = "";
  company = "";
  industry = "";
  position = "";
  exponent = new UserExponentEntity();
  householdRegister = "";
  mobile = "";
  phone = "";
  weiXin = "";
  workPlace = "";
  sign = "";
  introduction = "";
  birthday = "";
  qq = "";
  mail = "";
  tags = [];
  abilityTag = []; //卓越标签
  projectTag = []; //专业标签
  learningTag = []; //进步标签
  workExperience = [];
  learningSituation = [];
  educationExperience = [];
  isFriend = 0;
  isMaster = 0;
  isApprentice = 0;
  isFollowed = 0;
  isBlock = 0;
  /**
   * 个人风采页是否允许查看，1是，2仅好友，3仅自己
   */
  canSee = 0;
  isPrivacy = 1;
  redness = 0;
  isGuided = false;
}
interface CategoryDict {
  categoryId: number;
  name: string;
  number: string;
  parentId: number;
  createTime: string;
  updateTime: string;
}
interface Dict {
  id: number;
  value: string;
  label: string;
  sort: number;
  createTime: string;
  updateTime: string;
  children: Dict[];
}
/**
 * 用户登陆信息
 */
interface SysUserPermissions {
  permissions: string[];
  roles: number[];
  userInfo: UserInfo;
}

export {
  CategoryDict,
  UserInfo,
  SysUserPermissions,
  Dict,
  UserEntity,
  UserDTO,
  UserVO,
  UserDTOEntity,
  UserCardEntity,
  UserExponentEntity
};
