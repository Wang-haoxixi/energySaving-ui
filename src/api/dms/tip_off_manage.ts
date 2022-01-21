import request from "@/router/axios";
const prefixUrl = "/dms/tip_off_manage";

// 个人提交举报
export function createReport(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

// 举报管理分页
export function fetchPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

// 管理员批量逻辑删除举报
export function deleteByIds(data: any) {
  return request({
    url: `${prefixUrl}/delete`,
    method: "POST",
    data,
  });
}

// 单id查询个人举报
export function getDataById(id: any) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

// 处理举报-关闭举报
export function handleClose(id: any) {
  return request({
    url: `${prefixUrl}/handle_close/${id}`,
    method: "get",
  });
}

// 锁定用户并处理举报
export function lockUnlockUser(params: any) {
  return request({
    url: `${prefixUrl}/lock_unlock`,
    method: "post",
    params,
  });
}