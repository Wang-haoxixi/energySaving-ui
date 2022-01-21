import request from "@/router/axios";

const prefixUrl = "/qms/conference_publish";

export const userPage = (params: any) => {
  return request({
    url: `${prefixUrl}/user_page`,
    method: "get",
    params,
  });
};

export const userPcPage = (params: any) => {
  return request({
    url: `${prefixUrl}/pc/user_page`,
    method: "get",
    params,
  });
};

export const recommendPage = (params: any) => {
  return request({
    url: `${prefixUrl}/user_collection_recommend_page`,
    method: "get",
    params,
  });
};

export const postActivity = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
};

export const getBaseData = () => {
  return request({
    url: `${prefixUrl}/so_page_data`,
    method: "get",
  });
};

export const getActivityPage = (params: any) => {
  return request({
    url: `${prefixUrl}/so_page`,
    method: "get",
    params,
  });
};

export const getActivityPagePC = (params: any) => {
  return request({
    url: `${prefixUrl}/pc/so_page`,
    method: "get",
    params,
  });
};

export const getReviewPage = (params: any) => {
  return request({
    url: `${prefixUrl}/audit/activity_page`,
    method: "get",
    params,
  });
};

export const getCategoryTreeByNum = (params: any) => {
  return request({
    url: "/admin/category/tree/num",
    method: "get",
    params: params,
  });
};

export const deleteActivityById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};

export const getActivityById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

export const putActivity = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const collection = (params: any) => {
  return request({
    url: `${prefixUrl}/collection`,
    method: "post",
    params,
  });
};

export const getHotTags = (params: any) => {
  return request({
    url: `${prefixUrl}/hot_tags`,
    method: "get",
    params,
  });
};

export const getStatistics = (params: any) => {
  return request({
    url: `${prefixUrl}/statistics`,
    method: "get",
    params,
  });
};
/**
 *
 * @param id 活动ID
 * @param type 1：推荐2：取消推荐3：通过4：不通过5：下架 6:重新上架
 * @param text 不通过理由
 */
export const changeActivityStatus = (id: number, type: number, text?: string) => {
  return request({
    url: `${prefixUrl}/audit/audit_publish`,
    method: "post",
    data: {
      id, type, text,
    },
  });
};

export const recommandById = (id: number) => {
  return changeActivityStatus(id, 1);
};
export const cancelRecommandById = (id: number) => {
  return changeActivityStatus(id, 2);
};
export const passById = (id: number) => {
  return changeActivityStatus(id, 3);
};
// type 4
export const rejectActivity = (data: any) => {
  return request({
    url: `${prefixUrl}/audit/audit_publish`,
    method: "post",
    data,
  });
};
export const offShelfById = (id: number) => {
  return changeActivityStatus(id, 5);
};
export const putShelfById = (id: number) => {
  return changeActivityStatus(id, 6);
};

export const endActivityById = (id: number) => {
  return request({
    url: `${prefixUrl}/activity_end/${id}`,
    method: "post",
  });
};
/**
 * 强力推荐
 */
export const getRecommandList = () => {
  return request({
    url: `${prefixUrl}/activitie_recommend`,
    method: "get",
  });
};
/**
 * 猜你喜欢
 */
export const getLoveList = () => {
  return request({
    url: `${prefixUrl}/activitie_love`,
    method: "get",
  });
};
/**
 * 深度合作
 */
export const getDeepCooperationt = () => {
  return request({
    url: `${prefixUrl}/deep_cooperation/4`,
    method: "get",
  });
};

/**
 * 与会大咖
 */
export const getBigGuy = () => {
  return request({
    url: `${prefixUrl}/big_guy/6`,
    method: "get",
  });
};
/**
 * 为你推荐
 */
export const getGuessYouLikeList = (id: number) => {
  return request({
    url: `${prefixUrl}/activitie_recommend_for/${id}`,
    method: "get",
  });
};

/**
 * 获取活动列表
 * @cityId 城市id
 * @type 类型
 * @name 关键词
 */

export const getActivitiePage = (params: any) => {
  return request({
    url: `${prefixUrl}/activitie_page`,
    method: "get",
    params,
  });
};
export const getIsPeopleListById = (id: number) => {
  return request({
    url: `${prefixUrl}/is_people/${id}`,
    method: "get",
  });
};

/**
 * 收藏/取消收藏 会议
 * @param id 活动id
 */
export const collectionById = (id: number) => {
  return request({
    url: `${prefixUrl}/collection`,
    method: "post",
    params: {
      id,
    },
  });
};

/**
 * 个人中心-我的收藏
 */
export const userCollectionPage = (params: any) => {
  return request({
    url: `${prefixUrl}/user_collection_page`,
    method: "get",
    params,
  });
};

/**
 * 活动内部推荐列表
 */
export const getPublishRecommend = () => {
  return request({
    url: `${prefixUrl}/publish_recommend`,
    method: "get",
  });
};

/**
 * 在风采页获取组织活动
 * @param orgId ORGID
 * @param size 数量
 */
export const getActivityListByOrgId = (orgId: number, size = 3) => {
  return request({
    url: `${prefixUrl}/pc/so/${orgId}`,
    method: "get",
    params: {
      size,
    },
  });
};

/**
 * 组织风采页获取活动分页
 * @param params 
 */
export const getActivityPageByOrgId = (params: any) => {
  return request({
    url: `${prefixUrl}/pc/so_work`,
    method: "get",
    params,
  });
};

/**
 * 我的发布-活动
 * @param params 
 */
export const activityMyRelease = (params: any) => {
  return request({
    url: `${prefixUrl}/my_release`,
    method: "get",
    params,
  });
};

/**
 * 活动-查询确认订单页面数据
 */
export const getConfirmOrder = (params: any) => {
  return request({
    url: `${prefixUrl}/confirm_order`,
    method: "get",
    params,
  });
};

export const getPoster = () => {
  return request({
    url: `${prefixUrl}/get_poster`,
    method: "get",
  });
};

/**
 * pc活动审核下架-举报
 */
export const dismountPublish = (data: any) => {
  return request({
    url: `${prefixUrl}/audit/dismount_publish`,
    method: "post",
    data,
  });
};

/**
 * pc活动下架-举报下架
 */
export const violationHandling = (data: any) => {
  return request({
    url: `${prefixUrl}/violation/handling`,
    method: "post",
    data,
  });
};