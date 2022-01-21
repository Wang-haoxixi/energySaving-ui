import request from "@/router/axios";
const prefixUrl = "/qms/course_lecturer";

export function getCourseLecturerPage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

export const postLecturer = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
};

export const putLecturer = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const getLecturerById = (id: string) => {
  return request({
    url: `${prefixUrl}/${id}`,
  });
};

export const delLecturerById = (id: string) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  });
};

export const getLecturerList = () => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
  });
};
