import request from "@/router/axios";

const prefixUrl = "/admin/app";

/**
 * 查询id对应头像
 *
 * @param id 用户id
 * @param type 类型 1 用户 2 组织
 */

export const getInfoById = (data: any) => {
  const type = (() => {
    if (data.type == 3) {
      return 2;
    } else {
      return 1;
    }
  })();
  return request({
    url: `${prefixUrl}/im/so_or_user`,
    method: "get",
    params: {
      id: data.targetId,
      type,
    },
  });
};
// 获取组织用户列表
export const getUserPage = (params: any) => {
  return request({
    url: `${prefixUrl}/user/page`,
    method: "get",
    params,
  });
};
