import request from "@/router/axios";

const prefixUrl = "/admin/mail";
/**
 * 获取所有组织下的人
 * @param realName 通讯录搜索名字
 */
export const getMailList = (realName = "") => {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
    params: {
      realName
    }
  });
};
