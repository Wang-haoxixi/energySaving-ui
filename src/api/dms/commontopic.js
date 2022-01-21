import request from "@/router/axios";
const prefixUrl = "/dms/thoughts/topic";

export function getTableData(params) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params: params,
  });
}

// 根据id删除话题
export function deleteData(id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: "post",
  });
}

// 根据id置顶或解除置顶指定话题
export function handleTopUp(obj) {
  return request({
    url: `${prefixUrl}/top_up`,
    method: "post",
    data: obj,
  });
}

// 根据id隐藏或解除隐藏指定话题
export function handleHide(obj) {
  return request({
    url: `${prefixUrl}/hide`,
    method: "post",
    data: obj,
  });
}
