import request from "@/router/axios";
const prefixUrl = "/dms/project/info";

export function getTableData(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: { listType: 2, ...params },
  });
}
export function createData(obj: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}
export function updateData(obj: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}

// 详情
export function getDataDetail(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function deleteData(id: number) {
  const ids = typeof id === "object" ? id : [id];
  return request({
    url: `${prefixUrl}/logic_delete/batch`,
    method: "post",
    data: ids,
  });
}
// //变更
export function transferManagerList(obj: any) {
  return request({
    url: `${prefixUrl}/change/handle`,
    method: "post",
    data: obj,
  });
}
// // 公海取消认领
// export function statusCancel (list: any) {
//   return request({
//     url: "/fams/payment/status/cancel",
//     method: "post",
//     data: { ids: list },
//   });
// }
//撤回
export function withdrawById(obj: any) {
  return request({
    url: `${prefixUrl}/batch/withdrawal`,
    method: "post",
    data: obj,
  });
}
// 验证项目重名
export function checkProjectName(obj: any) {
  return request({
    url: `${prefixUrl}/verify/project_name`,
    method: "get",
    params: obj,
  });
}

// 推荐项目
export function recommendProject(obj: any) {
  return request({
    url: `${prefixUrl}/recommend/project_name`,
    method: "post",
    data: obj,
  });
}
// 推荐项目团队
export function recommendMember(obj: any) {
  return request({
    url: `${prefixUrl}/recommend/member`,
    method: "post",
    data: obj,
  });
}
// 平均周期
export function averageTime(obj: any) {
  return request({
    url: `${prefixUrl}/average/time`,
    method: "post",
    data: obj,
  });
}
// 成本预算
export function averageBudget(obj: any) {
  return request({
    url: `${prefixUrl}/average/budget`,
    method: "post",
    data: obj,
  });
}

//联想搜索项目
export function getProjectList(query: any) {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
    params: query,
  });
}

//操作记录
export function getRecordData(params: any) {
  return request({
    url: "/dms/project/record/page",
    method: "get",
    params: params,
  });
}