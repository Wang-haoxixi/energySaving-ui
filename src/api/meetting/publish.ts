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
 * @param id ??????ID
 * @param type 1?????????2???????????????3?????????4????????????5????????? 6:????????????
 * @param text ???????????????
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
 * ????????????
 */
export const getRecommandList = () => {
  return request({
    url: `${prefixUrl}/activitie_recommend`,
    method: "get",
  });
};
/**
 * ????????????
 */
export const getLoveList = () => {
  return request({
    url: `${prefixUrl}/activitie_love`,
    method: "get",
  });
};
/**
 * ????????????
 */
export const getDeepCooperationt = () => {
  return request({
    url: `${prefixUrl}/deep_cooperation/4`,
    method: "get",
  });
};

/**
 * ????????????
 */
export const getBigGuy = () => {
  return request({
    url: `${prefixUrl}/big_guy/6`,
    method: "get",
  });
};
/**
 * ????????????
 */
export const getGuessYouLikeList = (id: number) => {
  return request({
    url: `${prefixUrl}/activitie_recommend_for/${id}`,
    method: "get",
  });
};

/**
 * ??????????????????
 * @cityId ??????id
 * @type ??????
 * @name ?????????
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
 * ??????/???????????? ??????
 * @param id ??????id
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
 * ????????????-????????????
 */
export const userCollectionPage = (params: any) => {
  return request({
    url: `${prefixUrl}/user_collection_page`,
    method: "get",
    params,
  });
};

/**
 * ????????????????????????
 */
export const getPublishRecommend = () => {
  return request({
    url: `${prefixUrl}/publish_recommend`,
    method: "get",
  });
};

/**
 * ??????????????????????????????
 * @param orgId ORGID
 * @param size ??????
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
 * ?????????????????????????????????
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
 * ????????????-??????
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
 * ??????-??????????????????????????????
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
 * pc??????????????????-??????
 */
export const dismountPublish = (data: any) => {
  return request({
    url: `${prefixUrl}/audit/dismount_publish`,
    method: "post",
    data,
  });
};

/**
 * pc????????????-????????????
 */
export const violationHandling = (data: any) => {
  return request({
    url: `${prefixUrl}/violation/handling`,
    method: "post",
    data,
  });
};