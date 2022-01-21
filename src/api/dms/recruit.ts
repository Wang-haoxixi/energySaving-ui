import request from "@/router/axios";
export const prefixUrl = "/dms/recruit";

// 保存合伙人招聘信息
export function createPartner(data: any) {
  return request({
    url: `${prefixUrl}/create/partner`,
    method: "post",
    data,
  });
}

// 编辑合伙人招聘信息
export function updatePartner(data: any) {
  return request({
    url: `${prefixUrl}/edit/partner`,
    method: "post",
    data,
  });
}

// 保存职位招聘信息
export function createPosition(data: any) {
  return request({
    url: `${prefixUrl}/create/position`,
    method: "post",
    data,
  });
}

// 编辑职位招聘信息
export function updatePosition(data: any) {
  return request({
    url: `${prefixUrl}/edit/position`,
    method: "post",
    data,
  });
}

// 根据组织id和招聘类型获取福利列表
export function getWelfare(params: any) {
  return request({
    url: `${prefixUrl}/welfare/get`,
    method: "get",
    params,
  });
}

// 查询组织招聘信息
export function getRecruitPageByOrgId(params: any) {
  return request({
    url: `${prefixUrl}/so_recruit`,
    method: "get",
    params,
  });
}

// 停止招聘信息
export function stopRecruitById(data: any) {
  return request({
    url: `${prefixUrl}/stop`,
    method: "post",
    data,
  });
}

// 重启招聘
export function restartRecruitById(data: any) {
  return request({
    url: `${prefixUrl}/restart`,
    method: "post",
    data,
  });
}

// 置顶招聘信息
export function topRecruitById(data: any) {
  return request({
    url: `${prefixUrl}/top`,
    method: "post",
    data,
  });
}

// 刷新招聘信息
export function refreshRecruitById(data: any) {
  return request({
    url: `${prefixUrl}/refresh`,
    method: "post",
    data,
  });
}

/**
 * 我的发布-能聘
 * @param params
 */
export function recruitMyRelease(params: any) {
  return request({
    url: `${prefixUrl}/my_release`,
    method: "get",
    params,
  });
}
// 获取我收藏的招聘
export function getCollectGetPage(params: any) {
  return request({
    url: `${prefixUrl}/collect/get_page`,
    method: "get",
    params,
  });
}

// 收藏职位
export function collectCreate(data: any) {
  return request({
    url: `${prefixUrl}/collect/create`,
    method: "post",
    data,
  });
}

// 取消收藏
export function collectDelete(data: any) {
  return request({
    url: `${prefixUrl}/collect/delete`,
    method: "post",
    data,
  });
}

// 根据组织id添加福利
export function createWelfare(data: any) {
  return request({
    url: `${prefixUrl}/welfare/create`,
    method: "post",
    data,
  });
}

// 根据福利id删除福利
export function deleteWelfare(data: any) {
  return request({
    url: `${prefixUrl}/welfare/delete`,
    method: "post",
    data,
  });
}


//  根据id获取通知详情
export function getNoticeDetailsById(id: number) {
  return request({
    url: `${prefixUrl}/notice/get_details/${id}`,
    method: "get",
  });
}

// 通知接收人修改通知状态
export function updateNoticeState(data: any) {
  return request({
    url: `${prefixUrl}/notice/update_state`,
    method: "post",
    data,
  });
}

// 获取组织的面试邀请列表
export function getInvitationBySoId(params: any) {
  return request({
    url: `${prefixUrl}/notice/get_invitation_so/${params.orgId}`,
    method: "get",
    params,
  });
}

// 保存通知
export function sendNotice(data: any) {
  return request({
    url: `${prefixUrl}/notice/send`,
    method: "post",
    data,
  });
}

/********************************* 能聘地址地图api *********************************/

// 新增详细地址
export function addressCreate(data: any) {
  return request({
    url: `${prefixUrl}/address/create`,
    method: "post",
    data,
  });
}

// 获取地址列表根据组织id
export function getAddressByOrgId(orgId: any) {
  return request({
    url: `${prefixUrl}/address/get/${orgId}`,
    method: "get",
  });
}

// 删除详细工作地址
export function addressDelete(data: any) {
  return request({
    url: `${prefixUrl}/address/delete`,
    method: "post",
    data,
  });
}

// 编辑工作地址
export function addressUpdate(data: any) {
  return request({
    url: `${prefixUrl}/address/edit`,
    method: "post",
    data,
  });
}

/******************************* 能聘邮件模板 *************************************/
const prefixMailUrl = "/dms/recruit/mail";

// 查询能聘邮件模板根据so ID
export function getMailDataById(params: any) {
  return request({
    url: `${prefixMailUrl}/get_by_so/${params.orgId}`,
    method: "get",
    params,
  });
}

// 查询能聘邮件模板根据so ID 分页
export function getMailPage(params: any) {
  return request({
    url: `${prefixMailUrl}/get_by_so/page`,
    method: "get",
    params,
  });
}

// 创建能聘邮件模板
export function createMail(data: any) {
  return request({
    url: `${prefixMailUrl}/create`,
    method: "post",
    data,
  });
}

// 编辑能聘邮件模板
export function updateMail(data: any) {
  return request({
    url: `${prefixMailUrl}/edit`,
    method: "post",
    data,
  });
}

// 删除能聘邮件模板
export function deleteMail(data: any) {
  return request({
    url: `${prefixMailUrl}/delete`,
    method: "post",
    data,
  });
}

// 发送招聘通知
export function sendMail(data: any) {
  return request({
    url: `${prefixMailUrl}/send`,
    method: "post",
    data,
  });
}




