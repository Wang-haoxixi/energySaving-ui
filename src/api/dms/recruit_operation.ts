import request from "@/router/axios";
export const prefixUrl = "/dms/recruit_operation";

// 能聘大厅筛选条件查询
export function recruitOperationReject(data: any) {
  return request({
    url: `${prefixUrl}/reject`,
    method: "post",
    data,
  });
}

/****************************** 招聘方操作 ******************************/
// 招聘方删除投递记录
export function deleteByAdmin(data: any) {
  return request({
    url: `${prefixUrl}/del_by_admin`,
    method: "post",
    data,
  });
}

// 标记投递记录查看
export function checkRecruit(data: any) {
  return request({
    url: `${prefixUrl}/check`,
    method: "post",
    data,
  });
}

/****************************** 投递方操作 ******************************/

// 招聘投递-普通职位
export function deliveryPosition(data: any) {
  return request({
    url: `${prefixUrl}/delivery_position`,
    method: "post",
    data,
  });
}

// 招聘投递-合伙人职位
export function deliveryPartner(data: any) {
  return request({
    url: `${prefixUrl}/delivery_partner`,
    method: "post",
    data,
  });
}

// 删除投递记录
export function delByUser(data: any) {
  return request({
    url: `${prefixUrl}/del_by_user`,
    method: "post",
    data,
  });
}