import request from "@/router/axios";
const prefixUrl = "/amap";
const defaultParmas = {
  key: "b2e4f6d5a06aaa98be2def6bbbc41caf",
};

// 获取高德金泰地图
export const getStaticMap = (params = {}) => {
  return request({
    url: `${prefixUrl}/v3/staticmap`,
    method: "get",
    params: Object.assign({}, defaultParmas, params),
  });
};