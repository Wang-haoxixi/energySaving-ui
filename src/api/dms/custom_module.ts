import request from "@/router/axios";
export const prefixUrl = "/dms/custom_module";

export function putModuleById(moduleId: any) {
  return request({
    url: `${prefixUrl}/module_create/${moduleId}`,
    method: "post",
  });
}
export function putProductById(productId: any) {
  return request({
    url: `${prefixUrl}/product_create/${productId}`,
    method: "post",
  });
}
export function getCusList() {
  return request({
    url: `${prefixUrl}/list`,
    method: "get",
  });
}
export function deleteModuleById(id: any) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}
export function deleteBatchDelete(obj: any) {
  return request({
    url: `${prefixUrl}/batch_delete`,
    method: "post",
    data: obj,
  });
}
