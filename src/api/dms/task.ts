import request from "@/router/axios";
const prefixUrl = "/dms/task";

export const createForm = (obj: any) => {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
};

export const updateForm = (obj: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
};

export const deleteDataById = (id: any) => {
  return request({
    url: `${prefixUrl}/logic_delete/${id}`,
    method: "post",
  });
};

export const getAllTaskPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
};

export const getMyTaskPage = (params: any) => {
  return request({
    url: `${prefixUrl}/my_page`,
    method: "get",
    params: params,
  });
};

export const getHallTaskPage = (params: any) => {
  return request({
    url: `${prefixUrl}/hall_page`,
    method: "get",
    params: params,
  });
};

export const getOrgTaskPage = (params: any) => {
  return request({
    url: `${prefixUrl}/org_page`,
    method: "get",
    params: params,
  });
};

export const getExamineTaskPage = (params: any) => {
  return request({
    url: `${prefixUrl}/examine_page`,
    method: "get",
    params: params,
  });
};

// 不会增加浏览次数
export const getTaskById = (id: any) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
};

// 会增加浏览次数
export const getTaskDetailById = (id: any) => {
  return request({
    url: `${prefixUrl}/index/${id}`,
    method: "get",
  });
};

export const completeTaskById = (id: any) => {
  return request({
    url: `${prefixUrl}/complete/${id}`,
    method: "post",
  });
};

// 获取子任务集合
export const getChildrenList = (id: any) => {
  return request({
    url: `${prefixUrl}/children_list/${id}`,
    method: "get",
  });
};

// 查询日历任务
export const getCalendar = (params: any) => {
  return request({
    url: `${prefixUrl}/calendar`,
    method: "get",
    params: params,
  });
};

// 获取推荐任务
export const getFollowList = () => {
  return request({
    url: `${prefixUrl}/follow_task`,
    method: "get",
  });
};
// 获取最受关注的任务
export const getRecList = () => {
  return request({
    url: `${prefixUrl}/rec_task`,
    method: "get",
  });
};

// 重置任务
export const resetTask = (id: any) => {
  return request({
    url: `${prefixUrl}/reset_task/${id}`,
    method: "post",
  });
};

// 查询组织的任务集合
export const getTaskOrgListByOrgId = (orgId: number) => {
  return request({
    url: `${prefixUrl}/org_list/${orgId}`,
    method: "get",
  });
};

// 获取任务创建者信息
export const getCreaterById = (id: any) => {
  return request({
    url: `${prefixUrl}/get_creator/${id}`,
    method: "get",
  });
};

// 获取完成的任务（成功案例）
export const getSuccessTask = () => {
  return request({
    url: `${prefixUrl}/success_task`,
    method: "get",
  });
};

// 查询组织的任务统计 
export const getOrgStatistics = (id: any) => {
  return request({
    url: `${prefixUrl}/org_statistics/${id}`,
    method: "get",
  });
};

// 获取组织成员任务进度统计分页
export const getOrgUserJdpage = (params: any) => {
  return request({
    url: `${prefixUrl}/org_user_jdpage`,
    method: "get",
    params,
  });
};

// 获取组织成员任务逾期统计分页
export const getOrgUserYqpage = (params: any) => {
  return request({
    url: `${prefixUrl}/org_user_yqpage`,
    method: "get",
    params,
  });
};
