import request from "@/router/axios";

const prefixUrl = "/admin/talent_pool";

// 分页查询
export const getTalentPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

// 标记用户
export const markTalent = (userId: any) => {
  return request({
    url: `${prefixUrl}/mark/${userId}`,
    method: "POST",
  });
};

export const getPcPage = (params: any) => {
  return request({
    url: `${prefixUrl}/pc_page`,
    method: "get",
    params,
  });
};
