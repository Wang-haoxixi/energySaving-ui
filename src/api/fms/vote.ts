import request from "@/router/axios";

const prefixUrl = "/fms/vote";

export const getVoteAll = () => {
  return request({
    url: `${prefixUrl}/vote_page`,
    method: "get",
  });
};

export const getVotePage = (params: any) => {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
};

export const getVoteMyPage = (params: any) => {
  return request({
    url: `${prefixUrl}/my/page`,
    method: "get",
    params,
  });
};

export const getVoteSetting = () => {
  return request({
    url: `${prefixUrl}/reward/setting`,
    method: "get",
  });
};

export const getVoteResultById = (id: number) => {
  return request({
    url: `${prefixUrl}/winners/list/${id}`,
    method: "get",
  });
};

export const putVoteSetting = (data: any) => {
  return request({
    url: `${prefixUrl}/reward/setting/update`,
    method: "post",
    data,
  });
};

export const postVote = (data: any) => {
  return request({
    url: `${prefixUrl}/pc/create`,
    method: "post",
    data,
  });
};

export const getVoteSettingList = () => {
  return request({
    url: `${prefixUrl}/index/setting/list`,
    method: "post",
  });
};

export const updateVoteSetting = (data: any) => {
  return request({
    url: `${prefixUrl}/index/setting/update`,
    method: "post",
    data,
  });
};

export const switchVoteSetting = (id: number, status: string) => {
  return request({
    url: `${prefixUrl}/index/setting/update`,
    method: "post",
    data: {
      id,
      status,
    },
  });
};
