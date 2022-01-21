import request from "@/router/axios";
const prefixUrl = "/qms/so_task";

export function getSoTaskPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}
export function getSoTaskById(id: string) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function postSoTask(data: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data,
  });
}

export function putSoTask(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
}

export function delSoTaskById(id: any) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}

export function getSoTaskList() {
  return request({
    url: `${prefixUrl}/tasks`,
    method: 'get',
  });
}

export function postSoTaskAward(data: any) {
  return request({
    url: `${prefixUrl}/award`,
    method: 'post',
    data,
  });
}
