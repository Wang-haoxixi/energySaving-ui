import request from "@/router/axios";

const prefixUrl = "/job/sys-job";

export const getSysJobPage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

export const postSysJob = (data: any) => {
  return request({
    url: `${prefixUrl}`,
    method: "post",
    data,
  });
};

export const putSysJob = (data: any) => {
  return request({
    url: `${prefixUrl}`,
    method: "put",
    data,
  });
};

export const delSysJobById = (id: number) => {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "delete",
  });
};

export const shutdownAllSysJob = () => {
  return request({
    url: `${prefixUrl}/shutdown-jobs`,
    method: "post",
  });
};

export const shutdownSysJobById = (id: number) => {
  return request({
    url: `${prefixUrl}/shutdown-job/${id}`,
    method: "post",
  });
};

export const startAllSysJob = () => {
  return request({
    url: `${prefixUrl}/start-jobs`,
    method: "post",
  });
};

export const startSysJobById = (id: number) => {
  return request({
    url: `${prefixUrl}/start-job/${id}`,
    method: "post",
  });
};

export const runSysJobById = (id: number) => {
  return request({
    url: `${prefixUrl}/run-job/${id}`,
    method: "post",
  });
};

export const refreshAllSysJob = () => {
  return request({
    url: `${prefixUrl}/refresh-jobs`,
    method: "post",
  });
};
