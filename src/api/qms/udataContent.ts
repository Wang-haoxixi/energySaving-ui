import request from "@/router/axios";

// 商品标签
export function getTags(params: any) {
  return request({
    url: "/dms/product/tag/" + params,
    method: "get",
    // params
  });
}
