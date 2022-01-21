import request from "@/router/axios";
export const prefixUrl = "/dms/product";

export function getProductPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}

export function getProductCertifyPage(params: any) {
  return request({
    url: `${prefixUrl}/certify_page`,
    method: "get",
    params: params,
  });
}

export function postProduct(obj: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
/**
 * 普通成员修改
 * @param obj 数据
 */
export function putProduct(obj: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}
/**
 * 保存为草稿
 * @param obj 数据
 */
export function draftProduct(obj: any) {
  return request({
    url: `${prefixUrl}/draft`,
    method: "post",
    data: obj,
  });
}
/**
 * 管理员修改
 * @param obj 数据
 */
export function putProductManage(obj: any) {
  return request({
    url: `${prefixUrl}/manage/update`,
    method: "post",
    data: obj,
  });
}

export function passProduct(id: any) {
  return request({
    url: `${prefixUrl}/audit_agree/${id}`,
    method: "post",
  });
}

export function rejectProduct(id: any) {
  return request({
    url: `${prefixUrl}/audit_disagree/${id}`,
    method: "post",
  });
}

export function getProductById(id: any) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function checkCertifyProductById(id: any, status: any) {
  return request({
    url: `${prefixUrl}/user_certify`,
    method: "post",
    data: {
      status,
      id,
    },
  });
}

export function passingCertifyProductById(id: any) {
  return checkCertifyProductById(id, 1);
}

export function rejectCertifyProductById(id: any) {
  return checkCertifyProductById(id, 0);
}

export function checkCertifyManageById(id: any, status: any, remarks = '') {
  return request({
    url: `${prefixUrl}/certify_manage`,
    method: "post",
    data: {
      id,
      status,
      remarks,
    },
  });
}

export function passCheckCertifyManageById(id: any) {
  return checkCertifyManageById(id, 2);
}

export function rejectCheckCertifyManageById(id: any, remarks = '') {
  return checkCertifyManageById(id, 3, remarks);
}
export function lossCheckCertifyManageById(id: any, remarks = '') {
  return checkCertifyManageById(id, 0, remarks);
}

export function deleteProductById(id: any) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}

export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/shop_list`,
    method: "get",
    params: params,
  });
}

export function getProductShopById(id: any) {
  return request({
    url: `${prefixUrl}/shop/${id}`,
    method: "get",
  });
}

export function getProductListPage(params: any) {
  return request({
    url: `${prefixUrl}/shop_page`,
    method: "get",
    params,
  });
}
/**
 * APP能力魔方首页
 */
export const getProductReportList = () => {
  return request({
    url: `${prefixUrl}/shop/index`,
    method: "get",
  });
};
/**
 * 推荐产品
 */
export const getHotRecommandList = (type = 1) => {
  return request({
    url: `${prefixUrl}/index/list`,
    method: "get",
    params: {
      type,
    },
  });
};
export const getRelateProductList = (params: any) => {
  return request({
    url: `${prefixUrl}/relate_list`,
    method: "get",
    params,
  });
};
/**
 * 获取置顶与推荐列表
 * @param type 1 置顶 2 推荐
 */
export const getTopRecommandList = (type: number) => {
  return request({
    url: `${prefixUrl}/banner/list`,
    method: 'get',
    params: { type },
  });
};
/**
 * 置顶与推荐
 * @param data
 */
export const upTopRecommandProduct = (data: any) => {
  return request({
    url: `${prefixUrl}/banner/up`,
    method: 'post',
    data,
  });
};
export const updateUpTopRecommandProduct = (data: any) => {
  return request({
    url: `${prefixUrl}/banner/change_image`,
    method: 'post',
    data,
  });
};
/**
 * 取消置顶与推荐
 * @param data
 */
export const removeTopRecommandProduct = (data: any) => {
  return request({
    url: `${prefixUrl}/banner/remove`,
    method: 'post',
    data,
  });
};
export const removeTopProduct = (id: number) => {
  return removeTopRecommandProduct({ id, type: '1' });
};
export const removeRecommandProduct = (id: number) => {
  return removeTopRecommandProduct({ id, type: '2' });
};
/**
 * 设置置顶与推荐
 * @param data
 */
export const setOrderTopRecommandProduct = (data: any) => {
  return request({
    url: `${prefixUrl}/change_order`,
    method: 'post',
    data,
  });
};
/**
 * 推荐方案
 */
export const getHotRecommandPlanList = (type = '') => {
  return request({
    url: `${prefixUrl}/plan/shop_list`,
    method: "get",
    params: {
      type,
    },
  });
};
export const setProductOfficial = (id: number) => {
  return request({
    url: `${prefixUrl}/official/${id}`,
    method: 'post',
  });
};

/**
 * 排序管理 改变顺序
 * @param list 顺序数组
 */
export const advanceChangeOrder = (data: any) => {
  return request({
    url: `${prefixUrl}/advance/change_order`,
    method: 'post',
    data,
  });
};

/**
 * 排序管理 列表
 * @param type 产品类型
 */
export const getAdvancePage = (type: string) => {
  return request({
    url: `${prefixUrl}/advance/list`,
    method: 'get',
    params: { type },
  });
};

/**
 * 排序管理 加入移除列表
 * @param id 产品id
 */
export const setAdvanceProduct = (id: number) => {
  return request({
    url: `${prefixUrl}/advance/${id}`,
    method: 'post',
  });
};
/**
 * 组织风采页 产品与服务
 * @param orgId 组织id
 */
export const getNewestList = (orgId: number) => {
  return request({
    url: `${prefixUrl}/newest_list/${orgId}`,
    method: 'get',
  });
};
/**
 * 魔方生成订单
 * @param data
 */
export const createProductOrder = (data: any) => {
  return request({
    url: `${prefixUrl}/shop/create_order`,
    method: "post",
    data,
  });
};

export const getProductPageByOrgId = (params: any) => {
  return request({
    url: `${prefixUrl}/page/org`,
    method: 'get',
    params,
  });
};

export const productMyRelease = (params: any) => {
  return request({
    url: `/dms/app/square/my`,
    method: 'get',
    params,
  });
};

