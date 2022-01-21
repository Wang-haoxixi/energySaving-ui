import request from "@/router/axios";
const prefixUrl = "/qms/course_study_situation";

export const createCourseOrder = (data: any) => {
  return request({
    url: `${prefixUrl}/create_order`,
    method: "post",
    data,
  });
};

export function getStudyListPageById(id: string) {
  return function (params: any) {
    return request({
      url: `${prefixUrl}/study_situation/page`,
      method: "get",
      params: {
        infoId: id,
        ...params,
      },
    });
  };
}

// {id": 章节的ID, progress: "2",situationId:''}
// 1是未开始 2是学习中 3是学习完成
export const setStudyProgress = (data: any) => {
  return request({
    url: `${prefixUrl}/start_study`,
    method: "post",
    data,
  });
};

export const getStudyDetail1ById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_study_detail_one/${id}`,
  });
};

export const getStudyDetail2ById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_study_detail_two/${id}`,
  });
};

export const getStudyDetail3ById = (id: string) => {
  return request({
    url: `${prefixUrl}/get_study_detail_three/${id}`,
  });
};
/**
 * 我的课程列表分页
 * @param params
 */
export function myCoursePcPage(params: any) {
  return request({
    url: `${prefixUrl}/my_course_pc`,
    params,
  });
}

/**
 * 我的课程计数
 * @param params
 */
export function myCoursePcCount() {
  return request({
    url: `${prefixUrl}/my_course_pc_count`,
  });
}
