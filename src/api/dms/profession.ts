import request from "@/router/axios";

const prefixUrl = "/dms/profession";

/**
 * 查询所有专业库树
 */
export const getProfessionTree = () => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
};
/**
 * 用专业名模糊查询所有相似专业分页
 * @param params 
 */
export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/search_similar_name`,
    method: "get",
    params: params,
  });
}
/**
 * 根据id查询对应根节点专业库树
 */
export function getPageBySon(node: any) {
  return request({
    url: `${prefixUrl}/tree_id/${node}`,
    method: "get",
  });
}
/**
 * 批量逻辑删除专业库
 * @param data 
 */
export function deleteByList(data: any) {
  return request({
    url: `${prefixUrl}/delete`,
    method: "post",
    data: data,
  });
}
/**
 * 新增专业库字典
 * @param data 
 */
export function createPage(data: any) {
  return request({
    url: `${prefixUrl}/admin_create`,
    method: "post",
    data: data,
  });
}
/**
 * 更新专业库
 * @param data 
 */
export function updatePage(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: data,
  });
}
/**
 * 根据id查询对应专业库基础信息，不含子节点
 * @param id 
 */
export function getPageDetailById(id: any) {
  return request({
    url: `${prefixUrl}/select_profession/${id}`,
    method: "get",
  });
}
/**
 * 各种下载
 * @param path 
 * @param fileName 
 * @param data 
 */
function getDownload(path: any, fileName: any, data: any) {
  return request({
    url: `${prefixUrl}${path}`,
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "arraybuffer",
  }).then((response: any) => {
    // 处理返回的文件流
    const blob = new Blob([response], {
      type: "application/vnd.ms-excel",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${fileName}.xls`;
    link.click();
  });
}
// export function getPersonExcelExport (data) {
//   return getDownload('/exportPersonExcel', 'iepProfession', data)
// }

// 提交
export function getModelExcel() {
  return getDownload("/download", "专业库导入模板", "");
}
