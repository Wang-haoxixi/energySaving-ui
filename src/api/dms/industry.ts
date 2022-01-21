import request from "@/router/axios";

const prefixUrl = "/dms/industry";

export const getIndustryTree = () => {
  return request({
    url: `${prefixUrl}/tree`,
    method: "get",
  });
};

export function getIndustryPage(params: any) {
  return request({
    url: `${prefixUrl}/search_similar_name`,
    method: "get",
    params: params,
  });
}
export function getPageBySon(node: any) {
  return request({
    url: `${prefixUrl}/searchSubordinateIndustry/${node}`,
    method: "get",
  });
}
export function getSumBySon(id: any) {
  return request({
    url: `${prefixUrl}/countNextNode/${id}`,
    method: "get",
  });
}
export function deleteIndustry(id: any) {
  return request({
    url: `${prefixUrl}/deleteIndustry/${id}`,
    method: "get",
  });
}
export function deleteByList(data: any) {
  return request({
    url: `${prefixUrl}/delete_by_list/`,
    method: "post",
    data: data,
  });
}
export function insertOrUpdate(data: any) {
  return request({
    url: `${prefixUrl}/insertOrUpdate`,
    method: "post",
    data: data,
  });
}
export function getPageDetailById(id: any) {
  return request({
    url: `${prefixUrl}/selectIndustry/${id}`,
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
//   return getDownload('/exportPersonExcel', 'iepIndusdry', data)
// }

// 提交
export function getModelExcel() {
  return getDownload("/download", "行业库导入模板", "");
}
