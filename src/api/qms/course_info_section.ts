import request from "@/router/axios";
const prefixUrl = "/qms/course_info_section";

export const postInfoSection = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
};

export const putInfoSection = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};
export const putInfoSectionName = (data: any) => {
  return request({
    url: `${prefixUrl}/update_name`,
    method: "post",
    data,
  });
};

export const getInfoSectionById = (id: string) => {
  return request({
    url: `${prefixUrl}/${id}`,
  });
};

export const delInfoSectionById = (id: string) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  });
};

export const delInfoSection = (data: any) => {
  return request({
    url: `${prefixUrl}/delete_big_section`,
    method: 'post',
    data,
  });
};

export const getSectionById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_section/${id}`,
  });
};

export const getInfoOutlineById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_outline_by_id/${id}`,
  });
};

export const getInfoTestingById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_unit_test_by_id/${id}`,
  });
};
