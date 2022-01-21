import request from "@/router/axios";
const prefixUrl = "/dms/material";

// 根据id查询 - 个人
export function getDataById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

// 根据id查询 - 组织
export function getSoDataById(id: number) {
  return request({
    url: `${prefixUrl}/so/${id}`,
    method: "get",
  });
}

export function fetchAllPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

// 支付接口 - get - 后期淘汰
export function materialPay(params: any) {
  return request({
    url: `${prefixUrl}/pay/${params.id}`,
    method: "get",
    params,
  });
}

// 支付接口 - post
export function materialPayment(data: any) {
  return request({
    url: `${prefixUrl}/payment`,
    method: "post",
    data,
  });
}

// 材料购买支付--SO公共账户购买使用
export function materialSoPayment(data: any) {
  return request({
    url: `${prefixUrl}/so/payment`,
    method: "post",
    data,
  });
}

// 材料SO公共支付--全免费材料时
export function freePayment(data: any) {
  return request({
    url: `${prefixUrl}/so/free/payment`,
    method: "post",
    data,
  });
}

// 删除材料
export function deleteDataByIds(ids: number[]) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: ids,
  });
}

// 举报处理--材料的举报
export function materialReportHandling(id: number) {
  return request({
    url: `${prefixUrl}/material_report_handling/${id}`,
    method: "get",
  });
}

/****** 个人类  */
export function fetchPage(params: any) {
  return request({
    url: `${prefixUrl}/page/personal`,
    method: "get",
    params,
  });
}

// 检查名字是否重复
export function checkMaterialName(data: any) {
  return request({
    url: `${prefixUrl}/check`,
    method: "post",
    data,
  });
}

export function createForm(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

export function updateForm(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
}

export function deleteData(ids: number[]) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: ids,
  });
}
export const getPersonRecommend = (type: string) => {
  return request({
    url: `${prefixUrl}/person_recommend`,
    method: "get",
    params: {
      type,
    },
  });
};

// 查看我的付费下载
export const getPayPage = (params: any) => {
  return request({
    url: `${prefixUrl}/pay/page`,
    method: "get",
    params,
  });
};

export const getMaterialSearchPage = (params: any) => {
  return request({
    url: `${prefixUrl}/search_material`,
    method: "get",
    params,
  });
};

// 热门专栏
export const getDynamicHit = (params: any) => {
  return request({
    url: `${prefixUrl}/dynamic_hit`,
    method: "get",
    params,
  });
};
/**
 * SO类
 */
const prefixSoUrl = "/dms/material/so";

export function fetchSoPage(query: any) {
  return request({
    url: `${prefixSoUrl}/page`,
    method: "get",
    params: query,
  });
}

export function createSoForm(obj: any) {
  return request({
    url: `${prefixSoUrl}/create`,
    method: "post",
    data: obj,
  });
}

export function updateSoForm(obj: any) {
  return request({
    url: `${prefixSoUrl}/update`,
    method: "post",
    data: obj,
  });
}

// 移动材料
export function moveSoMaterial(data: any) {
  return request({
    url: `${prefixSoUrl}/move`,
    method: "post",
    data: data,
  });
}

/**
 * 组织风采页获取材料列表
 * @param {*} orgId
 * @param {*} size
 */
export const getMaterialListByOrgId = (orgId: number, size = 3) => {
  return request({
    url: `${prefixUrl}/get_by_org_id/${orgId}`,
    method: "get",
    params: {
      size,
    },
  });
};

/**
 * 个人风采页获取材料列表
 * @param {*} userId
 * @param {*} size
 */
export const getMaterialListByUserId = (userId: number, size = 3) => {
  return request({
    url: `${prefixUrl}/get_by_user_id/${userId}`,
    method: "get",
    params: {
      size,
    },
  });
};
/**
 * 赋能台获取贡献排行
 * @param {*} orgId
 * @param {*} size
 */
export const getMaterialRankByOrgId = (orgId: number, size = 10) => {
  return request({
    url: `${prefixUrl}/contribution_ranking/${orgId}`,
    method: "get",
    params: {
      size,
    },
  });
};

// 生态精选--推荐20条当前SO外材料
export const getSelectedPage = (params: any) => {
  return request({
    url: `${prefixUrl}/selection`,
    method: "get",
    params,
  });
};

// SO共享收藏分页查询
export const getSharePage = (params: any) => {
  return request({
    url: `${prefixUrl}/so/share/page`,
    method: "get",
    params,
  });
};

// SO共享收藏材料--移除功能
export const deleteShareById = (params: any) => {
  return request({
    url: `${prefixUrl}/so/share/delete`,
    method: "post",
    params,
  });
};

// SO共享收藏材料--编辑功能
export const createShareData = (data: any) => {
  return request({
    url: `${prefixUrl}/so/share/create`,
    method: "post",
    data,
  });
};

// 生态搜索分页
export const getEcologicSearchPage = (params: any) => {
  return request({
    url: `${prefixUrl}/ecologic/search`,
    method: "get",
    params,
  });
};

// SO公共频道页材料分页查询
export const getSoPublicPage = (params: any) => {
  return request({
    url: `${prefixUrl}/so/public/page`,
    method: "get",
    params,
  });
};

// 公共频道页--热门材料排行榜
export const getTopMaterialRanking = (params: any) => {
  return request({
    url: `${prefixUrl}/public/top_material_ranking`,
    method: "get",
    params,
  });
};

//公共频道页--材料贡献榜
export const getMaterialContribution = (params: any) => {
  return request({
    url: `${prefixUrl}/public/rank/material_contribution`,
    method: "get",
    params,
  });
};