import request from "@/router/axios";
export const prefixUrl = "/dms/assets_analyse";

/**
 * 查询用户总体数据资产
 * @id 用户id
 */
export function getWhole(id: number) {
  return request({
    url: `${prefixUrl}/get_whole`,
    method: "get",
    params: {
      id,
    },
  });
}

/**
 * 查询用户上周数据资产
 * @id 用户id
 */
export function getLastWeek(id: number) {
  return request({
    url: `${prefixUrl}/get_last_week`,
    method: "get",
    params: {
      id,
    },
  });
}

/**
 * 根据组织id查询组织总体数据资产
 * @id 组织id
 */
export function getWholeSo(id: number) {
  return request({
    url: `${prefixUrl}/get_whole_so`,
    method: "get",
    params: {
      id,
    },
  });
}

export function getCreditByUserId(id: string) {
  return request({
    url: `${prefixUrl}/user_credit/${id}`,
    method: "get",
  });
}
/**
 *dms/assets_analyse/so_credit/{id}
 * @param id 参数为so Id 必传
 * get 方法，查询so信用值信息接口
 */
export function getCreditBySoId(id: string) {
  return request({
    url: `${prefixUrl}/so_credit/${id}`,
    method: "get",
  });
}
