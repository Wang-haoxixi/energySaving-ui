import request from "@/router/axios";
const prefixUrl = "/dms/meeting_summary";

// 我参与的分页
export const fetchInvolvedPage = (params: any) => {
  return request({
    url: `${prefixUrl}/my_involved/page`,
    method: "get",
    params: params,
  });
};

// 我收到的分页
export const fetchReceivedPage = (params: any) => {
  return request({
    url: `${prefixUrl}/my_received/page`,
    method: "get",
    params: params,
  });
};

// 我参与的分页
export const fetchPersonalPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page/personal`,
    method: "get",
    params: params,
  });
};

export function deleteData(ids: any) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: "post",
    data: ids,
  });
}

// 查询本周收到的和发布的会议纪要
export function getCount(query: any) {
  return request({
    url: `${prefixUrl}/count`,
    method: "get",
    params: query,
  });
}

// 单id查询会议纪要信息详情
export function getDataById(id: any) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

// 新增会议纪要
export function createData(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: data,
  });
}

// 修改会议纪要
export function updateData(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: data,
  });
}

// 发送纪要-（传所送纪要id，返回msg为“”说明非会议当天发纪要，不加贝）
export function meetingSend(id: any) {
  return request({
    url: `${prefixUrl}/send/${id}`,
    method: "get",
  });
}

// 复制
export function copyData(id: any) {
  return request({
    url: `${prefixUrl}/copy/${id}`,
    method: "get",
  });
}

// 管理员纪要管理的分页
export function fetchAdminPage(params: any) {
  return request({
    url: `${prefixUrl}/admin/page`,
    method: "get",
    params,
  });
}

// so组织管理员纪要管理修改会议纪要
export function updateDataByAdmin(data: any) {
  return request({
    url: `${prefixUrl}/admin/update`,
    method: "post",
    data,
  });
}

// 管理员批量删除会议纪要及其关联
export function deleteDataByAdmin(data: any) {
  return request({
    url: `${prefixUrl}/admin/delete/batch`,
    method: "post",
    data,
  });
}

// SO内成员分享纪要--不管是否为纪要创建者都可分享给同SO成员
export function shareInSo(data: any) {
  return request({
    url: `${prefixUrl}/share_in_so`,
    method: "post",
    data,
  });
}