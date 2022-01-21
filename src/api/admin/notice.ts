import request from "@/router/axios";

const prefixUrl = "/admin/notice";
/**
 * 新增公告
 * @param data title, content
 */
export const postNotice = (data: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
};
/**
 * 编辑公告
 * @param data title, content
 */
export const putNotice = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
/**
 * 公告分页 (已发布status=2)
 * @param params
 */
export const getNoticePage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
/**
 * 详情
 * @param id
 */
export const getNoticeById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};
/**
 * 发布
 * @param id
 */
export const publishNoticeById = (id: number) => {
  return request({
    url: `${prefixUrl}/publish/${id}`,
    method: "get",
  });
};
/**
 * 删除
 * @param id
 */
export const deleteNoticeById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "get",
  });
};
