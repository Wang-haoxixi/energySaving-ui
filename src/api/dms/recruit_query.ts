import request from "@/router/axios";
export const prefixUrl = "/dms/recruit_query";

// 能聘大厅筛选条件查询
export function getRecruitCondition(params: any) {
  return request({
    url: `${prefixUrl}/condition`,
    method: "get",
    params,
  });
}

// 能聘大厅招聘岗位列表
export function getRecruitHallPage(params: any) {
  return request({
    url: `${prefixUrl}/page_pc`,
    method: "get",
    params,
  });
}

// 岗位详情
export function getRecruitDetail(params: any) {
  return request({
    url: `${prefixUrl}/detail`,
    method: "get",
    params,
  });
}

// 相似岗位
export function getSimilarRecruit(params: any) {
  return request({
    url: `${prefixUrl}/similar`,
    method: "get",
    params,
  });
}

// 招聘投递用户列表
export function getApplyUserPage(params: any) {
  return request({
    url: `${prefixUrl}/apply_user`,
    method: "get",
    params,
  });
}

// 组织-招聘投递用户信息
export function getSoApplyUserPage(params: any) {
  return request({
    url: `${prefixUrl}/so_apply_user`,
    method: "get",
    params,
  });
}

// 获取合伙人投递详细信息
export function getPartnerInfo(params: any) {
  return request({
    url: `${prefixUrl}/partner_info`,
    method: "get",
    params,
  });
}

// 我的招聘信息
export function getMyApply(params: any) {
  return request({
    url: `${prefixUrl}/my_apply`,
    method: "get",
    params,
  });
}

// 能聘大厅筛选条件查询
export function getCondition(params: any) {
  return request({
    url: `${prefixUrl}/condition`,
    method: "get",
    params,
  });
}

// 能聘人才库筛选条件查询
export function getTalentPoolCondition(params: any) {
  return request({
    url: `${prefixUrl}/talent_pool/condition`,
    method: "get",
    params,
  });
}