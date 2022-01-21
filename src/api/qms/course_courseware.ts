import request from "@/router/axios";
const prefixUrl = "/qms/course_courseware";

/**
 * 课件分类
 */
export function getTestDictPage(params: any) {
  return request({
    url: `/qms/course_org_dict/so_dict_id`,
    method: "get",
    params,
  });
}

//修改
export function updateTestDict(data: any) {
  return request({
    url: `/qms/course_org_dict/update`,
    method: "post",
    data,
  });
}

//新增
export function addTestDict(data: any) {
  return request({
    url: `/qms/course_org_dict/save`,
    method: "post",
    data,
  });
}

export function deleteTestDictById(id: any, category: any) {
  return request({
    url: `/qms/course_org_dict/delete/${category}/${id}`,
    method: "post",
  });
}

export const delDictByIdByCategory = (category: string) => {
  return function (id: string) {
    return request({
      url: `/qms/course_org_dict/delete/${category}/${id}`,
      method: "post",
    });
  };
};

// 目前正式接口

export function getCourseCoursewarePage(params: any) {
  return request({
    url: `${prefixUrl}/page`,
    method: "get",
    params,
  });
}

export const postCourseware = (data: any) => {
  return request({
    url: `${prefixUrl}/save`,
    method: "post",
    data,
  });
};

export const putCourseware = (data: any) => {
  return request({
    url: `${prefixUrl}/update`,
    method: "post",
    data,
  });
};

export const getCoursewareById = (id: string) => {
  return request({
    url: `${prefixUrl}/${id}`,
  });
};

export const delCoursewareById = (id: string) => {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  });
};
