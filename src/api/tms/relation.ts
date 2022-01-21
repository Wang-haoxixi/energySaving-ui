import request from "@/router/axios";

const prefixUrl = "/tms/relation";

/**
 * 统计用户兴趣分布-词云
 * @param num 所查个数
 */
export const getWordCloudTagsRefers = (num: number) => {
  return request({
    url: `${prefixUrl}//word_cloud/tags_refers`,
    method: "post",
    params: {
      num,
    },
  });
};
