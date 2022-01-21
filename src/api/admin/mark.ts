import request from "@/router/axios";

const prefixUrl = "/admin/mark";

// 分享裂变统计图表数据
export const getShareMarkData = () => {
  return request({
    url: `${prefixUrl}/share_fission_map`,
    method: "post",
  });
};
