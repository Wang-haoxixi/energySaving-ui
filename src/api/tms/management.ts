import request from "@/router/axios";

const prefixUrl = "/tms";
// @/api/tms/
export function getResultCenterPage(opts: any) {
  return request({
    url: `${prefixUrl}/result/center/page`,
    method: "get",
    params: opts,
  });
}
export function getResultPageByTagId(id: number) {
  return function (opts: any) {
    return request({
      url: `${prefixUrl}/result/satellite/page/${id}`,
      method: "get",
      params: opts,
    });
  };
}
export function getResultById(id: number) {
  return request({
    url: `${prefixUrl}/tag/${id}`,
    method: "get",
  });
}
//联想获取游离标签集
export function getResultList(query: any) {
  return request({
    url: `${prefixUrl}/result/list`,
    method: "get",
    params: query,
  });
}
export function getResultFreePage(opts: any) {
  return request({
    url: `${prefixUrl}/result/free/page`,
    method: "get",
    params: opts,
  });
}
//新增
export function addCenterWord(centerId: number, obj: any) {
  return request({
    url: `${prefixUrl}/result/add/center/${centerId}`,
    method: "post",
    data: obj,
  });
}
//释放中心词
export function releaseCenterById(id: number) {
  return request({
    url: `${prefixUrl}/result/release/${id}`,
    method: "get",
  });
}
//释放卫星词
export function releaseSatelliteById(opts: any) {
  return request({
    url: `${prefixUrl}/result/release/satellite`,
    method: "get",
    params: opts,
  });
}
//新增
export function editCenterWord(id: number, obj: any) {
  return request({
    url: `${prefixUrl}/result/add/satellite/${id}`,
    method: "post",
    data: obj,
  });
}
//更替中心词
export function releaseTransById(opts: any) {
  return request({
    url: `${prefixUrl}/result/trans`,
    method: "get",
    params: opts,
  });
}
//人工管理分页
export function getManageRecordPage(opts: any) {
  return request({
    url: `${prefixUrl}/manage_record/page`,
    method: "get",
    params: opts,
  });
}
//人工管理分页
export function getResultStatistics() {
  return request({
    url: `${prefixUrl}/result/statistics`,
    method: "get",
  });
}

//归类记录分页
export function getClassificationPage(opts: any) {
  return request({
    url: `${prefixUrl}/sort/page`,
    method: "get",
    params: opts,
  });
}
//游离归类
export function getFreeCluster() {
  return request({
    url: `${prefixUrl}/sort/free_Cluster`,
    method: "get",
  });
}
export function getSortPageByTagId(id: number) {
  return function (opts: any) {
    return request({
      url: `${prefixUrl}/sort/page/value/${id}`,
      method: "get",
      params: opts,
    });
  };
}
export function getSortById(id: number) {
  return request({
    url: `${prefixUrl}/sort/${id}`,
    method: "get",
  });
}
export function getExportLabel() {
  return request({
    url: `${prefixUrl}/result/export_label`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "arraybuffer",
    // data: fileds,
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "治理词.xls";
    link.click();
  });
}
export function getExportStandard() {
  return request({
    url: `${prefixUrl}/result/export_standard`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "arraybuffer",
    // data: fileds,
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "标准标签库.xls";
    link.click();
  });
}