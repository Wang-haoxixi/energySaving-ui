import request from "@/router/axios";
const prefixUrl = "/dms/task_user";

export const getTaskUserList = (params: any) => {
  return request({
    url: `${prefixUrl}/list/${params.taskId}`,
    method: "get",
  });
};

// 同意加入任务
export const taskAgree = (id: any) => {
  return request({
    url: `${prefixUrl}/agree/${id}`,
    method: "post",
  });
};

// 拒绝加入任务
export const taskRefuse = (id: any) => {
  return request({
    url: `${prefixUrl}/refuse/${id}`,
    method: "post",
  });
};

// 剔除成员
export const taskReject = (obj: any) => {
  return request({
    url: `${prefixUrl}/reject`,
    method: "post",
    data: obj,
  });
};

// 修改任务团队成员
export const taskUpdateUser = (obj: any) => {
  return request({
    url: `${prefixUrl}/update/${obj.taskId}`,
    method: "post",
    data: obj.userIds,
  });
};

// 挑选负责人
export const taskPickCharge = (obj: any) => {
  return request({
    url: `${prefixUrl}/pick_charge`,
    method: "post",
    data: obj,
  });
};
