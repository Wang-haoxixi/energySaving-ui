import request from "@/router/axios";
const prefixUrl = "/qms/exam_examination";

// 暂无岗位功能,未启用过旧接口
export const getAppPage = (params: any) => {
  return request({
    url: `${prefixUrl}/app_page`,
    method: "get",
    params: params,
  });
};

export const getExamInfo = (id: string) => {
  return request({
    url: `${prefixUrl}/get_detail_for_app/${id}`,
    method: "get",
  });
};

export const getExamInfoV2ById = (id: string, params: any) => {
  return request({
    url: `${prefixUrl}/get_detail_part_one/${id}/2`,
    method: "get",
    params: params,
  });
};

export const getDetailPartOne = (id: string) => {
  return request({
    url: `${prefixUrl}/get_detail_part_two/${id}/2`,
    method: "get",
  });
};

