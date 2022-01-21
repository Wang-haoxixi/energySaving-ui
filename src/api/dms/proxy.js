import request from "@/router/axios";

const prefixUrl = "/dms/proxy";
//保证金设置--开始
export function getProxyConfigPage(query) {
  return request({
    url: `${prefixUrl}/rank/page`,
    method: "get",
    params: query,
  });
}

export function createProxyConfig(obj) {
  return request({
    url: `${prefixUrl}/rank/create`,
    method: "post",
    data: obj,
  });
}

export function getProxyConfigList(query) {
  return request({
    url: `${prefixUrl}/rank/list`,
    method: "get",
    params: query,
  });
}

export function putProxyConfig(obj) {
  return request({
    url: `${prefixUrl}/rank/update`,
    method: "post",
    data: obj,
  });
}

export function deleteProxyConfigById(id) {
  return request({
    url: `${prefixUrl}/rank/delete/${id}`,
    method: "post",
  });
}
//保证金设置--结束

//代理商管理--开始
export function getProxyManagementPage(query) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: query,
  });
}

export function createProxyManagement(obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}

export function getProxyManagementById(agentId) {
  return request({
    url: `${prefixUrl}/${agentId}`,
    method: "get",
  });
}
// 认证记录
export function getAttestRecordPage(query) {
  return request({
    url: `${prefixUrl}/recording/attes`,
    method: "get",
    params: query,
  });
}
// 保证金记录
export function getRecognizanceRecordPage(query) {
  return request({
    url: `${prefixUrl}/recording/bail`,
    method: "get",
    params: query,
  });
}
//个人代理商数量
export function getIndividual() {
  return request({
    url: `${prefixUrl}/individual`,
    method: "post",
  });
}
//组织代理商数量
export function getOrgAmount() {
  return request({
    url: `${prefixUrl}/org/amount`,
    method: "post",
  });
}
//改变代理商等级
export function changeRank(obj) {
  return request({
    url: `${prefixUrl}/change_rank`,
    method: "post",
    data: obj,
  });
}
//改变代理商认证状态
export function changeCertifyStatus(obj) {
  return request({
    url: `${prefixUrl}/certification/change_status`,
    method: "post",
    data: obj,
  });
}
//改变代理商保证金支付状态
export function changeBailStatus(obj) {
  return request({
    url: `${prefixUrl}/bail/change_status`,
    method: "post",
    data: obj,
  });
}
//代理商管理--结束

//我的代理--开始
export function getMyAgent() {
  return request({
    url: `${prefixUrl}/my/info`,
    method: "get",
  });
}
//我的代理--结束
export function getListByViews() {
  return request({
    url: `${prefixUrl}/views/list`,
    method: "get",
  });
}
//我组织的代理--开始
export function getMyOrgAgent() {
  return request({
    url: `${prefixUrl}/org/info`,
    method: "get",
  });
}
//我组织的代理--结束

//根据用户id获取自己创建的组织
export function getFounder(query) {
  return request({
    url: `${prefixUrl}/founder`,
    method: "get",
    params: query,
  });
}
//个人代理申请记录
export function getRecordByUserPage(query) {
  return request({
    url: `${prefixUrl}/application/record`,
    method: "get",
    params: query,
  });
}
//取消申请
export function cancelRecord(agentId) {
  return request({
    url: `${prefixUrl}/delete/${agentId}`,
    method: "post",
    data: {
      delFlag: 1,
    },
  });
}


//代理记录
export function getRecordingPage(query) {
  return request({
    url: `${prefixUrl}/application/record`,
    method: "get",
    params: query,
  });
}

// 我的代理详情
export function getMyProxyDetail() {
  return request({
    url: `${prefixUrl}/my/detail`,
    method: "get",
  });
}
