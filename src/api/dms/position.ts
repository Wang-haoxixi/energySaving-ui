import request from "@/router/axios";

const prefixUrl = "/dms/position";

export const getPositionTree = () => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
};

export function getPage(params: any) {
  return request({
    url: `${prefixUrl}/search_similar_name`,
    method: "get",
    params: params,
  });
}
export function getPageBySon(node: any) {
  return request({
    url: `${prefixUrl}/tree_id/${node}`,
    method: "get",
  });
}
export function deleteByList(data: any) {
  return request({
    url: `${prefixUrl}/delete`,
    method: "post",
    data: data,
  });
}
export function createPage(data: any) {
  return request({
    url: `${prefixUrl}/admin_create`,
    method: "post",
    data: data,
  });
}
export function updatePage(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: data,
  });
}
export function getPageDetailById(id: any) {
  return request({
    url: `${prefixUrl}/select_position/${id}`,
    method: "get",
  });
}

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
//   return getDownload('/exportPersonExcel', 'iepPosition', data)
// }

// 提交
export function getModelExcel() {
  return getDownload("/download", "岗位库导入模板", "");
}
