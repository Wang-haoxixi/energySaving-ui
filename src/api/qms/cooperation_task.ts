import request from "@/router/axios";
const prefixUrl = "/qms/cooperation_task";

// 协作-新建任务
export function createTask(data: any) {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
}

// 协作-编辑任务
export function updateTask(data: any) {
  return request({
    url: `${prefixUrl}/edit`,
    method: "post",
    data,
  });
}

/**
 * 协作-任务操作(完成、删除、关闭)
 * @param data 
 * type: 类型 1-完成 2-删除 3-关闭 4-取消完成
 */
export function operationTask(data: any) {
  return request({
    url: `${prefixUrl}/operation`,
    method: "post",
    data,
  });
}

// 发布者重启任务
export function restartTask(data: any) {
  return request({
    url: `${prefixUrl}/restart`,
    method: "post",
    data,
  });
}

// 协作人退出任务
export function exitTask(params: any) {
  return request({
    url: `${prefixUrl}/exit_task`,
    method: "post",
    params,
  });
}

// 协作-根据任务id获取协作人列表
export function getTaskUser(params: any) {
  return request({
    url: `${prefixUrl}/task_user`,
    method: "get",
    params,
  });
}

// 查询工场中最活跃的SO
export function getMostActiveSo(size: any) {
  return request({
    url: `${prefixUrl}/most_active_so/${size}`,
    method: "get",
  });
}

// 获取组织任务
export function getSoTaskPage(params: any) {
  return request({
    url: `${prefixUrl}/so_task`,
    method: "get",
    params,
  });
}

// 协作-同步任务到工场
export function publishWorkShop(params: any) {
  return request({
    url: `${prefixUrl}/publish_workshop`,
    method: "post",
    params,
  });
}

// 申请加入任务
export function applyJoin(data: any) {
  return request({
    url: `${prefixUrl}/apply_join`,
    method: "post",
    data,
  });
}

// 协作-任务置顶
export function taskTop(params: any) {
  return request({
    url: `${prefixUrl}/top`,
    method: "post",
    params,
  });
}

// 运营直接删除任务
export function operationDelete(params: any) {
  return request({
    url: `${prefixUrl}/operation_delete`,
    method: "post",
    params,
  });
}

// 协作-新建任务（官方任务）
export function createOfficialTask(data: any) {
  return request({
    url: `${prefixUrl}/create_official`,
    method: "post",
    data,
  });
}

// 协作-编辑任务（官方任务）
export function editOfficialTask(data: any) {
  return request({
    url: `${prefixUrl}/edit_official`,
    method: "post",
    data,
  });
}

// 运营上下架任务
export function offTheShelfByOfficial(data: any) {
  return request({
    url: `${prefixUrl}/off_the_shelf`,
    method: "post",
    data,
  });
}

// 任务举报下架
export function reportTask(data: any) {
  return request({
    url: `${prefixUrl}/report`,
    method: "post",
    data,
  });
}

// 任务 分配奖励
export function freeDistribution(data: any) {
  return request({
    url: `${prefixUrl}/free_distribution`,
    method: "post",
    data,
  });
}