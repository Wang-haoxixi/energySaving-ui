import request from "@/router/axios";
const prefixUrl = "/qms/exam_examination_video";

/**
 * 考试视频管理表
 */
export function getExamVideoPageById(examId: string) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/${examId}/page`,
      method: "get",
      params,
    });
  };
}

export function addExamVideo(data: any) {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
}

export function updateExamVideo(data: any) {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
}

export function getExamVideoById(id: number) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: "get",
  });
}

export function getExamStudyVideoListById(id: number) {
  return request({
    url: `${prefixUrl}/get_video_list/${id}`,
    method: "get",
  });
}
