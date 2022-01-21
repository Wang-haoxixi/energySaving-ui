import request from "@/router/axios";
const prefixUrl = "/dms/person";
export function getNameListPage(params: any) {
  return request({
    url: `${prefixUrl}/page_search`,
    method: "get",
    params,
  });
}
export function getAuthDetail(id: any) {
  return request({
    url: `${prefixUrl}/select_person_by_user/${id}`,
    method: "get",
  });
}
export function getAuthentication() {
  return request({
    url: `${prefixUrl}/get_authentication`,
    method: "get",
  });
}

export function personAuthentication() {
  return request({
    url: `${prefixUrl}/person_authentication`,
    method: "get",
  });
}
export function sendVerificationCode(mobile: any) {
  return request({
    url: `${prefixUrl}/send_verification_code/${mobile}`,
    method: "get",
  });
}
export function addAuthentication(data: any) {
  return request({
    url: `${prefixUrl}/add_authentication`,
    method: "post",
    data: data,
  });
}
export function pageRecycleList(params: any) {
  return request({
    url: `${prefixUrl}/page_recycle`,
    method: "get",
    params,
  });
}
export function deletePageById(id: any) {
  return request({
    url: `${prefixUrl}/delete_person/${id}`,
    method: "get",
  });
}
export function deleteRealPageById(id: any) {
  return request({
    url: `${prefixUrl}/real_delete/${id}`,
    method: "get",
  });
}
export function recoveryById(id: any) {
  return request({
    url: `${prefixUrl}/recovery/${id}`,
    method: "get",
  });
}
export function deleteMorePage(params: any) {
  return request({
    url: `${prefixUrl}/batch_delete`,
    method: "post",
    data: params,
  });
}
export function deleteMoreRealPage(params: any) {
  return request({
    url: `${prefixUrl}/batch_real_delete`,
    method: "post",
    data: params,
  });
}
export function insertOrUpdate(data: any) {
  return request({
    url: `${prefixUrl}/insert_or_update`,
    method: "post",
    data: data,
  });
}
export function getDetailPageById(id: any) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}
export function getReLockById(id: any) {
  return request({
    url: `${prefixUrl}/remove_lock/${id}`,
    method: "get",
  });
}
export function getLockById(id: any) {
  return request({
    url: `${prefixUrl}/lock_person/${id}`,
    method: "get",
  });
}
export function getLock(data: any) {
  return request({
    url: `${prefixUrl}/batch_lock`,
    method: "post",
    data: data,
  });
}
export function getReLock(data: any) {
  return request({
    url: `${prefixUrl}/batch_remove_lock`,
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
export function getPersonExcelExport(data: any) {
  return getDownload("/person/exportExcel", "人名库导出", data);
}

// 提交
export function getModelExcel() {
  return getDownload("/person/exportExcel", "人名库导入模板", "");
}
