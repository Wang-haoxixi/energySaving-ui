export const commonDictsMap = {
  // 0-未提交，1-审核中，2-审核通过 3-审核失败
  certificationStatus: {
    0: "未提交",
    1: "审核中",
    2: "审核通过",
    3: "审核失败",
    9: "草稿", // TODO:等待后端完成
  },
};

class ProductDTO {
  constructor(type = "0") {
    this.type = type;
  }
  /**
   * 产品id
   */
  id = 0;
  /**
   * 产品编号
   */
  number = "";
  /**
   * 产品名称 max = 100
   */
  name = "";
  /**
   * Logo地址
   */
  imageUrl = "";
  /**
   * 产品官网(1软件) max = 100
   */
  website = "";
  /**
   * 产品价格
   */
  price = 0;
  // price = 0.01;
  /**
   * 产品简介 max = 150
   */
  synopsis = "";
  /**
   * 产品介绍
   */
  description = "";
  /**
   * 关联标签
   */
  tagKeywords: string[] = [];
  /**
   * 截图List
   */
  previewImgUrl: string[] = [];
  /**
   * 创建时间
   */
  createTime = "";
  /**
   * 更新时间
   */
  updateTime = "";
  /**
   * 创建者id
   */
  createBy = 0;
  /**
   * 修改者id
   */
  updateBy = 0;
  /**
   * 组织id
   */
  orgId = 0;
  /**
   * 产品种类(0-方案, 1-软件，2-报告, 3-数据,4-服务,5-实物)
   */
  type = "";
  /**
   * 审核状态 是否审核(0-未提交，1-审核中3，2-审核通过 3-审核失败）
   */
  certificationStatus = "";
  /**
   * 浏览次数
   */
  viewTimes = 0;
  /**
   * 销量
   */
  sale = 0;
  /**
   * 审核提交时间
   */
  submitTime = "";
  /**
   * 产品类别
   */
  category = "";
  /**
   * 附件
   */
  attach = "";
  /**
   * 发布者联系人(前台)
   */
  publisherContact = "";
  /**
   * 发布者组织(前台)
   */
  orgContact = "";
  /**
   * 该组织头像(前台)
   */
  orgImg = "";
  /**
   * 该组织名称(前台)
   */
  orgName = "";
  /**
   * 该发布人名称(前台)
   */
  creatorName = "";
  /**
   * 附件List
   */
  attachs: any[] = [];
  /**
   * 实际附件List
   */
  attachList: any[] = [];
  /**
   * 人民币价格
   */
  cash = 0;
  // cash = 0.01;
  /**
   * 打折后人民币价格(前台)
   */
  discountCash = 0;
  /**
   * 打折后宝贝价格(前台)
   */
  discountPrice = 0;
  /**
   * 附件原文件名not(1-软件,5-实物)
   */
  attachName = "";
  /**
   * 是否免费0-否 1-是
   */
  isFree = "0";
  /**
   * 版本号(1软件)
   */
  version = "";
  /**
   * 版本更新时间(1软件)
   */
  versionTime = "";
  /**
   * 详情图片
   */
  detailsImg = "";
  /**
   * 是否官方审核
   */
  isOfficial = "";
  /**
   * 是否置顶
   */
  isTop = "";
  /**
   * 置顶banner图
   */
  topImage = "";
  /**
   * 置顶排序
   */
  topSort = 0;
  /**
   * 是否推荐
   */
  isRecommend = "";
  /**
   * 推荐banner图
   */
  recommendImage = "";
  /**
   * 代理商等级
   */
  rank = "1";
  /**
   * 推荐排序
   */
  recommendSort = 0;
  /**
   * 评分(前台)
   */
  score = 0;
  /**
   * 显示星星颗数(前台)
   */
  star = 0;
  /**
   * 收藏量
   */
  collectionVolume = 0;
  /**
   * 是否收藏
   */
  collect = false;
  /**
   * 该组织有多少产品
   */
  orgProductCount = 0;
  /**
   * 是否购买(0未购买,1已购买)(前台)
   */
  isBought = 0;
  /**
   * 是否组织免审(前台)
   */
  isExempt = false;
  /**
   * 关联产品
   */
  productList: ProductDTO[] = [];
  /**
   * 关联方案
   */
  planList: ProductDTO[] = [];
  /**
   * 推荐的产品(前台)
   */
  recommendProducts: ProductDTO[] = [];
  /**
   * 该组织的产品(前台)
   */
  orgProducts: ProductDTO[] = [];
  /**
   * 关联产品Ids
   */
  productIds: number[] = [];
  /**
   * 关联客户
   */
  customers: any[] = [];
  /**
   * 9 显示全部
   * 1 显示宝贝
   * 2 显示现金
   */
  payCurrency = "";
  /**
   * 前端专用  宝贝
   */
  priceChecked = true;
  /**
   * 前端专用  现金
   */
  cashChecked = false;
}
export { ProductDTO };
