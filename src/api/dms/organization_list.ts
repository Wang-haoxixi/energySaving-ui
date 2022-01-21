import request from "@/router/axios";
const prefixUrl = "/dms/organization";
export function getPage(query: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: query,
  });
}
export function getRecyclePage(query: any) {
  return request({
    url: `${prefixUrl}/recycle/page`,
    method: "get",
    params: query,
  });
}
export function deletePage(query: any) {
  return request({
    url: `${prefixUrl}/delete`,
    method: "post",
    data: query,
  });
}
export function deleteRecyclePage(data: any) {
  return request({
    url: `${prefixUrl}/recycle/delete`,
    method: "post",
    data: data,
  });
}
export function recoverRecyclePage(data: any) {
  return request({
    url: `${prefixUrl}/recycle/recover`,
    method: "post",
    data: data,
  });
}
export function addPage(obj: any) {
  return request({
    url: `${prefixUrl}/admin_create`,
    method: "post",
    data: obj,
  });
}
export function updatePage(obj: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}
export function getDetailPage(id: any) {
  return request({
    url: `${prefixUrl}/info/${id}`,
    method: "get",
  });
}
export function getforbide(data: any) {
  return request({
    url: `${prefixUrl}/forbid`,
    method: "post",
    data: data,
  });
}
export function applyPass(data: any) {
  return request({
    url: `${prefixUrl}/apply_pass`,
    method: "post",
    data: data,
  });
}
export function applyReject(data: any) {
  return request({
    url: `${prefixUrl}/apply_reject`,
    method: "post",
    data: data,
  });
}

const prefixUrl2 = "/dms";
// @/api/tms/excel

function getDownload(path: any, fileName: any, data: any) {
  return request({
    url: `${prefixUrl2}${path}`,
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
export function getOrgExcelExport() {
  return getDownload("/organization_excel/require_example", "机构导出表头", "");
}
export function getOrgExcelExportInfo(data: any) {
  return getDownload("/organization_excel/require_info", "机构导出信息", data);
}
// 提交
export function getModelExcel() {
  return getDownload("/organization_excel/download", "机构库导入模板", "");
}

export function highSchoolPage(params: any) {
  return request({
    url: `${prefixUrl}/high_school_page`,
    method: "get",
    params,
  });
}
