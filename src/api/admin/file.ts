import request from "@/router/axios";

const prefixUrl = "/admin/file";

const sftpSingleImageUploadUrl = `${prefixUrl}/oss/upload`;
/**
 * 获取文件管理分页
 * @param params 分页参数
 */
export const getFilePage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};
/**
 * 删除文件
 * @param id ID
 */
export const delFileById = (id: number) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
};
/**
 * 获取文件Url
 * @param data
 */
export const getFileUrl = (data: any) => {
  return request({
    url: `${sftpSingleImageUploadUrl}`,
    method: "post",
    data,
  });
};
export { sftpSingleImageUploadUrl };

