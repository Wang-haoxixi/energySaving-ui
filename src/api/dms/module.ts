import request from "@/router/axios";
export const prefixUrl = "/dms/module";

export function getModulePage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}

export function getModuleCertifyPage(params: any) {
  return request({
    url: `${prefixUrl}/certifyPage`,
    method: "get",
    params: params,
  });
}

export function postModule(obj: any) {
  return request({
    url: `${prefixUrl}/create`,
    method: "post",
    data: obj,
  });
}

export function putModule(obj: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data: obj,
  });
}

export function passModule(id: any) {
  return request({
    url: `${prefixUrl}/audit_agree/${id}`,
    method: "post",
  });
}

export function rejectModule(id: any) {
  return request({
    url: `${prefixUrl}/audit_disagree/${id}`,
    method: "post",
  });
}

export function getModuleById(id: any) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function certifyModuleById(id: any) {
  return request({
    url: `${prefixUrl}/askForCertify/${id}`,
    method: "get",
  });
}

export function checkCertifyModuleById(id: any, status: any) {
  return request({
    url: `${prefixUrl}/certifyPass/${id}`,
    method: "get",
    params: {
      status,
    },
  });
}

export function passCertifyModuleById(id: any) {
  return checkCertifyModuleById(id, 1);
}

export function rejectCertifyModuleById(id: any) {
  return checkCertifyModuleById(id, 0);
}

export function deleteModuleById(id: any) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}
